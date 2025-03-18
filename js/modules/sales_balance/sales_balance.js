import ApiService from "../helpers/api_service.js";
import monetaryMask from "../helpers/monetaryMask.js";
import { turningMonthInNumber } from "../helpers/formatDate.js";
import { fieldValidation } from "../client/form_validations";

export default class SalesBalance {
  constructor(url, salesWrapper, moreLessWrapper, inputList, balanceTitle) {
    this.url = url;
    this.salesWrapper = document.querySelector(salesWrapper);
    this.moreLessWrapper = document.querySelector(moreLessWrapper);
    this.inputList = document.querySelectorAll(inputList);

    this.balanceTitle = document.querySelector(balanceTitle);
    this.article = document.createElement("article");

    this.renderingSalesBalance = this.renderingSalesBalance.bind(this);

    this.errsType = ["valueMissing"];
    this.errsMsg = {
      monthBalance: {
        valueMissing: "O campo de mês não pode estar vazio.",
      },
      yearBalance: {
        valueMissing: "O campo de ano não pode estar vazio.",
      },
    };
  }

  // Métodos de auxílio

  // Busca as notas de serviço no bando de dados baseado em um determinado mês e ano
  async searchOsByDate() {
    const apiService = new ApiService(this.url);
    const date = this.handleInputInfo();
    if (date) {
      const month = turningMonthInNumber(date.month);
      const { year } = date;
      console.log(`Fazendo requisição para: ${this.url}/os/${month}/${year}`);
      const { os } = await apiService.getBalance("os/by-month-year", month, year);
      return os;
    }
    return [];
  }

  // Se o array de serviço estiver vazio renderiza uma msg
  ifSalesArrayEmpty() {
    const msg = `<p class="font-os-l color-13">Nenhuma venda foi registrada neste mês.</p>`;
    this.article.innerHTML = msg;
  }

  // Se houver itens dentro do array de serviços renderiza os clientes e o total de suas vendas
  ifSalesArrayFull(os, date) {
    let total = 0;
    os.forEach((item) => {
      const ul = document.createElement("ul");
      ul.classList.add("sales__report-item");
      ul.classList.add("sales__report-style");
      ul.innerHTML = ` <li class="font-os-m-b color-13">${item.client_name}</li>
            <li class="font-os-m-b color-13">${date.month} de ${date.year}</li>
            <li class="font-os-m-b color-13">${monetaryMask(item.total)}</li>`;
      this.article.appendChild(ul);
      total += item.total;
    });

    this.article.innerHTML += `<div class="sales__report-total color-13 font-os-xl-b">
                                <p>Total:</p>
                                <p>${monetaryMask(total)}</p>
                                </div>`;
  }

  handleInputInfo() {
    if (this.inputList.length <= 0) {
      return [];
    }
    const date = {
      month: this.inputList[0].value,
      year: this.inputList[1].value,
    };

    return date;
  }

  // Métodos de execução

  // Renderiza na tela a exibição dos dados
  async renderingSalesBalance() {
    const os = await this.searchOsByDate();
    const date = this.handleInputInfo();
    this.article.classList.add("sales_report-container");

    if (os.length <= 0) {
      this.ifSalesArrayEmpty();
    } else {
      this.balanceTitle.innerHTML = `Ver balanço de vendas do mês ${date.month}`;
      this.article.innerHTML = "";
      this.ifSalesArrayFull(os, date);
      this.handleSalesMoreLess(os);
      this.salesWrapper.insertBefore(this.article, this.moreLessWrapper);
    }
  }

  // Lida com o calculo e com a exibição do cliente que menos vendo e
  // do cliente que mais vendeu
  handleSalesMoreLess(os) {
    const biggerValue = os.reduce((acc, val) => (val.total > acc.total ? val : acc));
    const minorValue = os.reduce((acc, val) => (val.total < acc.total ? val : acc));

    this.moreLessWrapper.querySelector(".bigger-name").innerHTML = `${biggerValue.client_name} - `;
    this.moreLessWrapper.querySelector(".bigger-value").innerHTML = monetaryMask(biggerValue.total);
    this.moreLessWrapper.querySelector(".minor-name").innerHTML = `${minorValue.client_name} - `;
    this.moreLessWrapper.querySelector(".minor-value").innerHTML = monetaryMask(minorValue.total);

    this.moreLessWrapper.style.display = "block";
  }

  handleEvents() {
    if (this.inputList.length > 0) {
      this.inputList[2].addEventListener("click", this.renderingSalesBalance);
      this.inputList[1].addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.renderingSalesBalance();
      });
    }

    this.inputList[0].addEventListener("blur", (e) => {
      fieldValidation(e.target, this.errsMsg, this.errsType, ".msgError");
    });

    this.inputList[1].addEventListener("blur", (e) => {
      fieldValidation(e.target, this.errsMsg, this.errsType, ".msgError");
    });
  }

  init() {
    if (document.querySelector(".main__balance")) {
      this.handleEvents();
    }
    return this;
  }
}

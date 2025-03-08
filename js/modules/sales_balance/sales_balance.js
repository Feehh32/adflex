import ApiService from "../helpers/api_service.js";
import monetaryMask from "../helpers/monetaryMask.js";
import { turningMonthInNumber } from "../helpers/formatDate.js";
import { fieldValidation } from "../client/form_validations";

export default class SalesBalance {
  constructor(url, clients, salesWrapper, balanceTitle, moreLessWrapper, inputList) {
    this.clients = clients;
    this.salesWrapper = document.querySelector(salesWrapper);
    this.url = url;
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
    // const month = String(date.getMonth() + 1).padStart(2, "0");
    const monthYear = this.handleInputInfo();

    if (monthYear) {
      const { os } = await apiService.getByMonth("os", monthYear);
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
  ifSalesArrayFull(month, os, date) {
    let total = 0;
    this.clients.forEach((client) => {
      for (let i = 0; i < os.length; i++) {
        if (client.id === os[i].client_id) {
          const clientTotalValue = SalesBalance.calculateTotal(client.id, os);
          const ul = document.createElement("ul");
          ul.classList.add("sales__report-item");
          ul.classList.add("sales__report-style");
          ul.innerHTML = ` <li class="font-os-m-b color-13">${client.name}</li>
            <li class="font-os-m-b color-13">${month} de ${date.getFullYear()}</li>
            <li class="font-os-m-b color-13">${monetaryMask(clientTotalValue)}</li>`;
          this.article.appendChild(ul);
          total += clientTotalValue;
          break;
        }
      }
    });

    this.article.innerHTML += `<div class="sales__report-total color-13 font-os-xl-b">
                                <p>Total:</p>
                                <p>${monetaryMask(total)}</p>
                                </div>`;
  }

  static calculateTotal(clientId, os) {
    let total = 0;
    os.forEach((element) => {
      if (clientId === element.client_id) {
        total += element.budgetValue ? element.budgetValue : element.total;
      }
    });

    return total;
  }

  handleInputInfo() {
    if (this.inputList.length <= 0) {
      return [];
    }
    const month = turningMonthInNumber(this.inputList[0].value);
    const year = this.inputList[1].value;
    return `${month}-${year}`;
  }

  // Métodos de execução

  // Renderiza na tela a exibição dos dados
  async renderingSalesBalance() {
    const os = await this.searchOsByDate();
    this.article.classList.add("sales_report-container");

    const date = new Date();
    const month = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(date);

    if (os.length <= 0) {
      this.ifSalesArrayEmpty();
    } else {
      this.balanceTitle.innerHTML = `Ver balanço de vendas do mês ${month}`;
      this.article.innerHTML = "";
      this.ifSalesArrayFull(month, os, date);
      this.handleSalesMoreLess(os);
      this.salesWrapper.insertBefore(this.article, this.moreLessWrapper);
    }
  }

  // Lida com o calculo e com a exibição do cliente que menos vendo e
  // do cliente que mais vendeu
  handleSalesMoreLess(os) {
    const valuesArray = [];
    this.clients.forEach((client) => {
      for (let i = 0; i < os.length; i++) {
        if (client.id === os[i].client_id) {
          valuesArray.push({
            name: client.name,
            value: SalesBalance.calculateTotal(client.id, os),
          });
        }
      }
    });

    const biggerValue = valuesArray.reduce((acc, val) => (val.value > acc.value ? val : acc));
    const minorValue = valuesArray.reduce((acc, val) => (val.value < acc.value ? val : acc));

    this.moreLessWrapper.querySelector(".bigger-name").innerHTML = `${biggerValue.name} - `;
    this.moreLessWrapper.querySelector(".bigger-value").innerHTML = monetaryMask(biggerValue.value);
    this.moreLessWrapper.querySelector(".minor-name").innerHTML = `${minorValue.name} - `;
    this.moreLessWrapper.querySelector(".minor-value").innerHTML = monetaryMask(minorValue.value);

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

import monetaryMask from "../helpers/monetaryMask";
import { fieldValidation } from "../client/form_validations";
import { handleCustomDate, turningMonthInNumber } from "../helpers/formatDate.js";
import ApiService from "../helpers/api_service.js";

/* eslint-disable operator-linebreak */
export default class MonthSales {
  constructor(form, salesWrapper, btnPrint, clients, url) {
    this.form = document.querySelector(form);
    this.salesWrapper = document.querySelector(salesWrapper);
    this.btnPrint = document.querySelector(btnPrint);
    this.clients = clients;
    this.url = url;

    this.article = document.createElement("article");
    this.article.classList.add("sales_report-container");

    this.printMonthSales = this.printMonthSales.bind(this);
    this.handleFormSales = this.handleFormSales.bind(this);

    this.errsType = ["valueMissing"];
    this.errsMsg = {
      clientSale: {
        valueMissing: "O campo do cliente não pode estar vazio.",
      },
      monthSale: {
        valueMissing: "O campo de mês não pode estar vazio.",
      },
      yearSale: {
        valueMissing: "O campo de ano não pode estar vazio.",
      },
    };
  }

  // Métodos de auxílio

  // Preenche o select com os clientes cadastrados
  fillSelect() {
    const select = this.form.elements.clientSale;
    this.clients.forEach((client) => {
      const option = `<option value="${client.name}">${client.name}</option>`;
      select.innerHTML += option;
    });
  }

  // Filtra a os baseado nos dados do formulário preenchido
  // buscando eles no localStorage
  async searchOs() {
    const { clientSale, monthSale, yearSale } = JSON.parse(localStorage.getItem("formData"));
    let objSales;

    if (clientSale && monthSale && yearSale) {
      const date = `${turningMonthInNumber(monthSale)}-${yearSale}`;
      const { id } = this.clients.find((client) => client.name === clientSale);
      const apiService = new ApiService(this.url);
      const { os } = await apiService.getMonthSales("os", date, id);
      console.log(os);
      if (os.length > 0) {
        objSales = {
          client: clientSale,
          notes: os,
          monthName: monthSale,
        };
        return objSales;
      }
      objSales = {
        missingMgs: `   
                <p class="font-os-s color-13">Nenhuma venda foi registrada neste mês para o cliente selecionado,
                verifique os dados que foram inseridos no formulário acima e tente novamente.
                </p>
              `,
      };
    }
    return objSales;
  }

  // Mostra os items das vendas mensais
  ifRightDate(notes) {
    let totalSales = 0;
    notes.forEach((os) => {
      const customMonth = handleCustomDate(os.date);
      const totalValue = os.budgetValue > 0 && os.budgetValue !== null ? os.budgetValue : os.total;
      const osTotal = monetaryMask(totalValue);
      const ul = document.createElement("ul");
      ul.classList.add("sales__report-item");
      ul.classList.add("font-os-m-b");
      ul.classList.add("color-13");
      ul.innerHTML += ` 
                      <li>${os.code}</li>
                      <li>${customMonth}</li>
                      <li>${osTotal}</li>
                      `;
      totalSales += totalValue;
      this.article.appendChild(ul);
    });
    this.article.innerHTML += `<div class="sales__report-total color-13 font-os-xl-b">
                          <p>Total:</p>
                          <p>${monetaryMask(totalSales)}</p>
                      </div>
                    `;
  }

  // Métodos de execução

  // captura os dados do form e envia para o localStorage
  static getData(e) {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const dataString = JSON.stringify(data);
    localStorage.clear();
    localStorage.setItem("formData", dataString);
  }

  // Renderiza a seção que exibe as vendas do mês e o total vendido
  async renderingMonthSales() {
    const os = await this.searchOs();
    const salesTitle = document.querySelector("[data-sale-title]");
    this.article.innerHTML = "";

    if (!Object.hasOwn(os, "missingMgs")) {
      salesTitle.innerHTML = `Valores vendidos no mês de ${os.monthName}`;
      this.btnPrint.style.display = "block";
      this.article.innerHTML += ` <h3 class="font-os-xl-b color-13">${os.client}</h3>`;
      this.ifRightDate(os.notes);
    } else {
      salesTitle.innerHTML = `ALGO ERRADO!!!`;
      this.article.innerHTML = os.missingMgs;
    }
    this.salesWrapper.insertBefore(this.article, this.btnPrint);
  }

  // lida com o evento do form
  handleFormSales(e) {
    e.preventDefault();
    MonthSales.getData(e);
    this.renderingMonthSales();
  }

  // Imprime as vendas do mês
  printMonthSales() {
    window.print();
    return this;
  }

  // Adiciona os eventos
  addEvents() {
    this.form.addEventListener("submit", (e) => this.handleFormSales(e));
    this.btnPrint.addEventListener("click", this.printMonthSales);

    this.form.querySelectorAll("[data-sale]").forEach((field) => {
      field.addEventListener("blur", (e) => {
        fieldValidation(e.target, this.errsMsg, this.errsType, ".msgError");
      });
    });
  }

  init() {
    if (this.form) {
      this.addEvents();
      this.fillSelect();
    }
    return this;
  }
}

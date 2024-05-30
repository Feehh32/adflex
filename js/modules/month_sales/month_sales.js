import monetaryMask from "../helpers/monetaryMask";
import { fieldValidation } from "../client/form_validations";

/* eslint-disable operator-linebreak */
export default class MonthSales {
  constructor(form, salesWrapper, btnPrint, clients, os) {
    this.form = document.querySelector(form);
    this.salesWrapper = document.querySelector(salesWrapper);
    this.btnPrint = document.querySelector(btnPrint);
    this.clients = clients;
    this.os = os;

    this.article = document.createElement("article");
    this.dataForm = [];
    this.filteredOs = [];
    this.total = null;

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

  // Filtra  a os baseado nos dos do formulário preenchido
  // buscando eles no localStorage
  filterOs() {
    const lsData = localStorage.getItem("formData");
    if (lsData) {
      this.dataForm = JSON.parse(lsData);
    }
    this.filteredOs = this.os.filter(
      (item) =>
        item.client.includes(this.dataForm.clientSale) &&
        item.date.includes(this.dataForm.monthSale.toLowerCase()) &&
        item.date.includes(this.dataForm.yearSale)
    );
  }

  // Define o que será mostrado na tela caso o a busca no formúlario
  // não tenha nenhuma correspondencia
  static ifWrongDate() {
    const contentScreen = `   
      <p class="font-os-s color-13">Nenhuma venda foi registrada neste mês para o cliente selecionado,
        verifique os dados que foram inseridos no formulário acima e tente novamente.
    </p>`;
    return contentScreen;
  }

  // Mostra os items das vendas mensais
  static ifRightDate(filteredOs) {
    let contentScreen = "";
    filteredOs.forEach((os) => {
      const osTotal = monetaryMask(os.total);
      contentScreen += ` 
          <ul class="sales__report-item font-os-m-b color-13">
            <li>${os.code}</li>
            <li>${os.date}</li>
            <li>${osTotal}</li>
          </ul>`;
    });
    return contentScreen;
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

  // Calcura o total das vendas do mês
  calculateTotal() {
    if (this.filteredOs.length) {
      this.filteredOs.forEach((os) => {
        this.total += os.total;
      });
    }
  }

  // Renderiza a seção que exiba as vendas do mês e o total vendido
  renderingMonthSales() {
    const salesTitle = document.querySelector("[data-sale-title]");
    this.article.innerHTML = "";
    this.article.classList.add("sales_report-container");

    if (!this.filteredOs.length) {
      const msg = MonthSales.ifWrongDate();
      this.btnPrint.style.display = "block";
      salesTitle.innerHTML = "";
      this.article.innerHTML = msg;
    } else {
      const titleContent = `Valores vendidos no mês de ${this.dataForm.monthSale}`;
      salesTitle.innerHTML = titleContent;
      this.btnPrint.style.display = "block";

      const salesTotal = monetaryMask(this.total);
      const salesContent = MonthSales.ifRightDate(this.filteredOs);

      this.article.innerHTML += ` <h3 class="font-os-xl-b color-13">${this.dataForm.clientSale}</h3>`;
      this.article.innerHTML += salesContent;
      this.article.innerHTML += `
            <div class="sales__report-total color-13 font-os-xl-b">
                <p>Total:</p>
                <p>${salesTotal}</p>
            </div>
           `;
    }
    this.salesWrapper.insertBefore(this.article, this.btnPrint);
  }

  // lida com o evento do form
  handleFormSales(e) {
    e.preventDefault();
    MonthSales.getData(e);
    this.filterOs();
    this.calculateTotal();
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

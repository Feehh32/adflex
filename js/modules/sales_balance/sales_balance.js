import ApiService from "../helpers/api_service.js";
import monetaryMask from "../helpers/monetaryMask.js";

export default class SalesBalance {
  constructor(url, clients, salesWrapper, balanceTitle, moreLessWrapper) {
    this.clients = clients;
    this.salesWrapper = document.querySelector(salesWrapper);
    this.url = url;
    this.moreLessWrapper = document.querySelector(moreLessWrapper);

    this.balanceTitle = document.querySelector(balanceTitle);
    this.article = document.createElement("article");
  }

  // Métodos de auxílio

  // Busca as notas de serviço no bando de dados baseado em um determinado mês e ano
  async searchOsByDate() {
    const apiService = new ApiService(this.url);
    const date = new Date();
    // const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    // Lembrar de colocar month ao inves de 02
    const monthYear = `02-${year}`;

    const { os } = await apiService.getByMonth("os", monthYear);
    return os;
  }

  // Se o array de serviço estiver vazio renderiza uma msg
  ifSalesArrayEmpty() {
    const msg = `<p class="font-os-l color-13">Nenhuma venda foi registrada neste mês.</p>`;
    this.article.innerHTML = msg;
  }

  // Se houver itens dentro do array de serviços renderiza os clientes e o total de suas vendas
  ifSalesArrayFull(month, os, date) {
    const innerTitle = `<h3 class="font-os-xl-b color-13">Balando do mês de ${month}</h3>`;
    this.article.innerHTML = innerTitle;
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

  // Métodos de execução

  // Renderiza na tela a exibição dos dados
  async renderingSalesBalance() {
    const os = await this.searchOsByDate();
    this.article.classList.add("sales_report-container");

    const date = new Date();
    const month = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(date);
    this.balanceTitle.innerHTML = `Ver balanço de vendas do mês ${month}`;

    if (os.length <= 0) {
      this.ifSalesArrayEmpty();
    } else {
      this.ifSalesArrayFull(month, os, date);
    }
    this.handleSalesMoreLess(os);
    this.salesWrapper.insertBefore(this.article, this.moreLessWrapper);
  }

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
  }

  init() {
    this.renderingSalesBalance();
    return this;
  }
}

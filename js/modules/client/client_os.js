import ApiService from "../helpers/api_service.js";
import { handleCustomDate } from "../helpers/formatDate.js";

/* eslint-disable operator-linebreak */
export default class ClientOs {
  constructor(osWrapper, osSearch, btnShowMore, btnShowLess, client, url) {
    this.osWrapper = document.querySelector(osWrapper);
    this.fieldSearch = document.querySelector(osSearch);
    this.btnShowMore = document.querySelector(btnShowMore);
    this.btnShowLess = document.querySelector(btnShowLess);
    this.client = client;
    this.url = url;

    this.filteredOs = [];
    this.osBoxSize = 10;

    this.handleSearch = this.handleSearch.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleShowLess = this.handleShowLess.bind(this);
  }

  // Métodos de auxílio

  // Filtra as ordens de serviço baseado no cliente
  async filterOsPerCLient() {
    if (this.client) {
      const apiServices = new ApiService(this.url);
      const { os } = await apiServices.getWithId("os/by-id", this.client.id);
      return os;
    }
    return [];
  }

  //  Métodos de exibição
  // Mostras as notas de serviço na tela em ordem de inserção
  showOsOnPage() {
    const revFilteredOs = [...this.filteredOs].reverse().slice(0, this.osBoxSize);
    this.osWrapper.innerHTML = "";

    revFilteredOs.forEach((os) => {
      const customDate = handleCustomDate(os.date);
      const li = document.createElement("li");
      const htmlOs = ` 
                        <a href="./os_page.html?id=${os.id}">
                            <span>
                                <img src="../img/icones/os-icon-gray.svg" width="24" height="24"
                                alt="icone de uma ordem de serviço">
                                ${os.code}
                                </span>
                            <p>${customDate}</p>
                        </a>`;
      li.innerHTML = htmlOs;
      this.osWrapper.appendChild(li);
    });
  }

  // mostras as opções de mostras mais e monstrar menos
  showOsBoxSizeBtn() {
    if (this.filteredOs.length > this.osBoxSize) {
      this.btnShowMore.classList.add("active");
    }
  }

  // Atualiza os dados da classe após receber os resultados assíncronos
  async loadOsData() {
    this.filteredOs = await this.filterOsPerCLient();
    this.showOsOnPage();
    this.showOsBoxSizeBtn();
    console.log(this.filteredOs);
  }

  // Métodos de execução
  // lida com o campo de busca para as notas de serviço
  handleSearch() {
    const searchValue = this.fieldSearch.value.toLowerCase();
    const foundOs = this.filteredOs.filter(
      (os) =>
        os.client.toLowerCase().includes(searchValue) ||
        os.date.includes(searchValue) ||
        os.code.includes(searchValue)
    );
    this.showOsOnPage(foundOs);
    return foundOs;
  }

  // lida com o botão de mostrar mais, exibindo
  // todas as notas de serviço cadastradas
  handleShowMore() {
    this.osBoxSize = this.filteredOs.length;
    this.showOsOnPage(this.filteredOs);
    this.btnShowLess.classList.add("active");
    this.btnShowMore.classList.remove("active");
  }

  // Retorna o padrão de 10 notas de serviços mostradas
  handleShowLess() {
    this.osBoxSize = 10;
    this.showOsOnPage(this.filteredOs);
    this.btnShowLess.classList.remove("active");
    this.btnShowMore.classList.add("active");
  }

  // Adiciona os eventos
  addEvents() {
    this.fieldSearch.addEventListener("input", this.handleSearch);
    this.btnShowLess.addEventListener("click", this.handleShowLess);
    this.btnShowMore.addEventListener("click", this.handleShowMore);
  }

  removeEvents() {
    this.fieldSearch.removeEventListener("input", this.handleSearch);
    this.btnShowLess.removeEventListener("click", this.handleShowLess);
    this.btnShowMore.removeEventListener("click", this.handleShowMore);
  }

  async init() {
    if (this.osWrapper) {
      await this.loadOsData();
      this.showOsBoxSizeBtn();
      this.addEvents();
      this.showOsOnPage(this.filteredOs);
    }
    return this;
  }
}

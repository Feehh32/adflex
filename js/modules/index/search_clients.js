import eventEmitter from "../helpers/event_emitter.js";

export default class SearchClient {
  constructor(fieldSearch, searchBtn, sugContainer, mainClientsWrapper, clients) {
    this.fieldSearch = document.querySelector(fieldSearch);
    this.searchBtn = document.querySelector(searchBtn);
    this.sugContainer = document.querySelector(sugContainer);
    this.mainClientsWrapper = document.querySelector(mainClientsWrapper);
    this.clients = clients;

    this.msgWarning = {
      mainMessage: "Cliente não encontrado",
      firstAdvice: "Verifique se o cliente que está buscando ja foi anteriormente cadastrado.",
      secondAdvice: "Verifique a ortografia do que foi digitado.",
      thirdAdvice: "Tente novamente com outros termos.",
    };
    this.events = ["input", "keydown"];

    this.showClientOnTheSearch = this.showClientOnTheSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyNavigation = this.handleKeyNavigation.bind(this);
    this.checkingIfEnterKey = this.checkingIfEnterKey.bind(this);
  }

  // Métodos auxiliares

  // filtro que compara a lista de clientes com o
  // resultado do campo de busca

  filterClients() {
    const searchValue = this.fieldSearch.value.toLowerCase();
    const foundClient = this.clients.filter(
      (client) => client.name.toLowerCase().includes(searchValue)
      // eslint-disable-next-line function-paren-newline
    );
    return foundClient;
  }

  // Quando a pesquisa não resulta em um resultado válido
  // essa função renderiza uma mensagem de aviso ao usuário
  showWarningList() {
    const mainClientsWrapper = document.querySelector("[data-wrapper]");
    const listwarnings = document.createElement("ul");
    listwarnings.classList.add("list-warnings");
    const searchWarnings = `<li class="font-r-l-b color-4"> ${this.msgWarning.mainMessage}</li>
                            <li class="font-r-m color-6"> ${this.msgWarning.firstAdvice}</li>
                            <li class="font-r-m color-6"> ${this.msgWarning.secondAdvice}</li>
                            <li class="font-r-m color-6"> ${this.msgWarning.thirdAdvice}</li>`;
    listwarnings.innerHTML = searchWarnings;
    mainClientsWrapper.innerHTML = "";
    mainClientsWrapper.appendChild(listwarnings);
  }

  // Método que exibe as sugestões no campo de busca enquanto o usuário digita
  showClientOnTheSearch() {
    const inputValue = this.fieldSearch.value.trim();
    const filteredClients = inputValue ? this.filterClients(inputValue) : [];

    this.sugContainer.innerHTML = "";
    this.sugContainer.classList.remove("input-search-suggestions");

    if (inputValue.length) {
      filteredClients.forEach((client) => {
        this.sugContainer.classList.add("input-search-suggestions");
        this.sugContainer.innerHTML += `<a href="./client.html?id=${client.id}" class="font-r-m color-0 suggestion-item">${client.name}</a>`;
      });
    }
  }

  // Método que verifica se a tecla enter é pressionada
  checkingIfEnterKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      window.location.href = this.href;
    }
  }

  // Métodos de execução

  // Método que lida com a execução da função de busca
  handleSearch() {
    const filteredClients = this.filterClients();
    if (filteredClients.length <= 0) {
      this.showWarningList();
    } else {
      filteredClients.forEach((client) => {
        if (client.name.toLowerCase() === this.fieldSearch.value.toLowerCase()) {
          window.location.href = `./client.html?id=${client.id}`;
          this.removeEvents();
        } else {
          this.showWarningList();
        }
      });
    }
  }

  // Método que adiciona as ações de navegação por teclado
  // às sugestões de busca
  handleKeyNavigation(e) {
    const suggestions = [...this.sugContainer.querySelectorAll(".suggestion-item")];
    let currentIndex = suggestions.findIndex((item) => item === document.activeElement);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (currentIndex < suggestions.length - 1) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        suggestions[currentIndex].focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = 0;
        }
        suggestions[currentIndex].focus();
        break;
      case "Enter":
        if (currentIndex !== -1) {
          window.location.href = suggestions[currentIndex].href;
          console.log(window.location.href);
        }
        break;
      default:
        break;
    }
    this.removeEvents();
  }

  // Adiciona os eventos do botao de busca ao campo de busca e
  // os eventos de navegação por teclado às sugestões da busca
  addEvents() {
    this.events.forEach((userEvent) => {
      this.fieldSearch.addEventListener(userEvent, (e) => {
        // quando o campo de busca estiver vazio o evento de input
        // ira a acionar a função que esta no emitidor de eventos
        if (e.target.value === "") {
          eventEmitter.emit("clearSearch");
        }
        if (e.key === "Enter") {
          e.preventDefault();
          this.handleSearch();
        }
        this.showClientOnTheSearch();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
        this.handleKeyNavigation(e);
      }
    });

    this.sugContainer.querySelectorAll(".suggestion-item").forEach((item) => {
      item.addEventListener("keydown", this.checkingIfEnterKey);
    });

    this.searchBtn.addEventListener("click", this.handleSearch);
  }

  removeEvents() {
    this.events.forEach((userEvent) => {
      this.fieldSearch.removeEventListener(userEvent, this.handleSearch);
    });

    document.removeEventListener("keydown", this.handleKeyNavigation);

    this.sugContainer.querySelectorAll(".suggestion-item").forEach((item) => {
      item.removeEventListener("keydown", this.checkingIfEnterKey);
    });

    this.searchBtn.removeEventListener("click", this.handleSearch);
  }

  init() {
    if (this.fieldSearch) {
      this.addEvents();
    }
    return this;
  }
}

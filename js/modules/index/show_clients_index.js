import eventEmitter from "../helpers/event_emitter.js";

export default class ShowClientsIndex {
  constructor(clientsWrapper, clients, os) {
    this.clientsWrapper = document.querySelector(clientsWrapper);
    this.clients = clients;
    this.os = os;
    // adiciona uma função ao emitidor de eventos que deve
    // ser cumprida quando a condição for atingida
    eventEmitter.on("clearSearch", () => {
      this.clientsWrapper.innerHTML = "";
      this.showClients();
    });
  }

  // Método que filtra as ordens de serviço baseando-se no nome
  // do cliente
  filterOs(client) {
    const osAmount = this.os.filter((os) => os.client_id === client.id);
    return osAmount;
  }

  // Método que renderiza na tela o card com as informações do cliente
  showClients() {
    this.clients.forEach((client) => {
      const clientCard = document.createElement("a");
      const osAmount = this.filterOs(client);

      clientCard.classList.add("main__clients-card");
      clientCard.href = `./client.html?id=${client.id}`;

      clientCard.innerHTML = `
                              <h3 class="font-os-xl-b color-1">${client.name}</h3>
                              <p class="font-os-m color-2">Ordens de serviço: <span class="font-os-m color-2 clients__card-client-number">${osAmount.length}</span></p>
                              `;
      this.clientsWrapper.appendChild(clientCard);
    });
  }

  // Método que inicia a classe
  init() {
    if (this.clientsWrapper) {
      this.showClients();
    }
    return this;
  }
}

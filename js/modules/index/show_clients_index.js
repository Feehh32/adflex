import eventEmitter from "../helpers/event_emitter.js";
import ApiService from "../helpers/api_service.js";

export default class ShowClientsIndex {
  constructor(clientsWrapper, clients, url) {
    this.clientsWrapper = document.querySelector(clientsWrapper);
    this.clients = clients;
    this.url = url;

    this.os = [];
    // adiciona uma função ao emitidor de eventos que deve
    // ser cumprida quando a condição for atingida
    eventEmitter.on("clearSearch", () => {
      this.clientsWrapper.innerHTML = "";
      this.showClients();
    });
  }

  // Método que retorna o total de os registradas para cada cliente
  async osAmountByClient() {
    const apiService = new ApiService(this.url);
    const { osAmount } = await apiService.get("os/amount");

    return osAmount;
  }

  // Método que renderiza na tela o card com as informações do cliente
  async showClients() {
    const osAmount = await this.osAmountByClient();

    osAmount.forEach(async (os) => {
      const clientCard = document.createElement("a");

      clientCard.classList.add("main__clients-card");
      clientCard.href = `./client.html?id=${os.client_id}`;

      clientCard.innerHTML = `
                              <h3 class="font-os-xl-b color-1">${os.client_name}</h3>
                              <p class="font-os-m color-2">Ordens de serviço: <span class="font-os-m color-2 clients__card-client-number">${os.amount_os}</span></p>
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

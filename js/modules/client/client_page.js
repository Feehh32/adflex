import ApiService from "../helpers/api_service.js";
import eventEmitter from "../helpers/event_emitter.js";

export default class ClientPage {
  constructor(clientName, infoClientWrapper, btnDelete, btnEmail, clients, url) {
    this.clientName = document.querySelector(clientName);
    this.btnDelete = document.querySelector(btnDelete);
    this.btnEmail = document.querySelector(btnEmail);
    this.infoClientWrapper = document.querySelector(infoClientWrapper);
    this.url = url;

    this.clientUrlId = ClientPage.getClientFromId();
    this.client = clients.find((client) => client.id === +this.clientUrlId);
    this.msgWrapper = document.createElement("span");

    this.deleteClient = this.deleteClient.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  // métodos de auxilio
  // Captura o id do cliente pela url
  static getClientFromId() {
    const paramsUrl = new URLSearchParams(window.location.search);
    const clientId = paramsUrl.get("id");
    return clientId;
  }

  // escapa carcteres especiais em uma string para suas respectivas entidades HTML
  static escapeHTML(str) {
    return str.replace(
      /[&<>"']/g,
      (match) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[match])
    );
  }

  // Gera um HTML seguro evitando ataques de injeção de código ou
  // problemas de renderização
  generateSafeHTML(client) {
    if (!this.clientUrlId) {
      const htmlContent = `
                        <li class="font-r-s color-3">email 1: <a class="font-r-m-b color-1"
                            href="mailto:""></a></li>
                        <li class="font-r-s color-3">email 2: <a class="font-r-m-b color-1"
                            href="mailto"></a></li>
                        <li class="font-r-s color-3">telefone 1:
                            <a class="font-r-m-b color-1" href=""></a>
                        </li>
                        <li class="font-r-s color-3">telefone 2: <a class="font-r-m-b color-1"
                            href="tel:"></a></li>
                        <li class="font-r-s color-3">Cálculo de cobrança: <span class="font-r-m-b color-1"></span></li>
                        `;
      return htmlContent;
    }
    const escapedEmail1 = ClientPage.escapeHTML(client.email1);
    const escapedEmail2 = ClientPage.escapeHTML(client.email2);
    const escapedTel1 = ClientPage.escapeHTML(client.tel1);
    const escapedTel2 = ClientPage.escapeHTML(client.tel2);
    const escapedCharge = ClientPage.escapeHTML(client.charge);

    const htmlContent = `
          <li class="font-r-s color-3">email 1: <a class="font-r-m-b color-1"
            href="mailto:${escapedEmail1}">${escapedEmail1}</a></li>
          <li class="font-r-s color-3">email 2: <a class="font-r-m-b color-1"
            href="mailto:${escapedEmail2}">${escapedEmail2}</a></li>
          <li class="font-r-s color-3">telefone 1:
              <a class="font-r-m-b color-1" href="tel:+55
              ${escapedTel1}
              ">${escapedTel1}</a>
          </li>
          <li class="font-r-s color-3">telefone 2: <a class="font-r-m-b color-1"
              href="tel:${escapedTel2 ? +55 : ""}${escapedTel2}">
              ${escapedTel2}</a></li>
          <li class="font-r-s color-3">Cálculo de cobrança: <span class="font-r-m-b color-1">
              ${escapedCharge}
              </span></li>
          `;
    return htmlContent;
  }

  // métodos de exibição
  // Mostra o nome do cliente no título principal da página
  showClientName() {
    if (!this.clientUrlId) {
      this.clientName.innerHTML = "Cliente";
    } else {
      this.clientName.innerHTML = this.client.name;
    }
  }

  // Mostra as informações do cliente na página
  showClientInfo() {
    this.infoClientWrapper.innerHTML = this.generateSafeHTML(this.client);
  }

  // Cria e exibe uma mensagem de confirmação após o cliente ser deletado
  // eslint-disable-next-line class-methods-use-this
  showMsg(msg, className) {
    const container = document.querySelector('[data-grid="client"]');
    this.msgWrapper.classList.add(className);
    this.msgWrapper.innerHTML = `<p class="font-r-l-b">${msg}</p>`;
    this.msgWrapper.style.display = "block";
    container.appendChild(this.msgWrapper);
  }

  // Remove a mensagem de confirmação de deleção
  removeMsg() {
    this.msgWrapper.style.display = "none";
  }

  // métodos de ação ou gerais

  // constroi e envia o email para o back end com uma requisição POST
  async sendEmail() {
    const apiServices = new ApiService(this.url);
    const formData = {
      to: this.client.email1,
      subject: "Cadastro de Nota Fiscal",
      text: `Segue em anexo os dados para o cadastro da nota fiscal.`,
      html: `<p>Segue em anexo os dados para o cadastro da nota fiscal.</p>
      <br/><p>Ademir Xavier Joazeiro</p>`,
    };
    apiServices.post("send_email", formData);
    eventEmitter.on("sucessMsg", async () => {
      this.showMsg(`Email enviado com sucesso!`, "sucessMsg");
      setTimeout(() => {
        this.removeMsg();
      }, 2000);
    });
    eventEmitter.on("failedMsg", async () => {
      this.showMsg(`Falha ao enviar o email!`, "failedMsg");
      setTimeout(() => {
        this.removeMsg();
      }, 2000);
    });
  }

  // Insere o link para as ações de nova os e editar o cliente
  insertLink() {
    const newOsHref = document.querySelector('[data-action="nova-os"]');
    const editClientHref = document.querySelector('[data-action="edit-client"]');
    if (this.client) {
      const name = encodeURIComponent(this.client.name);
      const id = encodeURIComponent(this.client.id);
      editClientHref.setAttribute("href", `./form_client.html?name=${name}&id=${id}`);
      newOsHref.setAttribute("href", `./form_os.html?name=${name}`);
    } else {
      editClientHref.href = ("href", `./form_client.html`);
      newOsHref.setAttribute("href", `./form_os.html`);
    }
  }

  // deleta o cliente
  deleteClient() {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const confirmation = window.confirm(
      `Você tem certeza que deseja excluir ${this.client.name}. Lembre-se que as ordens de serviço também serão excluidas.`
    );

    if (confirmation) {
      const apiService = new ApiService(this.url, this.client.id);
      apiService.delete("clients");

      eventEmitter.on("sucessMsg", async () => {
        this.showMsg(`Cliente deletado com sucesso!`, "sucessMsg");
        this.btnDelete.removeEventListener("click", this.deleteClient);
        window.location.href = `./index.html`;
      });
      eventEmitter.on("failedMsg", async () => {
        this.showMsg(
          `Houve um problema e o cliente não pode ser deletado, tente novamente mais tarde!`,
          "failedMsg"
        );
        setTimeout(() => {
          this.removeMsg();
        }, 2000);
      });
    }
  }

  // Adiciona os eventos da página
  addEventOnDelete() {
    this.btnDelete.addEventListener("click", this.deleteClient);
  }

  addEventOnSendEmail() {
    this.btnEmail.addEventListener("click", this.sendEmail);
  }

  init() {
    if (this.client && this.infoClientWrapper) {
      this.addEventOnDelete();
      this.addEventOnSendEmail();
      this.insertLink();
      this.showClientName();
      this.showClientInfo();
    }
    return this;
  }
}

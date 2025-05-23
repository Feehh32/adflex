import ApiService from "../helpers/api_service.js";
import eventEmitter from "../helpers/event_emitter.js";
import monetaryMask from "../helpers/monetaryMask.js";
import { handleCustomDate } from "../helpers/formatDate.js";
import confirmModal from "../helpers/confirm_modal.js";
import { fieldValidation } from "../client/form_validations.js";

export default class OsPage {
  constructor(titleCode, osWrapper, btn, url) {
    this.url = url;
    this.titleCode = document.querySelector(titleCode);
    this.osWrapper = document.querySelector(osWrapper);
    this.btn = document.querySelectorAll(btn);

    this.os = null;
    this.urlId = null;
    this.msgWrapper = document.createElement("span");

    this.deleteOs = this.deleteOs.bind(this);
    this.printServiceOrder = this.printServiceOrder.bind(this);
    this.editData = this.editData.bind(this);
  }

  // Métodos de auxílio
  // Método que captura o id da os com base na url
  static getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get("id");
    return clientId;
  }

  // Filtra o array de os's baseado no id fornecido na url
  async searchOsById() {
    this.urlId = OsPage.getIdFromUrl();
    const apiServices = new ApiService(this.url);
    const { os } = await apiServices.getParameters("os/byOs-id", this.urlId);
    return os[0];
  }

  // Lida com a opção de esconder ou mostrar as medidas da os
  handleMeasure(element) {
    let showMeasure = "";
    if (this.os.hideMeasure === "nao") {
      showMeasure = `${element.height} / ${element.width}`;
    } else {
      showMeasure = ``;
    }
    return showMeasure;
  }

  // Busca as notas de serviço que são específicas para a OS em questão
  async filterService() {
    try {
      const apiServices = new ApiService(this.url);
      const service = await apiServices
        .getParameters("service_details", String(this.os.id))
        .then((data) => data.data);
      const filteredService = service.filter((item) => item.note_id === this.os.id);
      return filteredService;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  // Exibe os serviços na ordem de serviço
  async showServiceValues(serviceContainer) {
    const serviceValues = document.querySelector(serviceContainer);
    serviceValues.innerHTML = "";
    const filteredService = await this.filterService();

    filteredService.forEach((element) => {
      const serviceValue = this.os.budgetValue ? "" : monetaryMask(element.serviceValue);
      const measures = this.handleMeasure(element);
      serviceValues.innerHTML += `
            <ul class="content__values font-os-s-b">
                <li>${element.serviceAmount}</li>
                <li>${measures}</li>
                <li>${element.serviceName}</li>
                <li>${serviceValue}</li>
            </ul>
          `;
    });
  }

  // Exibe uma mensagem de erro caso a ordem de serviço não seja deletada
  showDeleteMsg(msg, className) {
    const container = document.querySelector(".main__os");
    this.msgWrapper.classList.add(className);
    this.msgWrapper.innerHTML = msg;
    this.msgWrapper.style.display = "block";
    container.appendChild(this.msgWrapper);
  }

  // Remove a mensagem de erro
  removeDeleteMsg() {
    this.msgWrapper.style.display = "none";
  }

  // Métodos de execução

  // Exibe o código da ordem de serviço no título da página
  osCodeOnTitle() {
    if (this.os) {
      this.titleCode.innerText = this.os.code;
    } else {
      this.titleCode.innerText = "";
    }
  }

  // Cria e exibe o HTML da ordem de serviço
  showOsOnScreen() {
    if (this.os) {
      const customDate = handleCustomDate(this.os.date);
      const total = monetaryMask(
        this.os.budgetValue === 0 || this.os.budgetValue === null
          ? this.os.total
          : this.os.budgetValue
      );
      const osContent = `
      <div class="os__header">
      <div class="os__logo--container">
          <img class="os__logo" src="../img/icones/logo-os.svg" width="110" height="110"
              alt="Logo da ordem de serviço">
      </div>
      <h2 class="os__title font-os-xl-b">Ordem de serviço</h2>
      <span class="os__code font-os-l-b">O.S: ${this.os.code}</span>
      <p class="os__email font-os-s-b color-11">adm.xavier@hotmail.com</p>
      <p class="os__tel font-os-s-b color-11">(11) 94285-8422</p>
      <p class="os__adress font-os-s-b color-11">Rua Aurora paulistana, 252-A Freguesia do Ó - São Paulo - SP - Cep: 02965-030</p>
      </div>
      <div class="os__client position__os">
      <div>
          <span class="font-os-xxs">Cliente:</span>
          <p class="font-os-s-b">${this.os.client}</p>
      </div>
      <p class="font-os-s-b" id="os-date">${customDate}</p>
      </div>
      <div class="os__thickness position__os">
      <span class="font-os-xxs color-11">Espessura:</span>
      <p class="font-os-s-b">${this.os.thickness}</p>
      </div>
      <div class="os__itens">
        <p class="font-os-s-b ">Quant.</p>
        <p class="font-os-s-b ">Medidas</p>
        <p class="font-os-s-b ">Serviços</p>
        <p class="font-os-s-b ">Total</p>
      </div>
      <div class="os__content" data-serviceValues>
      </div>
      <div class="os__payment">
      <p class="font-os-m">Valor total do pedido:</p>
      <p class="font-os-m-b">${total}</p>
      </div>
      <div class="os__signature">
      <p class="font-os-xs">Visto:</p>
      </div>
  `;
      this.osWrapper.innerHTML = osContent;
      this.showServiceValues("[data-serviceValues]");
    } else {
      this.titleCode.parentElement.innerHTML = "";
      this.osWrapper.style.backgroundColor = "transparent";
      this.osWrapper.style.boxShadow = "none";
      this.osWrapper.innerHTML = `<p class="font-r-xl color-3 msgOsDeleted">Sua nota de serviço foi excluida com sucesso!</p>
  <a href=index.html class="font-r-m-b color-prim1 linkOsDeleted">voltar para a página principal</a>`;
      this.btn.forEach((btn) => {
        btn.style.display = "none";
      });
    }
  }

  // Imprime a ordem de serviço
  printServiceOrder() {
    if (this.os) {
      window.print();
    }
  }

  // Editar o campo de data
  async editData() {
    const input = document.createElement("input");
    input.pattern = "^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-[0-9]{4}$";
    input.placeholder = "dd-mm-aaaa";
    input.classList.add("input-pattern");

    const wrapper = document.createElement("div");
    wrapper.appendChild(input);

    const userConfirm = await confirmModal(
      "Insira a data no campo abaixo e clique em confirmar, lembre se que o formato precisar ser dd-mm-aaaa",
      wrapper
    );

    if (this.os) {
      if (userConfirm) {
        const newDate = { date: `${input.value}-00-00-00` };
        const apiServices = new ApiService(this.url, this.os.id);
        const response = await apiServices.put("os", newDate);

        if (response && response.updatedNote) {
          this.os = response.updatedNote;
          this.osCodeOnTitle();
          this.showOsOnScreen();
        }
      }
    }
  }

  // Deleta a ordem de serviço
  async deleteOs() {
    const userConfirm = await confirmModal(
      "Você tem certeza que deseja deletar essa ordem de serviço? Você não poderá recupera-lá depois."
    );

    if (this.os) {
      if (userConfirm) {
        const apiServices = new ApiService(this.url, this.os.id);
        try {
          const response = await apiServices.delete("os");
          if (response && response.clientId) {
            this.os = null;
            this.showOsOnScreen();
            this.btn[1].disabled = "true";
            setTimeout(() => {
              window.location.href = `./client.html?id=${encodeURIComponent(response.clientId)}`;
            }, 500);
          }
        } catch (err) {
          console.error("Erro ao deletar a os:", err);
          eventEmitter.on("failedMsg", async () => {
            this.showDeleteMsg(
              `<p class="font-r-l-b">Houve um problema e a os não pode ser deletada, tente novamente mais tarde!</p>`,
              "failedMsg"
            );
            setTimeout(() => {
              this.removeDeleteMsg();
            }, 2000);
          });
        }
      }
    }
  }

  // Adiciona os eventos aos botões da página
  addEventsOnButton() {
    this.btn.forEach((btn) => {
      if (btn.innerText === "EXCLUIR") {
        btn.addEventListener("click", this.deleteOs);
      }
      if (btn.innerText === "IMPRIMIR") {
        btn.addEventListener("click", this.printServiceOrder);
      }
      if (btn.innerText === "EDITAR DATA") {
        btn.addEventListener("click", this.editData);
      }
    });
  }

  async init() {
    if (this.btn.length) {
      this.os = await this.searchOsById();
      this.osCodeOnTitle();
      this.showOsOnScreen();
      this.addEventsOnButton();
    }
    return this;
  }
}

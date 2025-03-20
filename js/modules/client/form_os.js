/* eslint-disable no-restricted-syntax */
import { fieldValidation, showMessage } from "./form_validations.js";
import ApiService from "../helpers/api_service.js";

export default class FormOs {
  constructor(form, btnServAmount, services, clients, os, url) {
    this.form = document.querySelector(form);
    this.btnServAmount = document.querySelector(btnServAmount);
    this.services = document.querySelectorAll(services);
    this.clients = clients;
    this.os = os;
    this.url = url;
    this.hiddenMeasure = true;
    this.serviceValues = [];
    this.currentDate = FormOs.getCurrentDate();

    this.counter = 0;
    this.errsType = ["valueMissing", "typeMismatch", "tooShort", "patternMismatch"];
    this.errsMsg = {
      client: {
        valueMissing: "O campo de nome do cliente não pode estar vazio.",
      },
      serviceName: {
        valueMissing: "O campo de nome do serviço não pode estar vazio.",
        tooShort: "Por favor, preencha um nome válido.",
      },
      serviceAmount: {
        valueMissing: "O campo de quantidade não pode estar vazio.",
      },
      width: {
        valueMissing: "O campo de largura não pode estar vazio.",
        patternMismatch: "Por favor insira as medidas apenas com números e pontos. Ex:2.5",
      },
      height: {
        valueMissing: "O campo de altura não pode estar vazio.",
        patternMismatch: "Por favor insira as medidas apenas com números e pontos. Ex:2.5",
      },
      servicePrice: {
        patternMismatch:
          "Por favor insira os valores apenas com números e pontos, sendo os pontos apenas para casas decimais. Ex: 2.50.",
      },
    };

    this.handleServiceAmount = this.handleServiceAmount.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  // Métodos de auxílio

  // Método que preenche o campo de nome dos cliente
  fillSelect() {
    const select = document.querySelector("[data-select]");
    this.clients.forEach((client) => {
      const option = `<option value="${client.name}">${client.name}</option>`;
      select.innerHTML += option;
    });
  }

  // Método que preenche o campo de nome do cliente
  // automaticamente caso o nome do cliente esteja na url
  fillSelectByUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const clientNameByUrl = urlParams.get("name");
    const option = `<option value="${clientNameByUrl}">${clientNameByUrl}</option>`;
    const selectField = this.form.elements[1];
    selectField.innerHTML = option;
  }

  // Método que adiciona as mensagens de erro nos campos
  // do formulário
  addMsgErrosOnForm() {
    this.services = document.querySelectorAll("[data-serviceItem]");
    this.services.forEach((serviceField) => {
      serviceField.removeEventListener(
        "blur",
        (e) => fieldValidation(e.target, this.errsMsg, this.errsType, ".msgError")
        // eslint-disable-next-line function-paren-newline
      );
      serviceField.addEventListener(
        "blur",
        (e) => fieldValidation(e.target, this.errsMsg, this.errsType, ".msgError")
        // eslint-disable-next-line function-paren-newline
      );
    });
  }

  // Lida com os acréscimos do campos de serviço
  handleServiceAmount() {
    this.counter++;
    const newService = document.createElement("div");
    const serviceWrapper = document.querySelector("[data-service]");
    newService.classList.add("service");
    newService.innerHTML += `
    <fieldset>
        <label class="font-p-s-b" for="serviceName${this.counter}">Nome do serviço</label>
        <input class="input-pattern" type="text" name="serviceName" id="serviceName${this.counter}" data-serviceItem>
        <span class="msgError"></span>
    </fieldset>
    <fieldset>
        <label class="font-p-s-b" for="serviceAmount${this.counter}">Quantidade de peças</label>
        <input class="input-pattern" type="number" name="serviceAmount" id="serviceAmount${this.counter}"
            data-serviceItem>
        <span class="msgError"></span>
    </fieldset>
    <div class="service__measure">
        <label class="font-p-s-b" for="measures${this.counter}">Medidas</label>
        <fieldset id="measures${this.counter}" class="measure__container">
            <div>
                <input class="input-pattern inputWidth" type="text" id="width${this.counter}" name="width"
                     data-serviceItem placeholder="Largura">
                <span class="msgError"></span>
            </div>
            <div>
                <input class="input-pattern inputHeight" type="text" id="height${this.counter}" name="height"
                   data-serviceItem placeholder="Altura">
                <span class="msgError"></span>
            </div>
        </fieldset>
    </div>
    <fieldset>
        <label class="font-p-s-b" for="servicePrice${this.counter}">Valor do orçamento</label>
        <input class="input-pattern" type="text" name="servicePrice" id="servicePrice${this.counter}"   placeholder="Ex: 2500.50" title="Apenas adicione algum valor aqui se houver um orçamento prévio com algum valor definido."
          data-serviceItem data-budget pattern="^\\d+(\\.\\d{1,2})?$">
        <span class="msgError"></span>
    </fieldset>
    <fieldset class="hideMeasures__Wrapper">
      <input type="checkbox" name="hideMeasures" value="sim" id="hiddenMeasures" data-serviceItem>
      <label for="hiddenMeasures" class="font-r-m-b">Mostrar medidas na os</label>
      <span class="msgError"></span>
    </fieldset>
  `;
    serviceWrapper.appendChild(newService);
    this.addMsgErrosOnForm();
  }

  // Método que faz o cálculo total da nota de serviço
  getChargeTotal(formObj) {
    const clientCharge = this.clients.find((client) => client.name === formObj.client);
    for (const service of formObj.service) {
      const serviceWidth = service.width;
      const serviceHeight = service.height;
      const { serviceAmount } = service;

      service.serviceValue = serviceWidth * serviceHeight * clientCharge.charge * serviceAmount;

      formObj.total += service.serviceValue;
    }
  }

  // Método que decide se as medidas irão aparecer na nota de serviço
  getHiddenMeasure() {
    this.hiddenMeasure = document.querySelector("#hiddenMeasures").checked ? "nao" : "sim";
    return this.hiddenMeasure;
  }

  // Método que cria a data da nota de serviço
  static getCurrentDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, 0);
    const day = String(currentDate.getDate()).padStart(2, 0);
    const hour = String(currentDate.getHours()).padStart(2, 0);
    const minutes = String(currentDate.getMinutes()).padStart(2, 0);
    const seconds = String(currentDate.getSeconds()).padStart(2, 0);

    return `${day}-${month}-${year}-${hour}-${minutes}-${seconds}`;
  }

  // Método que encontra a última os adicionada
  async findLastOs(clientName) {
    const apiService = new ApiService(this.url);
    const { os } = await apiService.getParameters("os/by-clientName", clientName);
    if (!os) return null;
    return os;
  }

  // Método que compara as datas da os a ser inserida com a última os retornada
  static comparingDate(currentDate, lastOsDate) {
    if (lastOsDate) {
      // eslint-disable-next-line no-unused-vars
      const [, cMonth, cYear] = currentDate.split("-");
      // eslint-disable-next-line no-unused-vars
      const [, lOsMonth, lOsYear] = lastOsDate.split("-");

      return cMonth === lOsMonth && cYear === lOsYear;
    }

    return null;
  }

  // Método que cria o codigo de controle da os
  async getOsCode(date, clientName) {
    const lastOs = await this.findLastOs(clientName);
    if (lastOs !== null && date && FormOs.comparingDate(date, lastOs.date)) {
      return String(Number(lastOs.code) + 1).padStart(3, 0);
    }
    return "1".padStart(3, 0);
  }

  // Métodos de execução

  // Método que cria um array com os objetos de serviços que
  // preencherão a nota de serviço
  handleServiceValues(e) {
    const servicesList = document.querySelector(".service__wrapper");
    for (let i = 0; i < servicesList.children.length; i++) {
      const serviceName = e.target.elements[`serviceName${i}`].value;
      const serviceAmount = parseFloat(e.target.elements[`serviceAmount${i}`].value);
      const width = parseFloat(e.target.elements[`width${i}`].value);
      const height = parseFloat(e.target.elements[`height${i}`].value);

      if (serviceName && serviceAmount && width >= 0 && height >= 0) {
        const serviceObj = {
          serviceName,
          serviceAmount,
          width,
          height,
        };
        this.serviceValues.push(serviceObj);
      }
    }
    return this.serviceValues;
  }

  // Método que lida com o valor de orçamento no form

  static handleBudgetValue() {
    const budget = document.querySelector("[data-budget]");

    if (budget.value) return +budget.value;
    return null;
  }

  // Método que lida com a requisição da nota de serviço
  async handleRegister(e) {
    e.preventDefault();
    const btnAdd = document.querySelector(".btn_form--add");
    btnAdd.disabled = "true";
    btnAdd.innerText = "...Enviando";
    const apiServices = new ApiService(this.url);
    const clientName = e.target.elements.client.value;
    const formObj = {
      client: clientName,
      hideMeasure: this.getHiddenMeasure(),
      thickness: e.target.elements.thickness.value,
      service: this.handleServiceValues(e),
      date: this.currentDate,
      total: 0,
      code: await this.getOsCode(this.currentDate, clientName),
      budgetValue: FormOs.handleBudgetValue(),
    };

    if (!formObj.budgetValue > 0) this.getChargeTotal(formObj);

    try {
      const { noteId } = await apiServices.post("os", { os: formObj });
      if (noteId) {
        showMessage(this.form, "Os adicionada com sucesso", "active");
        window.location.href = `./os_page.html?id=${encodeURIComponent(noteId)}`;
      }
    } catch (error) {
      showMessage(this.form, "Ocorreu um erro ao registrar a os!", "activeError");
    }
  }

  // Método que adiciona os eventos
  addEvents() {
    this.btnServAmount.addEventListener("click", this.handleServiceAmount);
    this.form.addEventListener("submit", (e) => this.handleRegister(e));
    this.addMsgErrosOnForm();
  }

  init() {
    if (this.form) {
      if (window.location.href.includes("name")) {
        this.fillSelectByUrl();
      }
      FormOs.getCurrentDate();
      this.addEvents();
      this.fillSelect();
    }
    return this;
  }
}

import { fieldValidation, showMessage } from "./form_validations.js";
import ApiService from "../helpers/api_service.js";
import eventEmitter from "../helpers/event_emitter.js";

export default class FormClient {
  constructor(form, formFields, client, url) {
    this.form = document.querySelector(form);
    this.formFields = [...document.querySelectorAll(formFields)];
    this.client = client;
    this.url = url;

    this.clientName = null;
    this.clientId = null;
    this.errsType = ["valueMissing", "typeMismatch", "tooShort", "patternMismatch"];
    this.errsMsg = {
      name: {
        valueMissing: "O campo de nome não pode estar vazio.",
        tooShort: "Por favor, preencha um nome válido.",
      },
      email1: {
        valueMissing: "O campo de email não pode estar vazio.",
        tooShort: "Por favor, preencha um email válido.",
        typeMismatch: "Por favor, preencha um email válido",
      },
      email2: {
        tooShort: "Por favor, preencha um email válido.",
        typeMismatch: "Por favor, preencha um email válido",
      },
      tel1: {
        valueMissing: "O campo de telefone não pode estar vazio.",
        patternMismatch: "Por favor forneça um número no formato (XX) XXXXX-XXXX",
      },
      tel2: {
        patternMismatch: "Por favor forneça um número no formato (XX) XXXXX-XXXX",
      },
      charge: {
        valueMissing: "O campo de cobrança não pode estar vazio.",
      },
    };

    this.handleRegister = this.handleRegister.bind(this);
    this.handleUpdateClient = this.handleUpdateClient.bind(this);
  }

  // Métodos de auxílio
  // Método que captura o id e o name do cliente através da variável
  getClientParamsFromUrl() {
    const paramsUrl = new URLSearchParams(window.location.search);
    this.clientName = paramsUrl.get("name");
    this.clientId = paramsUrl.get("id");
  }

  // Método que exibe o titulo e botão do formulário de acordo com a função
  // do mesmo(adicionar, ou editar),além de preencher os campos do formulário com
  //  o valor ja existente
  designScreenForUpdate() {
    if (this.clientId && this.clientName) {
      const formTitle = document.querySelector("[data-titleForm]");
      const btnValue = document.querySelector("[data-btnForm]");
      const forTitleContent = `Edite as informações do cliente<span class="color-prim2">.</span>`;
      formTitle.innerHTML = forTitleContent;
      btnValue.innerText = "Salvar";
      this.formFields.forEach((field) => {
        const key = field.attributes.name.value;
        field.value = this.client[key];
      });
    }
  }

  // Métodos de execução
  // Método que chama a classe ApiService para fazer um requisição post
  async handleRegister(e) {
    e.preventDefault();
    const apiServices = new ApiService(this.url);
    const formData = new FormData(this.form);
    const formObj = Object.fromEntries(formData.entries());

    try {
      const response = await apiServices.post("clients", { clients: formObj });
      if (response) {
        const newClientId = response.id;
        window.location.href = `./client.html?id=${encodeURIComponent(newClientId)}`;
        showMessage(this.form, "Cliente adicionado com sucesso", "active");
      }
    } catch {
      showMessage(this.form, "Ocorreu um erro ao registrar o cliente!", "activeError");
    }
  }

  // Método que chama a classe ApiService pra editar um cliente ja existente
  // com um solicitação put
  async handleUpdateClient(e) {
    e.preventDefault();
    const apiServices = new ApiService(this.url, this.client.id);
    const formData = new FormData(this.form);
    const formObj = Object.fromEntries(formData.entries());

    apiServices.put(`clients`, formObj);
    eventEmitter.on(
      "sucessMsg",
      () => {
        showMessage(this.form, "Cliente atualizado com sucesso.", "active");
        window.location.href = `./client.html?id=${encodeURIComponent(this.client.id)}`;
      },
      5000
    );
    eventEmitter.on("failedMsg", () => {
      showMessage(
        this.form,
        "Ops! não conseguimos atualizar o cliente, tente atualizar a página e tente novamente mais tarde!",
        "activeError"
      );
    });
  }

  // Adiciona os eventos no formulário e nos campos dos formulário
  addEvents() {
    if (this.clientName && this.clientId) {
      this.form.addEventListener("submit", (e) => this.handleUpdateClient(e));
    } else {
      this.form.addEventListener("submit", (e) => this.handleRegister(e));
    }

    // adiciona o tratamento as validações do formulário
    this.formFields.forEach((formField) => {
      formField.addEventListener(
        "blur",
        (e) => fieldValidation(e.target, this.errsMsg, this.errsType, ".msgError")
        // eslint-disable-next-line function-paren-newline
      );
    });
  }

  init() {
    if (this.form) {
      this.getClientParamsFromUrl();
      this.designScreenForUpdate();
      this.addEvents();
    }
    return this;
  }
}

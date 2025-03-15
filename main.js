/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/client/client_os.js":
/*!****************************************!*\
  !*** ./js/modules/client/client_os.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientOs)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _helpers_formatDate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/formatDate.js */ "./js/modules/helpers/formatDate.js");





/* eslint-disable operator-linebreak */
var ClientOs = /*#__PURE__*/function () {
  function ClientOs(osWrapper, osSearch, btnShowMore, btnShowLess, osList, client) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ClientOs);
    this.osWrapper = document.querySelector(osWrapper);
    this.fieldSearch = document.querySelector(osSearch);
    this.btnShowMore = document.querySelector(btnShowMore);
    this.btnShowLess = document.querySelector(btnShowLess);
    this.client = client;
    this.osList = osList;
    this.filteredOs = this.filterOsPerCLient();
    this.osBoxSize = 10;
    this.handleSearch = this.handleSearch.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleShowLess = this.handleShowLess.bind(this);
  }

  // Métodos de auxílio
  // Filtra as ordens de serviço baseado no cliente
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(ClientOs, [{
    key: "filterOsPerCLient",
    value: function filterOsPerCLient() {
      var _this = this;
      if (this.client) {
        return this.osList.filter(function (os) {
          return os.client_id === _this.client.id;
        });
      }
      return [];
    }

    //  Métodos de exibição
    // Mostras as notas de serviço na tela em ordem de inserção
  }, {
    key: "showOsOnPage",
    value: function showOsOnPage(osList) {
      var _this2 = this;
      var revFilteredOs = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(osList).reverse().slice(0, this.osBoxSize);
      this.osWrapper.innerHTML = "";
      revFilteredOs.forEach(function (os) {
        var customDate = (0,_helpers_formatDate_js__WEBPACK_IMPORTED_MODULE_3__.handleCustomDate)(os.date);
        var li = document.createElement("li");
        var htmlOs = " \n                        <a href=\"./os_page.html?id=".concat(os.id, "\">\n                            <span>\n                                <img src=\"../img/icones/os-icon-gray.svg\" width=\"24\" height=\"24\"\n                                alt=\"icone de uma ordem de servi\xE7o\">\n                                ").concat(os.code, "\n                                </span>\n                            <p>").concat(customDate, "</p>\n                        </a>");
        li.innerHTML = htmlOs;
        _this2.osWrapper.appendChild(li);
      });
    }

    // mostras as opções de mostras mais e monstrar menos
  }, {
    key: "showOsBoxSizeBtn",
    value: function showOsBoxSizeBtn() {
      if (this.filteredOs.length > this.osBoxSize) {
        this.btnShowMore.classList.add("active");
      }
    }

    // Métodos de execução
    // lida com o campo de busca para as notas de serviço
  }, {
    key: "handleSearch",
    value: function handleSearch() {
      var searchValue = this.fieldSearch.value.toLowerCase();
      var foundOs = this.filteredOs.filter(function (os) {
        return os.client.toLowerCase().includes(searchValue) || os.date.includes(searchValue) || os.code.includes(searchValue);
      });
      this.showOsOnPage(foundOs);
      return foundOs;
    }

    // lida com o botão de mostrar mais, exibindo
    // todas as notas de serviço cadastradas
  }, {
    key: "handleShowMore",
    value: function handleShowMore() {
      this.osBoxSize = this.filteredOs.length;
      this.showOsOnPage(this.filteredOs);
      this.btnShowLess.classList.add("active");
      this.btnShowMore.classList.remove("active");
    }

    // Retorna o padrão de 10 notas de serviços mostradas
  }, {
    key: "handleShowLess",
    value: function handleShowLess() {
      this.osBoxSize = 10;
      this.showOsOnPage(this.filteredOs);
      this.btnShowLess.classList.remove("active");
      this.btnShowMore.classList.add("active");
    }

    // Adiciona os eventos
  }, {
    key: "addEvents",
    value: function addEvents() {
      this.fieldSearch.addEventListener("input", this.handleSearch);
      this.btnShowLess.addEventListener("click", this.handleShowLess);
      this.btnShowMore.addEventListener("click", this.handleShowMore);
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {
      this.fieldSearch.removeEventListener("input", this.handleSearch);
      this.btnShowLess.removeEventListener("click", this.handleShowLess);
      this.btnShowMore.removeEventListener("click", this.handleShowMore);
    }
  }, {
    key: "init",
    value: function init() {
      if (this.osWrapper) {
        this.showOsBoxSizeBtn();
        this.addEvents();
        this.showOsOnPage(this.filteredOs);
      }
      return this;
    }
  }]);
}();


/***/ }),

/***/ "./js/modules/client/client_page.js":
/*!******************************************!*\
  !*** ./js/modules/client/client_page.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers_api_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/api_service.js */ "./js/modules/helpers/api_service.js");
/* harmony import */ var _helpers_event_emitter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/event_emitter.js */ "./js/modules/helpers/event_emitter.js");
/* harmony import */ var _helpers_confirm_modal_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/confirm_modal.js */ "./js/modules/helpers/confirm_modal.js");







var ClientPage = /*#__PURE__*/function () {
  function ClientPage(clientName, infoClientWrapper, btnDelete, clients, url) {
    var _this = this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ClientPage);
    this.clientName = document.querySelector(clientName);
    this.btnDelete = document.querySelector(btnDelete);
    this.infoClientWrapper = document.querySelector(infoClientWrapper);
    this.url = url;
    this.clientUrlId = ClientPage.getClientFromId();
    this.client = clients.find(function (client) {
      return client.id === +_this.clientUrlId;
    });
    this.msgWrapper = document.createElement("span");
    this.deleteClient = this.deleteClient.bind(this);
  }

  // métodos de auxilio
  // Captura o id do cliente pela url
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(ClientPage, [{
    key: "generateSafeHTML",
    value:
    // Gera um HTML seguro evitando ataques de injeção de código ou
    // problemas de renderização
    function generateSafeHTML(client) {
      if (!this.clientUrlId) {
        var _htmlContent = "\n                        <li class=\"font-r-s color-3\">email 1: <a class=\"font-r-m-b color-1\"\n                            href=\"mailto:\"\"></a></li>\n                        <li class=\"font-r-s color-3\">email 2: <a class=\"font-r-m-b color-1\"\n                            href=\"mailto\"></a></li>\n                        <li class=\"font-r-s color-3\">telefone 1:\n                            <a class=\"font-r-m-b color-1\" href=\"\"></a>\n                        </li>\n                        <li class=\"font-r-s color-3\">telefone 2: <a class=\"font-r-m-b color-1\"\n                            href=\"tel:\"></a></li>\n                        <li class=\"font-r-s color-3\">C\xE1lculo de cobran\xE7a: <span class=\"font-r-m-b color-1\"></span></li>\n                        ";
        return _htmlContent;
      }
      var escapedEmail1 = ClientPage.escapeHTML(client.email1);
      var escapedEmail2 = ClientPage.escapeHTML(client.email2);
      var escapedTel1 = ClientPage.escapeHTML(client.tel1);
      var escapedTel2 = ClientPage.escapeHTML(client.tel2);
      var escapedCharge = ClientPage.escapeHTML(client.charge);
      var htmlContent = "\n          <li class=\"font-r-s color-3\">email 1: <a class=\"font-r-s color-1\"\n            href=\"mailto:".concat(escapedEmail1, "\">").concat(escapedEmail1, "</a></li>\n          <li class=\"font-r-s color-3\">email 2: <a class=\"font-r-s color-1\"\n            href=\"mailto:").concat(escapedEmail2, "\">").concat(escapedEmail2, "</a></li>\n          <li class=\"font-r-s color-3\">telefone 1:\n              <a class=\"font-r-s color-1\" href=\"tel:+55\n              ").concat(escapedTel1, "\n              \">").concat(escapedTel1, "</a>\n          </li>\n          <li class=\"font-r-s color-3\">telefone 2: <a class=\"font-r-m-b color-1\"\n              href=\"tel:").concat(escapedTel2 ? +55 : "").concat(escapedTel2, "\">\n              ").concat(escapedTel2, "</a></li>\n          <li class=\"font-r-s color-3\">C\xE1lculo de cobran\xE7a: <span class=\"font-r-m-b color-1\">\n              ").concat(escapedCharge, "\n              </span></li>\n          ");
      return htmlContent;
    }

    // métodos de exibição
    // Mostra o nome do cliente no título principal da página
  }, {
    key: "showClientName",
    value: function showClientName() {
      if (!this.clientUrlId) {
        this.clientName.innerHTML = "Cliente";
      } else {
        this.clientName.innerHTML = this.client.name;
      }
    }

    // Mostra as informações do cliente na página
  }, {
    key: "showClientInfo",
    value: function showClientInfo() {
      this.infoClientWrapper.innerHTML = this.generateSafeHTML(this.client);
    }

    // Cria e exibe uma mensagem de confirmação após o cliente ser deletado
    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "showMsg",
    value: function showMsg(msg, className) {
      var container = document.querySelector('[data-grid="client"]');
      this.msgWrapper.classList.add(className);
      this.msgWrapper.innerHTML = "<p class=\"font-r-l-b\">".concat(msg, "</p>");
      this.msgWrapper.style.display = "block";
      container.appendChild(this.msgWrapper);
    }

    // Remove a mensagem de confirmação de deleção
  }, {
    key: "removeMsg",
    value: function removeMsg() {
      this.msgWrapper.style.display = "none";
    }

    // métodos de ação ou gerais

    // Insere o link para as ações de nova os e editar o cliente
  }, {
    key: "insertLink",
    value: function insertLink() {
      var newOsHref = document.querySelector('[data-action="nova-os"]');
      var editClientHref = document.querySelector('[data-action="edit-client"]');
      if (this.client) {
        var name = encodeURIComponent(this.client.name);
        var id = encodeURIComponent(this.client.id);
        editClientHref.setAttribute("href", "./form_client.html?name=".concat(name, "&id=").concat(id));
        newOsHref.setAttribute("href", "./form_os.html?name=".concat(name));
      } else {
        editClientHref.href = ("href", "./form_client.html");
        newOsHref.setAttribute("href", "./form_os.html");
      }
    }

    // deleta o cliente
  }, {
    key: "deleteClient",
    value: function () {
      var _deleteClient = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee3() {
        var _this2 = this;
        var userConfirm, apiService;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0,_helpers_confirm_modal_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Você tem certez que deseja deletar esse cliente? Todas as ordens de serviço referentes a este cliente serão deletadas junto.");
            case 2:
              userConfirm = _context3.sent;
              if (userConfirm) {
                apiService = new _helpers_api_service_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.url, this.client.id);
                apiService["delete"]("clients");
                _helpers_event_emitter_js__WEBPACK_IMPORTED_MODULE_5__["default"].on("sucessMsg", /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _this2.showMsg("Cliente deletado com sucesso!", "sucessMsg");
                        _this2.btnDelete.removeEventListener("click", _this2.deleteClient);
                        window.location.href = "./index.html";
                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                })));
                _helpers_event_emitter_js__WEBPACK_IMPORTED_MODULE_5__["default"].on("failedMsg", /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        _this2.showMsg("Houve um problema e o cliente n\xE3o pode ser deletado, tente novamente mais tarde!", "failedMsg");
                        setTimeout(function () {
                          _this2.removeMsg();
                        }, 2000);
                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                })));
              }
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function deleteClient() {
        return _deleteClient.apply(this, arguments);
      }
      return deleteClient;
    }() // Adiciona os eventos da página
  }, {
    key: "addEventOnDelete",
    value: function addEventOnDelete() {
      this.btnDelete.addEventListener("click", this.deleteClient);
    }
  }, {
    key: "init",
    value: function init() {
      if (this.client && this.infoClientWrapper) {
        this.addEventOnDelete();
        this.insertLink();
        this.showClientName();
        this.showClientInfo();
      }
      return this;
    }
  }], [{
    key: "getClientFromId",
    value: function getClientFromId() {
      var paramsUrl = new URLSearchParams(window.location.search);
      var clientId = paramsUrl.get("id");
      return clientId;
    }

    // escapa carcteres especiais em uma string para suas respectivas entidades HTML
  }, {
    key: "escapeHTML",
    value: function escapeHTML(str) {
      if (str === null) {
        return "";
      }
      return str.replace(/[&<>"']/g, function (match) {
        return {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        }[match];
      });
    }
  }]);
}();


/***/ }),

/***/ "./js/modules/client/form_client.js":
/*!******************************************!*\
  !*** ./js/modules/client/form_client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormClient)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _form_validations_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form_validations.js */ "./js/modules/client/form_validations.js");
/* harmony import */ var _helpers_api_service_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/api_service.js */ "./js/modules/helpers/api_service.js");
/* harmony import */ var _helpers_event_emitter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/event_emitter.js */ "./js/modules/helpers/event_emitter.js");








var FormClient = /*#__PURE__*/function () {
  function FormClient(form, formFields, client, url) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, FormClient);
    this.form = document.querySelector(form);
    this.formFields = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(document.querySelectorAll(formFields));
    this.client = client;
    this.url = url;
    this.clientName = null;
    this.clientId = null;
    this.errsType = ["valueMissing", "typeMismatch", "tooShort", "patternMismatch"];
    this.errsMsg = {
      name: {
        valueMissing: "O campo de nome não pode estar vazio.",
        tooShort: "Por favor, preencha um nome válido."
      },
      email1: {
        valueMissing: "O campo de email não pode estar vazio.",
        tooShort: "Por favor, preencha um email válido.",
        typeMismatch: "Por favor, preencha um email válido"
      },
      email2: {
        tooShort: "Por favor, preencha um email válido.",
        typeMismatch: "Por favor, preencha um email válido"
      },
      tel1: {
        valueMissing: "O campo de telefone não pode estar vazio.",
        patternMismatch: "Por favor forneça um número no formato (XX) XXXXX-XXXX"
      },
      tel2: {
        patternMismatch: "Por favor forneça um número no formato (XX) XXXXX-XXXX"
      },
      charge: {
        valueMissing: "O campo de cobrança não pode estar vazio."
      }
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleUpdateClient = this.handleUpdateClient.bind(this);
  }

  // Métodos de auxílio
  // Método que captura o id e o name do cliente através da variável
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(FormClient, [{
    key: "getClientParamsFromUrl",
    value: function getClientParamsFromUrl() {
      var paramsUrl = new URLSearchParams(window.location.search);
      this.clientName = paramsUrl.get("name");
      this.clientId = paramsUrl.get("id");
    }

    // Método que exibe o titulo e botão do formulário de acordo com a função
    // do mesmo(adicionar, ou editar),além de preencher os campos do formulário com
    //  o valor ja existente
  }, {
    key: "designScreenForUpdate",
    value: function designScreenForUpdate() {
      var _this = this;
      if (this.clientId && this.clientName) {
        var formTitle = document.querySelector("[data-titleForm]");
        var btnValue = document.querySelector("[data-btnForm]");
        var forTitleContent = "Edite as informa\xE7\xF5es do cliente<span class=\"color-prim2\">.</span>";
        formTitle.innerHTML = forTitleContent;
        btnValue.innerText = "Salvar";
        this.formFields.forEach(function (field) {
          var key = field.attributes.name.value;
          field.value = _this.client[key];
        });
      }
    }

    // Métodos de execução
    // Método que chama a classe ApiService para fazer um requisição post
  }, {
    key: "handleRegister",
    value: function () {
      var _handleRegister = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee(e) {
        var btnAdd, apiServices, formData, formObj, response, newClientId;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              btnAdd = document.querySelector(".btn_client--add");
              btnAdd.innerText = "...ENVIANDO";
              btnAdd.disabled = "true";
              apiServices = new _helpers_api_service_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.url);
              formData = new FormData(this.form);
              formObj = Object.fromEntries(formData.entries());
              _context.prev = 7;
              _context.next = 10;
              return apiServices.post("clients", {
                clients: formObj
              });
            case 10:
              response = _context.sent;
              if (response) {
                newClientId = response.id;
                (0,_form_validations_js__WEBPACK_IMPORTED_MODULE_5__.showMessage)(this.form, "Cliente adicionado com sucesso", "active");
                window.location.href = "./client.html?id=".concat(encodeURIComponent(newClientId));
              }
              _context.next = 17;
              break;
            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](7);
              (0,_form_validations_js__WEBPACK_IMPORTED_MODULE_5__.showMessage)(this.form, "Ocorreu um erro ao registrar o cliente!", "activeError");
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[7, 14]]);
      }));
      function handleRegister(_x) {
        return _handleRegister.apply(this, arguments);
      }
      return handleRegister;
    }() // Método que chama a classe ApiService pra editar um cliente ja existente
    // com um solicitação put
  }, {
    key: "handleUpdateClient",
    value: function () {
      var _handleUpdateClient = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee2(e) {
        var _this2 = this;
        var apiServices, formData, formObj;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              e.preventDefault();
              apiServices = new _helpers_api_service_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.url, this.client.id);
              formData = new FormData(this.form);
              formObj = Object.fromEntries(formData.entries());
              apiServices.put("clients", formObj);
              _helpers_event_emitter_js__WEBPACK_IMPORTED_MODULE_7__["default"].on("sucessMsg", function () {
                (0,_form_validations_js__WEBPACK_IMPORTED_MODULE_5__.showMessage)(_this2.form, "Cliente atualizado com sucesso.", "active");
                window.location.href = "./client.html?id=".concat(encodeURIComponent(_this2.client.id));
              }, 5000);
              _helpers_event_emitter_js__WEBPACK_IMPORTED_MODULE_7__["default"].on("failedMsg", function () {
                (0,_form_validations_js__WEBPACK_IMPORTED_MODULE_5__.showMessage)(_this2.form, "Ops! não conseguimos atualizar o cliente, tente atualizar a página e tente novamente mais tarde!", "activeError");
              });
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function handleUpdateClient(_x2) {
        return _handleUpdateClient.apply(this, arguments);
      }
      return handleUpdateClient;
    }() // Adiciona os eventos no formulário e nos campos dos formulário
  }, {
    key: "addEvents",
    value: function addEvents() {
      var _this3 = this;
      if (this.clientName && this.clientId) {
        this.form.addEventListener("submit", function (e) {
          return _this3.handleUpdateClient(e);
        });
      } else {
        this.form.addEventListener("submit", function (e) {
          return _this3.handleRegister(e);
        });
      }

      // adiciona o tratamento as validações do formulário
      this.formFields.forEach(function (formField) {
        formField.addEventListener("blur", function (e) {
          return (0,_form_validations_js__WEBPACK_IMPORTED_MODULE_5__.fieldValidation)(e.target, _this3.errsMsg, _this3.errsType, ".msgError");
        }
        // eslint-disable-next-line function-paren-newline
        );
      });
    }
  }, {
    key: "init",
    value: function init() {
      if (this.form) {
        this.getClientParamsFromUrl();
        this.designScreenForUpdate();
        this.addEvents();
      }
      return this;
    }
  }]);
}();


/***/ }),

/***/ "./js/modules/client/form_os.js":
/*!**************************************!*\
  !*** ./js/modules/client/form_os.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormOs)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _form_validations_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form_validations.js */ "./js/modules/client/form_validations.js");
/* harmony import */ var _helpers_api_service_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/api_service.js */ "./js/modules/helpers/api_service.js");
/* harmony import */ var _helpers_formatDate_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/formatDate.js */ "./js/modules/helpers/formatDate.js");





function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* eslint-disable no-restricted-syntax */



var FormOs = /*#__PURE__*/function () {
  function FormOs(form, btnServAmount, services, clients, os, url) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, FormOs);
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
        valueMissing: "O campo de nome do cliente não pode estar vazio."
      },
      serviceName: {
        valueMissing: "O campo de nome do serviço não pode estar vazio.",
        tooShort: "Por favor, preencha um nome válido."
      },
      serviceAmount: {
        valueMissing: "O campo de quantidade não pode estar vazio."
      },
      width: {
        valueMissing: "O campo de largura não pode estar vazio.",
        patternMismatch: "Por favor insira as medidas apenas com números e pontos. Ex:2.5"
      },
      height: {
        valueMissing: "O campo de altura não pode estar vazio.",
        patternMismatch: "Por favor insira as medidas apenas com números e pontos. Ex:2.5"
      },
      servicePrice: {
        patternMismatch: "Por favor insira os valores apenas com números e pontos, sendo os pontos apenas para casas decimais. Ex: 2.50."
      }
    };
    this.handleServiceAmount = this.handleServiceAmount.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  // Métodos de auxílio

  // Método que preenche o campo de nome dos cliente
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(FormOs, [{
    key: "fillSelect",
    value: function fillSelect() {
      var select = document.querySelector("[data-select]");
      this.clients.forEach(function (client) {
        var option = "<option value=\"".concat(client.name, "\">").concat(client.name, "</option>");
        select.innerHTML += option;
      });
    }

    // Método que preenche o campo de nome do cliente
    // automaticamente caso o nome do cliente esteja na url
  }, {
    key: "fillSelectByUrl",
    value: function fillSelectByUrl() {
      var urlParams = new URLSearchParams(window.location.search);
      var clientNameByUrl = urlParams.get("name");
      var option = "<option value=\"".concat(clientNameByUrl, "\">").concat(clientNameByUrl, "</option>");
      var selectField = this.form.elements[1];
      selectField.innerHTML = option;
    }

    // Método que adiciona as mensagens de erro nos campos
    // do formulário
  }, {
    key: "addMsgErrosOnForm",
    value: function addMsgErrosOnForm() {
      var _this = this;
      this.services = document.querySelectorAll("[data-serviceItem]");
      this.services.forEach(function (serviceField) {
        serviceField.removeEventListener("blur", function (e) {
          return (0,_form_validations_js__WEBPACK_IMPORTED_MODULE_5__.fieldValidation)(e.target, _this.errsMsg, _this.errsType, ".msgError");
        }
        // eslint-disable-next-line function-paren-newline
        );
        serviceField.addEventListener("blur", function (e) {
          return (0,_form_validations_js__WEBPACK_IMPORTED_MODULE_5__.fieldValidation)(e.target, _this.errsMsg, _this.errsType, ".msgError");
        }
        // eslint-disable-next-line function-paren-newline
        );
      });
    }

    // Lida com os acréscimos do campos de serviço
  }, {
    key: "handleServiceAmount",
    value: function handleServiceAmount() {
      this.counter++;
      var newService = document.createElement("div");
      var serviceWrapper = document.querySelector("[data-service]");
      newService.classList.add("service");
      newService.innerHTML += "\n    <fieldset>\n        <label class=\"font-p-s-b\" for=\"serviceName".concat(this.counter, "\">Nome do servi\xE7o</label>\n        <input class=\"input-pattern\" type=\"text\" name=\"serviceName\" id=\"serviceName").concat(this.counter, "\" data-serviceItem>\n        <span class=\"msgError\"></span>\n    </fieldset>\n    <fieldset>\n        <label class=\"font-p-s-b\" for=\"serviceAmount").concat(this.counter, "\">Quantidade de pe\xE7as</label>\n        <input class=\"input-pattern\" type=\"number\" name=\"serviceAmount\" id=\"serviceAmount").concat(this.counter, "\"\n            data-serviceItem>\n        <span class=\"msgError\"></span>\n    </fieldset>\n    <div class=\"service__measure\">\n        <label class=\"font-p-s-b\" for=\"measures").concat(this.counter, "\">Medidas</label>\n        <fieldset id=\"measures").concat(this.counter, "\" class=\"measure__container\">\n            <div>\n                <input class=\"input-pattern inputWidth\" type=\"text\" id=\"width").concat(this.counter, "\" name=\"width\"\n                     data-serviceItem placeholder=\"Largura\">\n                <span class=\"msgError\"></span>\n            </div>\n            <div>\n                <input class=\"input-pattern inputHeight\" type=\"text\" id=\"height").concat(this.counter, "\" name=\"height\"\n                   data-serviceItem placeholder=\"Altura\">\n                <span class=\"msgError\"></span>\n            </div>\n        </fieldset>\n    </div>\n    <fieldset>\n        <label class=\"font-p-s-b\" for=\"servicePrice").concat(this.counter, "\">Valor do or\xE7amento</label>\n        <input class=\"input-pattern\" type=\"text\" name=\"servicePrice\" id=\"servicePrice").concat(this.counter, "\"   placeholder=\"Ex: 2500.50\" title=\"Apenas adicione algum valor aqui se houver um or\xE7amento pr\xE9vio com algum valor definido.\"\n          data-serviceItem data-budget pattern=\"^\\d+(\\.\\d{1,2})?$\">\n        <span class=\"msgError\"></span>\n    </fieldset>\n    <fieldset class=\"hideMeasures__Wrapper\">\n      <input type=\"checkbox\" name=\"hideMeasures\" value=\"sim\" id=\"hiddenMeasures\" data-serviceItem>\n      <label for=\"hiddenMeasures\" class=\"font-r-m-b\">Mostrar medidas na os</label>\n      <span class=\"msgError\"></span>\n    </fieldset>\n  ");
      serviceWrapper.appendChild(newService);
      this.addMsgErrosOnForm();
    }

    // Método que faz o cálculo total da nota de serviço
  }, {
    key: "getChargeTotal",
    value: function getChargeTotal(formObj) {
      var clientCharge = this.clients.find(function (client) {
        return client.name === formObj.client;
      });
      var _iterator = _createForOfIteratorHelper(formObj.service),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var service = _step.value;
          var serviceWidth = service.width;
          var serviceHeight = service.height;
          var serviceAmount = service.serviceAmount;
          service.serviceValue = serviceWidth * serviceHeight * clientCharge.charge * serviceAmount;
          formObj.total += service.serviceValue;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    // Método que decide se as medidas irão aparecer na nota de serviço
  }, {
    key: "getHiddenMeasure",
    value: function getHiddenMeasure() {
      this.hiddenMeasure = document.querySelector("#hiddenMeasures").checked ? "nao" : "sim";
      return this.hiddenMeasure;
    }

    // Método que cria a data da nota de serviço
  }, {
    key: "getOsCode",
    value:
    // Método que cria o codigo de controle da os
    function getOsCode(date, clientName) {
      var lastOs = FormOs.findLastOs(this.os, clientName);
      if (lastOs !== null && date && FormOs.ComparingDate(date, lastOs.date)) {
        return String(Number(lastOs.code) + 1).padStart(3, 0);
      }
      return "1".padStart(3, 0);
    }

    // Métodos de execução

    // Método que cria um array com os objetos de serviços que
    // preencherão a nota de serviço
  }, {
    key: "handleServiceValues",
    value: function handleServiceValues(e) {
      var servicesList = document.querySelector(".service__wrapper");
      for (var i = 0; i < servicesList.children.length; i++) {
        var serviceName = e.target.elements["serviceName".concat(i)].value;
        var serviceAmount = parseFloat(e.target.elements["serviceAmount".concat(i)].value);
        var width = parseFloat(e.target.elements["width".concat(i)].value);
        var height = parseFloat(e.target.elements["height".concat(i)].value);
        if (serviceName && serviceAmount && width >= 0 && height >= 0) {
          var serviceObj = {
            serviceName: serviceName,
            serviceAmount: serviceAmount,
            width: width,
            height: height
          };
          this.serviceValues.push(serviceObj);
        }
      }
      return this.serviceValues;
    }

    // Método que lida com o valor de orçamento no form
  }, {
    key: "handleRegister",
    value: // Método que lida com a requisição da nota de serviço
    function () {
      var _handleRegister = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee(e) {
        var btnAdd, apiServices, clientName, formObj, _yield$apiServices$po, noteId;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              btnAdd = document.querySelector(".btn_form--add");
              btnAdd.disabled = "true";
              btnAdd.innerText = "...Enviando";
              apiServices = new _helpers_api_service_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.url);
              clientName = e.target.elements.client.value;
              formObj = {
                client: clientName,
                hideMeasure: this.getHiddenMeasure(),
                thickness: e.target.elements.thickness.value,
                service: this.handleServiceValues(e),
                date: this.currentDate,
                total: 0,
                code: this.getOsCode(this.currentDate, clientName),
                budgetValue: FormOs.handleBudgetValue()
              };
              if (!formObj.budgetValue > 0) this.getChargeTotal(formObj);
              _context.prev = 8;
              _context.next = 11;
              return apiServices.post("os", {
                os: formObj
              });
            case 11:
              _yield$apiServices$po = _context.sent;
              noteId = _yield$apiServices$po.noteId;
              if (noteId) {
                (0,_form_validations_js__WEBPACK_IMPORTED_MODULE_5__.showMessage)(this.form, "Os adicionada com sucesso", "active");
                window.location.href = "./os_page.html?id=".concat(encodeURIComponent(noteId));
              }
              _context.next = 19;
              break;
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](8);
              (0,_form_validations_js__WEBPACK_IMPORTED_MODULE_5__.showMessage)(this.form, "Ocorreu um erro ao registrar a os!", "activeError");
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[8, 16]]);
      }));
      function handleRegister(_x) {
        return _handleRegister.apply(this, arguments);
      }
      return handleRegister;
    }() // Método que adiciona os eventos
  }, {
    key: "addEvents",
    value: function addEvents() {
      var _this2 = this;
      this.btnServAmount.addEventListener("click", this.handleServiceAmount);
      this.form.addEventListener("submit", function (e) {
        return _this2.handleRegister(e);
      });
      this.addMsgErrosOnForm();
    }
  }, {
    key: "init",
    value: function init() {
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
  }], [{
    key: "getCurrentDate",
    value: function getCurrentDate() {
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = String(currentDate.getMonth() + 1).padStart(2, 0);
      var day = String(currentDate.getDate()).padStart(2, 0);
      var hour = String(currentDate.getHours()).padStart(2, 0);
      var minutes = String(currentDate.getMinutes()).padStart(2, 0);
      var seconds = String(currentDate.getSeconds()).padStart(2, 0);
      return "".concat(day, "-").concat(month, "-").concat(year, "-").concat(hour, "-").concat(minutes, "-").concat(seconds);
    }

    // Método que encontra a última os adicionada
  }, {
    key: "findLastOs",
    value: function findLastOs(notes, clientName) {
      if (notes.length === 0) return null;
      var filteredNotes = notes.filter(function (note) {
        return note.client === clientName;
      });
      var mostRecentNote = filteredNotes[filteredNotes.length - 1];
      if (filteredNotes.length === 0) return null;
      filteredNotes.forEach(function (note) {
        if ((0,_helpers_formatDate_js__WEBPACK_IMPORTED_MODULE_7__.parseDate)(note.date) > (0,_helpers_formatDate_js__WEBPACK_IMPORTED_MODULE_7__.parseDate)(mostRecentNote.date)) {
          mostRecentNote = note;
        }
      });
      return mostRecentNote;
    }

    // Método que compara as datas da os a ser inserida com a última os retornada
  }, {
    key: "ComparingDate",
    value: function ComparingDate(currentDate, lastOsDate) {
      if (lastOsDate) {
        // eslint-disable-next-line no-unused-vars
        var _currentDate$split = currentDate.split("-"),
          _currentDate$split2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_currentDate$split, 3),
          cMonth = _currentDate$split2[1],
          cYear = _currentDate$split2[2];
        // eslint-disable-next-line no-unused-vars
        var _lastOsDate$split = lastOsDate.split("-"),
          _lastOsDate$split2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_lastOsDate$split, 3),
          lOsMonth = _lastOsDate$split2[1],
          lOsYear = _lastOsDate$split2[2];
        return cMonth === lOsMonth && cYear === lOsYear;
      }
      return null;
    }
  }, {
    key: "handleBudgetValue",
    value: function handleBudgetValue() {
      var budget = document.querySelector("[data-budget]");
      if (budget.value) return +budget.value;
      return null;
    }
  }]);
}();


/***/ }),

/***/ "./js/modules/client/form_validations.js":
/*!***********************************************!*\
  !*** ./js/modules/client/form_validations.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fieldValidation: () => (/* binding */ fieldValidation),
/* harmony export */   showMessage: () => (/* binding */ showMessage)
/* harmony export */ });
// Validações do formulário de clientes
var fieldValidation = function fieldValidation(field, msgErr, errorsType, msgField) {
  var msg = "";
  if (field && field.validity) {
    field.setCustomValidity("");
    errorsType.forEach(function (error) {
      if (field.validity[error]) {
        msg = msgErr[field.name][error];
      }
    });
    var errorMsgField = field.parentNode.querySelector(msgField);
    var verifyInput = field.checkValidity();
    if (!verifyInput) {
      errorMsgField.textContent = msg;
      field.style.border = "2px solid #e70a0a";
    } else {
      errorMsgField.textContent = "";
      field.style.border = "2px solid var(--color-4)";
    }
  } else {
    console.error("Field or field.validity is undefined");
  }
};

// mensagem de envio de formulário bem sucedido
var showMessage = function showMessage(form, textMessage, classMsg) {
  var msg = document.querySelector("[data-msg]");
  msg.classList.add(classMsg);
  msg.innerText = textMessage;
  msg.scrollIntoView({
    behavior: "smooth"
  });
  setTimeout(function () {
    msg.classList.remove(classMsg);
    form.reset();
  }, 3000);
};

/***/ }),

/***/ "./js/modules/global/menu_mobile.js":
/*!******************************************!*\
  !*** ./js/modules/global/menu_mobile.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MenuMobile)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _helpers_outside_click_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/outside_click.js */ "./js/modules/helpers/outside_click.js");



var MenuMobile = /*#__PURE__*/function () {
  function MenuMobile(btnList, menu, event, activeClass) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, MenuMobile);
    this.btnList = document.querySelectorAll(btnList);
    this.menu = document.querySelector(menu);
    this.event = event;
    this.activeClass = activeClass || "activeMenu";
    this.handleMenu = this.handleMenu.bind(this);
  }

  // lida com a adição e remoção da classe que vai abrir e fechar o menu via css
  // o setTimeout foi colocado para lidar com fato de que por serem dois botões
  // estava havendo conflito com o link da logo que era acionado quando o botão
  // de dentro do menu era clicado
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(MenuMobile, [{
    key: "handleMenu",
    value: function handleMenu() {
      var _this = this;
      setTimeout(function () {
        _this.menu.classList.toggle(_this.activeClass);
        (0,_helpers_outside_click_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.menu, _this.event, function () {
          _this.menu.classList.remove(_this.activeClass);
        });
      });
    }

    // adiciona os eventos de clique nos botões do menu
    // tanto o botão externo quanto o interno
  }, {
    key: "eventOnMenu",
    value: function eventOnMenu() {
      var _this2 = this;
      this.btnList.forEach(function (btn) {
        btn.addEventListener(_this2.event, _this2.handleMenu);
      });
    }

    // inicia a classe
  }, {
    key: "init",
    value: function init() {
      if (this.menu && this.btnList.length) {
        this.eventOnMenu();
      }
      return this;
    }
  }]);
}();


/***/ }),

/***/ "./js/modules/global/navigation.js":
/*!*****************************************!*\
  !*** ./js/modules/global/navigation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Navigation)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");


var Navigation = /*#__PURE__*/function () {
  function Navigation(btnPrev, btnNext) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Navigation);
    this.btnPrev = document.querySelector(btnPrev);
    this.btnNext = document.querySelector(btnNext);
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Navigation, [{
    key: "addEvents",
    value: function addEvents() {
      if (this.btnPrev) {
        this.btnPrev.addEventListener("click", Navigation.navPrevious);
      } else {
        console.warn("Elemento para btnPrev n\xE3o encontrado: ".concat(this.btnPrev));
      }
      if (this.btnNext) {
        this.btnNext.addEventListener("click", Navigation.navNext);
      } else {
        console.warn("Elemento para btnNext n\xE3o encontrado: ".concat(this.btnNext));
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.addEvents();
      return this;
    }
  }], [{
    key: "navPrevious",
    value: function navPrevious() {
      window.history.back();
    }
  }, {
    key: "navNext",
    value: function navNext() {
      window.history.forward();
    }
  }]);
}();


/***/ }),

/***/ "./js/modules/helpers/api_service.js":
/*!*******************************************!*\
  !*** ./js/modules/helpers/api_service.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiService)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _event_emitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./event_emitter */ "./js/modules/helpers/event_emitter.js");





var ApiService = /*#__PURE__*/function () {
  function ApiService(baseUrl, optionParams) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ApiService);
    this.baseUrl = baseUrl;
    this.optionParams = optionParams !== null && optionParams !== void 0 ? optionParams : "";
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(ApiService, [{
    key: "get",
    value: function () {
      var _get = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(endpoint) {
        var url, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              url = "".concat(this.baseUrl, "/").concat(endpoint);
              if (this.optionParams) {
                url += "/".concat(this.optionParams);
              }
              _context.next = 5;
              return fetch(url);
            case 5:
              response = _context.sent;
              if (response.ok) {
                _context.next = 8;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 8:
              _context.next = 10;
              return response.json();
            case 10:
              return _context.abrupt("return", _context.sent);
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              console.error("Erro ao buscar no servidor:", _context.t0);
              throw _context.t0;
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 13]]);
      }));
      function get(_x) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }, {
    key: "getWithId",
    value: function () {
      var _getWithId = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2(endpoint, id) {
        var url, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              url = "".concat(this.baseUrl, "/").concat(endpoint, "/").concat(id);
              if (this.optionParams) {
                url += "/".concat(this.optionParams);
              }
              _context2.next = 5;
              return fetch(url);
            case 5:
              response = _context2.sent;
              if (response.ok) {
                _context2.next = 8;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 8:
              _context2.next = 10;
              return response.json();
            case 10:
              return _context2.abrupt("return", _context2.sent);
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              console.error("Erro ao buscar no servidor:", _context2.t0);
              throw _context2.t0;
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 13]]);
      }));
      function getWithId(_x2, _x3) {
        return _getWithId.apply(this, arguments);
      }
      return getWithId;
    }()
  }, {
    key: "getByMonth",
    value: function () {
      var _getByMonth = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee3(endpoint, date) {
        var url, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              url = "".concat(this.baseUrl, "/").concat(endpoint, "/").concat(date);
              if (this.optionParams) {
                url += "/".concat(this.optionParams);
              }
              _context3.next = 5;
              return fetch(url);
            case 5:
              response = _context3.sent;
              if (response.ok) {
                _context3.next = 8;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 8:
              _context3.next = 10;
              return response.json();
            case 10:
              return _context3.abrupt("return", _context3.sent);
            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](0);
              console.error("Erro ao buscar no servidor:", _context3.t0);
              throw _context3.t0;
            case 17:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 13]]);
      }));
      function getByMonth(_x4, _x5) {
        return _getByMonth.apply(this, arguments);
      }
      return getByMonth;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee4(endpoint, data) {
        var url, response, errorMessage;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              url = "".concat(this.baseUrl, "/").concat(endpoint);
              if (this.optionParams) {
                url += "/".concat(this.optionParams);
              }
              _context4.next = 5;
              return fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
              });
            case 5:
              response = _context4.sent;
              if (response.ok) {
                _context4.next = 12;
                break;
              }
              _context4.next = 9;
              return response.text();
            case 9:
              errorMessage = _context4.sent;
              _event_emitter__WEBPACK_IMPORTED_MODULE_4__["default"].emit("failedMsg", response.status);
              throw new Error(errorMessage);
            case 12:
              _event_emitter__WEBPACK_IMPORTED_MODULE_4__["default"].emit("sucessMsg");
              _context4.next = 15;
              return response.json();
            case 15:
              return _context4.abrupt("return", _context4.sent);
            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4["catch"](0);
              console.error("Erro ao enviar dados para o servidor:", _context4.t0);
              throw _context4.t0;
            case 22:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 18]]);
      }));
      function post(_x6, _x7) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
  }, {
    key: "createClient",
    value: function () {
      var _createClient = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee5(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", this.post("clients", data));
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function createClient(_x8) {
        return _createClient.apply(this, arguments);
      }
      return createClient;
    }()
  }, {
    key: "createServiceNote",
    value: function () {
      var _createServiceNote = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee6(data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", this.post("os", data));
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function createServiceNote(_x9) {
        return _createServiceNote.apply(this, arguments);
      }
      return createServiceNote;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee7(endpoint) {
        var url, response, data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              url = "".concat(this.baseUrl, "/").concat(endpoint);
              if (this.optionParams) {
                url += "/".concat(this.optionParams);
              }
              _context7.next = 5;
              return fetch(url, {
                method: "DELETE"
              });
            case 5:
              response = _context7.sent;
              _context7.next = 8;
              return response.json();
            case 8:
              data = _context7.sent;
              if (response.ok) {
                _context7.next = 12;
                break;
              }
              _event_emitter__WEBPACK_IMPORTED_MODULE_4__["default"].emit("failedMsg");
              throw new Error(data.error || "Erro ao deletar");
            case 12:
              _event_emitter__WEBPACK_IMPORTED_MODULE_4__["default"].emit("sucessMsg");
              return _context7.abrupt("return", data);
            case 16:
              _context7.prev = 16;
              _context7.t0 = _context7["catch"](0);
              console.error(_context7.t0);
              throw _context7.t0;
            case 20:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[0, 16]]);
      }));
      function _delete(_x10) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "put",
    value: function () {
      var _put = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee8(endpoint, data) {
        var url, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              url = "".concat(this.baseUrl, "/").concat(endpoint);
              if (this.optionParams) {
                url += "/".concat(this.optionParams);
              }
              _context8.next = 5;
              return fetch(url, {
                method: "PUT",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify(data)
              });
            case 5:
              response = _context8.sent;
              if (response.ok) {
                _context8.next = 11;
                break;
              }
              _event_emitter__WEBPACK_IMPORTED_MODULE_4__["default"].emit("failedMsg");
              throw new Error("HTTP error! status: ".concat(response.status));
            case 11:
              _event_emitter__WEBPACK_IMPORTED_MODULE_4__["default"].emit("sucessMsg");
              _context8.next = 14;
              return response.json();
            case 14:
              return _context8.abrupt("return", _context8.sent);
            case 15:
              _context8.next = 21;
              break;
            case 17:
              _context8.prev = 17;
              _context8.t0 = _context8["catch"](0);
              console.error(_context8.t0);
              throw _context8.t0;
            case 21:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this, [[0, 17]]);
      }));
      function put(_x11, _x12) {
        return _put.apply(this, arguments);
      }
      return put;
    }()
  }]);
}();


/***/ }),

/***/ "./js/modules/helpers/confirm_modal.js":
/*!*********************************************!*\
  !*** ./js/modules/helpers/confirm_modal.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ confirmModal)
/* harmony export */ });
function confirmModal(message) {
  return new Promise(function (resolve) {
    var template = document.querySelector(".confirm_modal");
    var modalContent = document.importNode(template.content, true);
    var confirmBtn = modalContent.querySelector("[data-confirmOs]");
    var cancelBtn = modalContent.querySelector("[data-cancelOs]");
    var modalWrapper = modalContent.querySelector(".confirm_modal--wrapper");
    modalContent.querySelector("[data-modalMsg]").textContent = message;
    document.body.appendChild(modalWrapper);
    var removeModal = function removeModal() {
      if (document.body.contains(modalWrapper)) {
        document.body.removeChild(modalWrapper);
      }
    };
    confirmBtn.addEventListener("click", function () {
      removeModal();
      resolve(true);
    });
    cancelBtn.addEventListener("click", function () {
      removeModal();
      resolve(false);
    });
  });
}

/***/ }),

/***/ "./js/modules/helpers/event_emitter.js":
/*!*********************************************!*\
  !*** ./js/modules/helpers/event_emitter.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");


var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, EventEmitter);
    this.events = {};
  }

  // verifica se existe uma função atrelada ao evento, se não
  // cria um array vazio para que funcões possam ser adicionadas
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(EventEmitter, [{
    key: "on",
    value: function on(eventName, fn) {
      this.events[eventName] = this.events[eventName] || [];
      this.events[eventName].push(fn);
    }

    // itera sob o array para ativar as funções que foram adicionadas nele
  }, {
    key: "emit",
    value: function emit(eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(function (fn) {
          return fn(data);
        });
      }
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new EventEmitter());

/***/ }),

/***/ "./js/modules/helpers/formatDate.js":
/*!******************************************!*\
  !*** ./js/modules/helpers/formatDate.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleCustomDate: () => (/* binding */ handleCustomDate),
/* harmony export */   parseDate: () => (/* binding */ parseDate),
/* harmony export */   turningMonthInNumber: () => (/* binding */ turningMonthInNumber)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");

// Função que recebe uma string com a data e então transforma
// em um objeto javascript do tipo date
function parseDate(dateStr) {
  var _dateStr$split$map = dateStr.split("-").map(Number),
    _dateStr$split$map2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_dateStr$split$map, 6),
    day = _dateStr$split$map2[0],
    month = _dateStr$split$map2[1],
    year = _dateStr$split$map2[2],
    hours = _dateStr$split$map2[3],
    minutes = _dateStr$split$map2[4],
    seconds = _dateStr$split$map2[5];
  if (hours && minutes && seconds) {
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }
  return new Date(year, month - 1, day);
}

// Função que pega um objeto javascript do tipo date e cria uma exibição
// personalizada da data
function handleCustomDate(date) {
  var dateObj = parseDate(date);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  var customDate = dateObj.toLocaleDateString("pt-BR", options);
  return customDate;
}

// transformando o mês escrito em nome para escrito como numero
function turningMonthInNumber(monthName) {
  var monthObj = {
    janeiro: "01",
    fevereiro: "02",
    março: "03",
    abril: "04",
    maio: "05",
    junho: "06",
    julho: "07",
    agosto: "08",
    setembro: "09",
    outubro: "10",
    novembro: "11",
    dezembro: "12"
  };
  return monthObj[monthName.toLowerCase()] || null;
}

/***/ }),

/***/ "./js/modules/helpers/monetaryMask.js":
/*!********************************************!*\
  !*** ./js/modules/helpers/monetaryMask.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ monetaryMask)
/* harmony export */ });
function monetaryMask(value) {
  var valueTotal = value * 100;
  var valueFiltered = (valueTotal / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  return valueFiltered;
}

/***/ }),

/***/ "./js/modules/helpers/outside_click.js":
/*!*********************************************!*\
  !*** ./js/modules/helpers/outside_click.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ outsideClick)
/* harmony export */ });
function outsideClick(element, events, callback) {
  var html = document.documentElement;
  var outside = "data-outside";
  if (!element.hasAttribute(outside)) {
    element.setAttribute(outside, "");
    var handleOutsideClick = function handleOutsideClick(e) {
      if (!element.contains(e.target)) {
        element.removeAttribute(outside);
        html.removeEventListener(events, handleOutsideClick);
        callback();
      }
    };
    setTimeout(function () {
      return html.addEventListener(events, handleOutsideClick);
    });
  }
}

/***/ }),

/***/ "./js/modules/index/search_clients.js":
/*!********************************************!*\
  !*** ./js/modules/index/search_clients.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchClient)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _helpers_event_emitter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/event_emitter.js */ "./js/modules/helpers/event_emitter.js");




var SearchClient = /*#__PURE__*/function () {
  function SearchClient(fieldSearch, searchBtn, sugContainer, mainClientsWrapper, clients) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, SearchClient);
    this.fieldSearch = document.querySelector(fieldSearch);
    this.searchBtn = document.querySelector(searchBtn);
    this.sugContainer = document.querySelector(sugContainer);
    this.mainClientsWrapper = document.querySelector(mainClientsWrapper);
    this.clients = clients;
    this.msgWarning = {
      mainMessage: "Cliente não encontrado",
      firstAdvice: "Verifique se o cliente que está buscando ja foi anteriormente cadastrado.",
      secondAdvice: "Verifique a ortografia do que foi digitado.",
      thirdAdvice: "Tente novamente com outros termos."
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
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(SearchClient, [{
    key: "filterClients",
    value: function filterClients() {
      var searchValue = this.fieldSearch.value.toLowerCase();
      var foundClient = this.clients.filter(function (client) {
        return client.name.toLowerCase().includes(searchValue);
      }
      // eslint-disable-next-line function-paren-newline
      );
      return foundClient;
    }

    // Quando a pesquisa não resulta em um resultado válido
    // essa função renderiza uma mensagem de aviso ao usuário
  }, {
    key: "showWarningList",
    value: function showWarningList() {
      var mainClientsWrapper = document.querySelector("[data-wrapper]");
      var listwarnings = document.createElement("ul");
      listwarnings.classList.add("list-warnings");
      var searchWarnings = "<li class=\"font-r-l-b color-4\"> ".concat(this.msgWarning.mainMessage, "</li>\n                            <li class=\"font-r-m color-6\"> ").concat(this.msgWarning.firstAdvice, "</li>\n                            <li class=\"font-r-m color-6\"> ").concat(this.msgWarning.secondAdvice, "</li>\n                            <li class=\"font-r-m color-6\"> ").concat(this.msgWarning.thirdAdvice, "</li>");
      listwarnings.innerHTML = searchWarnings;
      mainClientsWrapper.innerHTML = "";
      mainClientsWrapper.appendChild(listwarnings);
    }

    // Método que exibe as sugestões no campo de busca enquanto o usuário digita
  }, {
    key: "showClientOnTheSearch",
    value: function showClientOnTheSearch() {
      var _this = this;
      var inputValue = this.fieldSearch.value.trim();
      var filteredClients = inputValue ? this.filterClients(inputValue) : [];
      this.sugContainer.innerHTML = "";
      this.sugContainer.classList.remove("input-search-suggestions");
      if (inputValue.length) {
        filteredClients.forEach(function (client) {
          _this.sugContainer.classList.add("input-search-suggestions");
          _this.sugContainer.innerHTML += "<a href=\"./client.html?id=".concat(client.id, "\" class=\"font-r-m color-0 suggestion-item\">").concat(client.name, "</a>");
        });
      }
    }

    // Método que verifica se a tecla enter é pressionada
  }, {
    key: "checkingIfEnterKey",
    value: function checkingIfEnterKey(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        window.location.href = this.href;
      }
    }

    // Métodos de execução

    // Método que lida com a execução da função de busca
  }, {
    key: "handleSearch",
    value: function handleSearch() {
      var _this2 = this;
      var filteredClients = this.filterClients();
      if (filteredClients.length <= 0) {
        this.showWarningList();
      } else {
        filteredClients.forEach(function (client) {
          if (client.name.toLowerCase() === _this2.fieldSearch.value.toLowerCase()) {
            window.location.href = "./client.html?id=".concat(client.id);
            _this2.removeEvents();
          } else {
            _this2.showWarningList();
          }
        });
      }
    }

    // Método que adiciona as ações de navegação por teclado
    // às sugestões de busca
  }, {
    key: "handleKeyNavigation",
    value: function handleKeyNavigation(e) {
      var suggestions = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(this.sugContainer.querySelectorAll(".suggestion-item"));
      var currentIndex = suggestions.findIndex(function (item) {
        return item === document.activeElement;
      });
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
  }, {
    key: "addEvents",
    value: function addEvents() {
      var _this3 = this;
      this.events.forEach(function (userEvent) {
        _this3.fieldSearch.addEventListener(userEvent, function (e) {
          // quando o campo de busca estiver vazio o evento de input
          // ira a acionar a função que esta no emitidor de eventos
          if (e.target.value === "") {
            _helpers_event_emitter_js__WEBPACK_IMPORTED_MODULE_3__["default"].emit("clearSearch");
          }
          if (e.key === "Enter") {
            e.preventDefault();
            _this3.handleSearch();
          }
          _this3.showClientOnTheSearch();
        });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
          _this3.handleKeyNavigation(e);
        }
      });
      this.sugContainer.querySelectorAll(".suggestion-item").forEach(function (item) {
        item.addEventListener("keydown", _this3.checkingIfEnterKey);
      });
      this.searchBtn.addEventListener("click", this.handleSearch);
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {
      var _this4 = this;
      this.events.forEach(function (userEvent) {
        _this4.fieldSearch.removeEventListener(userEvent, _this4.handleSearch);
      });
      document.removeEventListener("keydown", this.handleKeyNavigation);
      this.sugContainer.querySelectorAll(".suggestion-item").forEach(function (item) {
        item.removeEventListener("keydown", _this4.checkingIfEnterKey);
      });
      this.searchBtn.removeEventListener("click", this.handleSearch);
    }
  }, {
    key: "init",
    value: function init() {
      if (this.fieldSearch) {
        this.addEvents();
      }
      return this;
    }
  }]);
}();


/***/ }),

/***/ "./js/modules/index/show_clients_index.js":
/*!************************************************!*\
  !*** ./js/modules/index/show_clients_index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowClientsIndex)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _helpers_event_emitter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/event_emitter.js */ "./js/modules/helpers/event_emitter.js");



var ShowClientsIndex = /*#__PURE__*/function () {
  function ShowClientsIndex(clientsWrapper, clients, os) {
    var _this = this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ShowClientsIndex);
    this.clientsWrapper = document.querySelector(clientsWrapper);
    this.clients = clients;
    this.os = os;
    // adiciona uma função ao emitidor de eventos que deve
    // ser cumprida quando a condição for atingida
    _helpers_event_emitter_js__WEBPACK_IMPORTED_MODULE_2__["default"].on("clearSearch", function () {
      _this.clientsWrapper.innerHTML = "";
      _this.showClients();
    });
  }

  // Método que filtra as ordens de serviço baseando-se no nome
  // do cliente
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ShowClientsIndex, [{
    key: "filterOs",
    value: function filterOs(client) {
      var osAmount = this.os.filter(function (os) {
        return os.client_id === client.id;
      });
      return osAmount;
    }

    // Método que renderiza na tela o card com as informações do cliente
  }, {
    key: "showClients",
    value: function showClients() {
      var _this2 = this;
      this.clients.forEach(function (client) {
        var clientCard = document.createElement("a");
        var osAmount = _this2.filterOs(client);
        clientCard.classList.add("main__clients-card");
        clientCard.href = "./client.html?id=".concat(client.id);
        clientCard.innerHTML = "\n                              <h3 class=\"font-os-xl-b color-1\">".concat(client.name, "</h3>\n                              <p class=\"font-os-m color-2\">Ordens de servi\xE7o: <span class=\"font-os-m color-2 clients__card-client-number\">").concat(osAmount.length, "</span></p>\n                              ");
        _this2.clientsWrapper.appendChild(clientCard);
      });
    }

    // Método que inicia a classe
  }, {
    key: "init",
    value: function init() {
      if (this.clientsWrapper) {
        this.showClients();
      }
      return this;
    }
  }]);
}();


/***/ }),

/***/ "./js/modules/month_sales/month_sales.js":
/*!***********************************************!*\
  !*** ./js/modules/month_sales/month_sales.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MonthSales)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _helpers_monetaryMask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/monetaryMask */ "./js/modules/helpers/monetaryMask.js");
/* harmony import */ var _client_form_validations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../client/form_validations */ "./js/modules/client/form_validations.js");
/* harmony import */ var _helpers_formatDate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/formatDate.js */ "./js/modules/helpers/formatDate.js");







/* eslint-disable operator-linebreak */
var MonthSales = /*#__PURE__*/function () {
  function MonthSales(form, salesWrapper, btnPrint, clients, os) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, MonthSales);
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
        valueMissing: "O campo do cliente não pode estar vazio."
      },
      monthSale: {
        valueMissing: "O campo de mês não pode estar vazio."
      },
      yearSale: {
        valueMissing: "O campo de ano não pode estar vazio."
      }
    };
  }

  // Métodos de auxílio

  // Preenche o select com os clientes cadastrados
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(MonthSales, [{
    key: "fillSelect",
    value: function fillSelect() {
      var select = this.form.elements.clientSale;
      this.clients.forEach(function (client) {
        var option = "<option value=\"".concat(client.name, "\">").concat(client.name, "</option>");
        select.innerHTML += option;
      });
    }

    // Filtra a os baseado nos dados do formulário preenchido
    // buscando eles no localStorage
  }, {
    key: "filterOs",
    value: function filterOs() {
      var _this = this;
      var lsData = localStorage.getItem("formData");
      if (lsData) {
        this.dataForm = JSON.parse(lsData);
      }
      this.filteredOs = this.os.filter(function (item) {
        // eslint-disable-next-line no-unused-vars
        var _item$date$split = item.date.split("-"),
          _item$date$split2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_item$date$split, 3),
          cday = _item$date$split2[0],
          cMonth = _item$date$split2[1],
          cYear = _item$date$split2[2];
        var monthNumber = (0,_helpers_formatDate_js__WEBPACK_IMPORTED_MODULE_5__.turningMonthInNumber)(_this.dataForm.monthSale.toLowerCase());
        if (monthNumber) {
          return item.client === _this.dataForm.clientSale && cMonth === monthNumber && cYear === _this.dataForm.yearSale;
        }
        return _this.filteredOs;
      });
    }

    // Define o que será mostrado na tela caso o a busca no formúlario
    // não tenha nenhuma correspondencia
  }, {
    key: "calculateTotal",
    value:
    // Calcura o total das vendas do mês
    function calculateTotal() {
      var _this2 = this;
      if (this.filteredOs.length) {
        this.total = 0;
        this.filteredOs.forEach(function (os) {
          _this2.total += os.total;
          if (os.budgetValue > 0 && os.budgetValue !== null) _this2.total += os.budgetValue;
        });
      }
    }

    // Renderiza a seção que exibe as vendas do mês e o total vendido
  }, {
    key: "renderingMonthSales",
    value: function renderingMonthSales() {
      var salesTitle = document.querySelector("[data-sale-title]");
      this.article.innerHTML = "";
      this.article.classList.add("sales_report-container");
      if (!this.filteredOs.length) {
        var msg = MonthSales.ifWrongDate();
        this.btnPrint.style.display = "block";
        salesTitle.innerHTML = "";
        this.article.innerHTML = msg;
      } else {
        var titleContent = "Valores vendidos no m\xEAs de ".concat(this.dataForm.monthSale);
        salesTitle.innerHTML = titleContent;
        this.btnPrint.style.display = "block";
        var salesTotal = (0,_helpers_monetaryMask__WEBPACK_IMPORTED_MODULE_3__["default"])(this.total);
        var salesContent = MonthSales.ifRightDate(this.filteredOs);
        this.article.innerHTML += " <h3 class=\"font-os-xl-b color-13\">".concat(this.dataForm.clientSale, "</h3>");
        this.article.innerHTML += salesContent;
        this.article.innerHTML += "\n            <div class=\"sales__report-total color-13 font-os-xl-b\">\n                <p>Total:</p>\n                <p>".concat(salesTotal, "</p>\n            </div>\n           ");
      }
      this.salesWrapper.insertBefore(this.article, this.btnPrint);
    }

    // lida com o evento do form
  }, {
    key: "handleFormSales",
    value: function handleFormSales(e) {
      e.preventDefault();
      MonthSales.getData(e);
      this.filterOs();
      this.calculateTotal();
      this.renderingMonthSales();
    }

    // Imprime as vendas do mês
  }, {
    key: "printMonthSales",
    value: function printMonthSales() {
      window.print();
      return this;
    }

    // Adiciona os eventos
  }, {
    key: "addEvents",
    value: function addEvents() {
      var _this3 = this;
      this.form.addEventListener("submit", function (e) {
        return _this3.handleFormSales(e);
      });
      this.btnPrint.addEventListener("click", this.printMonthSales);
      this.form.querySelectorAll("[data-sale]").forEach(function (field) {
        field.addEventListener("blur", function (e) {
          (0,_client_form_validations__WEBPACK_IMPORTED_MODULE_4__.fieldValidation)(e.target, _this3.errsMsg, _this3.errsType, ".msgError");
        });
      });
    }
  }, {
    key: "init",
    value: function init() {
      if (this.form) {
        this.addEvents();
        this.fillSelect();
      }
      return this;
    }
  }], [{
    key: "ifWrongDate",
    value: function ifWrongDate() {
      var contentScreen = "   \n      <p class=\"font-os-s color-13\">Nenhuma venda foi registrada neste m\xEAs para o cliente selecionado,\n        verifique os dados que foram inseridos no formul\xE1rio acima e tente novamente.\n    </p>";
      return contentScreen;
    }

    // Mostra os items das vendas mensais
  }, {
    key: "ifRightDate",
    value: function ifRightDate(filteredOs) {
      var contentScreen = "";
      filteredOs.forEach(function (os) {
        var customMonth = (0,_helpers_formatDate_js__WEBPACK_IMPORTED_MODULE_5__.handleCustomDate)(os.date);
        var totalValue = os.budgetValue > 0 && os.budgetValue !== null ? os.budgetValue : os.total;
        var osTotal = (0,_helpers_monetaryMask__WEBPACK_IMPORTED_MODULE_3__["default"])(totalValue);
        contentScreen += " \n          <ul class=\"sales__report-item font-os-m-b color-13\">\n            <li>".concat(os.code, "</li>\n            <li>").concat(customMonth, "</li>\n            <li>").concat(osTotal, "</li>\n          </ul>");
      });
      return contentScreen;
    }

    // Métodos de execução
    // captura os dados do form e envia para o localStorage
  }, {
    key: "getData",
    value: function getData(e) {
      var formData = new FormData(e.target);
      var data = Object.fromEntries(formData.entries());
      var dataString = JSON.stringify(data);
      localStorage.clear();
      localStorage.setItem("formData", dataString);
    }
  }]);
}();


/***/ }),

/***/ "./js/modules/osPage/os_page.js":
/*!**************************************!*\
  !*** ./js/modules/osPage/os_page.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OsPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers_api_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/api_service.js */ "./js/modules/helpers/api_service.js");
/* harmony import */ var _helpers_event_emitter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/event_emitter.js */ "./js/modules/helpers/event_emitter.js");
/* harmony import */ var _helpers_monetaryMask_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/monetaryMask.js */ "./js/modules/helpers/monetaryMask.js");
/* harmony import */ var _helpers_formatDate_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/formatDate.js */ "./js/modules/helpers/formatDate.js");
/* harmony import */ var _helpers_confirm_modal_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../helpers/confirm_modal.js */ "./js/modules/helpers/confirm_modal.js");









var OsPage = /*#__PURE__*/function () {
  function OsPage(os, titleCode, osWrapper, btn, url) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, OsPage);
    this.os = this.filteredOs(os);
    this.url = url;
    this.titleCode = document.querySelector(titleCode);
    this.osWrapper = document.querySelector(osWrapper);
    this.btn = document.querySelectorAll(btn);
    this.urlId = null;
    this.msgWrapper = document.createElement("span");
    this.deleteOs = this.deleteOs.bind(this);
    this.printServiceOrder = this.printServiceOrder.bind(this);
  }

  // Métodos de auxílio
  // Método que captura o id da os com base na url
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(OsPage, [{
    key: "filteredOs",
    value:
    // Filtra o array de os's baseado no id fornecido na url
    function filteredOs(os) {
      var _this = this;
      this.urlId = OsPage.getIdFromUrl();
      var filteredOs = os.find(function (item) {
        return item.id === parseFloat(_this.urlId);
      });
      return filteredOs;
    }

    // Lida com a opção de esconder ou mostrar as medidas da os
  }, {
    key: "handleMeasure",
    value: function handleMeasure(element) {
      var showMeasure = "";
      if (this.os.hideMeasure === "nao") {
        showMeasure = "".concat(element.height, " / ").concat(element.width);
      } else {
        showMeasure = "";
      }
      return showMeasure;
    }

    // Busca as notas de serviço que são específicas para a OS em questão
  }, {
    key: "filterService",
    value: function () {
      var _filterService = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        var _this2 = this;
        var apiServices, service, filteredService;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              apiServices = new _helpers_api_service_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.url);
              _context.next = 4;
              return apiServices.getWithId("service_details", String(this.os.id)).then(function (data) {
                return data.data;
              });
            case 4:
              service = _context.sent;
              filteredService = service.filter(function (item) {
                return item.note_id === _this2.os.id;
              });
              filteredService.sort(function (a, b) {
                return a.order - b.order;
              });
              return _context.abrupt("return", filteredService);
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);
              return _context.abrupt("return", []);
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 10]]);
      }));
      function filterService() {
        return _filterService.apply(this, arguments);
      }
      return filterService;
    }() // Exibe os serviços na ordem de serviço
  }, {
    key: "showServiceValues",
    value: function () {
      var _showServiceValues = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2(serviceContainer) {
        var _this3 = this;
        var serviceValues, filteredService;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              serviceValues = document.querySelector(serviceContainer);
              serviceValues.innerHTML = "";
              _context2.next = 4;
              return this.filterService();
            case 4:
              filteredService = _context2.sent;
              filteredService.forEach(function (element) {
                var serviceValue = _this3.os.budgetValue ? "" : (0,_helpers_monetaryMask_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element.serviceValue);
                var measures = _this3.handleMeasure(element);
                serviceValues.innerHTML += "\n            <ul class=\"content__values font-os-s-b\">\n                <li>".concat(element.serviceAmount, "</li>\n                <li>").concat(measures, "</li>\n                <li>").concat(element.serviceName, "</li>\n                <li>").concat(serviceValue, "</li>\n            </ul>\n          ");
              });
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function showServiceValues(_x) {
        return _showServiceValues.apply(this, arguments);
      }
      return showServiceValues;
    }() // Exibe uma mensagem de erro caso a ordem de serviço não seja deletada
  }, {
    key: "showDeleteMsg",
    value: function showDeleteMsg(msg, className) {
      var container = document.querySelector(".main__os");
      this.msgWrapper.classList.add(className);
      this.msgWrapper.innerHTML = msg;
      this.msgWrapper.style.display = "block";
      container.appendChild(this.msgWrapper);
    }

    // Remove a mensagem de erro
  }, {
    key: "removeDeleteMsg",
    value: function removeDeleteMsg() {
      this.msgWrapper.style.display = "none";
    }

    // Métodos de execução

    // Exibe o código da ordem de serviço no título da página
  }, {
    key: "osCodeOnTitle",
    value: function osCodeOnTitle() {
      if (this.os) {
        this.titleCode.innerText = this.os.code;
      } else {
        this.titleCode.innerText = "";
      }
    }

    // Cria e exibe o HTML da ordem de serviço
  }, {
    key: "showOsOnScreen",
    value: function showOsOnScreen() {
      if (this.os) {
        var customDate = (0,_helpers_formatDate_js__WEBPACK_IMPORTED_MODULE_7__.handleCustomDate)(this.os.date);
        var total = (0,_helpers_monetaryMask_js__WEBPACK_IMPORTED_MODULE_6__["default"])(this.os.budgetValue === 0 || this.os.budgetValue === null ? this.os.total : this.os.budgetValue);
        var osContent = "\n      <div class=\"os__header\">\n      <div class=\"os__logo--container\">\n          <img class=\"os__logo\" src=\"../img/icones/logo-os.svg\" width=\"110\" height=\"110\"\n              alt=\"Logo da ordem de servi\xE7o\">\n      </div>\n      <h2 class=\"os__title font-os-xl-b\">Ordem de servi\xE7o</h2>\n      <span class=\"os__code font-os-l-b\">O.S: ".concat(this.os.code, "</span>\n      <p class=\"os__email font-os-s-b color-11\">adm.xavier@hotmail.com</p>\n      <p class=\"os__tel font-os-s-b color-11\">(11) 94285-8422</p>\n      <p class=\"os__adress font-os-s-b color-11\">Rua Aurora paulistana, 252-A Freguesia do \xD3 - S\xE3o Paulo - SP - Cep: 02965-030</p>\n      </div>\n      <div class=\"os__client position__os\">\n      <div>\n          <span class=\"font-os-xxs\">Cliente:</span>\n          <p class=\"font-os-s-b\">").concat(this.os.client, "</p>\n      </div>\n      <p class=\"font-os-s-b \">").concat(customDate, "</p>\n      </div>\n      <div class=\"os__thickness position__os\">\n      <span class=\"font-os-xxs color-11\">Espessura:</span>\n      <p class=\"font-os-s-b\">").concat(this.os.thickness, "</p>\n      </div>\n      <div class=\"os__itens\">\n        <p class=\"font-os-s-b \">Quant.</p>\n        <p class=\"font-os-s-b \">Medidas</p>\n        <p class=\"font-os-s-b \">Servi\xE7os</p>\n        <p class=\"font-os-s-b \">Total</p>\n      </div>\n      <div class=\"os__content\" data-serviceValues>\n      </div>\n      <div class=\"os__payment\">\n      <p class=\"font-os-m\">Valor total do pedido:</p>\n      <p class=\"font-os-m-b\">").concat(total, "</p>\n      </div>\n      <div class=\"os__signature\">\n      <p class=\"font-os-xs\">Visto:</p>\n      </div>\n  ");
        this.osWrapper.innerHTML = osContent;
        this.showServiceValues("[data-serviceValues]");
      } else {
        this.titleCode.parentElement.innerHTML = "";
        this.osWrapper.style.backgroundColor = "transparent";
        this.osWrapper.style.boxShadow = "none";
        this.osWrapper.innerHTML = "<p class=\"font-r-xl color-3 msgOsDeleted\">Sua nota de servi\xE7o foi excluida com sucesso!</p>\n  <a href=index.html class=\"font-r-m-b color-prim1 linkOsDeleted\">voltar para a p\xE1gina principal</a>";
        this.btn.forEach(function (btn) {
          btn.style.display = "none";
        });
      }
    }

    // Imprime a ordem de serviço
  }, {
    key: "printServiceOrder",
    value: function printServiceOrder() {
      if (this.os) {
        window.print();
      }
    }

    // Deleta a ordem de serviço
  }, {
    key: "deleteOs",
    value: function () {
      var _deleteOs = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee4() {
        var _this4 = this;
        var userConfirm, apiServices, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0,_helpers_confirm_modal_js__WEBPACK_IMPORTED_MODULE_8__["default"])("Você tem certeza que deseja deletar essa ordem de serviço? Você não poderá recupera-lá depois.");
            case 2:
              userConfirm = _context4.sent;
              if (!this.os) {
                _context4.next = 17;
                break;
              }
              if (!userConfirm) {
                _context4.next = 17;
                break;
              }
              apiServices = new _helpers_api_service_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.url, this.os.id);
              _context4.prev = 6;
              _context4.next = 9;
              return apiServices["delete"]("os");
            case 9:
              response = _context4.sent;
              if (response && response.clientId) {
                this.os = null;
                this.showOsOnScreen();
                this.btn[1].disabled = "true";
                setTimeout(function () {
                  window.location.href = "./client.html?id=".concat(encodeURIComponent(response.clientId));
                }, 500);
              }
              _context4.next = 17;
              break;
            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](6);
              console.error("Erro ao deletar a os:", _context4.t0);
              _helpers_event_emitter_js__WEBPACK_IMPORTED_MODULE_5__["default"].on("failedMsg", /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee3() {
                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      _this4.showDeleteMsg("<p class=\"font-r-l-b\">Houve um problema e a os n\xE3o pode ser deletada, tente novamente mais tarde!</p>", "failedMsg");
                      setTimeout(function () {
                        _this4.removeDeleteMsg();
                      }, 2000);
                    case 2:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3);
              })));
            case 17:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[6, 13]]);
      }));
      function deleteOs() {
        return _deleteOs.apply(this, arguments);
      }
      return deleteOs;
    }() // Adiciona os eventos aos botões da página
  }, {
    key: "addEventsOnButton",
    value: function addEventsOnButton() {
      var _this5 = this;
      this.btn.forEach(function (btn) {
        if (btn.innerText === "EXCLUIR") {
          btn.addEventListener("click", _this5.deleteOs);
          btn.addEventListener("click", _this5.deleteOs);
        } else {
          btn.addEventListener("click", _this5.printServiceOrder);
          btn.addEventListener("click", _this5.printServiceOrder);
        }
      });
    }
  }, {
    key: "init",
    value: function init() {
      if (this.btn.length) {
        this.osCodeOnTitle();
        this.showOsOnScreen();
        this.addEventsOnButton();
      }
      return this;
    }
  }], [{
    key: "getIdFromUrl",
    value: function getIdFromUrl() {
      var urlParams = new URLSearchParams(window.location.search);
      var clientId = urlParams.get("id");
      return clientId;
    }
  }]);
}();


/***/ }),

/***/ "./js/modules/sales_balance/sales_balance.js":
/*!***************************************************!*\
  !*** ./js/modules/sales_balance/sales_balance.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SalesBalance)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers_api_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/api_service.js */ "./js/modules/helpers/api_service.js");
/* harmony import */ var _helpers_monetaryMask_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/monetaryMask.js */ "./js/modules/helpers/monetaryMask.js");
/* harmony import */ var _helpers_formatDate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/formatDate.js */ "./js/modules/helpers/formatDate.js");
/* harmony import */ var _client_form_validations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../client/form_validations */ "./js/modules/client/form_validations.js");








var SalesBalance = /*#__PURE__*/function () {
  function SalesBalance(url, salesWrapper, moreLessWrapper, inputList, balanceTitle) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, SalesBalance);
    this.url = url;
    this.salesWrapper = document.querySelector(salesWrapper);
    this.moreLessWrapper = document.querySelector(moreLessWrapper);
    this.inputList = document.querySelectorAll(inputList);
    this.balanceTitle = document.querySelector(balanceTitle);
    this.article = document.createElement("article");
    this.renderingSalesBalance = this.renderingSalesBalance.bind(this);
    this.errsType = ["valueMissing"];
    this.errsMsg = {
      monthBalance: {
        valueMissing: "O campo de mês não pode estar vazio."
      },
      yearBalance: {
        valueMissing: "O campo de ano não pode estar vazio."
      }
    };
  }

  // Métodos de auxílio

  // Busca as notas de serviço no bando de dados baseado em um determinado mês e ano
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(SalesBalance, [{
    key: "searchOsByDate",
    value: function () {
      var _searchOsByDate = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        var apiService, date, monthYear, _yield$apiService$get, os;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              apiService = new _helpers_api_service_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.url);
              date = this.handleInputInfo();
              if (!date) {
                _context.next = 9;
                break;
              }
              monthYear = "".concat((0,_helpers_formatDate_js__WEBPACK_IMPORTED_MODULE_6__.turningMonthInNumber)(date.month), "-").concat(date.year);
              _context.next = 6;
              return apiService.getByMonth("os", monthYear);
            case 6:
              _yield$apiService$get = _context.sent;
              os = _yield$apiService$get.os;
              return _context.abrupt("return", os);
            case 9:
              return _context.abrupt("return", []);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function searchOsByDate() {
        return _searchOsByDate.apply(this, arguments);
      }
      return searchOsByDate;
    }() // Se o array de serviço estiver vazio renderiza uma msg
  }, {
    key: "ifSalesArrayEmpty",
    value: function ifSalesArrayEmpty() {
      var msg = "<p class=\"font-os-l color-13\">Nenhuma venda foi registrada neste m\xEAs.</p>";
      this.article.innerHTML = msg;
    }

    // Se houver itens dentro do array de serviços renderiza os clientes e o total de suas vendas
  }, {
    key: "ifSalesArrayFull",
    value: function ifSalesArrayFull(os, date) {
      var _this = this;
      var total = 0;
      os.forEach(function (item) {
        var ul = document.createElement("ul");
        ul.classList.add("sales__report-item");
        ul.classList.add("sales__report-style");
        ul.innerHTML = " <li class=\"font-os-m-b color-13\">".concat(item.client_name, "</li>\n            <li class=\"font-os-m-b color-13\">").concat(date.month, " de ").concat(date.year, "</li>\n            <li class=\"font-os-m-b color-13\">").concat((0,_helpers_monetaryMask_js__WEBPACK_IMPORTED_MODULE_5__["default"])(item.total), "</li>");
        _this.article.appendChild(ul);
        total += item.total;
      });
      this.article.innerHTML += "<div class=\"sales__report-total color-13 font-os-xl-b\">\n                                <p>Total:</p>\n                                <p>".concat((0,_helpers_monetaryMask_js__WEBPACK_IMPORTED_MODULE_5__["default"])(total), "</p>\n                                </div>");
    }
  }, {
    key: "handleInputInfo",
    value: function handleInputInfo() {
      if (this.inputList.length <= 0) {
        return [];
      }
      var date = {
        month: this.inputList[0].value,
        year: this.inputList[1].value
      };
      return date;
    }

    // Métodos de execução

    // Renderiza na tela a exibição dos dados
  }, {
    key: "renderingSalesBalance",
    value: function () {
      var _renderingSalesBalance = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        var os, date;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.searchOsByDate();
            case 2:
              os = _context2.sent;
              date = this.handleInputInfo();
              this.article.classList.add("sales_report-container");
              if (os.length <= 0) {
                this.ifSalesArrayEmpty();
              } else {
                this.balanceTitle.innerHTML = "Ver balan\xE7o de vendas do m\xEAs ".concat(date.month);
                this.article.innerHTML = "";
                this.ifSalesArrayFull(os, date);
                this.handleSalesMoreLess(os);
                this.salesWrapper.insertBefore(this.article, this.moreLessWrapper);
              }
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function renderingSalesBalance() {
        return _renderingSalesBalance.apply(this, arguments);
      }
      return renderingSalesBalance;
    }() // Lida com o calculo e com a exibição do cliente que menos vendo e
    // do cliente que mais vendeu
  }, {
    key: "handleSalesMoreLess",
    value: function handleSalesMoreLess(os) {
      var biggerValue = os.reduce(function (acc, val) {
        return val.total > acc.total ? val : acc;
      });
      var minorValue = os.reduce(function (acc, val) {
        return val.total < acc.total ? val : acc;
      });
      this.moreLessWrapper.querySelector(".bigger-name").innerHTML = "".concat(biggerValue.client_name, " - ");
      this.moreLessWrapper.querySelector(".bigger-value").innerHTML = (0,_helpers_monetaryMask_js__WEBPACK_IMPORTED_MODULE_5__["default"])(biggerValue.total);
      this.moreLessWrapper.querySelector(".minor-name").innerHTML = "".concat(minorValue.client_name, " - ");
      this.moreLessWrapper.querySelector(".minor-value").innerHTML = (0,_helpers_monetaryMask_js__WEBPACK_IMPORTED_MODULE_5__["default"])(minorValue.total);
      this.moreLessWrapper.style.display = "block";
    }
  }, {
    key: "handleEvents",
    value: function handleEvents() {
      var _this2 = this;
      if (this.inputList.length > 0) {
        this.inputList[2].addEventListener("click", this.renderingSalesBalance);
        this.inputList[1].addEventListener("keydown", function (e) {
          if (e.key === "Enter") _this2.renderingSalesBalance();
        });
      }
      this.inputList[0].addEventListener("blur", function (e) {
        (0,_client_form_validations__WEBPACK_IMPORTED_MODULE_7__.fieldValidation)(e.target, _this2.errsMsg, _this2.errsType, ".msgError");
      });
      this.inputList[1].addEventListener("blur", function (e) {
        (0,_client_form_validations__WEBPACK_IMPORTED_MODULE_7__.fieldValidation)(e.target, _this2.errsMsg, _this2.errsType, ".msgError");
      });
    }
  }, {
    key: "init",
    value: function init() {
      if (document.querySelector(".main__balance")) {
        this.handleEvents();
      }
      return this;
    }
  }]);
}();


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_global_menu_mobile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/global/menu_mobile.js */ "./js/modules/global/menu_mobile.js");
/* harmony import */ var _modules_index_search_clients_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/index/search_clients.js */ "./js/modules/index/search_clients.js");
/* harmony import */ var _modules_index_show_clients_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/index/show_clients_index.js */ "./js/modules/index/show_clients_index.js");
/* harmony import */ var _modules_client_client_page_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/client/client_page.js */ "./js/modules/client/client_page.js");
/* harmony import */ var _modules_client_client_os_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/client/client_os.js */ "./js/modules/client/client_os.js");
/* harmony import */ var _modules_client_form_client_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/client/form_client.js */ "./js/modules/client/form_client.js");
/* harmony import */ var _modules_client_form_os_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/client/form_os.js */ "./js/modules/client/form_os.js");
/* harmony import */ var _modules_osPage_os_page_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/osPage/os_page.js */ "./js/modules/osPage/os_page.js");
/* harmony import */ var _modules_month_sales_month_sales_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/month_sales/month_sales.js */ "./js/modules/month_sales/month_sales.js");
/* harmony import */ var _modules_sales_balance_sales_balance_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/sales_balance/sales_balance.js */ "./js/modules/sales_balance/sales_balance.js");
/* harmony import */ var _modules_helpers_api_service_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/helpers/api_service.js */ "./js/modules/helpers/api_service.js");
/* harmony import */ var _modules_global_navigation_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/global/navigation.js */ "./js/modules/global/navigation.js");











// requisições fetch


var url = "http://localhost:3000";
var apiServices = new _modules_helpers_api_service_js__WEBPACK_IMPORTED_MODULE_10__["default"](url);
var clients = await apiServices.get("clients").then(function (data) {
  return data.clients;
});
var os = await apiServices.get("os").then(function (data) {
  return data.os;
});

// Animação;
if (window.SimpleAnime) {
  // eslint-disable-next-line no-new, no-undef
  new SimpleAnime();
}

// instancias de classes da aplicação
var menuMobile = new _modules_global_menu_mobile_js__WEBPACK_IMPORTED_MODULE_0__["default"]("[data-btn-menu]", '[data-menu="list"]', "click");
menuMobile.init();
var searchClient = new _modules_index_search_clients_js__WEBPACK_IMPORTED_MODULE_1__["default"]("[data-search]", "[data-btnSearch]", '[data-input="suggestion"]', "[data-wrapper]", clients);
searchClient.init();
var showClientsIndex = new _modules_index_show_clients_index_js__WEBPACK_IMPORTED_MODULE_2__["default"]("[data-wrapper]", clients, os);
showClientsIndex.init();
var clientPage = new _modules_client_client_page_js__WEBPACK_IMPORTED_MODULE_3__["default"]('[data-name="client"]', '[data-info="client"]', '[data-action="delete-client"]', clients, url);
clientPage.init();
var clientOs = new _modules_client_client_os_js__WEBPACK_IMPORTED_MODULE_4__["default"]('[data-os="wrapper"]', "[data-osSearch]", '[data-os="ver-mais"]', '[data-os="ver-menos"]', os, clientPage.client);
clientOs.init();
var formClient = new _modules_client_form_client_js__WEBPACK_IMPORTED_MODULE_5__["default"]("[data-form]", "[data-field]", clientPage.client, url);
formClient.init();
var formOs = new _modules_client_form_os_js__WEBPACK_IMPORTED_MODULE_6__["default"]("[data-formOs]", "[data-btnServiceAmount]", "[data-serviceItem]", clients, os, url);
formOs.init();
var osPage = new _modules_osPage_os_page_js__WEBPACK_IMPORTED_MODULE_7__["default"](os, "[data-titleOs] span", "[data-os]", "[data-buttonOs]", url);
osPage.init();
var monthSales = new _modules_month_sales_month_sales_js__WEBPACK_IMPORTED_MODULE_8__["default"]("[data-form-sales]", "[data-sales-wrapper]", "[data-sale-btn]", clients, os);
monthSales.init();
var navigation = new _modules_global_navigation_js__WEBPACK_IMPORTED_MODULE_11__["default"](".page__navigation-prev", ".page__navigation-next");
navigation.init();
var salesBalance = new _modules_sales_balance_sales_balance_js__WEBPACK_IMPORTED_MODULE_9__["default"](url, "[data-sales-balance]", ".sales__more-less", "[data-balance]", ".balance-title");
salesBalance.init();
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function toPrimitive(t, r) {
  if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function toPropertyKey(t) {
  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t, "string");
  return "symbol" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i) ? i : i + "";
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map
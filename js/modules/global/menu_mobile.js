import outsideClick from "../helpers/outside_click.js";

export default class MenuMobile {
  constructor(btnList, menu, event, activeClass) {
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
  handleMenu() {
    setTimeout(() => {
      this.menu.classList.toggle(this.activeClass);
      outsideClick(this.menu, this.event, () => {
        this.menu.classList.remove(this.activeClass);
      });
    });
  }

  // adiciona os eventos de clique nos botões do menu
  // tanto o botão externo quanto o interno
  eventOnMenu() {
    this.btnList.forEach((btn) => {
      btn.addEventListener(this.event, this.handleMenu);
    });
  }

  // inicia a classe
  init() {
    if (this.menu && this.btnList.length) {
      this.eventOnMenu();
    }
    return this;
  }
}

export default class Navigation {
  constructor(btnPrev, btnNext) {
    this.btnPrev = document.querySelector(btnPrev);
    this.btnNext = document.querySelector(btnNext);
  }

  static navPrevious() {
    window.history.back();
  }

  static navNext() {
    window.history.forward();
  }

  addEvents() {
    if (this.btnPrev) {
      this.btnPrev.addEventListener("click", Navigation.navPrevious);
    } else {
      console.warn(`Elemento para btnPrev não encontrado: ${this.btnPrev}`);
    }

    if (this.btnNext) {
      this.btnNext.addEventListener("click", Navigation.navNext);
    } else {
      console.warn(`Elemento para btnNext não encontrado: ${this.btnNext}`);
    }
  }

  init() {
    this.addEvents();
    return this;
  }
}

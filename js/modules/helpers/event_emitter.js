class EventEmitter {
  constructor() {
    this.events = {};
  }

  // verifica se existe uma função atrelada ao evento, se não
  // cria um array vazio para que funcões possam ser adicionadas
  on(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  // itera sob o array para ativar as funções que foram adicionadas nele
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => fn(data));
    }
  }
}

export default new EventEmitter();

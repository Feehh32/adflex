import eventEmitter from "./event_emitter";

export default class ApiService {
  constructor(baseUrl, optionParams) {
    this.baseUrl = baseUrl;
    this.optionParams = optionParams ?? "";
  }

  async get(endpoint) {
    try {
      let url = `${this.baseUrl}/${endpoint}`;
      if (this.optionParams) {
        url += `/${this.optionParams}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar no servidor:", error);
      throw error;
    }
  }

  async post(endpoint, data) {
    try {
      let url = `${this.baseUrl}/${endpoint}`;
      if (this.optionParams) {
        url += `/${this.optionParams}`;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        eventEmitter.emit("failedMsg", response.status);
        throw new Error(errorMessage);
      }
      eventEmitter.emit("sucessMsg");
      return await response.json();
    } catch (error) {
      console.error("Erro ao enviar dados para o servidor:", error);
      throw error;
    }
  }

  async createClient(data) {
    return this.post("clients", data);
  }

  async createServiceNote(data) {
    return this.post("os", data);
  }

  async delete(endpoint) {
    try {
      let url = `${this.baseUrl}/${endpoint}`;
      if (this.optionParams) {
        url += `/${this.optionParams}`;
      }

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        eventEmitter.emit("failedMsg");
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }
      eventEmitter.emit("sucessMsg");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async put(endpoint, data) {
    try {
      let url = `${this.baseUrl}/${endpoint}`;
      if (this.optionParams) {
        url += `/${this.optionParams}`;
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        eventEmitter.emit("failedMsg");
        throw new Error(`HTTP error! status: ${response.statusText}`);
      } else {
        eventEmitter.emit("sucessMsg");
        return await response.json();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

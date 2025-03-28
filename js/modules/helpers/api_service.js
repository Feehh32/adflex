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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar no servidor:", error);
      throw error;
    }
  }

  async getParameters(endpoint, param) {
    try {
      const url = `${this.baseUrl}/${endpoint}/${param}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar no servidor:", error);
      throw error;
    }
  }

  async getBalance(endpoint, month, year) {
    try {
      const encodeMonth = encodeURIComponent(month);
      const encodeYear = encodeURIComponent(year);
      const url = `${this.baseUrl}/${endpoint}/${encodeMonth}/${encodeYear}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar no servidor:", error);
      throw error;
    }
  }

  async getMonthSales(endpoint, date, id) {
    try {
      const encodeDate = encodeURIComponent(date);
      const parseId = parseInt(id, 10);
      const url = `${this.baseUrl}/${endpoint}/${encodeDate}/${parseId}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
      const data = await response.json();
      if (!response.ok) {
        eventEmitter.emit("failedMsg");
        throw new Error(data.error || `Erro ao deletar`);
      }
      eventEmitter.emit("sucessMsg");
      return data;
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
        throw new Error(`HTTP error! status: ${response.status}`);
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

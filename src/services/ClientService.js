import Configuration from "../config/configuration";
import axios from "axios";

class ClientService {
  constructor() {
    this.config = new Configuration();
  }

  addClient(formData) {
    return axios.post(
      this.config.apiBaseUrl + "client//create-client",
      formData
    );
  }

  getClientById(orderId) {
    return axios.get(this.config.apiBaseUrl + "client/" + orderId);
  }

  getAllClient() {
    return axios.get(this.config.apiBaseUrl + "client/show-client");
  }

  updateClient(formData) {
    return axios.put(this.config.apiBaseUrl + "client/:id", formData);
  }

  deleteClient(id) {
    return axios.delete(this.config.apiBaseUrl + "client/:id", id);
  }

  handleError(error) {
    console.log(error.message);
  }
}

export default new ClientService();

import Configuration from "../config/configuration";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class ClientService {
  constructor() {
    this.config = new Configuration();
  }

  addClient(formData) {
    return axios.post(
      this.config.apiBaseUrl + "client/create-client",
      formData
    );
  }

  getClientById(id) {
    return axios.get(this.config.apiBaseUrl + "client/" + id);
  }

  getAllClient() {
    return axios.get(this.config.apiBaseUrl + "client/show-client");
  }

  updateClient(id, formData) {
    return axios.put(this.config.apiBaseUrl + "client/" + id, formData);
  }

  deleteClient(id) {
    return axios.delete(this.config.apiBaseUrl + "client/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added Client");
    else if (type === "update") toast("Successfully updated Client");
    else if (type === "delete") toast("Successfully deleted Client");
  }

  handleError() {
    toast("Something went wrong!");
  }
}

export default new ClientService();

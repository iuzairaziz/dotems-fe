import Configuration from "../config/configuration";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class ClientService {
  constructor() {
    this.config = new Configuration();
  }

  addExpense(formData) {
    return axios.post(
      this.config.apiBaseUrl + "expense/create-expense",
      formData
    );
  }

  getClientById(orderId) {
    return axios.get(this.config.apiBaseUrl + "client/" + orderId);
  }

  getAllClient() {
    return axios.get(this.config.apiBaseUrl + "client/show-client");
  }

  updateClient(id, formData) {
    return axios.put(this.config.apiBaseUrl + "client/" + id, formData);
  }

  deleteClient(id) {
    return axios.delete(this.config.apiBaseUrl + "client/:id", id);
  }

  handleError(error) {
    console.log(error.message);
  }
  handleMessage(type) {
    if (type === "add") toast("Successfully added expense");
    else if (type === "update") toast("Successfully updated expense");
    else if (type === "delete") toast("Successfully deleted expense");
  }

  handleError() {
    toast("Something went wrong!");
  }
}

export default new ClientService();

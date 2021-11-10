import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class ClientLabelService {
  constructor() {
    this.config = new Configuration();
  }

  addClientLabel(formData) {
    return axios.post(
      this.config.apiBaseUrl + "client-label/create-clientlabel",
      formData
    );
  }

  // getCountryById(orderId) {
  //   return axios.get(this.config.apiBaseUrl + "tasks/" + orderId);
  // }

  getAllClientLabel() {
    return axios.get(this.config.apiBaseUrl + "client-label/show-clientlabel");
  }

  updateClientLabel(id, formData) {
    return axios.put(this.config.apiBaseUrl + "client-label/" + id, formData);
  }

  deleteClientLabel(id) {
    return axios.delete(this.config.apiBaseUrl + "client-label/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added Client Label");
    else if (type === "update") toast("Successfully updated Client Label");
    else if (type === "delete") toast("Successfully deleted Client Label");
  }

  handleError() {
    toast("Something went wrong!");
  }

  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new ClientLabelService();

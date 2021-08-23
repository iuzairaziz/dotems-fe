import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class PaymentService {
  constructor() {
    this.config = new Configuration();
  }

  addPayment(formData) {
    return axios.post(this.config.apiBaseUrl + "payment", formData);
  }

  getAllPayment() {
    return axios.get(this.config.apiBaseUrl + "payment");
  }

  updatePayment(id, formData) {
    return axios.put(this.config.apiBaseUrl + "payment/" + id, formData);
  }

  deletePayment(id) {
    return axios.delete(this.config.apiBaseUrl + "payment/" + id);
  }

  getSinglePayment(id) {
    return axios.get(this.config.apiBaseUrl + "payment/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added accessory");
    else if (type === "update") toast("Successfully updated accessory");
    else if (type === "delete") toast("Successfully deleted accessory");
  }

  handleError() {
    toast("Something went wrong!");
  }

  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new PaymentService();

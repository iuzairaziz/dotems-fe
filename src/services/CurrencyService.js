import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class CurrencyService {
  constructor() {
    this.config = new Configuration();
  }

  addCurrency(formData) {
    return axios.post(
      this.config.apiBaseUrl + "currency/create-currency",
      formData
    );
  }

  getCurrencyById(orderId) {
    return axios.get(this.config.apiBaseUrl + "currency/" + orderId);
  }

  getAllCurrency() {
    return axios.get(this.config.apiBaseUrl + "currency/show-currency");
  }

  updateCurrency(id, formData) {
    return axios.put(this.config.apiBaseUrl + "currency/" + id, formData);
  }

  deleteCurrency(id) {
    return axios.delete(this.config.apiBaseUrl + "currency/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Currency");
    else if (type === "update") toast("Successfully Updated Currency");
    else if (type === "delete") toast("Successfully Deleted Currency");
  }

  handleError() {
    toast("Something Went Wrong!");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new CurrencyService();

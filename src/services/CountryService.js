import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class CountryService {
  constructor() {
    this.config = new Configuration();
  }

  addCountry(formData) {
    return axios.post(
      this.config.apiBaseUrl + "country/create-country",
      formData
    );
  }

  getCountryById(orderId) {
    return axios.get(this.config.apiBaseUrl + "tasks/" + orderId);
  }

  getAllCountry() {
    return axios.get(this.config.apiBaseUrl + "country/show-country");
  }

  updateCountry(id, formData) {
    return axios.put(this.config.apiBaseUrl + "country/" + id, formData);
  }

  deleteCountry(id) {
    return axios.delete(this.config.apiBaseUrl + "country/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added country");
    else if (type === "update") toast("Successfully updated country");
    else if (type === "delete") toast("Successfully deleted country");
  }

  handleError() {
    toast("Something went wrong!");
  }

  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new CountryService();

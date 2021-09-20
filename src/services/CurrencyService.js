import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";
import cors from "cors";

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

  onGet() {
    const url =
      "https://free.currconv.com/api/v7/convert?q=USD_PKR&compact=ultra&apiKey=80c8268f81966ccb6c26";
    var headers = {};

    return fetch(url, {
      method: "GET",
      mode: "cors",
      headers: headers,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.error);
      }
      return response.json();
    });
  }

  onGetEUR() {
    const url =
      "https://free.currconv.com/api/v7/convert?q=EUR_PKR&compact=ultra&apiKey=80c8268f81966ccb6c26";
    var headers = {};

    return fetch(url, {
      method: "GET",
      mode: "cors",
      headers: headers,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.error);
      }
      return response.json();
    });
  }

  onGetGBP() {
    const url =
      "https://free.currconv.com/api/v7/convert?q=GBP_PKR&compact=ultra&apiKey=80c8268f81966ccb6c26";
    var headers = {};

    return fetch(url, {
      method: "GET",
      mode: "cors",
      headers: headers,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.error);
      }
      return response.json();
    });
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

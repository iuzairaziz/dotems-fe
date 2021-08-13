import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class DesignationService {
  constructor() {
    this.config = new Configuration();
  }

  addDesignation(formData) {
    return axios.post(
      this.config.apiBaseUrl + "designation/create-designation",
      formData
    );
  }

  // getCountryById(orderId) {
  //   return axios.get(this.config.apiBaseUrl + "tasks/" + orderId);
  // }

  getAllDesignation() {
    return axios.get(this.config.apiBaseUrl + "designation/show-designation");
  }

  updateDesignation(id, formData) {
    return axios.put(this.config.apiBaseUrl + "designation/" + id, formData);
  }

  deleteDesignation(id) {
    return axios.delete(this.config.apiBaseUrl + "designation/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added designation");
    else if (type === "update") toast("Successfully updated designation");
    else if (type === "delete") toast("Successfully deleted designation");
  }

  handleError() {
    toast("Something went wrong!");
  }

  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new DesignationService();

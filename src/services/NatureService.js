import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class NatureService {
  constructor() {
    this.config = new Configuration();
  }

  addNature(formData) {
    return axios.post(
      this.config.apiBaseUrl + "nature/create-nature",
      formData
    );
  }

  getNatureById(orderId) {
    return axios.get(this.config.apiBaseUrl + "tasks/" + orderId);
  }

  getAllNature() {
    return axios.get(this.config.apiBaseUrl + "nature/show-nature");
  }

  updateNature(id, formData) {
    return axios.put(this.config.apiBaseUrl + "nature/" + id, formData);
  }

  deleteNature(id) {
    return axios.delete(this.config.apiBaseUrl + "nature/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Nature");
    else if (type === "update") toast("Successfully Updated Nature");
    else if (type === "delete") toast("Successfully Deleted Nature");
  }

  handleError() {
    toast("Something Went Wrong!");
  }
}

export default new NatureService();

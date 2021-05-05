import Configuration from "../config/configuration";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class TechnologyService {
  constructor() {
    this.config = new Configuration();
  }

  addTechnology(formData) {
    return axios.post(
      this.config.apiBaseUrl + "technologies/create-technologies",
      formData
    );
  }

  getTechnologyById(orderId) {
    return axios.get(this.config.apiBaseUrl + "tasks/" + orderId);
  }

  getAllTechnologies() {
    return axios.get(this.config.apiBaseUrl + "technologies/show-technologies");
  }

  updateTechnology(id, formData) {
    return axios.put(this.config.apiBaseUrl + "technologies/" + id, formData);
  }

  deleteTechnology(id) {
    return axios.delete(this.config.apiBaseUrl + "technologies/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Technology");
    else if (type === "update") toast("Successfully Updated Technology");
    else if (type === "delete") toast("Successfully Deleted Technology");
  }

  handleError() {
    toast("Something Went Wrong!");
  }
}

export default new TechnologyService();

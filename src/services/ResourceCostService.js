import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class WoringDayService {
  constructor() {
    this.config = new Configuration();
  }

  addResourceCost(formData) {
    return axios.post(this.config.apiBaseUrl + "resource-cost", formData);
  }

  getResourceCostById(id) {
    return axios.get(this.config.apiBaseUrl + "resource-cost/" + id);
  }

  getResourceCost() {
    return axios.get(this.config.apiBaseUrl + "resource-cost");
  }

  updateResourceCost(id, formData) {
    return axios.put(this.config.apiBaseUrl + "resource-cost/" + id, formData);
  }

  deleteResourceCost(id) {
    return axios.delete(this.config.apiBaseUrl + "resource-cost/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Resource Cost");
    else if (type === "update") toast("Successfully Updated Resource Cost");
    else if (type === "delete") toast("Successfully Deleted Resource Cost");
  }

  handleError() {
    toast("Something Went Wrong!");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new WoringDayService();

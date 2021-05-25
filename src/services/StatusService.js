import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class StatusService {
  constructor() {
    this.config = new Configuration();
  }

  addStatus(formData) {
    return axios.post(
      this.config.apiBaseUrl + "status/create-status",
      formData
    );
  }

  getStatusById(orderId) {
    return axios.get(this.config.apiBaseUrl + "status/" + orderId);
  }

  getAllStatus() {
    return axios.get(this.config.apiBaseUrl + "status/show-status");
  }

  updateStatus(id, formData) {
    return axios.put(this.config.apiBaseUrl + "status/" + id, formData);
  }

  deleteStatus(id) {
    return axios.delete(this.config.apiBaseUrl + "status/" + id);
  }

  handleError(error) {
    console.log(error.message);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Status");
    else if (type === "update") toast("Successfully Updated Status");
    else if (type === "delete") toast("Successfully Deleted Status");
  }

  handleError() {
    toast("Something Went Wrong!");
  }
}

export default new StatusService();

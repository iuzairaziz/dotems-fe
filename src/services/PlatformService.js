import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class PlatformService {
  constructor() {
    this.config = new Configuration();
  }

  addPlatform(formData) {
    return axios.post(
      this.config.apiBaseUrl + "platform/create-platform",
      formData
    );
  }

  getPlatformById(orderId) {
    return axios.get(this.config.apiBaseUrl + "tasks/" + orderId);
  }

  getAllPlatform() {
    return axios.get(this.config.apiBaseUrl + "platform/show-platform");
  }

  updatePlatform(id, formData) {
    return axios.put(this.config.apiBaseUrl + "platform/" + id, formData);
  }

  deletePlatform(id) {
    return axios.delete(this.config.apiBaseUrl + "platform/" + id);
  }

  handleError(error) {
    console.log(error.message);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Platform");
    else if (type === "update") toast("Successfully Updated platform");
    else if (type === "delete") toast("Successfully Deleted Platform");
  }

  handleError() {
    toast("Something Went Wrong!");
  }
}

export default new PlatformService();

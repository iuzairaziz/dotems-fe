import Configuration from "../config/configuration";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class ServiceService {
  constructor() {
    this.config = new Configuration();
  }

  addService(formData) {
    return axios.post(
      this.config.apiBaseUrl + "service/create-service",
      formData
    );
  }

  getServiceById(orderId) {
    return axios.get(this.config.apiBaseUrl + "tasks/" + orderId);
  }

  getAllService() {
    return axios.get(this.config.apiBaseUrl + "service/show-service");
  }

  updateService(id, formData) {
    return axios.put(this.config.apiBaseUrl + "service/" + id, formData);
  }

  deleteService(id) {
    return axios.delete(this.config.apiBaseUrl + "service/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Service");
    else if (type === "update") toast("Successfully Updated Service");
    else if (type === "delete") toast("Successfully Deleted Service");
  }

  handleError() {
    toast("Something Went Wrong!");
  }
}

export default new ServiceService();

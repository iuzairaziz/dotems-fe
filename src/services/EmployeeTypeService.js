import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class EmployeeTypeService {
  constructor() {
    this.config = new Configuration();
  }

  addEmployeeType(formData) {
    return axios.post(this.config.apiBaseUrl + "employee-type", formData);
  }

  // getCountryById(orderId) {
  //   return axios.get(this.config.apiBaseUrl + "tasks/" + orderId);
  // }

  getAllEmployeeType() {
    return axios.get(this.config.apiBaseUrl + "employee-type");
  }

  updateEmployeeType(id, formData) {
    return axios.put(this.config.apiBaseUrl + "employee-type/" + id, formData);
  }

  deleteEmployeeType(id) {
    return axios.delete(this.config.apiBaseUrl + "employee-type/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Employee Type");
    else if (type === "update") toast("Successfully Updated Employee Type");
    else if (type === "delete") toast("Successfully Deleted Employee Type");
  }

  handleError() {
    toast("Something went wrong!");
  }

  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new EmployeeTypeService();

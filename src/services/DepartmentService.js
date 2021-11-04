import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class DepartmentService {
  constructor() {
    this.config = new Configuration();
  }

  addDepartment(formData) {
    return axios.post(this.config.apiBaseUrl + "employee-department", formData);
  }

  // getCountryById(orderId) {
  //   return axios.get(this.config.apiBaseUrl + "tasks/" + orderId);
  // }

  getAllDepartment() {
    return axios.get(this.config.apiBaseUrl + "employee-department");
  }

  updateDepartment(id, formData) {
    return axios.put(
      this.config.apiBaseUrl + "employee-department/" + id,
      formData
    );
  }

  deleteDepartment(id) {
    return axios.delete(this.config.apiBaseUrl + "employee-department/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Department");
    else if (type === "update") toast("Successfully Updated Department");
    else if (type === "delete") toast("Successfully Deleted Department");
  }

  handleError() {
    toast("Something went wrong!");
  }

  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new DepartmentService();

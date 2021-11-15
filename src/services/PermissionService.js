import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class PermissionService {
  constructor() {
    this.config = new Configuration();
  }

  addPermission(formData) {
    return axios.post(this.config.apiBaseUrl + "permission/", formData);
  }

  getPermissionById(permissionId) {
    return axios.get(this.config.apiBaseUrl + "permission/" + permissionId);
  }

  getAllPermission() {
    return axios.get(this.config.apiBaseUrl + "permission/");
  }

  updatePermission(id, formData) {
    return axios.put(this.config.apiBaseUrl + "permission/" + id, formData);
  }

  deletePermission(id) {
    return axios.delete(this.config.apiBaseUrl + "permission/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Permission");
    else if (type === "update") toast("Successfully Updated Permission");
    else if (type === "delete") toast("Successfully Deleted Permission");
  }

  handleError() {
    toast("Something Went Wrong!");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new PermissionService();

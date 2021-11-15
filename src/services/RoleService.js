import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class RoleService {
  constructor() {
    this.config = new Configuration();
  }

  addRole(formData) {
    return axios.post(this.config.apiBaseUrl + "role/", formData);
  }

  getRoleById(roleId) {
    return axios.get(this.config.apiBaseUrl + "role/" + roleId);
  }

  getAllRole() {
    return axios.get(this.config.apiBaseUrl + "role/");
  }

  updateRole(id, formData) {
    return axios.put(this.config.apiBaseUrl + "role/" + id, formData);
  }

  deleteRole(id) {
    return axios.delete(this.config.apiBaseUrl + "role/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Role");
    else if (type === "update") toast("Successfully Updated Role");
    else if (type === "delete") toast("Successfully Deleted Role");
  }

  handleError() {
    toast("Something Went Wrong!");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new RoleService();

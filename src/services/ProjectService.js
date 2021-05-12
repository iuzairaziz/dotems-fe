import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class ProjectService {
  constructor() {
    this.config = new Configuration();
  }

  addProject(formData) {
    return axios.post(
      this.config.apiBaseUrl + "project/create-project",
      formData
    );
  }

  getProjectById(orderId) {
    return axios.get(this.config.apiBaseUrl + "project/" + orderId);
  }

  updateProject(id, formData) {
    return axios.put(this.config.apiBaseUrl + "project/" + id, formData);
  }

  getAllProject() {
    return axios.get(this.config.apiBaseUrl + "projects/show-projects");
  }

  deleteProject(id) {
    return axios.delete(this.config.apiBaseUrl + "project/:id", id);
  }

  getEmployeeProject(employeeId) {
    return axios.post(
      this.config.apiBaseUrl + "projects/whereEmployee/" + employeeId
    );
  }

  handleCustomMessage(message) {
    toast(message.toString());
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added Project");
    else if (type === "update") toast("Successfully updated Project");
    else if (type === "delete") toast("Successfully deleted Project");
  }

  handleError() {
    toast("Something went wrong!");
  }
}

export default new ProjectService();

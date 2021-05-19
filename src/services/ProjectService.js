import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class ProjectService {
  constructor() {
    this.config = new Configuration();
  }

  addProject(formData) {
    return axios.post(
      this.config.apiBaseUrl + "projects/create-project",
      formData
    );
  }

  getProjectById(orderId) {
    return axios.get(this.config.apiBaseUrl + "projects/" + orderId);
  }

  updateProject(id, formData) {
    return axios.put(this.config.apiBaseUrl + "projects/" + id, formData);
  }

  getAllProject() {
    return axios.get(this.config.apiBaseUrl + "projects/show-projects");
  }

  deleteProject(id) {
    return axios.delete(this.config.apiBaseUrl + "projects/" + id);
  }

  getEmployeeProject(employeeId) {
    return axios.post(
      this.config.apiBaseUrl + "projects/whereEmployee/" + employeeId
    );
  }



  handleMessage(type) {
    if (type === "add") toast("Successfully added Project");
    else if (type === "update") toast("Successfully updated Project");
    else if (type === "delete") toast("Successfully deleted Project");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
  handleError() {
    toast("Something went wrong!");
  }
}

export default new ProjectService();

import Configuration from "../config/configuration";
import axios from "axios";

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

  updateProject(formData) {
    return axios.put(this.config.apiBaseUrl + "project/:id", formData);
  }

  getAllProject() {
    return axios.get(this.config.apiBaseUrl + "project/show-projects");
  }

  deleteProject(id) {
    return axios.delete(this.config.apiBaseUrl + "project/:id", formData);
  }

  handleError(error) {
    console.log(error.message);
  }
}

export default ProjectService;

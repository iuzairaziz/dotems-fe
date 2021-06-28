import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class TaskService {
  constructor() {
    this.config = new Configuration();
  }

  addTask(formData) {
    return axios.post(this.config.apiBaseUrl + "tasks/create-task", formData);
  }

  getTaskDetailsById(id) {
    return axios.get(this.config.apiBaseUrl + "tasks/" + id);
  }

  getAllEmployeeTasks(empID) {
    return axios.get(this.config.apiBaseUrl + "tasks/by-employee/" + empID);
  }

  getAllTask() {
    return axios.get(this.config.apiBaseUrl + "tasks/show-task");
  }
  getParentTasks() {
    return axios.get(this.config.apiBaseUrl + "tasks/parents");
  }
  updateTask(id, formData) {
    return axios.put(this.config.apiBaseUrl + "tasks/" + id, formData);
  }

  deleteTask(id) {
    return axios.delete(this.config.apiBaseUrl + "tasks/" + id);
  }

  getTasksByProjectId(id) {
    return axios.get(this.config.apiBaseUrl + "tasks/project-tasks/" + id);
  }

  getEmployeeProjectTasks(data) {
    return axios.post(
      this.config.apiBaseUrl + "tasks/by-employee-project/",
      data
    );
  }

  getEmployeeTasksGroupByProject(data) {
    return axios.post(this.config.apiBaseUrl + "tasks/employee/", data);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added Task");
    else if (type === "update") toast("Successfully updated Task");
    else if (type === "delete") toast("Successfully deleted Task");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
  handleError() {
    toast("Something went wrong!");
  }
}

export default new TaskService();

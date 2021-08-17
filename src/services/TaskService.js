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
  getWeeklyEmployeeTasks(empID) {
    return axios.get(
      this.config.apiBaseUrl + "tasks/by-employee-weekly/" + empID
    );
  }
  getNextWeekEmployeeTasks(empID) {
    return axios.get(
      this.config.apiBaseUrl + "tasks/by-employee-next-week/" + empID
    );
  }
  getNextMonthEmployeeTasks(empID) {
    return axios.get(
      this.config.apiBaseUrl + "tasks/by-employee-next-month/" + empID
    );
  }

  getLateEmployeeTasks(empID) {
    return axios.get(
      this.config.apiBaseUrl + "tasks/by-employee-late/" + empID
    );
  }

  getAllTask() {
    return axios.get(this.config.apiBaseUrl + "tasks/show-task");
  }

  getAllEmployeeTasks(empId) {
    return axios.get(this.config.apiBaseUrl + "tasks/by-employee/" + empId);
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

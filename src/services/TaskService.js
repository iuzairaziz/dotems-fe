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

  getTaskById(orderId) {
    return axios.get(this.config.apiBaseUrl + "tasks/" + orderId);
  }

  getAllTask() {
    return axios.get(this.config.apiBaseUrl + "tasks/show-task");
  }

  updateTask(id, formData) {
    return axios.put(this.config.apiBaseUrl + "tasks/" + id, formData);
  }

  deleteTask(id) {
    return axios.delete(this.config.apiBaseUrl + "tasks/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added Task");
    else if (type === "update") toast("Successfully updated Task");
    else if (type === "delete") toast("Successfully deleted Task");
  }

  handleError() {
    toast("Something went wrong!");
  }
}

export default new TaskService();

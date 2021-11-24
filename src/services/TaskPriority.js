import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class TaskPriorityService {
  constructor() {
    this.config = new Configuration();
  }

  addTaskPriority(formData) {
    return axios.post(
      this.config.apiBaseUrl + "task-priority/create-taskpriority",
      formData
    );
  }
  getAllTaskPriority() {
    return axios.get(
      this.config.apiBaseUrl + "task-priority/show-taskpriority"
    );
  }

  putTaskPriorityPreset(id) {
    return axios.put(this.config.apiBaseUrl + "task-priority/preset/" + id);
  }

  updateTaskPriority(id, formData) {
    return axios.put(this.config.apiBaseUrl + "task-priority/" + id, formData);
  }

  deleteTaskPriority(id) {
    return axios.delete(this.config.apiBaseUrl + "task-priority/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added Task Priority");
    else if (type === "update") toast("Successfully updated Task Priority");
    else if (type === "delete") toast("Successfully deleted Task Priority");
  }

  handleError() {
    toast("Something went wrong!");
  }

  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new TaskPriorityService();

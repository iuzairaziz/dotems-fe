import Configuration from "../config/configuration";
import axios from "axios";

class TaskService {
  constructor() {
    this.config = new Configuration();
  }

  addTask(formData) {
    return axios.post(this.config.apiBaseUrl + "orders", formData);
  }

  getTaskById(orderId) {
    return axios.get(this.config.apiBaseUrl + "orders/" + orderId);
  }

  updateTask(formData) {
    return axios.put(this.config.apiBaseUrl + "orders", formData);
  }

  deleteTask(id) {
    return axios.delete(this.config.apiBaseUrl + "orders", formData);
  }

  getUserOrdersDetailById(userId) {
    // const {pageNo, pageSize, userId} = data ;
    // return axios.get(this.config.apiBaseUrl + `history/${userId}?page=${pageNo}&pageSize=${pageSize}`);
    return axios.get(this.config.apiBaseUrl + `orders/history/${userId}`);
  }

  handleError(error) {
    console.log(error.message);
  }
}

export default TaskService;

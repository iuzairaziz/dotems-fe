import Configuration from "../config/configuration";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class ExpenseService {
  constructor() {
    this.config = new Configuration();
  }

  addExpense(formData) {
    return axios.post(
      this.config.apiBaseUrl + "expense/create-expense",
      formData
    );
  }

  getExpenseById(orderId) {
    return axios.get(this.config.apiBaseUrl + "expense/" + orderId);
  }

  getAllExpense(startDate) {
    return axios.get(
      this.config.apiBaseUrl + `expense/show-expense?startDate=${startDate}`
    );
  }

  updateExpense(id, formData) {
    return axios.put(this.config.apiBaseUrl + "expense/" + id, formData);
  }

  deleteExpense(id) {
    return axios.delete(this.config.apiBaseUrl + `expense/${id}`);
  }

  handleError(error) {
    console.log(error.message);
  }
  handleMessage(type) {
    if (type === "add") toast("Successfully Added Expense");
    else if (type === "update") toast("Successfully Updated Expense");
    else if (type === "delete") toast("Successfully Deleted Expense");
  }

  handleError() {
    toast("Something went wrong!");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new ExpenseService();

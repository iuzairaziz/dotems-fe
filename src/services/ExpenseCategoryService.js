import Configuration from "../config/configuration";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class ExpenseService {
  constructor() {
    this.config = new Configuration();
  }

  addExpenseCategory(formData) {
    return axios.post(
      this.config.apiBaseUrl + "expense-category/create-expense-category",
      formData
    );
  }

  getExpenseCategoryById(orderId) {
    return axios.get(this.config.apiBaseUrl + "expense-category/" + orderId);
  }

  getAllExpenseCategory() {
    return axios.get(
      this.config.apiBaseUrl + "expense-category/show-expense-catgeory"
    );
  }

  updateExpenseCategory(id, formData) {
    return axios.put(
      this.config.apiBaseUrl + "expense-category/" + id,
      formData
    );
  }

  deleteExpenseCategory(id) {
    return axios.delete(this.config.apiBaseUrl + "expense-category/:id", id);
  }

  handleError(error) {
    console.log(error.message);
  }
  handleMessage(type) {
    if (type === "add") toast("Successfully Added Expense Category");
    else if (type === "update") toast("Successfully Updated Expense Category");
    else if (type === "delete") toast("Successfully Deleted Expense Category");
  }

  handleError() {
    toast("Something went wrong!");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new ExpenseService();

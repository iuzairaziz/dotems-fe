import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class WoringHoursService {
  constructor() {
    this.config = new Configuration();
  }

  addWorkingHours(formData) {
    return axios.post(
      this.config.apiBaseUrl + "working-hours/create-working-hours",
      formData
    );
  }

  getWorkingHourById(id) {
    return axios.get(this.config.apiBaseUrl + "working-hours/" + id);
  }

  getWorkingHours() {
    return axios.get(
      this.config.apiBaseUrl + "working-hours/show-working-hours"
    );
  }

  updateWorkingHours(id, formData) {
    return axios.put(this.config.apiBaseUrl + "working-hours/" + id, formData);
  }

  deleteWorkingHours(id) {
    return axios.delete(this.config.apiBaseUrl + "working-hours/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Working Hours");
    else if (type === "update") toast("Successfully Updated Working Hours");
    else if (type === "delete") toast("Successfully Deleted Working Hours");
  }

  handleError() {
    toast("Something Went Wrong!");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new WoringHoursService();

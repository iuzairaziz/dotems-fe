import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class WoringDayService {
  constructor() {
    this.config = new Configuration();
  }

  addWorkingDay(formData) {
    return axios.post(
      this.config.apiBaseUrl + "working-days/create-working-days",
      formData
    );
  }

  getWorkingDayById(id) {
    return axios.get(this.config.apiBaseUrl + "working-days/" + id);
  }

  getWorkingDays() {
    return axios.get(this.config.apiBaseUrl + "working-days/show-working-days");
  }

  updateWorkingDay(id, formData) {
    return axios.put(this.config.apiBaseUrl + "working-days/" + id, formData);
  }

  deleteWorkingDay(id) {
    return axios.delete(this.config.apiBaseUrl + "working-days/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Working Day");
    else if (type === "update") toast("Successfully Updated Nature");
    else if (type === "delete") toast("Successfully Deleted Nature");
  }

  handleError() {
    toast("Something Went Wrong!");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new WoringDayService();

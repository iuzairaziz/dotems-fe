import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class WoringShiftService {
  constructor() {
    this.config = new Configuration();
  }

  addWorkingShift(formData) {
    return axios.post(
      this.config.apiBaseUrl + "working-shift/create-working-shift",
      formData
    );
  }

  //   getWorkingHourById(id) {
  //     return axios.get(this.config.apiBaseUrl + "working-hours/" + id);
  //   }

  getWorkingShift() {
    return axios.get(
      this.config.apiBaseUrl + "working-shift/show-working-shift"
    );
  }

  //   updateWorkingHours(id, formData) {
  //     return axios.put(this.config.apiBaseUrl + "working-hours/" + id, formData);
  //   }

  //   deleteWorkingHours(id) {
  //     return axios.delete(this.config.apiBaseUrl + "working-hours/" + id);
  //   }

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

export default new WoringShiftService();

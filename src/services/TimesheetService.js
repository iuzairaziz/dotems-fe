import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class TimesheetService {
  constructor() {
    this.config = new Configuration();
  }

  addTimesheet(formData) {
    return axios.post(this.config.apiBaseUrl + "timesheet/", formData);
  }

  getTimesheetById(orderId) {
    return axios.get(this.config.apiBaseUrl + "timesheet/" + orderId);
  }

  getAllTimesheet() {
    return axios.get(this.config.apiBaseUrl + "timesheet/");
  }

  updateTimesheet(id, formData) {
    return axios.put(this.config.apiBaseUrl + "timesheet/" + id, formData);
  }

  deleteTimesheet(id) {
    return axios.delete(this.config.apiBaseUrl + "timesheet/" + id);
  }

  getWeeklyTimesheetByTask(data) {
    return axios.get(
      this.config.apiBaseUrl +
        `timesheet/weekly?start=${data.startDate}&end=${data.endDate}&task=${
          data.taskId
        }`
    );
  }

  submitWeeklyTimesheet(formData) {
    return axios.post(this.config.apiBaseUrl + "timesheet/weekly/", formData);
  }

  submitDailyTimesheet(formData) {
    return axios.post(this.config.apiBaseUrl + "timesheet/daily/", formData);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added Timesheet");
    else if (type === "update") toast("Successfully updated Timesheet");
    else if (type === "delete") toast("Successfully deleted Timesheet");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
  handleError() {
    toast("Something went wrong!");
  }
}

export default new TimesheetService();

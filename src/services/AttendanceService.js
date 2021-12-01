import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class AttendanceService {
  constructor() {
    this.config = new Configuration();
  }

  addTimeInAttendance(formData) {
    return axios.post(
      this.config.apiBaseUrl + "attendance/create-time-in",
      formData
    );
  }
  addTimeOutAttendance(formData) {
    return axios.put(this.config.apiBaseUrl + "attendance/update", formData);
  }
  getAttendanceById(id) {
    return axios.get(this.config.apiBaseUrl + "attendance/" + id);
  }

  getPresentEmployes(date) {
    return axios.post(this.config.apiBaseUrl + "attendance", date);
  }

  // updateWorkingShift(id, formData) {
  //   return axios.put(this.config.apiBaseUrl + "working-shift/" + id, formData);
  // }

  // deleteWorkingShift(id) {
  //   return axios.delete(this.config.apiBaseUrl + "working-shift/" + id);
  // }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Attendance");
    else if (type === "update") toast("Successfully Updated Attendance");
    else if (type === "delete") toast("Successfully Deleted Attendance");
  }

  handleError() {
    toast("Something Went Wrong!");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new AttendanceService();

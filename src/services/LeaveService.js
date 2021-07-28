import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class LeaveService {
  constructor() {
    this.config = new Configuration();
  }

  // leave types section

  addLeaveType(formData) {
    return axios.post(
      this.config.apiBaseUrl + "leave-type/create-leave-type",
      formData
    );
  }

  //   getLeaveTypeById(orderId) {
  //     return axios.get(this.config.apiBaseUrl + "tasks/" + orderId);
  //   }

  getAllLeaveType() {
    return axios.get(this.config.apiBaseUrl + "leave-type/show-leave-type");
  }

  updateLeaveType(id, formData) {
    return axios.put(this.config.apiBaseUrl + "leave-type/" + id, formData);
  }
  updateLeave(id, formData) {
    return axios.put(this.config.apiBaseUrl + "leave/" + id, formData);
  }

  deleteLeaveType(id) {
    return axios.delete(this.config.apiBaseUrl + "leave-type/" + id);
  }

  // leaves section

  newLeave(data) {
    return axios.post(this.config.apiBaseUrl + "leave/new", data);
  }

  typeRemainingLeaves(formData) {
    return axios.post(this.config.apiBaseUrl + "leave/remaining-leaves", formData);
  }

  allLeavesFiltered({ user, status } = {}) {
    return axios.get(
      this.config.apiBaseUrl +
        `leave/?user=${user || ""}&status=${status || ""}`
    );
  }

  leaveById(id) {
    return axios.get(this.config.apiBaseUrl + "leave/" + id);
  }

  remainingLeaveById(id) {
    return axios.get(
      this.config.apiBaseUrl + "leave/remaining-leaves-all/" + id
    );
  }

  allUserLeaves(id) {
    return axios.get(this.config.apiBaseUrl + "leave/user-all-leaves/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added");
    else if (type === "update") toast("Successfully Updated");
    else if (type === "delete") toast("Successfully Deleted");
    else if (type === "applied") toast("Successfully Applied");
  }

  handleCustomMessage(message) {
    toast(message.toString());
  }

  handleError() {
    toast("Something Went Wrong!");
  }
}

export default new LeaveService();

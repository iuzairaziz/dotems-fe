import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class LeaveTypeService {
  constructor() {
    this.config = new Configuration();
  }

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

  updatePlatform(id, formData) {
    return axios.put(this.config.apiBaseUrl + "leave-type/" + id, formData);
  }

  deletePlatform(id) {
    return axios.delete(this.config.apiBaseUrl + "leave-type/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Leave Type");
    else if (type === "update") toast("Successfully Updated Leave Type");
    else if (type === "delete") toast("Successfully Deleted Leave Type");
  }

  handleCustomMessage(message) {
    toast(message.toString());
  }

  handleError() {
    toast("Something Went Wrong!");
  }
}

export default new LeaveTypeService();

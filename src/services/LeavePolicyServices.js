import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class LeavePolicyServices {
  constructor() {
    this.config = new Configuration();
  }

  addLeavePolicy(formData) {
    return axios.post(this.config.apiBaseUrl + "leave-policy/", formData);
  }

  addLeavePolicyDetail(formData) {
    return axios.post(
      this.config.apiBaseUrl + "leave-policy-detail/",
      formData
    );
  }

  getLeavePolicyById(id) {
    return axios.get(this.config.apiBaseUrl + "leave-policy-detail/" + id);
  }

  getLeavePolicies() {
    return axios.get(this.config.apiBaseUrl + "leave-policy/");
  }

  //   updateWorkingShift(id, formData) {
  //     return axios.put(this.config.apiBaseUrl + "working-shift/" + id, formData);
  //   }

  //   deleteWorkingShift(id) {
  //     return axios.delete(this.config.apiBaseUrl + "working-shift/" + id);
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

export default new LeavePolicyServices();

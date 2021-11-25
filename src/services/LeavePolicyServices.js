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

  getLeavePolicy() {
    return axios.get(this.config.apiBaseUrl + "leave-policy/");
  }

  getLeavePolicies(id) {
    return axios.get(
      this.config.apiBaseUrl + "leave-policy-detail/policies/" + id
    );
  }

  //   updateWorkingShift(id, formData) {
  //     return axios.put(this.config.apiBaseUrl + "working-shift/" + id, formData);
  //   }

  deleteLeavePolicy(id) {
    return axios.delete(this.config.apiBaseUrl + "leave-policy/" + id);
  }

  deleteLeavePolicyDetails(id) {
    return axios.delete(this.config.apiBaseUrl + "leave-policy-detail/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Leave Policy");
    else if (type === "update") toast("Successfully Updated Leave Policy");
    else if (type === "delete") toast("Successfully Deleted Leave Policy");
  }

  handleError() {
    toast("Something Went Wrong!");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new LeavePolicyServices();

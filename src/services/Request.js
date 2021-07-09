import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class RequestTypeService {
  constructor() {
    this.config = new Configuration();
  }

  addRequest(formData) {
    return axios.post(
      this.config.apiBaseUrl + "request/create-request",
      formData
    );
  }

  //   getLeaveTypeById(orderId) {
  //     return axios.get(this.config.apiBaseUrl + "tasks/" + orderId);
  //   }

  getAllRequest() {
    return axios.get(this.config.apiBaseUrl + "request/show-request");
  }

  updateRequest(id, formData) {
    return axios.put(this.config.apiBaseUrl + "request/" + id, formData);
  }

  deleteRequest(id) {
    return axios.delete(this.config.apiBaseUrl + "request/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Request ");
    else if (type === "update") toast("Successfully Updated Request ");
    else if (type === "delete") toast("Successfully Deleted Request ");
  }

  handleCustomMessage(message) {
    toast(message.toString());
  }

  handleError() {
    toast("Something Went Wrong!");
  }
}

export default new RequestTypeService();

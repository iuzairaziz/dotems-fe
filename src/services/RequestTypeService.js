import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class RequestTypeService {
  constructor() {
    this.config = new Configuration();
  }

  addRequestType(formData) {
    return axios.post(
      this.config.apiBaseUrl + "request-type/create-request-type",
      formData
    );
  }

  //   getLeaveTypeById(orderId) {
  //     return axios.get(this.config.apiBaseUrl + "tasks/" + orderId);
  //   }

  getAllRequestType() {
    return axios.get(this.config.apiBaseUrl + "request-type/show-request-type");
  }

  updateRequestType(id, formData) {
    return axios.put(this.config.apiBaseUrl + "request-type/" + id, formData);
  }

  deleteRequestType(id) {
    return axios.delete(this.config.apiBaseUrl + "request-type/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Request Type");
    else if (type === "update") toast("Successfully Updated Request Type");
    else if (type === "delete") toast("Successfully Deleted Request Type");
  }

  handleCustomMessage(message) {
    toast(message.toString());
  }

  handleError() {
    toast("Something Went Wrong!");
  }
}

export default new RequestTypeService();

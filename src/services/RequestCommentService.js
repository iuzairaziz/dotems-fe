import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class RequestCommentService {
  constructor() {
    this.config = new Configuration();
  }

  addComment(formData) {
    return axios.post(this.config.apiBaseUrl + "request-comment/", formData);
  }

  getCommentByrequestId(requestId) {
    return axios.get(this.config.apiBaseUrl + "request-comment/" + requestId);
  }

  addRequestComment(formData) {
    return axios.post(this.config.apiBaseUrl + "request-comment/requests", formData);
  }

  getCommentByRequestId(requestId) {
    return axios.get(this.config.apiBaseUrl + "request-comment/request/" + requestId);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added Comment");
    else if (type === "update") toast("Successfully updated Comment");
    else if (type === "delete") toast("Successfully deleted Comment");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
  handleError() {
    toast("Something went wrong!");
  }
}

export default new RequestCommentService();

import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class CommentService {
  constructor() {
    this.config = new Configuration();
  }

  addComment(formData) {
    return axios.post(this.config.apiBaseUrl + "comment/", formData);
  }

  getCommentByTaskId(taskId) {
    return axios.get(this.config.apiBaseUrl + "comment/" + taskId);
  }

  addProjectComment(formData) {
    return axios.post(this.config.apiBaseUrl + "comment/projects", formData);
  }

  getCommentByProjectId(projectId) {
    return axios.get(this.config.apiBaseUrl + "comment/project/" + projectId);
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

export default new CommentService();

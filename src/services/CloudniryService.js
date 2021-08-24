import Configuration from "../config/configuration";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class CloudnairyService {
  constructor() {
    this.config = new Configuration();
  }

  UploadImage() {
    return axios.post(this.config.apiBaseUrl + "cloudinary/upload");
  }

  getImage() {
    return axios.get(this.config.apiBaseUrl + "cloudinary/images");
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added Image");
    else if (type === "update") toast("Successfully updated Image");
    else if (type === "delete") toast("Successfully deleted Image");
  }

  handleError() {
    toast("Something went wrong!");
  }

  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new CloudnairyService();

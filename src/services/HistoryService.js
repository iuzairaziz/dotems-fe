import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class HistoryService {
  constructor() {
    this.config = new Configuration();
  }

  addHistory(formData) {
    return axios.post(
      this.config.apiBaseUrl + "history/create-history",
      formData
    );
  }

  getAllaccessory() {
    return axios.get(this.config.apiBaseUrl + "history/show-history");
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added history");
    else if (type === "update") toast("Successfully updated history");
    else if (type === "delete") toast("Successfully deleted history");
  }

  handleError() {
    toast("Something went wrong!");
  }
}

export default new HistoryService();

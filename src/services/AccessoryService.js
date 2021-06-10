import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class AccessoryService {
  constructor() {
    this.config = new Configuration();
  }

  addAccessory(formData) {
    return axios.post(
      this.config.apiBaseUrl + "accessory/create-accessory",
      formData
    );
  }

  getAllaccessory() {
    return axios.get(this.config.apiBaseUrl + "accessory/show-accessory");
  }

  updateAccessoryy(id, formData) {
    return axios.put(this.config.apiBaseUrl + "accessory/" + id, formData);
  }

  deleteAccessory(id) {
    return axios.delete(this.config.apiBaseUrl + "accessory/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added accessory");
    else if (type === "update") toast("Successfully updated accessory");
    else if (type === "delete") toast("Successfully deleted accessory");
  }

  handleError() {
    toast("Something went wrong!");
  }
}

export default new AccessoryService();

import Configuration from "../config/configuration";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class MachineService {
  constructor() {
    this.config = new Configuration();
  }

  addMachine(formData) {
    return axios.post(
      this.config.apiBaseUrl + "machine/create-machine",
      formData
    );
  }

  getAllMachines() {
    return axios.get(this.config.apiBaseUrl + "machine/show-machine");
  }

  updateMachine(id, formData) {
    return axios.put(this.config.apiBaseUrl + "machine/" + id, formData);
  }

  deleteMachine(id) {
    return axios.delete(this.config.apiBaseUrl + "machine/" + id);
  }

  handleError(error) {
    console.log(error.message);
  }
  handleMessage(type) {
    if (type === "add") toast("Successfully added Machine");
    else if (type === "update") toast("Successfully updated Machine");
    else if (type === "delete") toast("Successfully deleted Machine");
  }

  handleError() {
    toast("Something went wrong!");
  }
}

export default new MachineService();

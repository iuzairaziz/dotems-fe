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
  getFreeMachines() {
    return axios.get(this.config.apiBaseUrl + "machine/show-free-machine");
  }

  getSingleMachine(id) {
    return axios.get(this.config.apiBaseUrl + `machine/single-machine/${id}`);
  }

  updateMachine(id, formData) {
    return axios.put(this.config.apiBaseUrl + "machine/" + id, formData);
  }

  deleteMachine(id) {
    return axios.delete(this.config.apiBaseUrl + "machine/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added Machine");
    else if (type === "update") toast("Successfully updated Machine");
    else if (type === "delete") toast("Successfully deleted Machine");
  }

  handleError() {
    toast("Something went wrong!");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
}

export default new MachineService();

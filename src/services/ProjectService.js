import Configuration from "../config/configuration";
import axios from "axios";
import { toast } from "react-toastify";

class ProjectService {
  constructor() {
    this.config = new Configuration();
  }

  addProject(formData) {
    return axios.post(
      this.config.apiBaseUrl + "projects/create-project",
      formData
    );
  }

  getProjectById(orderId) {
    return axios.get(this.config.apiBaseUrl + "projects/" + orderId);
  }

  updateProject(id, formData) {
    return axios.put(this.config.apiBaseUrl + "projects/" + id, formData);
  }

  myprojects(id) {
    return axios.get(this.config.apiBaseUrl + "projects/myprojects/" + id);
  }

  getPMProject(id) {
    return axios.get(this.config.apiBaseUrl + "projects/pmprojects/" + id);
  }

  getAllProject(filter, status, technology, startDate, endDate) {
    return axios.get(
      this.config.apiBaseUrl +
        `projects/show-projects?status=${status}&platForm=${filter}&technology=${technology}&startDate=${startDate}&endDate=${endDate}`
    );
  }

  deleteProject(id) {
    return axios.delete(this.config.apiBaseUrl + "projects/" + id);
  }

  getEmployeeProject(employeeId) {
    return axios.post(
      this.config.apiBaseUrl + "projects/whereEmployee/" + employeeId
    );
  }

  getProjectAndTask(id) {
    return axios.get(
      this.config.apiBaseUrl + "projects/project-with-tasks/" + id
    );
  }

  getPmProjectAndTask(Pid, Eid) {
    return axios.get(
      this.config.apiBaseUrl +
        "projects/pm-project-with-tasks/" +
        Pid +
        "/" +
        Eid
    );
  }

  getUserProjectAndTask(Pid, Eid) {
    return axios.get(
      this.config.apiBaseUrl +
        "projects/user-project-with-tasks/" +
        Pid +
        "/" +
        Eid
    );
  }

  getProjectReport(filterQuery) {
    let {
      applystatusfilter,
      applyfilter,
      applyTechnologyfilter,
      cStart,
      clientStart,
      clientDeadline,
    } = filterQuery;
    return axios.get(
      this.config.apiBaseUrl +
        `projects/report/?status=${
          applystatusfilter ? applystatusfilter : ""
        }&platForm=${applyfilter ? applyfilter : ""}&technology=${
          applyTechnologyfilter ? applyTechnologyfilter : ""
        }&startDate=${cStart ? cStart : ""}&clientStartDate=${
          clientStart ? clientStart : ""
        }&clientDeadline=${clientDeadline ? clientDeadline : ""}`
    );
  }

  getPMProjectReport(id, filterQuery) {
    let {
      applystatusfilter,
      applyfilter,
      applyTechnologyfilter,
      cStart,
      clientStart,
      clientDeadline,
    } = filterQuery;
    return axios.get(
      this.config.apiBaseUrl +
        `projects/report-pm/?status=${
          applystatusfilter ? applystatusfilter : ""
        }&platForm=${applyfilter ? applyfilter : ""}&technology=${
          applyTechnologyfilter ? applyTechnologyfilter : ""
        }&startDate=${cStart ? cStart : ""}&clientStartDate=${
          clientStart ? clientStart : ""
        }&clientDeadline=${clientDeadline ? clientDeadline : ""}` +
        id
    );
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully added Project");
    else if (type === "update") toast("Successfully updated Project");
    else if (type === "delete") toast("Successfully deleted Project");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
  handleError() {
    toast("Something went wrong!");
  }
}

export default new ProjectService();

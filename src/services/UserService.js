import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import Configuration from "../config/configuration";
import io from "socket.io-client";

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "multipart/form-data";

class userServices {
  constructor() {
    this.config = new Configuration();
  }

  register = (
    name,
    email,
    status,
    gender,
    salary,
    password,
    joiningDate,
    userRole,
    workingDays,
    machineNo,
    designation
  ) =>
    new Promise((resolve, reject) => {
      axios
        .post(
          this.config.apiBaseUrl + "users/register",
          name,
          email,
          salary,
          password,
          joiningDate,
          status,
          gender,
          userRole,
          workingDays,
          machineNo,
          designation
        )
        .then((token) => {
          // localStorage.setItem("token", token.data);
          resolve(token);
        })
        .catch((err) => {
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
          reject(err);
        });
    });

  login = (email, password) =>
    new Promise((resolve, reject) => {
      axios
        .post(this.config.apiBaseUrl + "users/login", {
          email,
          password,
        })
        .then((token) => {
          localStorage.setItem("token", token.data);
          resolve(token);
        })
        .catch((err) => {
          // toast.error(err.response.data, {
          //   position: toast.POSITION.TOP_CENTER,
          // });
          // this.handleError();
          reject(err);
        });
    });
  logout = () => {
    localStorage.removeItem("token");
  };

  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };

  userLoggedInInfo = () => {
    try {
      const jwt = localStorage.getItem("token");
      return jwt_decode(jwt);
    } catch (ex) {
      return null;
    }
  };

  getUsers = (technology, role, minSalary, maxSalary) => {
    return axios.get(
      this.config.apiBaseUrl +
        `users/?technology=${technology}&role=${role}&minSalary=${minSalary}&maxSalary=${maxSalary}`
    );
  };

  getMachineResource = (id) => {
    return axios.get(this.config.apiBaseUrl + `users/machine-resource/`, id);
  };

  getProjectUsers = (projectId) => {
    return axios.get(this.config.apiBaseUrl + `users/by-project/${projectId}`);
  };

  getUserById(id) {
    return axios.get(this.config.apiBaseUrl + "users/" + id);
  }

  deleteUsers(id) {
    return axios.delete(this.config.apiBaseUrl + "users/" + id);
  }

  updatePasswrod = (id, password, oldPassword) =>
    axios.put(
      this.config.apiBaseUrl + `users/update-password/${id}`,
      password,
      oldPassword
    );

  updateUserProfile = (data, id) =>
    axios.put(this.config.apiBaseUrl + `users/${id}`, data);

  getSocket = () => {
    const socket = io(this.config.apiBaseUrl);
    return socket;
  };
  updateAllUserFields = (
    id,
    name,
    email,
    salary,
    password,
    joiningDate,
    status,
    gender,
    userRole,
    workingDays,
    machineNo
  ) =>
    axios.put(
      this.config.apiBaseUrl + `users/update-user/${id}`,
      name,
      email,
      salary,
      password,
      joiningDate,
      status,
      gender,
      userRole,
      workingDays,
      machineNo
    );

  isUserRole = (array) => {
    let user = this.userLoggedInInfo();
    // console.log("role ", user);
    // console.log("roles", array);
    // console.log("role auth", array.includes(user.userRole));
    let consent = 0;
    user.userRole.map((role) => {
      if (array.includes(role)) {
        consent = 1;
      }
    });
    return consent;
  };

  handleMessage(type) {
    if (type === "add") toast("Successfully Registered!");
    else if (type === "update") toast("Successfully updated User");
    else if (type === "delete") toast("Successfully deleted User");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
  handleError() {
    toast("Something went wrong!");
  }
}

let userService = new userServices();

export default userService;

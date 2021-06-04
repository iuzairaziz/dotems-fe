import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import Configuration from "../config/configuration";

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
    machineNo
  ) =>
    new Promise((resolve, reject) => {
      axios
        .post(
          "http://localhost:8080/users/register",
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
        )
        .then((token) => {
          localStorage.setItem("token", token.data);
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
        .post("http://localhost:8080/users/login", {
          email,
          password,
        })
        .then((token) => {
          localStorage.setItem("token", token.data);
          resolve(token);
        })
        .catch((err) => {
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
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

  getUserById(id) {
    return axios.get(this.config.apiBaseUrl + "users/" + id);
  }

  deleteUsers(id) {
    return axios.delete(this.config.apiBaseUrl + "users/" + id);
  }

  updateUser = (technology, id) =>
    axios.put(`http://localhost:8080/users/${id}`, technology);

  handleMessage(type) {
    if (type === "add") toast("Successfully Registered!");
    else if (type === "update") toast("Successfully updated User");
    else if (type === "delete") toast("Successfully deleted User");
  }

  handleError() {
    toast("Something went wrong!");
  }
}

let userService = new userServices();

export default userService;

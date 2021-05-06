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

  getUsers = () => {
    return axios.get(this.config.apiBaseUrl + "users/");
  };

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

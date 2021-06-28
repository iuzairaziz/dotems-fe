// import React from "react";
import userService from "../../../services/UserService";
import { Redirect, Route, Switch } from "react-router-dom";

const RoleAuth = (props) => {
  if (userService.isUserRole(props.roles)) return props.children;
  return null;
};

export default RoleAuth;

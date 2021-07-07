import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { withRouter, useHistory } from "react-router-dom";
import $ from "jquery";
const httpIntercept = (props) => {
  let history = useHistory();
  var loader = $("#preloader");
  axios.interceptors.request.use(
    (response) => {
      loader.fadeIn();
      loader.children("#status").fadeIn();
      return response;
    },
    (error) => {
      console.log("interceptor", error);
      loader.fadeIn();
      loader.children("#status").fadeIn();
      if (error.response.data === "Token Invalid") {
        history.push("/login");
      }
    }
  );

  axios.interceptors.response.use(
    (response) => {
      console.log("interceptor", response);
      loader.fadeOut();
      loader.children(".status").fadeOut();
      return response;
    },
    (error) => {
      console.log("interceptor error", error);
      loader.fadeOut();
      loader.children(".status").fadeOut();
      if (error.response.data === "Token Invalid") {
        history.push("/login");
      }
      throw error;
    }
  );
};

export default httpIntercept;

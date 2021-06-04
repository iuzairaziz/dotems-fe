import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { withRouter, useHistory } from "react-router-dom";

const httpIntercept = (props) => {
  let history = useHistory();

  axios.interceptors.response.use(
    (response) => {
      console.log("interceptor", response);
      return response;
    },
    (error) => {
      console.log("interceptor", error);
      if (error.response.data === "Token Invalid") {
        history.push("/login");
      }
    }
  );
};

export default httpIntercept;

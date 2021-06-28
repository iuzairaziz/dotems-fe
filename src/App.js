import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import mainbuilder from "./containers/mainbuilder/mainbuilder";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AUX from "./hoc/Aux_";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./containers/MainContent/Auth/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import httpIntercept from "../src/interceptor/interceptor";
import Configuration from "./config/configuration";
import io from "socket.io-client";

const App = (props) => {
  httpIntercept();

  let layout = null;
  // let config = new Configuration();
  // let socket = io(config.apiBaseUrl);
  // socket.on("connect", () => {
  //   console.log("Connected");
  // });

  layout = (
    <Layout
      header={props.header}
      sidebar={props.sidebar}
      footer={props.footer}
      loginpage={props.loginpage}
    >
      <Switch>
        <Route path="/" component={mainbuilder} />
        <Redirect to="/not-found" />
      </Switch>
    </Layout>
  );
  return (
    <AUX>
      <ToastContainer />
      {layout}
    </AUX>
  );
};
const mapStatetoProps = (state) => {
  return {
    header: state.layout.header,
    sidebar: state.layout.sidebar,
    footer: state.layout.footer,
    loginpage: state.layout.loginpage,
  };
};

export default withRouter(connect(mapStatetoProps)(App));

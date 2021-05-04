import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import mainbuilder from "./containers/mainbuilder/mainbuilder";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AUX from "./hoc/Aux_";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    let layout = null;

    layout = (
      <Layout
        header={this.props.header}
        sidebar={this.props.sidebar}
        footer={this.props.footer}
        loginpage={this.props.loginpage}
      >
        <Switch>
          <Route path="/" component={mainbuilder} />
        </Switch>
      </Layout>
    );
    return (
      <AUX>
        <ToastContainer />

        {layout}
      </AUX>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    header: state.ui_red.header,
    sidebar: state.ui_red.sidebar,
    footer: state.ui_red.footer,
    loginpage: state.ui_red.loginpage,
  };
};

export default withRouter(connect(mapStatetoProps)(App));

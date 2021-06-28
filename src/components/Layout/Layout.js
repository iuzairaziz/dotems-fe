import Aux from "../../hoc/Aux_";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import UserService from "../../services/UserService";

class layout extends Component {
  render() {
    return (
      <Aux>
        {!this.props.loginpage && UserService.isLoggedIn() ? (
          <main>
            <div id="wrapper">
              {this.props.sidebar ? <Sidebar /> : null}
              <div className="content-page">
                <div className="content">
                  {this.props.header ? <Header /> : null}
                  <div>breadcrumbs...........</div>
                  {this.props.children}
                </div>
                {this.props.footer ? <Footer /> : null}
              </div>
            </div>
          </main>
        ) : (
          <>
            {this.props.children}
            <Redirect to="/login" />
          </>
        )}
      </Aux>
    );
  }
}

export default withRouter(layout);

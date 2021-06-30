import Aux from "../../hoc/Aux_";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import UserService from "../../services/UserService";
import "./Layout.scss";
class layout extends Component {
  render() {
    return (
      <Aux>
        {!this.props.loginpage && UserService.isLoggedIn() ? (
          <main className="app-main">
            <div id="wrapper">
              {this.props.sidebar ? <Sidebar /> : null}
              <div className="content-page">
                <div className="content">
                  {this.props.header ? <Header /> : null}
                  <div>
                    <div className="pathname d-flex align-items-center">
                      <i
                        className="mdi mdi-arrow-left-bold icon-back"
                        onClick={this.props.history.goBack}
                      />
                      <span className="go-back-text">Back</span>
                    </div>
                    {this.props.children}
                  </div>
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

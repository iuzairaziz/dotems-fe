import React, { Component, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../../../store/action";
import axios from "axios";
import { toast } from "react-toastify";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "" };
  }

  componentDidMount() {
    if (this.props.loginpage === false) {
      this.props.UpdateLogin();
    }
    window.onpopstate = (e) => {
      this.props.UpdateLoginAgain();
    };
  }

  render(props) {
    return (
      <AUX>
        <div className="accountbg" />
        <div className="wrapper-page">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center m-0">
                <Link
                  to="/"
                  onClick={() => this.props.UpdateLoginAgain()}
                  className="logo logo-admin"
                >
                  <img src="assets/images/logo.png" height="30" alt="logo" />
                </Link>
              </h3>

              <div className="p-3">
                <h4 className="font-18 m-b-5 text-center">Free Register</h4>
                <p className="text-muted text-center">
                  Get your free Admiria account now.
                </p>

                <form className="form-horizontal m-t-30">
                  <div className="form-group">
                    <label for="useremail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="useremail"
                      placeholder="Enter email"
                      onChange={(e) => {
                        this.setState({ email: e.target.value });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Name"
                      onChange={(e) => {
                        this.setState({ name: e.target.value });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label for="userpassword">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="userpassword"
                      placeholder="Enter password"
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                    />
                  </div>

                  <div className="form-group row m-t-20">
                    <div className="col-12 text-right">
                      <button
                        className="btn btn-primary w-md waves-effect waves-light"
                        type="button"
                        onClick={async (values) => {
                          await axios
                            .post("http://localhost:8080/users/register", {
                              name: this.state.name,
                              email: this.state.email,
                              password: this.state.password,
                            })
                            .then((res) => {
                              console.log(res.data);
                              this.props.history.push("/login");
                            })
                            .catch((err) => {
                              console.log(err);
                              toast.error(err.response.data, {
                                position: toast.POSITION.TOP_CENTER,
                              });
                            });
                        }}
                      >
                        Register
                      </button>
                    </div>
                  </div>

                  <div className="form-group m-t-10 mb-0 row">
                    <div className="col-12 m-t-20">
                      <p className="font-14 text-muted mb-0">
                        By registering you agree to the Admiria{" "}
                        <Link to="#">Terms of Use</Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="m-t-40 text-center">
            <p className="text-white">
              Already have an account ?{" "}
              <Link
                to="pages_login"
                className="font-500 font-14 text-white font-secondary"
              >
                {" "}
                Login{" "}
              </Link>{" "}
            </p>
            <p className="text-white">
              © {new Date().getFullYear() - 1} - {new Date().getFullYear()}{" "}
              Admiria. Crafted with <i className="mdi mdi-heart text-danger" />{" "}
              by Themesbrand
            </p>
          </div>
        </div>
      </AUX>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    loginpage: state.ui_red.loginpage,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    UpdateLogin: () => dispatch({ type: actionTypes.LOGINPAGE, value: true }),
    UpdateLoginAgain: () =>
      dispatch({ type: actionTypes.LOGINPAGE, value: false }),
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Register);

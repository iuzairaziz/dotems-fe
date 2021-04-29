import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import authValidation from "../../../../validations/auth-validations";

class NewTask extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <AUX>
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">Validation type</h4>
                    <p className="text-muted m-b-30 font-14">
                      Parsley is a javascript form validation library. It helps
                      you provide your users with feedback on their form
                      submission before sending it to your server.
                    </p>
                    <Formik
                      initialValues={{
                        firstName: "",
                        lastName: "",
                      }}
                      validationSchema={authValidation.authSchemaValidation}
                      onSubmit={(values, actions) => {
                        // console.log(values);
                      }}
                    >
                      {(props) => (
                        <>
                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label>firstName</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={props.values.firstName}
                                  onChange={props.handleChange("firstName")}
                                  placeholder="Enter Name"
                                />
                                <span id="err">{props.errors.firstName}</span>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label>lastName</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={props.values.lastName}
                                  onChange={props.handleChange("lastName")}
                                  placeholder="Enter Name"
                                />
                                <span id="err">{props.errors.lastName}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
}

export default NewTask;

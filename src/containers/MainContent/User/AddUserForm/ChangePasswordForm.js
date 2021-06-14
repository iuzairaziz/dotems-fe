import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import { Dropdown, Button } from "reactstrap";
import UserService from "../../../../services/UserService";
import UserValidation from "../../../../validations/user-validations";

const ChangePasswordForm = (props) => {
  const [users, setUser] = useState({});

  const user = props.user;
  console.log("dsasaasasasdsadsdwdwdw", user);
  const editable = props.editable;

  let loggedUser = UserService.userLoggedInInfo();

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={UserValidation.changePassword}
      onSubmit={(values, actions) => {
        console.log(values);
        UserService.updatePasswrod(loggedUser._id, {
          password: values.password,
        })
          .then((res) => {
            UserService.handleMessage("update");
          })
          .catch((err) => {
            UserService.handleError();
          });
      }}
    >
      {(props) => (
        <>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Enter New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={props.values.password}
                  onChange={props.handleChange("password")}
                  placeholder="Enter Password"
                />
                <span id="err">{props.errors.salary}</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={props.values.confirmPassword}
                  onChange={props.handleChange("confirmPassword")}
                  placeholder="Enter confirmPassword"
                />
                <span id="err">{props.errors.confirmPassword}</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Button
                className="mt-3 my-primary-button"
                onClick={props.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;

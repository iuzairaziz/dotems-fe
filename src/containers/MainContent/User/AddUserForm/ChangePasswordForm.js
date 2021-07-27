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
        oldPassword: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={UserValidation.changePassword}
      onSubmit={(values, actions) => {
        console.log(values);
        UserService.updatePasswrod(loggedUser._id, {
          oldPassword: values.oldPassword,
          password: values.password,
        })
          .then((res) => {
            UserService.handleCustomMessage(res.data);
          })
          .catch((err) => {
            UserService.handleCustomMessage(err.response.data);
          });
      }}
    >
      {(props) => (
        <>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Enter Old Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    props.touched.password && props.errors.password
                      ? "is-invalid"
                      : props.touched.password && "is-valid"
                  }`}                     value={props.values.oldPassword}
                  onChange={props.handleChange("oldPassword")}
                  placeholder="Enter Old Password"
                />
                <span id="err">
                  {props.touched.password && props.errors.password}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Enter New Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    props.touched.password && props.errors.password
                      ? "is-invalid"
                      : props.touched.password && "is-valid"
                  }`}                     value={props.values.password}
                  onChange={props.handleChange("password")}
                  placeholder="Enter New Password"
                />
                <span id="err">
                  {props.touched.password && props.errors.password}
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    props.touched.confirmPassword && props.errors.confirmPassword
                      ? "is-invalid"
                      : props.touched.confirmPassword && "is-valid"
                  }`}                     value={props.values.confirmPassword}
                  onChange={props.handleChange("confirmPassword")}
                  placeholder="Re-Enter New Password"
                />
                <span id="err">
                  {props.touched.confirmPassword &&
                    props.errors.confirmPassword}
                </span>
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

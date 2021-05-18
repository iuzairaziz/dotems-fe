import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import userValidation from "../../../../validations/user-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CountryService from "../../../../services/CountryService";
import UserService from "../../../../services/UserService";
import ProjectService from "../../../../services/ProjectService";
import PlatformService from "../../../../services/PlatformService";
import TechnologyService from "../../../../services/TechnologyService";
import ServiceService from "../../../../services/ServiceService";
import NatureService from "../../../../services/NatureService";
import userService from "../../../../services/UserService";
import ClientService from "../../../../services/ClientService";

const UserForm = (props) => {
  const user = props.user;
  const editable = props.editable;
  console.log("from project form ", user);

  return (
    <Formik
      initialValues={{
        name: editable && user.name,
        userName: editable && user.userName,
        gender: editable && user.status,
        joiningDate: editable && user.cost,
        status: editable && user.status,
        salary: editable && user.salary,
        password: editable && user.password,
      }}
      validationSchema={userValidation.newUserValidation}
      onSubmit={(values, actions) => {
        editable
          ? ProjectService.updateProject(user._id, {
              name: values.projectName,
              client: values.clientName,
              orderNumber: values.orderNum,
              platform: values.platform,
              technology: values.technology,
              service: values.serviceType,
              status: values.status,
              nature: values.projectNature,
              startDate: values.startDate,
              endDate: values.endDate,
              projectManager: values.projectManager,
              cost: values.cost,
            })
              .then((res) => {
                ProjectService.handleMessage("update");
                props.toggle();
              })
              .catch((err) => {
                ProjectService.handleError();
                props.toggle();
              })
          : UserService.register({
              name: values.name,
              email: values.userName,
              gender: values.gender.value,
              status: values.status.value,
              password: values.password,
              salary: values.salary,
              joiningDate: values.joiningDate,
            })
              .then((res) => {
                UserService.handleMessage("add");
              })
              .catch((err) => {
                UserService.handleError();
              });
        console.log("clientName", values.clientName);
        console.log("platform", values.platform);
        console.log("technology", values.technology);
        console.log("serviceType", values.serviceType);
        console.log("projectNature", values.projectNature);
        console.log("projectManager", values.projectManager);
      }}
    >
      {(props) => (
        <>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.name}
                  onChange={props.handleChange("name")}
                  placeholder="Enter Name"
                />
                <span id="err">{props.errors.name}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.userName}
                  onChange={props.handleChange("userName")}
                  placeholder="Enter user name / email"
                />
                <span id="err">{props.errors.userName}</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Gender</label>
                <Select
                  value={props.values.project}
                  onChange={(selected) => {
                    props.setFieldValue("gender", selected);
                  }}
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Others", label: "Others" },
                  ]}
                />
                <span id="err">{props.errors.gender}</span>
              </div>
            </div>

            <div className="col">
              {" "}
              <div className="form-group">
                <label>Joining Date</label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={props.values.joiningDate}
                    onChange={(date) => {
                      props.setFieldValue("joiningDate", date);
                    }}
                  />
                </div>
              </div>{" "}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Status</label>
                <Select
                  value={props.values.satus}
                  onChange={(selected) => {
                    props.setFieldValue("status", selected);
                  }}
                  options={[
                    { value: "Single", label: "Single" },
                    { value: "Married", label: "Married" },
                  ]}
                />
                <span id="err">{props.errors.status}</span>
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>Salary</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.salary}
                  onChange={props.handleChange("salary")}
                  placeholder="Enter Salary"
                />
                <span id="err">{props.errors.salary}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Password</label>
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
              <Button
                color="success"
                className="mt-3"
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

export default UserForm;

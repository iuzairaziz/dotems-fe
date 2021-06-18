import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import userValidation from "../../../../validations/user-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CountryService from "../../../../services/CountryService";
import UserService from "../../../../services/UserService";
import MachineService from "../../../../services/MachineService";
import ProjectService from "../../../../services/ProjectService";
import PlatformService from "../../../../services/PlatformService";
import TechnologyService from "../../../../services/TechnologyService";
import ServiceService from "../../../../services/ServiceService";
import NatureService from "../../../../services/NatureService";
import ClientService from "../../../../services/ClientService";

const UserForm = (props) => {
  const [machineNo, setMachineNo] = useState([]);

  useEffect(() => {
    getMachines();
  }, []);

  const user = props.user;
  console.log("dsasaasasasdsadsdwdwdw", user);
  const editable = props.editable;
  console.log("from project form ", user);

  const getMachines = () => {
    MachineService.getFreeMachines().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.machineNo, value: item._id });
      });
      console.log("Machine", options);
      setMachineNo(options);
    });
  };

  return (
    <Formik
      initialValues={{
        name: editable && user.name,
        userName: editable && user.email,
        gender: editable &&
          user.gender && { label: user.gender, value: user.gender },
        joiningDate: editable && user.joiningDate,
        status: editable &&
          user.status && { label: user.status, value: user.status },
        salary: editable && user.salary,
        password: editable && user.password,
        workingHrs: editable && user.workingHrs,
        machineNo: editable &&
          user.machineNo && {
            label: user.machineNo.machineNo,
            value: user.machineNo._id,
          },
        workingDays: editable && user.workingDays,
        userRole: editable &&
          user.userRole && { label: user.userRole, value: user.userRole },
      }}
      // validationSchema={userValidation.newUserValidation}
      onSubmit={(values, actions) => {
        console.log(values);
        editable
          ? UserService.updateAllUserFields(user._id, {
              name: values.name,
              email: values.userName,
              gender: values.gender.value,
              status: values.status.value,
              password: values.password,
              salary: values.salary,
              joiningDate: values.joiningDate,
              workingHrs: values.workingHrs,
              machineNo: values.machineNo.value,
              workingDays: values.workingDays,
              userRole: values.userRole.value,
            })
              .then((res) => {
                MachineService.updateMachine(values.machineNo.value, {
                  Status: "In-Use",
                });
                UserService.handleMessage("update");
                props.toggle();
              })
              .catch((err) => {
                UserService.handleError();
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
              workingHrs: values.workingHrs,
              machineNo: values.machineNo.value,
              workingDays: values.workingDays,
              userRole: values.userRole.value,
            })
              .then((res) => {
                UserService.handleMessage("add");
                MachineService.updateMachine(values.machineNo.value, {
                  Status: "In-Use",
                });
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

            <div className="col">
              <div className="form-group">
                <label>Machine Number</label>
                <Select
                  value={props.values.machineNo}
                  onChange={(val) => props.setFieldValue("machineNo", val)}
                  options={machineNo}
                />
                <span id="err">{props.errors.machineNo}</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Salary</label>
                <input
                  type="number"
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
              <div className="form-group">
                <label className="control-label">Status</label>
                <Select
                  value={props.values.status}
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
                <label className="control-label">Gender</label>
                <Select
                  value={props.values.gender}
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
              <div className="form-group">
                <label className="control-label">Role</label>
                <Select
                  value={props.values.userRole}
                  onChange={(selected) => {
                    props.setFieldValue("userRole", selected);
                  }}
                  options={[
                    { value: "Internee", label: "Internee" },
                    { value: "Probation", label: "Probation" },
                    { value: "Employee", label: "Employee" },
                    { value: "Admin", label: "Admin" },
                    { value: "CEO", label: "CEO" },
                    { value: "HR", label: "HR" },
                  ]}
                />
                <span id="err">{props.errors.userRole}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Working Hours</label>
                <input
                  type="number"
                  className="form-control"
                  value={props.values.workingHrs}
                  onChange={props.handleChange("workingHrs")}
                  placeholder="Enter Working Hours"
                />
                <span id="err">{props.errors.workingHrs}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Working Days </label>
                <input
                  type="number"
                  className="form-control"
                  value={props.values.workingDays}
                  onChange={props.handleChange("workingDays")}
                  placeholder="Enter Working Days"
                />
                <span id="err">{props.errors.workingDays}</span>
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

export default UserForm;

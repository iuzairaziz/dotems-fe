import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import userValidation from "../../../../validations/user-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import {
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import MachineForm from "../../Machine/MachineForm/MachineForm";
import UserService from "../../../../services/UserService";
import MachineService from "../../../../services/MachineService";
import DesignationService from "../../../../services/DesignationService";

import Configuration from "../../../../config/configuration";

const UserForm = (props) => {
  const [machineNo, setMachineNo] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [machineModal, setMachineModal] = useState(false);

  const config = new Configuration();
  const roles = config.Roles;
  const history = useHistory();

  useEffect(() => {
    getMachines();
    getDesignation();
  }, [machineModal]);

  const toggleMachineEdit = () => setMachineModal(!machineModal);

  const user = props.user;
  console.log("dsasaasasasdsadsdwdwdw", user);
  const editable = props.editable;
  console.log("from project form ", user);

  const getMachines = () => {
    MachineService.getFreeMachines().then((res) => {
      let options = [{ label: "None", value: null }];
      res.data.map((item, index) => {
        options.push({ label: item.machineNo, value: item._id });
      });
      console.log("Machine", options);
      setMachineNo(options);
    });
  };

  const getDesignation = () => {
    DesignationService.getAllDesignation().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setDesignation(options);
    });
  };

  var UserRole = [];

  editable &&
    user.userRole &&
    user.userRole.map((item) => UserRole.push({ label: item, value: item }));

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
        designation: editable &&
          user.designation && {
            label: user.designation.name,
            value: user.designation._id,
          },
        machineNo: editable &&
          user.machineNo && {
            label: user.machineNo.machineNo,
            value: user.machineNo._id,
          },
        workingDays: editable && user.workingDays,
        userRole: editable && user.userRole && UserRole ? UserRole : [],
      }}
      validationSchema={userValidation.newUserValidation}
      onSubmit={(values, actions) => {
        console.log(values);
        const role = [];
        values.userRole.map((item) => {
          role.push(item.value);
          console.log("user Role", role);
        });
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
              designation: values.designation.value,
              workingDays: values.workingDays,
              userRole: role,
            })
              .then((res) => {
                MachineService.updateMachine(values.machineNo.value, {
                  Status: "In-Use",
                });
                UserService.handleMessage("update");
                props.toggle();
              })
              .catch((err) => {
                UserService.handleCustomMessage(err.response.data);
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
              designation: values.designation.value,
              workingDays: values.workingDays,
              userRole: role,
            })
              .then((res) => {
                UserService.handleMessage("add");
                history.push("/viewuser");
                MachineService.updateMachine(values.machineNo.value, {
                  Status: "In-Use",
                }).catch((err) =>
                  UserService.handleMessage("Machine Not Assigned to the user")
                );
              })
              .catch((err) => {
                UserService.handleCustomMessage(err.response.data);
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
                  name="name"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.name && props.errors.name
                      ? "is-invalid"
                      : props.touched.name && "is-valid"
                  }`}
                  value={props.values.name}
                  onChange={props.handleChange("name")}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.name && props.errors.name}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>User Name</label>
                <input
                  name="userName"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.userName && props.errors.userName
                      ? "is-invalid"
                      : props.touched.userName && "is-valid"
                  }`}
                  value={props.values.userName}
                  onChange={props.handleChange("userName")}
                  placeholder="Enter user name / email"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.userName && props.errors.userName}
                </span>
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
                    name="joiningDate"
                    onBlur={props.handleBlur}
                    className={`form-control ${
                      props.touched.joiningDate && props.errors.joiningDate
                        ? "is-invalid"
                        : props.touched.joiningDate && "is-valid"
                    }`}
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
                <div className="row">
                  <div className="col">
                    <label className="control-label">Machine No</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleMachineEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>
                <Select
                  name="machineNo"
                  className={`my-select${
                    props.touched.machineNo && props.errors.machineNo
                      ? "is-invalid"
                      : props.touched.machineNo && "is-valid"
                  }`}
                  onBlur={props.handleBlur}
                  value={props.values.machineNo}
                  onChange={(val) => props.setFieldValue("machineNo", val)}
                  options={machineNo}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.machineNo && props.errors.machineNo}
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Salary</label>
                <input
                  name="salary"
                  onBlur={props.handleBlur}
                  type="number"
                  className={`form-control ${
                    props.touched.salary && props.errors.salary
                      ? "is-invalid"
                      : props.touched.salary && "is-valid"
                  }`}
                  value={props.values.salary}
                  onChange={props.handleChange("salary")}
                  placeholder="Enter Salary"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.salary && props.errors.salary}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Password</label>
                <input
                  name="password"
                  onBlur={props.handleBlur}
                  type="password"
                  className={`form-control ${
                    props.touched.password && props.errors.password
                      ? "is-invalid"
                      : props.touched.password && "is-valid"
                  }`}
                  value={props.values.password}
                  onChange={props.handleChange("password")}
                  placeholder="Enter Password"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.password && props.errors.password}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Status</label>
                <Select
                  name="status"
                  onBlur={props.handleBlur}
                  value={props.values.status}
                  className={`my-select${
                    props.touched.status && props.errors.status
                      ? "is-invalid"
                      : props.touched.status && "is-valid"
                  }`}
                  onChange={(selected) => {
                    props.setFieldValue("status", selected);
                  }}
                  options={[
                    { value: "Single", label: "Single" },
                    { value: "Married", label: "Married" },
                  ]}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.status && props.errors.status}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Gender</label>
                <Select
                  name="gender"
                  onBlur={props.handleBlur}
                  className={`my-select${
                    props.touched.gender && props.errors.gender
                      ? "is-invalid"
                      : props.touched.gender && "is-valid"
                  }`}
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
                <span id="err" className="invalid-feedback">
                  {props.touched.gender && props.errors.gender}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Designation</label>
                  </div>
                  {/* <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleMachineEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div> */}
                </div>
                <Select
                  name="designation"
                  className={`my-select${
                    props.touched.designation && props.errors.designation
                      ? "is-invalid"
                      : props.touched.designation && "is-valid"
                  }`}
                  onBlur={props.handleBlur}
                  value={props.values.designation}
                  onChange={(val) => props.setFieldValue("designation", val)}
                  options={designation}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.designation && props.errors.designation}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Working Hours</label>
                <input
                  name="workingHrs"
                  onBlur={props.handleBlur}
                  type="number"
                  className={`form-control ${
                    props.touched.workingHrs && props.errors.workingHrs
                      ? "is-invalid"
                      : props.touched.workingHrs && "is-valid"
                  }`}
                  value={props.values.workingHrs}
                  onChange={props.handleChange("workingHrs")}
                  placeholder="Enter Working Hours"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.workingHrs && props.errors.workingHrs}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Working Days </label>
                <input
                  name="workingDays"
                  onBlur={props.handleBlur}
                  type="number"
                  className={`form-control ${
                    props.touched.workingDays && props.errors.workingDays
                      ? "is-invalid"
                      : props.touched.workingDays && "is-valid"
                  }`}
                  value={props.values.workingDays}
                  onChange={props.handleChange("workingDays")}
                  placeholder="Enter Working Days"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.workingDays && props.errors.workingDays}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Access Role</label>
                <Select
                  name="userRole"
                  className={`my-select${
                    props.touched.userRole && props.errors.userRole
                      ? "is-invalid"
                      : props.touched.userRole && "is-valid"
                  }`}
                  onBlur={props.handleBlur}
                  value={props.values.userRole}
                  isMulti={true}
                  onChange={(selected) => {
                    props.setFieldValue("userRole", selected);
                  }}
                  options={[
                    { value: roles.INTERNEE, label: roles.INTERNEE },
                    { value: roles.PROBATION, label: roles.PROBATION },
                    { value: roles.EMPLOYEE, label: roles.EMPLOYEE },
                    { value: roles.PM, label: roles.PM },
                    { value: roles.ADMIN, label: roles.ADMIN },
                    { value: roles.HR, label: roles.HR },
                    { value: roles.AM, label: roles.AM },
                  ]}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.userRole && props.errors.userRole}
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
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={machineModal}
            toggle={toggleMachineEdit}
          >
            <ModalHeader toggle={toggleMachineEdit}>
              Add New Machone
            </ModalHeader>
            <ModalBody>
              <MachineForm toggle={toggleMachineEdit} />
            </ModalBody>
          </Modal>
        </>
      )}
    </Formik>
  );
};

export default UserForm;

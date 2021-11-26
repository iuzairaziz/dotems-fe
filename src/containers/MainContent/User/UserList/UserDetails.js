import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";
import moment from "moment";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import UserService from "../../../../services/UserService";
import { Progress } from "reactstrap";
import "./UserDetails.scss";

const UserDetails = (props) => {
  {
    const [userData, setUserData] = useState();
    const [taskData, setTaskData] = useState([]);

    const [dataa, setData] = useState({
      columns: [
        {
          label: "Title",
          field: "title",
          sort: "asc",
          // width: 150,
        },
        {
          label: "Project",
          field: "project",
          sort: "asc",
          // width: 270,
        },
        {
          label: "Estimated Hours",
          field: "estimatedHrs",
          sort: "asc",
          // width: 200,
        },
        {
          label: "Project Ratio",
          field: "projectRatio",
          sort: "asc",
          // width: 100,
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
          // width: 100,
        },
        {
          label: "Team Lead",
          field: "teamLead",
          sort: "asc",
          // width: 100,
        },
        // {
        //   label: "Added By",
        //   field: "addedBy",
        //   sort: "asc",
        //   // width: 100,
        // },
        {
          label: "Start Time",
          field: "startTime",
          sort: "asc",
          // width: 100,
        },
        {
          label: "End Time",
          field: "endTime",
          sort: "asc",
          // width: 100,
        },
      ],
      rows: [],
    });

    console.log("props", props.match.params.id);
    const userID = props.match.params.id;

    useEffect(() => {
      getData(userID);
    }, []);

    // console.log("User", userData);

    const getData = (id) => {
      UserService.getUserById(id)
        .then((res) => {
          const { tasks, user } = res.data;
          console.log(tasks);
          setUserData(user);
          setTaskData(tasks);
          let data = { ...dataa };
          data.rows = [];
          tasks.map((item, index) => {
            data.rows.push({
              title: item.name ? item.name : "none",
              project: item.project ? item.project.name : "none",
              estimatedHrs: item.estHrs ? item.estHrs.toFixed(2) : "none",
              projectRatio: item.projectRatio ? (
                <Progress color="teal" value={item.projectRatio}>
                  {item.projectRatio + "%"}
                </Progress>
              ) : (
                "N/A"
              ),
              status: item.status ? item.status : "none",
              teamLead:
                item.teamLead && item.teamLead ? (
                  <Link to={`/userdetails/${item.teamLead._id}`}>
                    {" "}
                    {item.teamLead.name}{" "}
                  </Link>
                ) : (
                  "none"
                ),
              // addedBy: item.addedBy ? item.addedBy.name : "none",
              startTime: item.startTime
                ? moment(item.startTime).format("DD/MMM/YYYY")
                : "none",
              endTime: item.endTime
                ? moment(item.endTime).format("DD/MMM/YYYY")
                : "none",
            });
          });
          setData(data);
          // console.log("tasksss", data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    // console.log("Tasks", taskData);

    const detail = [
      {
        label: "Name",
        value: userData && `${userData.firstName} ${userData.lastName}`,
      },
      {
        label: "UserName",
        value: userData && userData.email,
      },

      {
        label: "Joining Date",
        value: userData && moment(userData.joiningDate).format("DD-MM-YYYY"),
      },
      {
        label: "Machine Number",
        value: userData && userData.machineNo && userData.machineNo.machineNo,
      },
      {
        label: "Salary",
        value: userData && userData.salary,
      },
      { label: "Designation", value: userData && userData.designation.name },
      {
        label: "Status",
        value: userData && userData.status,
      },
      {
        label: "Gender",
        value: userData && userData.gender,
      },

      {
        label: "Contact Number",
        value: userData && userData.contactNo,
      },
      {
        label: "Other Contact",
        value: userData && userData.otherContactNo,
      },
      {
        label: "Working Hours",
        value: userData && userData.workingHours.name,
      },
      {
        label: "Working Days",
        value: userData && userData.workingDays.name,
      },
      {
        label: "Personal Mail",
        value: userData && userData.personalEmail,
      },
      {
        label: "Address",
        value: userData && userData.address,
      },
      {
        label: "Guardian Name",
        value: userData && userData.guardianName,
      },
      {
        label: "Role",
        value: userData && userData.role.name,
      },
      {
        label: "Technology",
        value:
          userData &&
          userData.technology &&
          userData.technology.map((item, index) => {
            return (
              <div>
                {item.name}
                <br />
              </div>
            );
            if (index === 0) {
              return item.name;
            } else if (index >= 0) {
              return `, ${item.name} `;
            }
          }),
      },
    ];

    return (
      <AUX>
        <div className="row">
          <div className="col-lg-12">
            <div className="card m-b-20">
              <div className="card-body">
                <ul className="nav nav-pills" role="tablist">
                  <li className="nav-item waves-effect waves-light">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#home-1"
                      role="tab"
                    >
                      <span className="d-none d-md-block">
                        {" "}
                        <i class="mdi mdi-information pr-1" />
                        Quick Info
                      </span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-home-variant h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item waves-effect waves-light">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#profile-1"
                      role="tab"
                    >
                      <span className="d-none d-md-block">
                        <i class="mdi mdi-information-outline pr-1" /> Offical
                        Info
                      </span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-account h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item waves-effect waves-light">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#messages-1"
                      role="tab"
                    >
                      <span className="d-none d-md-block">
                        <i class="mdi mdi-account-box pr-1" />
                        Personal Info
                      </span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-email h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item waves-effect waves-light">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#settings-1"
                      role="tab"
                    >
                      <span className="d-none d-md-block">
                        <i class="mdi mdi-bank pr-1" />
                        Bank Details
                      </span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-settings h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item waves-effect waves-light">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#settings-2"
                      role="tab"
                    >
                      <span className="d-none d-md-block">
                        <i class="mdi mdi-calendar-multiple pr-1" />
                        Dates and Others
                      </span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-settings h5" />
                      </span>
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div
                    className="tab-pane active p-3"
                    id="home-1"
                    role="tabpanel"
                  >
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            name="firstName"
                            onBlur={props.handleBlur}
                            type="text"
                            className={`form-control ${
                              props.touched.firstName && props.errors.firstName
                                ? "is-invalid"
                                : props.touched.firstName && "is-valid"
                            }`}
                            value={props.values.firstName}
                            onChange={props.handleChange("firstName")}
                            placeholder="Enter First Name"
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.firstName && props.errors.firstName}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            name="lastName"
                            onBlur={props.handleBlur}
                            type="text"
                            className={`form-control ${
                              props.touched.lastName && props.errors.lastName
                                ? "is-invalid"
                                : props.touched.lastName && "is-valid"
                            }`}
                            value={props.values.lastName}
                            onChange={props.handleChange("lastName")}
                            placeholder="Enter Last Name"
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.lastName && props.errors.lastName}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            name="email"
                            onBlur={props.handleBlur}
                            type="text"
                            className={`form-control ${
                              props.touched.email && props.errors.email
                                ? "is-invalid"
                                : props.touched.email && "is-valid"
                            }`}
                            value={props.values.email}
                            onChange={props.handleChange("email")}
                            placeholder="Enter user name / email"
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.email && props.errors.email}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label className="control-label">Password</label>
                            </div>
                            <div className="col">
                              <div
                                className="d-flex justify-content-end"
                                id="add-new-Buttonm "
                                onClick={() => {
                                  props.setFieldValue(
                                    "password",
                                    passwordgenerate()
                                  );
                                }}
                              >
                                <label className="control-label generate-password">
                                  Generate Password
                                </label>
                              </div>
                            </div>
                          </div>
                          <input
                            name="password"
                            onBlur={props.handleBlur}
                            type="text"
                            className={`form-control ${
                              props.touched.password && props.errors.password
                                ? "is-invalid"
                                : props.touched.password && "is-valid"
                            }`}
                            // defaultValue={password}
                            value={props.values.password}
                            onChange={props.handleChange("password")}
                            placeholder="Enter Password"
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.password && props.errors.password}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
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
                            // isMulti={true}
                            onChange={(selected) => {
                              props.setFieldValue("userRole", selected);
                            }}
                            options={userRole}
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.userRole && props.errors.userRole}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane p-3" id="profile-1" role="tabpanel">
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label>Job Title</label>
                          <input
                            name="jobTitle"
                            onBlur={props.handleBlur}
                            type="text"
                            className={`form-control ${
                              props.touched.jobTitle && props.errors.jobTitle
                                ? "is-invalid"
                                : props.touched.jobTitle && "is-valid"
                            }`}
                            value={props.values.jobTitle}
                            onChange={props.handleChange("jobTitle")}
                            placeholder="Enter Job Title"
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.jobTitle && props.errors.jobTitle}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label className="control-label">
                                Designation
                              </label>
                            </div>
                            <div className="col">
                              <div
                                className="d-flex justify-content-end"
                                id="add-new-Buttonm "
                                onClick={() => {
                                  toggleDesignationEdit();
                                }}
                              >
                                <i className="mdi mdi-plus icon-add" />
                              </div>
                            </div>
                          </div>
                          <Select
                            name="designation"
                            className={`my-select${
                              props.touched.designation &&
                              props.errors.designation
                                ? "is-invalid"
                                : props.touched.designation && "is-valid"
                            }`}
                            onBlur={props.handleBlur}
                            value={props.values.designation}
                            onChange={(val) =>
                              props.setFieldValue("designation", val)
                            }
                            options={designation}
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.designation &&
                              props.errors.designation}
                          </span>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label className="control-label">
                                Employee Type
                              </label>
                            </div>
                            <div className="col">
                              <div
                                className="d-flex justify-content-end"
                                id="add-new-Buttonm "
                                onClick={() => {
                                  toggleEmployeeTypeModal();
                                }}
                              >
                                <i className="mdi mdi-plus icon-add" />
                              </div>
                            </div>
                          </div>
                          <Select
                            name="employeeType"
                            className={`my-select${
                              props.touched.employeeType &&
                              props.errors.employeeType
                                ? "is-invalid"
                                : props.touched.employeeType && "is-valid"
                            }`}
                            onBlur={props.handleBlur}
                            value={props.values.employeeType}
                            onChange={(val) =>
                              props.setFieldValue("employeeType", val)
                            }
                            options={employeeType}
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.employeeType &&
                              props.errors.employeeType}
                          </span>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label className="control-label">
                                Employee Manager
                              </label>
                            </div>
                          </div>
                          <Select
                            name="employeeManager"
                            className={`my-select${
                              props.touched.employeeManager &&
                              props.errors.employeeManager
                                ? "is-invalid"
                                : props.touched.employeeManager && "is-valid"
                            }`}
                            onBlur={props.handleBlur}
                            value={props.values.employeeManager}
                            onChange={(val) =>
                              props.setFieldValue("employeeManager", val)
                            }
                            options={employeeManager}
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.employeeManager &&
                              props.errors.employeeManager}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label className="control-label">
                                Department
                              </label>
                            </div>
                            <div className="col">
                              <div
                                className="d-flex justify-content-end"
                                id="add-new-Buttonm "
                                onClick={() => {
                                  toggleDepartmentModal();
                                }}
                              >
                                <i className="mdi mdi-plus icon-add" />
                              </div>
                            </div>
                          </div>
                          <Select
                            name="department"
                            className={`my-select${
                              props.touched.department &&
                              props.errors.department
                                ? "is-invalid"
                                : props.touched.department && "is-valid"
                            }`}
                            onBlur={props.handleBlur}
                            value={props.values.department}
                            onChange={(val) =>
                              props.setFieldValue("department", val)
                            }
                            options={department}
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.department &&
                              props.errors.department}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label className="control-label">
                                Employee Status
                              </label>
                            </div>
                          </div>
                          <Select
                            name="employeeStatus"
                            className={`my-select${
                              props.touched.employeeStatus &&
                              props.errors.employeeStatus
                                ? "is-invalid"
                                : props.touched.employeeStatus && "is-valid"
                            }`}
                            onBlur={props.handleBlur}
                            value={props.values.employeeStatus}
                            onChange={(val) => {
                              console.log(val);
                              props.setFieldValue("employeeStatus", val);
                            }}
                            options={[
                              {
                                value: "Employed",
                                label: "Employed",
                              },
                              {
                                value: "Resigned",
                                label: "Resigned",
                              },
                              {
                                value: "Terminate",
                                label: "Terminate",
                              },
                              { value: "Other", label: "Other" },
                            ]}
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.employeeStatus &&
                              props.errors.employeeStatus}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label className="control-label">
                                Working Days
                              </label>
                            </div>
                          </div>
                          <Select
                            name="workingDays"
                            className={`my-select${
                              props.touched.workingDays &&
                              props.errors.workingDays
                                ? "is-invalid"
                                : props.touched.workingDays && "is-valid"
                            }`}
                            onBlur={props.handleBlur}
                            value={props.values.workingDays}
                            onChange={(val) =>
                              props.setFieldValue("workingDays", val)
                            }
                            options={workingDays}
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.workingDays &&
                              props.errors.workingDays}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label className="control-label">
                                Working Hours
                              </label>
                            </div>
                          </div>
                          <Select
                            name="department"
                            className={`my-select${
                              props.touched.workingHours &&
                              props.errors.workingHours
                                ? "is-invalid"
                                : props.touched.workingHours && "is-valid"
                            }`}
                            onBlur={props.handleBlur}
                            value={props.values.workingHours}
                            onChange={(val) =>
                              props.setFieldValue("workingHours", val)
                            }
                            options={workingHrs}
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.workingHours &&
                              props.errors.workingHours}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
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

                      <div className="col-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label className="control-label">
                                Machine No
                              </label>
                            </div>
                            <div className="col">
                              <div
                                className="d-flex justify-content-end"
                                id="add-new-Buttonm "
                                onClick={() => {
                                  toggleMachineEdit();
                                }}
                              >
                                <i className="mdi mdi-plus icon-add" />
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
                            onChange={(val) =>
                              props.setFieldValue("machineNo", val)
                            }
                            options={machineNo}
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.machineNo && props.errors.machineNo}
                          </span>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label className="control-label">
                                Resource Cost{" "}
                              </label>
                            </div>
                            <div className="col">
                              <div
                                className="d-flex justify-content-end"
                                id="add-new-Buttonm "
                                onClick={() => {
                                  toggleResourceCostModal();
                                }}
                              >
                                <i className="mdi mdi-plus icon-add" />
                              </div>
                            </div>
                          </div>
                          <Select
                            name="resourceCost"
                            className={`my-select ${
                              props.touched.resourceCost &&
                              props.errors.resourceCost
                                ? "is-invalid"
                                : props.touched.resourceCost && "is-valid"
                            }`}
                            onBlur={props.handleBlur}
                            value={props.values.resourceCost}
                            onChange={(val) =>
                              props.setFieldValue("resourceCost", val)
                            }
                            options={resourceCost}
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.resourceCost &&
                              props.errors.resourceCost}
                          </span>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label className="control-label">
                                Leave Policy{" "}
                              </label>
                            </div>
                          </div>
                          <Select
                            name="leavePolicy"
                            className={`my-select ${
                              props.touched.leavePolicy &&
                              props.errors.leavePolicy
                                ? "is-invalid"
                                : props.touched.leavePolicy && "is-valid"
                            }`}
                            onBlur={props.handleBlur}
                            value={props.values.leavePolicy}
                            onChange={(val) =>
                              props.setFieldValue("leavePolicy", val)
                            }
                            options={leavePolicy}
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.leavePolicy &&
                              props.errors.leavePolicy}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane p-3" id="messages-1" role="tabpanel">
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label className="control-label">Technology</label>
                          <Select
                            className={`my-select ${
                              props.touched.technology &&
                              props.errors.technology
                                ? "is-invalid"
                                : props.touched.technology && "is-valid"
                            }`}
                            value={props.values.technology}
                            onChange={(val) =>
                              props.setFieldValue("technology", val)
                            }
                            options={technology}
                            isMulti={true}
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.technology &&
                              props.errors.technology}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Contact Number</label>
                          <input
                            type="text"
                            className={`form-control ${
                              props.touched.contactNo && props.errors.contactNo
                                ? "is-invalid"
                                : props.touched.contactNo && "is-valid"
                            }`}
                            value={props.values.contactNo}
                            onChange={props.handleChange("contactNo")}
                            placeholder="Enter Contact Number"
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.contactNo && props.errors.contactNo}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Other Contact </label>
                          <input
                            type="text"
                            className={`form-control ${
                              props.touched.otherContactNo &&
                              props.errors.otherContactNo
                                ? "is-invalid"
                                : props.touched.otherContactNo && "is-valid"
                            }`} // defaultValue={props.values.otherContact}
                            value={props.values.otherContactNo}
                            onChange={props.handleChange("otherContactNo")}
                            placeholder="Enter Contact Number"
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.otherContactNo &&
                              props.errors.otherContactNo}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Personal Email</label>
                          <input
                            type="text"
                            className={`form-control ${
                              props.touched.personalEmail &&
                              props.errors.personalEmail
                                ? "is-invalid"
                                : props.touched.personalEmail && "is-valid"
                            }`} // defaultValue={props.values.emailPersonal}
                            value={props.values.personalEmail}
                            onChange={props.handleChange("personalEmail")}
                            placeholder="Enter Personal Email"
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.personalEmail &&
                              props.errors.personalEmail}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Address </label>
                          <input
                            type="text"
                            className={`form-control ${
                              props.touched.address && props.errors.address
                                ? "is-invalid"
                                : props.touched.address && "is-valid"
                            }`} // defaultValue={props.values.address}
                            value={props.values.address}
                            onChange={props.handleChange("address")}
                            placeholder="Enter Address "
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.address && props.errors.address}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Guardian Name </label>
                          <input
                            type="text"
                            className={`form-control ${
                              props.touched.guardianName &&
                              props.errors.guardianName
                                ? "is-invalid"
                                : props.touched.guardianName && "is-valid"
                            }`} // defaultValue={props.values.nameEmergency}
                            value={props.values.guardianName}
                            onChange={props.handleChange("guardianName")}
                            placeholder="Enter Guardian Name "
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.guardianName &&
                              props.errors.guardianName}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Guardian Contact</label>
                          <input
                            type="text"
                            className={`form-control ${
                              props.touched.guardianContact &&
                              props.errors.guardianContact
                                ? "is-invalid"
                                : props.touched.guardianContact && "is-valid"
                            }`} // defaultValue={props.values.contactEmergency}
                            value={props.values.guardianContact}
                            onChange={props.handleChange("guardianContact")}
                            placeholder="Enter Guardian Contact Number"
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.contactEmergency &&
                              props.errors.contactEmergency}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
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
                      <div className="col-6">
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
                      <div className="col-6">
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            className={`form-control ${
                              props.touched.city && props.errors.city
                                ? "is-invalid"
                                : props.touched.city && "is-valid"
                            }`} // defaultValue={props.values.city}
                            value={props.values.city}
                            onChange={props.handleChange("city")}
                            placeholder="Enter City"
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.city && props.errors.city}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            className={`form-control ${
                              props.touched.country && props.errors.country
                                ? "is-invalid"
                                : props.touched.country && "is-valid"
                            }`} // defaultValue={props.values.country}
                            value={props.values.country}
                            onChange={props.handleChange("country")}
                            placeholder="Enter Country"
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.country && props.errors.country}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane p-3" id="settings-1" role="tabpanel">
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label>Bank Name</label>
                          <input
                            name="bankName"
                            type="text"
                            className={`form-control ${
                              props.touched.bankName && props.errors.bankName
                                ? "is-invalid"
                                : props.touched.bankName && "is-valid"
                            }`} // defaultValue={props.values.contactEmergency}
                            value={props.values.bankName}
                            onChange={props.handleChange("bankName")}
                            placeholder="Enter Bank Name"
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.bankName && props.errors.bankName}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Account Number</label>
                          <input
                            name="bankAccNo"
                            type="text"
                            className={`form-control ${
                              props.touched.bankAccNo && props.errors.bankAccNo
                                ? "is-invalid"
                                : props.touched.contactEmergency && "is-valid"
                            }`} // defaultValue={props.values.bankAccNo}
                            value={props.values.bankAccNo}
                            onChange={props.handleChange("bankAccNo")}
                            placeholder="Enter Bank Accunt Number"
                          />
                          <span id="err" className="invalid-feedback">
                            {props.touched.bankAccNo && props.errors.bankAccNo}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane p-3" id="settings-2" role="tabpanel">
                    <div className="row">
                      <div className="col-6">
                        {" "}
                        <div className="form-group">
                          <label>Joining Date</label>
                          <div>
                            <DatePicker
                              name="joiningDate"
                              onBlur={props.handleBlur}
                              className={`form-control ${
                                props.touched.joiningDate &&
                                props.errors.joiningDate
                                  ? "is-invalid"
                                  : props.touched.joiningDate && "is-valid"
                              }`}
                              selected={props.values.joiningDate}
                              onChange={(date) => {
                                props.setFieldValue("joiningDate", date);
                              }}
                            />
                          </div>
                          <span id="err" className="invalid-feedback">
                            {props.touched.joiningDate &&
                              props.errors.joiningDate}
                          </span>
                        </div>{" "}
                      </div>
                      <div className="col-6">
                        {" "}
                        <div className="form-group">
                          <label>Resign/Terminate Date</label>
                          <div>
                            <DatePicker
                              name="resignDate"
                              onBlur={props.handleBlur}
                              className={`form-control ${
                                props.touched.terminationDate &&
                                props.errors.terminationDate
                                  ? "is-invalid"
                                  : props.touched.terminationDate && "is-valid"
                              }`}
                              selected={props.values.terminationDate}
                              onChange={(date) => {
                                props.setFieldValue("terminationDate", date);
                              }}
                            />
                          </div>
                          <span id="err" className="invalid-feedback">
                            {props.touched.terminationDate &&
                              props.errors.terminationDate}
                          </span>
                        </div>{" "}
                      </div>
                      <div className="col-6">
                        {" "}
                        <div className="form-group">
                          <label>Date of birth</label>
                          <div>
                            <DatePicker
                              name="dateOfBirth"
                              onBlur={props.handleBlur}
                              className={`form-control ${
                                props.touched.dateOfBirth &&
                                props.errors.dateOfBirth
                                  ? "is-invalid"
                                  : props.touched.dateOfBirth && "is-valid"
                              }`}
                              selected={props.values.dateOfBirth}
                              onChange={(date) => {
                                props.setFieldValue("dateOfBirth", date);
                              }}
                            />
                          </div>
                          <span id="err" className="invalid-feedback">
                            {props.touched.dateOfBirth &&
                              props.errors.dateOfBirth}
                          </span>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col">
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
            </div> */}
        </div>
      </AUX>
    );
  }
};

export default UserDetails;

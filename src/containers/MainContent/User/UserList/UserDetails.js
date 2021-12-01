import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import moment from "moment";
import { withRouter } from "react-router-dom";
import UserForm from "../AddUserForm/AddUserForm";
import UserService from "../../../../services/UserService";
import { Progress } from "reactstrap";
import UserList from "../UserList/UserList";
import ChangePasswordForm from "../AddUserForm/ChangePasswordForm";
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

    console.log("props", props);
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
    console.log("Tasks", userData);

    return (
      <AUX>
        <div className="row">
          <div className="col-lg-12">
            <div className="card m-b-20">
              <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link "
                      data-toggle="tab"
                      href="#profile2"
                      role="tab"
                    >
                      <span className="d-none d-md-block">User List</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-account h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link "
                      data-toggle="tab"
                      href="#adduser"
                      role="tab"
                    >
                      <span className="d-none d-md-block">+ Add User</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-account h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#home2"
                      role="tab"
                    >
                      <span className="d-none d-md-block"> View User</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-home-variant h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#settings2"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Settings</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-settings h5" />
                      </span>
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane  p-3" id="profile2" role="tabpanel">
                    <UserList />
                  </div>
                  <div className="tab-pane  p-3" id="adduser" role="tabpanel">
                    <UserForm />
                  </div>
                  <div
                    className="tab-pane active p-3"
                    id="home2"
                    role="tabpanel"
                  >
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
                                    <i class="mdi mdi-information-outline pr-1" />{" "}
                                    Offical Info
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
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.firstName}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Last Name</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.lastName}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Email</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.email}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Password</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.password}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Access Role
                                      </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData &&
                                          userData.role &&
                                          userData.role.name
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane p-3"
                                id="profile-1"
                                role="tabpanel"
                              >
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Job Title</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.jobTitle}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Designation
                                      </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData &&
                                          userData.designation &&
                                          userData.designation.name
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Employee Type
                                      </label>

                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData && userData.employeeType.name
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Employee Manager
                                      </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData &&
                                          `${
                                            userData.employeeManager.firstName
                                          } ${
                                            userData.employeeManager.lastName
                                          }`
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Department
                                      </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData &&
                                          userData.department &&
                                          userData.department.name
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Employee Status
                                      </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData && userData.employeeStatus
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Working Days
                                      </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData && userData.workingDays.name
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Working Hours
                                      </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData && userData.workingHours.name
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Salary</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.salary}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Machine No
                                      </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData &&
                                          userData.machineNo &&
                                          `${userData.machineNo.machineNo}`
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Resource Cost{" "}
                                      </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData &&
                                          userData.resourceCost &&
                                          userData.resourceCost.name
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Leave Policy{" "}
                                      </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData &&
                                          userData.leavePolicy &&
                                          userData.leavePolicy.name
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane p-3"
                                id="messages-1"
                                role="tabpanel"
                              >
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Technology
                                      </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData &&
                                          userData.technology &&
                                          userData.technology.map(
                                            (item) => item.name
                                          )
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Contact Number</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.contactNo}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Other Contact </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData && userData.otherContactNo
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Personal Email</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData && userData.personalEmail
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Address </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.salary}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Guardian Name </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData && userData.guardianName
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Guardian Contact</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData && userData.guardianContact
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Status
                                      </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.status}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Gender
                                      </label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.gender}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>City</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.city}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Country</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.country}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane p-3"
                                id="settings-1"
                                role="tabpanel"
                              >
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Bank Name</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.bankName}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group">
                                      <label>Account Number</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.bankAccNo}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane p-3"
                                id="settings-2"
                                role="tabpanel"
                              >
                                <div className="row">
                                  <div className="col-6">
                                    {" "}
                                    <div className="form-group">
                                      <label>Joining Date</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.joiningDate}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>{" "}
                                  </div>
                                  <div className="col-6">
                                    {" "}
                                    <div className="form-group">
                                      <label>Resign/Terminate Date</label>

                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={
                                          userData && userData.terminationDate
                                        }
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
                                    </div>{" "}
                                  </div>
                                  <div className="col-6">
                                    {" "}
                                    <div className="form-group">
                                      <label>Date of birth</label>
                                      <input
                                        readOnly={true}
                                        name="title"
                                        onBlur={props.handleBlur}
                                        type="text"
                                        className={`form-control`}
                                        value={userData && userData.dateOfBirth}
                                        // onChange={props.handleChange("title")}
                                        placeholder="Enter Name"
                                      />
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
                  </div>
                  <div className="tab-pane p-3" id="settings2" role="tabpanel">
                    <div className="card user">
                      <div className="row cardd">
                        <i
                          class="mdi mdi-account iconSize"
                          style={{ color: "var(--color-secondary1)" }}
                        />
                        <i class="mdi mdi-settings iconSize" />
                      </div>
                      <div className="row cSettings">
                        <h2>User Settings</h2>
                      </div>
                      <div className="border-b" />
                      <div className="row cardd">
                        <Link to="/role/add">Roles</Link>
                      </div>
                      <div className="row cardd">
                        <Link to="/permissions">Roles & Permissions</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/add-designation">Designation</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/add-employee-type">Employee Type</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/add-department">Department</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/leave/add-new-working-day">
                          Working Days
                        </Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/working-hours-add">Working Hours</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/working-shift-add">Working Shift</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/add-machine">Machine</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/resource-cost-add">Resource Cost</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/add-leave-policy">Leave Policy</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
};

export default withRouter(UserDetails);

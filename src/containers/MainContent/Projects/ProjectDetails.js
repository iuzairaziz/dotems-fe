import React, { Component, useState, useEffect } from "react";
import AUX from "../../../hoc/Aux_";
import ProjectService from "../../../services/ProjectService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import moment from "moment";
import { convertFromRaw, EditorState } from "draft-js";
import $ from "jquery";
import "./ProjectDetails.scss";
import ProjectComments from "./ProjectComments/ProjectComments";
import userService from "../../../services/UserService";
import Configuration from "../../../config/configuration";
import { Link } from "react-router-dom";
import ViewProject from "../Projects/ViewProjects";
import MyProject from "../Projects/MyProject";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import TaskForm from "../Tasks/TaskForm/TaskForm";
import RoleAuth from "../../../components/MyComponents/Auth/RoleAuth";

const ProjectDetails = (props) => {
  {
    const [projectData, setData] = useState();
    const [taskModal, setTaskModal] = useState(false);

    const roless = new Configuration().Roles;

    const { PM } = roless;

    const [tabledata, setTableData] = useState({
      columns: [
        {
          label: "Task Name",
          field: "taskname",
          sort: "asc",
        },
        {
          label: "Team Member",
          field: "teamMember",
          sort: "disabled",
          width: 125,
        },
        {
          label: "Start Date",
          field: "startDate",
          sort: "disabled",
        },
        {
          label: "End Date",
          field: "endDate",
          sort: "disabled",
        },
        {
          label: "Estimate Hrs",
          field: "EstHrs",
          sort: "disabled",
          // width: 100,
        },
        {
          label: "Actual Hrs",
          field: "ActHrs",
          sort: "disabled",
          // width: 100,
        },
        {
          label: "Work Done",
          field: "wrkdone",
          sort: "disabled",
        },
        {
          label: "Status",
          field: "status",
          sort: "disabled",
          // width: 150,
        },
        {
          label: "Action",
          field: "action",
          sort: "disabled",
          // width: 150,
        },
      ],
      rows: [],
    });

    const [estCost, setEstCost] = useState({
      columns: [
        {
          label: "Employee Name",
          field: "empName",
          sort: "asc",
        },
        {
          label: "Employee Cost per hour",
          field: "costperhr",
        },

        {
          label: "Employee Estimate Hours",
          field: "esthr",
        },
        {
          label: "Employee Project Estimate Cost ",
          field: "projEstCst",
        },
        {
          label: "Total Estimated Cost",
          field: "totalEstCst",
        },
        {
          label: "Total Outscource Cost",
          field: "totalOutsurce",
        },
        {
          label: "Assessment Profit/Loss",
          field: "endDate",
        },
      ],
      rows: [],
    });

    const projectId = props.match.params.id;
    let loggedUser = userService.userLoggedInInfo();
    const toggleTaskEdit = () => setTaskModal(!taskModal);

    useEffect(() => {
      if (loggedUser.userRole.includes(roless.ADMIN)) {
        getData(projectId);
      } else if (loggedUser.userRole.includes(roless.PM)) {
        getPMData(projectId, loggedUser._id);
      } else if (
        loggedUser.userRole.some((role) => {
          return (
            role === roless.INTERNEE ||
            role === roless.PROBATION ||
            role === roless.EMPLOYEE
          );
        })
      ) {
        getEmployeeData(projectId, loggedUser._id);
      }
    }, []);

    useEffect(() => {
      getTableData();
    }, [taskModal]);

    const changeColor = () => {
      $(document).ready(function() {
        $("tr").each(function(index) {
          var four = $(this)
            .children("td")
            .eq(4)
            .text();
          var five = $(this)
            .children("td")
            .eq(5)
            .text();
          var finalFour = parseInt(four);
          var finalFive = parseInt(five);
          if (finalFive > finalFour) {
            $(this).css("color", "red");
            $(this)
              .find("a")
              .css("color", "red");
          }
        });
      });
    };

    $(document).ready(function() {
      changeColor();
      $(document).on("click", "th", function() {
        changeColor();
      });
    });

    const getData = (id) => {
      ProjectService.getProjectAndTask(id)
        .then((res) => {
          setData(res.data[0]);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };

    const getPMData = (projectID, pmID) => {
      ProjectService.getPmProjectAndTask(projectID, pmID)
        .then((res) => {
          setData(res.data[0]);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };

    const getEmployeeData = (projectID, pmID) => {
      ProjectService.getUserProjectAndTask(projectID, pmID)
        .then((res) => {
          setData(res.data[0]);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };

    const getTableData = () => {
      let data = { ...tabledata };
      data.rows = [];
      projectData &&
        projectData.tasks.map((item, index) => {
          data.rows.push({
            taskname: item.name ? item.name : "N/A ",
            teamMember: item.assignedTo
              ? item.assignedTo.map((item, index) => {
                  if (index === 0) {
                    return item.name;
                  } else if (index >= 0) {
                    return `, ${item.name} `;
                  }
                })
              : "N/A ",
            startDate: item.startTime
              ? moment(item.startTime).format("DD/MMM/YYYY")
              : "N/A ",
            // endDate: item.  ? item. : "N/A ",
            EstHrs: item.estHrs ? item.estHrs : "N/A ",
            ActHrs: item.actualHrs ? item.actualHrs : "N/A ",
            wrkdone: item.workDone ? item.workDone : "N/A ",
            status: item.status ? item.status : "N/A ",
            otherDeduction: item.otherDeduction ? item.otherDeduction : "N/A ",
            action: (
              <div className="row flex-nowrap justify-content-center">
                <i
                  className="mdi mdi-view-list
                  iconsS my-primary-icon"
                  onClick={() => {
                    props.history.push({
                      pathname: "/task-details/" + item._id,
                    });
                  }}
                />
              </div>
            ),
          });
        });
      setTableData(data);
    };

    return (
      <AUX>
        <div className="col-lg-12">
          <div className="card m-b-20">
            <div className="card-body">
              <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link "
                    data-toggle="tab"
                    href="#home1"
                    role="tab"
                  >
                    <span className="d-none d-md-block">My Projects</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-clipboard-account h5" />
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#profile1"
                    role="tab"
                  >
                    <span className="d-none d-md-block">Project List</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-clipboard-text h5" />
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#messages1"
                    role="tab"
                  >
                    <span className="d-none d-md-block">View Project</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-plus h5" />
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#settings1"
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
                <div className="tab-pane  p-3" id="home1" role="tabpanel">
                  <MyProject />
                </div>
                <div className="tab-pane p-3" id="profile1" role="tabpanel">
                  <ViewProject />
                </div>
                <div
                  className="tab-pane active p-3"
                  id="messages1"
                  role="tabpanel"
                >
                  <div className="page-content-wrapper projectD">
                    <div className="col-lg-12">
                      <div className="card m-b-20">
                        <div className="card-body">
                          <ul className="nav nav-pills" role="tablist">
                            <li className="nav-item waves-effect waves-light">
                              <a
                                className="nav-link active"
                                data-toggle="tab"
                                href={`#quick-info`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  {" "}
                                  <i class="mdi mdi-information pr-1" /> Quick
                                  Info{" "}
                                </span>
                                <span className="d-block d-md-none">
                                  <i className="mdi mdi-information h5" />
                                </span>
                              </a>
                            </li>
                            <li className="nav-item waves-effect waves-light">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href={`#client-info`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  {" "}
                                  <i class="mdi mdi-account-multiple" />
                                  Client Info
                                </span>
                                <span className="d-block d-md-none">
                                  <i className="mdi mdi-account-multiple h5" />
                                </span>
                              </a>
                            </li>
                            <li className="nav-item waves-effect waves-light">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href={`#financial-info`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  {" "}
                                  <i class="mdi mdi-cash-multiple" />
                                  Financial Info
                                </span>
                                <span className="d-block d-md-none">
                                  <i className="mdi mdi-cash-multiple h5" />
                                </span>
                              </a>
                            </li>
                            <li className="nav-item waves-effect waves-light">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href={`#planning-assessment`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  <i class="mdi mdi-clipboard-text" />
                                  Planning and Assessment
                                </span>
                                <span className="d-block d-md-none">
                                  <i className="mdi mdi-clipboard-text h5" />
                                </span>
                              </a>
                            </li>
                            <li className="nav-item waves-effect waves-light">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href={`#project-status`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  {" "}
                                  <i class="mdi mdi-clock" />
                                  Project Status
                                </span>
                                <span className="d-block d-md-none">
                                  <i className="mdi mdi-clock h5" />
                                </span>
                              </a>
                            </li>
                            <li className="nav-item waves-effect waves-light">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href={`#attachments`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  <i class="mdi mdi-attachment" />
                                  Attachments{" "}
                                </span>
                                <span className="d-block d-md-none">
                                  <i className="mdi mdi-attachment h5" />
                                </span>
                              </a>
                            </li>
                            <li className="nav-item waves-effect waves-light">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href={`#pac`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  <i class="mdi mdi-cash-usd" />
                                  Project Assessment Cost{" "}
                                </span>
                                <span className="d-block d-md-none">
                                  <i className="mdi mdi-cash-usd h5" />
                                </span>
                              </a>
                            </li>
                            <li className="nav-item waves-effect waves-light">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href={`#rr`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  <i class="mdi mdi-star-half" />
                                  Review and Ratings{" "}
                                </span>
                                <span className="d-block d-md-none">
                                  <i className="mdi mdi-star-half h5" />
                                </span>
                              </a>
                            </li>
                            <li className="nav-item waves-effect waves-light">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href={`#tasks`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  <i class="mdi mdi-clipboard-outline" />
                                  Project Tasks
                                </span>
                                <span className="d-block d-md-none">
                                  <i className="mdi mdi-clipboard-outline h5" />
                                </span>
                              </a>
                            </li>
                          </ul>

                          <div className="tab-content">
                            <div
                              className="tab-pane active p-3"
                              id={`quick-info`}
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="col">
                                  <div className="form-group">
                                    <label>Project Name</label>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={projectData && projectData.name}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label>Order Number</label>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData && projectData.orderNum
                                          ? projectData.orderNum
                                          : "N/A"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col">
                                        <label className="control-label">
                                          Platform
                                        </label>
                                      </div>
                                    </div>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData && projectData.platform.name
                                          ? projectData.platform.name
                                          : "N/A"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col">
                                        <label className="control-label">
                                          Technology
                                        </label>
                                      </div>
                                    </div>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData && projectData.technology
                                          ? projectData.technology.map(
                                              (item, index) => {
                                                if (index === 0) {
                                                  return item.name;
                                                } else if (index > 0) {
                                                  return ` ${item.name} `;
                                                }
                                              }
                                            )
                                          : "None"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col">
                                        <label className="control-label">
                                          Service Type
                                        </label>
                                      </div>
                                    </div>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData && projectData.service.name
                                          ? projectData.service.name
                                          : "N/A"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col">
                                        <label className="control-label">
                                          Project Nature
                                        </label>
                                      </div>
                                    </div>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData && projectData.nature.name
                                          ? projectData.nature.name
                                          : "N/A"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label className="control-label">
                                      Project Manager
                                    </label>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData &&
                                        projectData.projectManager.name
                                          ? projectData.projectManager.name
                                          : "N/A"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <h4 className="mt-0 header-title">
                                    Description
                                  </h4>
                                  <Editor
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClass"
                                    toolbarStyle={{ display: "none" }}
                                    readOnly={true}
                                    editorStyle={{
                                      minHeight: "300px",
                                    }}
                                    editorState={
                                      projectData &&
                                      EditorState.createWithContent(
                                        convertFromRaw(
                                          JSON.parse(projectData.description)
                                        )
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane p-3"
                              id={`client-info`}
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="col-6">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col">
                                        <label className="control-label">
                                          Client Name
                                        </label>
                                      </div>
                                    </div>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData && projectData.client.name
                                          ? projectData.client.name
                                          : "N/A"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="form-group">
                                    <label className="control-label">
                                      Client Type
                                    </label>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData &&
                                        projectData.client.clientType
                                          ? projectData.client.clientType
                                          : "N/A"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col">
                                  {" "}
                                  <div className="form-group">
                                    <label>Client Start Date</label>
                                    <div>
                                      <input
                                        name="projectName"
                                        type="text"
                                        readOnly={true}
                                        className={`form-control`}
                                        value={
                                          projectData &&
                                          moment(projectData.cStartDate).format(
                                            "DD/MMM/YYYY"
                                          )
                                            ? moment(
                                                projectData.cStartDate
                                              ).format("DD/MMM/YYYY")
                                            : "N/A"
                                        }
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>{" "}
                                </div>
                                <div className="col">
                                  {" "}
                                  <div className="form-group">
                                    <label>Client Deadline</label>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData &&
                                        moment(projectData.cEndDate).format(
                                          "DD/MMM/YYYY"
                                        )
                                          ? moment(projectData.cEndDate).format(
                                              "DD/MMM/YYYY"
                                            )
                                          : "N/A"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane p-3"
                              id={`financial-info`}
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="col">
                                  <div className="form-group">
                                    <label className="control-label">
                                      Project Type
                                    </label>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData && projectData.projectType
                                          ? projectData.projectType
                                          : "N/A"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col">
                                        <label className="control-label">
                                          Currency
                                        </label>
                                      </div>
                                    </div>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData && projectData.currency
                                          ? projectData.currency
                                          : "N/A"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                {projectData && projectData.clientHours ? (
                                  <div className="col">
                                    <div className="form-group">
                                      <div className="row">
                                        <div className="col">
                                          <label className="control-label">
                                            Client Hours
                                          </label>
                                        </div>
                                      </div>
                                      <input
                                        name="projectName"
                                        type="text"
                                        readOnly={true}
                                        className={`form-control`}
                                        value={
                                          projectData && projectData.clientHours
                                            ? projectData.clientHours
                                            : "N/A"
                                        }
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                ) : null}
                                {projectData && projectData.hourlyCost ? (
                                  <div className="col">
                                    <div className="form-group">
                                      <div className="row">
                                        <div className="col">
                                          <label className="control-label">
                                            Hourly Rate
                                          </label>
                                        </div>
                                      </div>
                                      <input
                                        name="projectName"
                                        type="text"
                                        readOnly={true}
                                        className={`form-control`}
                                        value={
                                          projectData && projectData.hourlyCost
                                            ? projectData.hourlyCost
                                            : "N/A"
                                        }
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                ) : null}

                                <div className="col">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col">
                                        <label className="control-label">
                                          Cost
                                        </label>
                                      </div>
                                    </div>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData && projectData.cost
                                          ? projectData.cost
                                          : "N/A"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <div className="form-group">
                                    <label>Platform Deduction</label>
                                    <div className="input-group">
                                      <input
                                        name="projectName"
                                        type="text"
                                        readOnly={true}
                                        className={`form-control`}
                                        value={
                                          projectData && projectData.Pdeduction
                                            ? projectData.Pdeduction
                                            : "N/A"
                                        }
                                        placeholder="Enter Name"
                                      />
                                      <span className="input-group-text">
                                        %
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label>Other Deductions</label>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData &&
                                        projectData.otherDeduction
                                          ? projectData.otherDeduction
                                          : "N/A"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label>Reserve Profit</label>
                                    <div className="input-group">
                                      <input
                                        name="projectName"
                                        type="text"
                                        readOnly={true}
                                        className={`form-control`}
                                        value={
                                          projectData && projectData.Rprofit
                                            ? projectData.Rprofit
                                            : "N/A"
                                        }
                                        placeholder="Enter Name"
                                      />
                                      <span className="input-group-text">
                                        %
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane p-3"
                              id={`planning-assessment`}
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group mb-0">
                                    <label className="control-label">
                                      Team Members
                                    </label>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData && projectData.assignedUser
                                          ? projectData.assignedUser.map(
                                              (item, index) => {
                                                if (index === 0) {
                                                  return item.name;
                                                } else if (index > 0) {
                                                  return ` ${item.name} `;
                                                }
                                              }
                                            )
                                          : "None"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-6">
                                  {" "}
                                  <div className="form-group">
                                    <label>PM Start Date</label>
                                    <div>
                                      <input
                                        name="projectName"
                                        type="text"
                                        readOnly={true}
                                        className={`form-control`}
                                        value={
                                          projectData && projectData.pmStartDate
                                            ? moment(
                                                projectData.pmStartDate
                                              ).format("DD/MMM/YYYY")
                                            : "N/A"
                                        }
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>{" "}
                                </div>
                                <div className="col-6">
                                  <div className="form-group">
                                    <label>PM End Date</label>
                                    <div>
                                      <input
                                        name="projectName"
                                        type="text"
                                        readOnly={true}
                                        className={`form-control`}
                                        value={
                                          projectData && projectData.pmEndDate
                                            ? moment(
                                                projectData.pmEndDate
                                              ).format("DD/MMM/YYYY")
                                            : "N/A"
                                        }
                                        placeholder="Enter Name"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 phases">
                                <h2>Phases</h2>
                              </div>
                              {projectData && projectData.phase
                                ? projectData.phase.map((item, index) => {
                                    return (
                                      <>
                                        {item.estHrs ? (
                                          <div className="row">
                                            <div className="col-6">
                                              <div className="form-group">
                                                <label>Phase Name</label>
                                                <div>
                                                  <input
                                                    name="projectName"
                                                    type="text"
                                                    readOnly={true}
                                                    className={`form-control`}
                                                    value={item.phasename}
                                                    placeholder="Enter Name"
                                                  />
                                                </div>
                                              </div>
                                            </div>{" "}
                                            <div className="col-6">
                                              <div className="form-group">
                                                <label>Estimate Hours</label>
                                                <div>
                                                  <input
                                                    name="projectName"
                                                    type="text"
                                                    readOnly={true}
                                                    className={`form-control`}
                                                    value={item.estHrs}
                                                    placeholder="Enter Name"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ) : null}
                                      </>
                                    );
                                  })
                                : null}
                              <div className="col-12 phases">
                                <h2>Out-Source</h2>
                              </div>
                              {projectData && projectData.phase
                                ? projectData.phase.map((item, index) => {
                                    return (
                                      <>
                                        {!item.estHrs ? (
                                          <div className="row">
                                            <div className="col-6">
                                              <div className="form-group">
                                                <label>Phase Name</label>
                                                <div>
                                                  <input
                                                    name="projectName"
                                                    type="text"
                                                    readOnly={true}
                                                    className={`form-control`}
                                                    value={item.phasename}
                                                    placeholder="Enter Name"
                                                  />
                                                </div>
                                              </div>
                                            </div>{" "}
                                            <div className="col-6">
                                              <div className="form-group">
                                                <label>Out-Source Name</label>
                                                <div>
                                                  <input
                                                    name="projectName"
                                                    type="text"
                                                    readOnly={true}
                                                    className={`form-control`}
                                                    value={item.outSourceName}
                                                    placeholder="Enter Name"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-6">
                                              <div className="form-group">
                                                <label>Cost</label>
                                                <div>
                                                  <input
                                                    name="projectName"
                                                    type="text"
                                                    readOnly={true}
                                                    className={`form-control`}
                                                    value={
                                                      item.outSourceCost
                                                        ? item.outSourceCost
                                                        : null
                                                    }
                                                    placeholder="Enter Name"
                                                  />
                                                </div>
                                              </div>
                                            </div>{" "}
                                            <div className="col-6">
                                              <div className="form-group">
                                                <label>Deadline</label>
                                                <div>
                                                  <input
                                                    name="projectName"
                                                    type="text"
                                                    readOnly={true}
                                                    className={`form-control`}
                                                    value={
                                                      item.outSourceDeadline
                                                        ? moment(
                                                            item.outSourceDeadline
                                                          ).format(
                                                            "DD/MMM/YYYY"
                                                          )
                                                        : null
                                                    }
                                                    placeholder="Enter Name"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ) : null}
                                      </>
                                    );
                                  })
                                : null}
                            </div>
                            <div
                              className="tab-pane p-3"
                              id={`project-status`}
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="col">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col">
                                        <label className="control-label">
                                          Status
                                        </label>
                                      </div>
                                    </div>
                                    <input
                                      name="projectName"
                                      type="text"
                                      readOnly={true}
                                      className={`form-control`}
                                      value={
                                        projectData && projectData.status.name
                                          ? projectData.status.name
                                          : "N/A"
                                      }
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane p-3"
                              id={`attachments`}
                              role="tabpanel"
                            >
                              <p className="font-14 mb-0">attachments</p>
                            </div>
                            <div
                              className="tab-pane p-3"
                              id={`pac`}
                              role="tabpanel"
                            >
                              <MDBDataTableV5
                                responsive
                                striped
                                small
                                onPageChange={(val) => console.log(val)}
                                bordered={true}
                                searchTop
                                searchBottom={false}
                                pagingTop
                                barReverse
                                hover
                                data={estCost}
                                theadColor="#000"
                              />
                            </div>
                            <div
                              className="tab-pane p-3"
                              id={`rr`}
                              role="tabpanel"
                            >
                              <p className="font-14 mb-0">rr</p>
                            </div>
                            <div
                              className="tab-pane p-3"
                              id={`tasks`}
                              role="tabpanel"
                            >
                              <p className="font-14 mb-0">
                                {" "}
                                <MDBDataTableV5
                                  responsive
                                  striped
                                  small
                                  onPageChange={(val) => console.log(val)}
                                  bordered={true}
                                  //  materialSearch
                                  searchTop
                                  searchBottom={false}
                                  pagingTop
                                  barReverse
                                  hover
                                  data={tabledata}
                                  theadColor="#000"
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane p-3" id="settings1" role="tabpanel">
                  <div className="card project">
                    <div className="row cardd">
                      <i
                        class="mdi mdi-file-powerpoint-box iconSize"
                        style={{ color: "var(--color-secondary1)" }}
                      />
                      <i
                        class="mdi mdi-settings iconSize"
                        style={{ color: "var(--color-secondary1)" }}
                      />
                    </div>
                    <div className="row cSettings">
                      <h2>Project Settings</h2>
                    </div>
                    <div className="border-b" />
                    <div className="row cardd ">
                      <Link to="/addclient">Client</Link>
                    </div>
                    <div className="row cardd">
                      <Link to="/add-platform">Platform</Link>
                    </div>
                    <div className="row cardd ">
                      <Link to="/add-technology">Technology</Link>
                    </div>
                    <div className="row cardd ">
                      <Link to="/add-service">Service Type</Link>
                    </div>
                    <div className="row cardd ">
                      <Link to="/add-nature">Project Nature</Link>
                    </div>
                    <div className="row cardd ">
                      <Link to="/addstatus">Status</Link>
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

export default ProjectDetails;

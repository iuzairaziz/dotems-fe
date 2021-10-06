import React, { Component, useState, useEffect } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";
import ProjectService from "../../../services/ProjectService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { Button } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import moment from "moment";
import { convertFromRaw, EditorState } from "draft-js";
import $ from "jquery";
import "./ProjectDetails.scss";
import ProjectComments from "./ProjectComments/ProjectComments";
import userService from "../../../services/UserService";
import Configuration from "../../../config/configuration";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import TaskForm from "../Tasks/TaskForm/TaskForm";
import RoleAuth from "../../../components/MyComponents/Auth/RoleAuth";

const ProjectDetails = (props) => {
  {
    const [projectData, setData] = useState();
    const [taskModal, setTaskModal] = useState(false);

    // const config = new Configuration();
    const roless = new Configuration().Roles;

    // const roles = new Configuration().Roles;
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
      // userService.isUserRole();
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

    const detail = [
      { label: "Project Name", value: projectData && projectData.name },
      {
        label: "Client Name",
        value:
          projectData && projectData.client.name
            ? projectData.client.name
            : "N/A",
      },

      {
        label: "Order Number",
        value:
          projectData && projectData.orderNum ? projectData.orderNum : "N/A",
      },
      {
        label: "Platform",
        value:
          projectData && projectData.platform.name
            ? projectData.platform.name
            : "N/A",
      },
      {
        label: "Service Type",
        value:
          projectData && projectData.service.name
            ? projectData.service.name
            : "N/A",
      },
      {
        label: "Technology",
        value:
          projectData && projectData.technology
            ? projectData.technology.map((item, index) => {
                if (index === 0) {
                  return item.name;
                } else if (index >= 0) {
                  return `, ${item.name} `;
                }
              })
            : "None",
      },
      {
        label: "Status",
        value:
          projectData && projectData.status.name
            ? projectData.status.name
            : "N/A",
      },
      {
        label: "Project Nature",
        value:
          projectData && projectData.nature.name
            ? projectData.nature.name
            : "N/A",
      },

      {
        label: "Client Start Date",
        value:
          projectData && moment(projectData.cStartDate).format("DD/MMM/YYYY")
            ? moment(projectData.cStartDate).format("DD/MMM/YYYY")
            : "N/A",
      },
      {
        label: "Cient Deadline",
        value:
          projectData && moment(projectData.cEndDate).format("DD/MMM/YYYY")
            ? moment(projectData.cEndDate).format("DD/MMM/YYYY")
            : "N/A",
      },
      {
        label: "PM Start Date",
        value:
          projectData && projectData.pmStartDate
            ? moment(projectData.pmStartDate).format("DD/MMM/YYYY")
            : "N/A",
      },
      {
        label: "PM Deadline",
        value:
          projectData && projectData.pmEndDate
            ? moment(projectData.pmEndDate).format("DD/MMM/YYYY")
            : "N/A",
      },
      {
        label: "Cost",
        value: projectData && projectData.cost ? projectData.cost : "N/A",
      },
      {
        label: "Currency",
        value:
          projectData && projectData.currency ? projectData.currency : "N/A",
      },
      {
        label: "Platform Deductions",
        value:
          projectData && projectData.Pdeduction
            ? projectData.Pdeduction
            : "N/A",
      },
      {
        label: "Reserve Profit",
        value: projectData && projectData.Rprofit ? projectData.Rprofit : "N/A",
      },
      {
        label: "Other Deductions",
        value:
          projectData && projectData.otherDeduction
            ? projectData.otherDeduction
            : "N/A",
      },
      {
        label: "Project Manager",
        value:
          projectData && projectData.projectManager.name
            ? projectData.projectManager.name
            : "N/A",
      },
      {
        label: "Team Members",
        value:
          projectData && projectData.assignedUser
            ? projectData.assignedUser.map((item, index) => {
                if (index === 0) {
                  return item.name;
                } else if (index >= 0) {
                  return `, ${item.name} `;
                }
              })
            : "None",
      },
    ];

    return (
      <AUX>
        <div className="page-content-wrapper projectD">
          <div className="container-fluid">
            <div className="row">
              <div className="row">
                <div className="row align-items-center gapp">
                  {detail.map((item, indx) => {
                    return (
                      <>
                        <div
                          className={`labell ${
                            item.label === "Team Members"
                              ? "col-3 col-md-2"
                              : "col-3 col-md-2"
                          } mb-3 d-flex align-items-center align-self-center`}
                        >
                          <div>{item.label}</div>
                        </div>
                        <div
                          className={`valuee ${
                            item.label === "Team Members"
                              ? "col-9 col-md-6"
                              : "col-3 col-md-2"
                          } col-3 col-md-2 mb-3 align-self-center"`}
                        >
                          {item.value}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className="col-lg-12">
                <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#home1"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Description</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-home-variant h5" />
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
                      <span className="d-none d-md-block">Project Tasks</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-account h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#projectComments"
                      role="tab"
                    >
                      <span className="d-none d-md-block">
                        Project Comments
                      </span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-account h5" />
                      </span>
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div
                    className="tab-pane active p-3"
                    id="home1"
                    role="tabpanel"
                  >
                    <Editor
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClass"
                      toolbarStyle={{ display: "none" }}
                      readOnly
                      editorStyle={{
                        minHeight: "300px",
                      }}
                      editorState={
                        projectData &&
                        EditorState.createWithContent(
                          convertFromRaw(JSON.parse(projectData.description))
                        )
                      }
                    />
                  </div>
                  <div className="tab-pane p-3" id="profile1" role="tabpanel">
                    <div className="row">
                      <div className="col">
                        <RoleAuth roles={[PM]}>
                          <div
                            className="d-flex justify-content-end"
                            id="add-new-Buttonm "
                            onClick={() => {
                              toggleTaskEdit();
                            }}
                          >
                            <i className="mdi mdi-plus-circle icon-add" />
                          </div>
                        </RoleAuth>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
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
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane p-3"
                    id="projectComments"
                    role="tabpanel"
                  >
                    <ProjectComments
                      projectId={projectData && projectData._id}
                    />
                  </div>
                </div>
                <Modal
                  style={{ maxWidth: "70%" }}
                  isOpen={taskModal}
                  toggle={toggleTaskEdit}
                >
                  <ModalHeader toggle={toggleTaskEdit}>New Task</ModalHeader>
                  <ModalBody>
                    <TaskForm toggle={toggleTaskEdit} />
                  </ModalBody>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
};

export default ProjectDetails;

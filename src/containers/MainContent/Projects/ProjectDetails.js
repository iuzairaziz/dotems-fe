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

const ProjectDetails = (props) => {
  {
    // const [data, setData] = useState();
    const [projectData, setData] = useState();
    const config = new Configuration();

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

    console.log("props", props.location.projectProps);
    const projectId = props.match.params.id;
    // console.log("Project Name", project.id)

    useEffect(() => {
      getData(projectId);
    }, []);

    useEffect(() => {
      getTableData();
    }, [projectData]);
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
      userService.isUserRole();
      ProjectService.getProjectAndTask(id)
        .then((res) => {
          setData(res.data[0]);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };

    console.log("data", projectData);

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
        value: projectData && projectData.client.name,
      },

      {
        label: "Order Number",
        value: projectData && projectData.orderNum,
      },
      {
        label: "Platform",
        value: projectData && projectData.platform.name,
      },
      { label: "Service Type", value: projectData && projectData.service.name },
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
        value: projectData && projectData.status.name,
      },
      {
        label: "Project Nature",
        value: projectData && projectData.nature.name,
      },

      {
        label: "Client Start Date",
        value:
          projectData && moment(projectData.cStartDate).format("DD/MMM/YYYY"),
      },
      {
        label: "Cient Deadline",
        value:
          projectData && moment(projectData.cEndDate).format("DD/MMM/YYYY"),
      },
      {
        label: "PM Start Date",
        value:
          projectData && moment(projectData.pmStartDate).format("DD/MMM/YYYY"),
      },
      {
        label: "PM Deadline",
        value:
          projectData && moment(projectData.pmEndDate).format("DD/MMM/YYYY"),
      },

      {
        label: "Cost",
        value: projectData && projectData.cost,
      },
      {
        label: "Currency",
        value: projectData && projectData.currency.name,
      },
      {
        label: "Platform Deductions",
        value: projectData && projectData.Pdeduction,
      },
      {
        label: "Reserve Profit",
        value: projectData && projectData.Rprofit,
      },
      {
        label: "Other Deductions",
        value: projectData && projectData.otherDeduction,
      },
      {
        label: "Project Manager",
        value: projectData && projectData.projectManager.name,
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
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
};

export default ProjectDetails;

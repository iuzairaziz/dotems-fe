import React, { Component, useState, useEffect } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";
import ProjectService from "../../../services/ProjectService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { Button } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";

const ProjectDetails = (props) => {
  {
    // const [data, setData] = useState();
    const [projectData, setData] = useState();

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

    const getData = (id) => {
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
            taskname: item.name ? item.name : "none",
            teamMember: item.assignedTo
              ? item.assignedTo.map((item, index) => {
                  if (index === 0) {
                    return item.name;
                  } else if (index >= 0) {
                    return `, ${item.name} `;
                  }
                })
              : "none",
            startDate: item.startTime ? item.startTime : "none",
            // endDate: item.  ? item. : "none",
            EstHrs: item.estHrs ? item.estHrs : "none",
            ActHrs: item.actualHrs ? item.actualHrs : "none",
            wrkdone: item.workDone ? item.workDone : "none",
            status: item.status ? item.status : "none",
            otherDeduction: item.otherDeduction ? item.otherDeduction : "none",
            action: (
              <div className="row flex-nowrap">
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => {
                    props.history.push({
                      pathname: "/task-details",
                      taskId: item._id,
                    });
                  }}
                >
                  View
                </Button>
              </div>
            ),
          });
        });
      setTableData(data);
    };

    return (
      <AUX>
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Project Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={projectData && projectData.name}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Client Name</label>
                          <input
                            className="form-control"
                            value={projectData && projectData.client.name}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Order Number </label>
                          <input
                            type="text"
                            className="form-control"
                            value={projectData && projectData.orderNum}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Platform</label>
                          <input
                            className="form-control"
                            value={projectData && projectData.platform.name}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Service Type </label>
                          <input
                            type="text"
                            className="form-control"
                            value={projectData && projectData.service.name}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Technology</label>
                          <input
                            className="form-control"
                            value={projectData && projectData.technology.name}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Status </label>
                          <input
                            type="text"
                            className="form-control"
                            value={projectData && projectData.status.name}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Project Nature</label>
                          <input
                            className="form-control"
                            value={projectData && projectData.nature.name}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Client Start Date </label>
                          <input
                            type="text"
                            className="form-control"
                            value={projectData && projectData.cStartDate}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Client Deadline</label>
                          <input
                            className="form-control"
                            value={projectData && projectData.cEndDate}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> PM Start Date </label>
                          <input
                            type="text"
                            className="form-control"
                            value={projectData && projectData.pmStartDate}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>PM Deadline</label>
                          <input
                            className="form-control"
                            value={projectData && projectData.pmEndDate}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Project Manager </label>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              projectData && projectData.projectManager.name
                            }
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label> Team Members</label>
                          <input
                            className="form-control"
                            value={
                              projectData &&
                              projectData.assignedUser.map((item) => {
                                return item.name;
                              })
                            }
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Cost</label>
                          <input
                            type="text"
                            className="form-control"
                            value={projectData && projectData.cost}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label> Currency </label>
                          <input
                            className="form-control"
                            value={projectData && projectData.currency.name}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Platform Deduction</label>
                          <input
                            type="text"
                            className="form-control"
                            value={projectData && projectData.Pdeduction}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label> Reserve Profit </label>
                          <input
                            className="form-control"
                            value={projectData && projectData.Rprofit}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Other Deductions </label>
                          <input
                            className="form-control"
                            value={projectData && projectData.otherDeduction}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <div>
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
                              convertFromRaw(
                                JSON.parse(projectData.description)
                              )
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card m-b-20">
              <div className="card-body">
                <h4 className="mt-0 header-title">Project Tasks</h4>

                <MDBDataTableV5
                  // scrollX
                  fixedHeader={true}
                  responsive
                  striped
                  bordered
                  searchTop
                  hover
                  autoWidth
                  data={tabledata}
                  theadColor="#000"
                />
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
};

export default ProjectDetails;

import React, { Component, useState, useEffect } from "react";
import { Dropdown, Button } from "reactstrap";
import TaskService from "../../../../services/TaskService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import TaskForm from "../TaskForm/TaskForm";
import Comments from "./Comments/Comments";
import taskService from "../../../../services/TaskService";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TaskDetail.scss";
import {
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import moment from "moment";
import { Redirect } from "react-router";

const TaskDetail = (props) => {
  const [taskData, setTaskData] = useState({});
  const [subTasks, setSubTask] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedTask, setSelectedTask] = useState({ name: "" });

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
      {
        label: "Parent Task",
        field: "parentTask",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Added By",
        field: "addedBy",
        sort: "asc",
        // width: 100,
      },
      // {
      //   label: "Approved By",
      //   field: "approvedBy",
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
      {
        label: "Action",
        field: "action",
        sort: "disabled",
        width: 450,
      },
    ],
    rows: [],
  });

  const [remarks, setRemarks] = useState({
    columns: [
      {
        label: "Date",
        field: "date",
        sort: "asc",
        // width: 250,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        // width: 270,
      },
      {
        label: "Remarks ",
        field: "remarks",
        sort: "asc",
        // width: 270,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    getData();
  }, [modalEdit, modalDelete, props.match.url]);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = (id) => {
    taskService
      .deleteTask(id)
      .then((res) => {
        taskService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        taskService.handleError();
        toggleDelete();
      });
  };

  const getData = () => {
    TaskService.getTaskDetailsById(props.match.params.id)
      .then((res) => {
        const { task, subTasks } = res.data;
        console.log(task);
        setTaskData(task);
        setSubTask(subTasks);
        let data = { ...dataa };
        data.rows = [];
        subTasks.map((item, index) => {
          data.rows.push({
            title: item.name ? item.name : "none",
            project: item.project ? item.project.name : "none",
            estimatedHrs: item.estHrs ? item.estHrs.toFixed(2) : "none",
            projectRatio: item.projectRatio ? (
              <Progress color="teal" value={item.projectRatio}>
                {item.projectRatio + "%"}
              </Progress>
            ) : (
              "none"
            ),
            status: (
              <span className="badge badge-teal">
                {item.status ? item.status : "none"}
              </span>
            ),
            teamLead: item.teamLead ? item.teamLead.name : "None",
            parentTask: item.parentTask ? item.parentTask.name : "None",
            addedBy: item.addedBy ? item.addedBy : "none",
            approvedBy: item.approvedBy ? item.approvedBy.name : "none",
            startTime: item.startTime
              ? moment(item.startTime).format("DD/MMM/YYYY")
              : "none",
            endTime: item.endTime
              ? moment(item.endTime).format("DD/MMM/YYYY")
              : "none",
            action: (
              <div className="row flex-nowrap">
                {/* <div className="col"> */}
                <Button
                  className="my-seconday-button"
                  size="sm"
                  onClick={() => {
                    props.history.push({
                      pathname: "/task-details/" + item._id,
                    });
                  }}
                >
                  View
                </Button>
                <Button
                  className="my-primary-button"
                  size="sm"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={() => {
                    setSelectedTask(item);
                    toggleEdit();
                  }}
                >
                  Edit
                </Button>

                <Button
                  className="my-danger-button"
                  size="sm"
                  onClick={() => {
                    setSelectedTask(item);
                    toggleDelete();
                  }}
                >
                  Delete
                </Button>
              </div>
            ),
          });
        });
        setData(data);
        let rData = { ...remarks };
        rData.rows = [];
        task.taskRemarks.map((item, index) => {
          rData.rows.push({
            date: item.date ? moment(item.date).format("DD/MM/YY") : "none",
            name: item.employee ? item.employee.name : "none",
            remarks: item.remarks ? item.remarks : "none",
          });
        });
        setRemarks(rData);
      })
      .catch((err) => {
        TaskService.handleError();
        console.log("Inside task detail component", err);
      });
  };

  return (
    <div className="task-detail">
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row" />
          <div className="row ">
            <div className="col">
              <div>
                <span className="labell">Title: </span>
                <span className="valuee">{taskData && taskData.name}</span>
              </div>
            </div>
            <div className="col">
              <div>
                <span className="labell">Project: </span>
                <span className="valuee">
                  {taskData && taskData.project
                    ? taskData.project.name
                    : "None"}
                </span>
              </div>
            </div>
            <div className="col">
              <span className="labell">Estimate Hours: </span>
              <span className="valuee">{taskData && taskData.estHrs}</span>
            </div>
            <div className="col">
              {" "}
              <span className="labell">Project Ratio: </span>
              <span className="valuee">
                {taskData && `${taskData.projectRatio}%`}
              </span>
            </div>
          </div>

          <div className="row gap">
            <div className="col">
              <span className="labell">Status: </span>
              <span className="valuee">{taskData && taskData.status}</span>
            </div>
            <div className="col">
              <span className="labell">Team Lead: </span>
              <sapn className="valuee">
                {taskData && taskData.teamLead
                  ? taskData.teamLead.name
                  : "None"}
              </sapn>
            </div>
            <div className="col">
              <span className="labell">Parent Task: </span>
              <sapn className="valuee">
                {taskData && taskData.parentTask
                  ? taskData.parentTask.name
                  : "None"}
              </sapn>
            </div>
            <div className="col">
              <span className="labell">Added By: </span>
              <sapn className="valuee">
                {taskData && taskData.addedBy ? taskData.addedBy.name : "None"}
              </sapn>
            </div>
          </div>

          <div className="row gap">
            <div className="col">
              <span className="labell">Start Time: </span>
              <sapn className="valuee">
                {taskData && moment(taskData.startTime).format("DD/MM/YY")}
              </sapn>
            </div>
            <div className="col">
              <span className="labell">End Time: </span>
              <sapn className="valuee">
                {taskData && moment(taskData.endTime).format("DD/MM/YY")}
              </sapn>
            </div>
            <div className="col-6">
              <span className="labell">Team Members: </span>
              <sapn className="valuee">
                {taskData && taskData.assignedTo
                  ? taskData.assignedTo.map((item, index) => {
                      if (index === 0) {
                        return item.name;
                      } else if (index >= 0) {
                        return `, ${item.name} `;
                      }
                    })
                  : "None"}
              </sapn>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div id="accordion" />
              {/* <div className="form-group">
                <label>Description</label>
                {taskData && taskData.description ? (
                  <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClass"
                    readOnly
                    toolbarStyle={{ display: "none" }}
                    editorStyle={{
                      minHeight: "300px",
                    }}
                    editorState={
                      // taskData.description &&
                      EditorState.createWithContent(
                        convertFromRaw(JSON.parse(taskData.description))
                      )
                    }
                    // editorStyle={{minHeight:"500px",overflowY:"scroll !important"}}
                  />
                ) : (
                  "none"
                )}
              </div> */}
            </div>
          </div>

          <div className="row">
            {/* <div className="col-12">
              {subTasks.length != 0 && (
                <div className="card m-b-20">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">Sub Tasks View</h4>
                    <p className="text-muted m-b-30 font-14">
                      Below are sub tasks of this task
                    </p>

                    <MDBDataTableV5
                      // scrollX
                      fixedHeader={true}
                      responsive
                      striped
                      bordered
                      searchTop
                      hover
                      // autoWidth
                      data={dataa}
                      theadColor="#000"
                    />
                  </div>
                </div>
              )} 
            </div> */}
            <div>
              <Modal isOpen={modalEdit} toggle={toggleEdit}>
                <ModalHeader toggle={toggleEdit}>Edit Task</ModalHeader>
                <ModalBody>
                  <TaskForm
                    editable={true}
                    task={selectedTask}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>
                  Delete Sub Task ?
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the Task "{selectedTask.name}"
                  ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleDelete(selectedTask._id);
                    }}
                  >
                    Yes
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleDelete}>
                    No
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
            <div className="col-lg-12 gap">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#home"
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
                    href="#profile"
                    role="tab"
                  >
                    <span className="d-none d-md-block">Sub-Tasks</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-account h5" />
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#messages"
                    role="tab"
                  >
                    <span className="d-none d-md-block">Remarks</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-email h5" />
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#settings"
                    role="tab"
                  >
                    <span className="d-none d-md-block">Comments</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-settings h5" />
                    </span>
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane active p-3" id="home" role="tabpanel">
                  {taskData && taskData.description ? (
                    <Editor
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClass"
                      readOnly
                      toolbarStyle={{ display: "none" }}
                      editorStyle={{
                        minHeight: "300px",
                      }}
                      editorState={
                        // taskData.description &&
                        EditorState.createWithContent(
                          convertFromRaw(JSON.parse(taskData.description))
                        )
                      }
                      // editorStyle={{minHeight:"500px",overflowY:"scroll !important"}}
                    />
                  ) : (
                    "none"
                  )}
                </div>
                <div className="tab-pane p-3" id="profile" role="tabpanel">
                  <MDBDataTableV5
                    // scrollX
                    fixedHeader={true}
                    responsive
                    striped
                    bordered
                    searchTop
                    hover
                    // autoWidth
                    data={dataa}
                    theadColor="#000"
                  />
                </div>
                <div className="tab-pane p-3" id="messages" role="tabpanel">
                  <MDBDataTableV5
                    fixedHeader={true}
                    responsive
                    striped
                    bordered
                    searchTop
                    hover
                    data={remarks}
                    theadColor="#000"
                  />
                </div>
                <div className="tab-pane p-3" id="settings" role="tabpanel">
                  <div className="task-comments col-12">
                    <Comments taskId={taskData && taskData._id} />
                  </div>
                </div>
              </div>
            </div>
            {/* 
            <div className="col-12">
              <div id="accordion">
                <div className="card">
                  <div className="card-header p-3" id="headingOne">
                    <a
                      href="#collapseOne"
                      className="text-dark"
                      data-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <h6 className="m-0">Description</h6>
                    </a>
                  </div>

                  <div
                    id="collapseOne"
                    className="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <div className="task-remarks col-12">
                        {taskData && taskData.description ? (
                          <Editor
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClass"
                            readOnly
                            toolbarStyle={{ display: "none" }}
                            editorStyle={{
                              minHeight: "300px",
                            }}
                            editorState={
                              // taskData.description &&
                              EditorState.createWithContent(
                                convertFromRaw(JSON.parse(taskData.description))
                              )
                            }
                            // editorStyle={{minHeight:"500px",overflowY:"scroll !important"}}
                          />
                        ) : (
                          "none"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header p-3" id="headingOne">
                    <a
                      href="#collapseOne"
                      className="text-dark"
                      data-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <h6 className="m-0">Remarks</h6>
                    </a>
                  </div>

                  <div
                    id="collapseOne"
                    className="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <div className="task-remarks col-12">
                        <MDBDataTableV5
                          fixedHeader={true}
                          responsive
                          striped
                          bordered
                          searchTop
                          hover
                          data={remarks}
                          theadColor="#000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header p-3" id="headingTwo">
                    <a
                      href="#collapseTwo"
                      className="text-dark collapsed"
                      data-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <h6 className="m-0">Comments</h6>
                    </a>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <div className="task-comments col-12">
                        <Comments taskId={taskData && taskData._id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className="page-content-wrapper">
        <div className="container-fluid">
        
        </div>
      </div> */}
    </div>
  );
};

export default TaskDetail;

import React, { Component, useState, useEffect } from "react";
import { Dropdown, Button } from "reactstrap";
import TaskService from "../../../../services/TaskService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import TaskForm from "../TaskForm/TaskForm";
import Comments from "./Comments/Comments";
import taskService from "../../../../services/TaskService";
import "./TaskDetail.scss";
import {
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, EditorState } from "draft-js";
import moment from "moment";
import { Link } from "react-router-dom";
import TaskList from "../TaskList/TaskList";
import MyTask from "../TaskList/MyTaskList";

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
            teamLead: item.teamLead
              ? `${item.teamLead.firstName} ${item.teamLead.lastName} `
              : "None",
            parentTask: item.parentTask ? item.parentTask.name : "None",
            addedBy: item.addedBy ? item.addedBy.name : "none",
            startTime: item.startTime
              ? moment(item.startTime).format("DD/MMM/YYYY")
              : "none",
            endTime: item.endTime
              ? moment(item.endTime).format("DD/MMM/YYYY")
              : "none",
            action: (
              <div class="dropdown">
                <button
                  type="button"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i class="mdi mdi-view-list" size={40} />
                </button>
                <div class="dropdown-menu">
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      props.history.push({
                        pathname: "/task-details/" + item._id,
                      });
                    }}
                  >
                    View
                  </a>
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      setSelectedTask(item);
                      toggleEdit();
                    }}
                  >
                    Edit
                  </a>
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      setSelectedTask(item);
                      toggleDelete();
                    }}
                  >
                    Delete
                  </a>
                </div>
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
            name: item.employee
              ? `${item.employee.firstName} ${item.employee.lastName} `
              : "none",
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
    <div className="row">
      <div className="col-lg-12">
        <div className="card m-b-20">
          <div className="card-body">
            <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#profile2"
                  role="tab"
                >
                  <span className="d-none d-md-block">Task List</span>
                  <span className="d-block d-md-none">
                    <i className="mdi mdi-account h5" />
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#addtask"
                  role="tab"
                >
                  <span className="d-none d-md-block">+ Add Task</span>
                  <span className="d-block d-md-none">
                    <i className="mdi mdi-account h5" />
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active "
                  data-toggle="tab"
                  href="#home2"
                  role="tab"
                >
                  <span className="d-none d-md-block"> View Task</span>
                  <span className="d-block d-md-none">
                    <i className="mdi mdi-home-variant h5" />
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link "
                  data-toggle="tab"
                  href="#messages2"
                  role="tab"
                >
                  <span className="d-none d-md-block"> My Tasks</span>
                  <span className="d-block d-md-none">
                    <i className="mdi mdi-email h5" />
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
                <TaskList />
              </div>
              <div className="tab-pane  p-3" id="addtask" role="tabpanel">
                <TaskForm />
              </div>
              <div className="tab-pane active p-3" id="home2" role="tabpanel">
                <div className="task-detail">
                  <div className="row task-form">
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
                                href={`#attachments`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  Task Status
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
                                href={`#attachments-1`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  Attachments
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
                                href={`#sub-tasks`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  Sub Tasks
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
                                href={`#remarks`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  Remarks
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
                                href={`#comments`}
                                role="tab"
                              >
                                <span className="d-none d-md-block">
                                  Comments
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
                              id={`quick-info`}
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="col-6">
                                  <div className="form-group">
                                    <label>Title</label>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData && taskData.name
                                          ? taskData.name
                                          : "N/A"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="form-group">
                                    <label>Project</label>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData && taskData.project
                                          ? taskData.project.name
                                          : "N/A"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>

                                <div className="col-6">
                                  <div className="form-group">
                                    <label>Estimated Hours</label>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData && taskData.estHrs
                                          ? taskData &&
                                            Number(taskData.estHrs).toFixed(2)
                                          : "N/A"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="form-group">
                                    <label>Project Ratio</label>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData && taskData.projectRatio
                                          ? `${taskData.projectRatio}%`
                                          : "N/A"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-6 ">
                                  <div className="form-group">
                                    <label>Parent Task</label>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData && taskData.parentTask
                                          ? taskData.parentTask.name
                                          : "N/A"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>

                                <div className="col-6">
                                  <div className="form-group">
                                    <label>Assigned To</label>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData && taskData.assignedTo
                                          ? taskData.assignedTo.map(
                                              (item, index) => {
                                                if (index === 0) {
                                                  return item.name;
                                                } else if (index >= 0) {
                                                  return ` ${item.firstName} ${
                                                    item.lastName
                                                  } `;
                                                }
                                              }
                                            )
                                          : "None"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>

                                <div className="col-6 ">
                                  <div className="form-group">
                                    <label>Start Time</label>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData && taskData.startTime
                                          ? moment(taskData.startTime).format(
                                              "DD/MM/YY"
                                            )
                                          : "N/A"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-6 ">
                                  <div className="form-group">
                                    <label>End Time</label>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData && taskData.endTime
                                          ? moment(taskData.endTime).format(
                                              "DD/MM/YY"
                                            )
                                          : "N/A"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-6 ">
                                  <div className="form-group">
                                    <label>Team Lead</label>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData && taskData.teamLead
                                          ? `${taskData.teamLead.firstName} ${
                                              taskData.teamLead.lastName
                                            } `
                                          : "N/A"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-6 ">
                                  <div className="form-group">
                                    <label>Project Phase</label>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData &&
                                        taskData.project &&
                                        taskData.project.phase &&
                                        taskData.phase
                                          ? taskData.project.phase.filter(
                                              (phase) =>
                                                phase._id == taskData.phase
                                            )[0].phasename
                                          : "N/A"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col">
                                        <label className="control-label">
                                          Task Priority
                                        </label>
                                      </div>
                                    </div>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData && taskData.taskPriority
                                          ? taskData.taskPriority.name
                                          : "N/A"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="row">
                                    <div className="col-12">
                                      <h4 className="mt-0 header-title">
                                        Description
                                      </h4>
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
                                              convertFromRaw(
                                                JSON.parse(taskData.description)
                                              )
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
                            </div>
                            <div
                              className="tab-pane p-3"
                              id={`attachments`}
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="col-6">
                                  <div className="form-group">
                                    <label>Status</label>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData && taskData.status
                                          ? taskData.status
                                          : "N/A"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="form-group">
                                    <label>Work Done</label>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData && taskData.workDone
                                          ? `${taskData.workDone}%`
                                          : "N/A"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="form-group">
                                    <label>Actual Hours</label>
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={
                                        taskData && taskData.timesheet
                                          ? taskData.timesheet &&
                                            taskData.timesheet.actualHrs
                                          : "N/A"
                                      }
                                      name="name"
                                      readOnly={true}
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane p-3"
                              id={`attachments-1`}
                              role="tabpanel"
                            >
                              <p className="font-14 mb-0">Attachments-1</p>
                            </div>
                            <div
                              className="tab-pane p-3"
                              id={`sub-tasks`}
                              role="tabpanel"
                            >
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
                                data={dataa}
                                theadColor="#000"
                              />{" "}
                            </div>
                            <div
                              className="tab-pane p-3"
                              id={`remarks`}
                              role="tabpanel"
                            >
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
                                data={remarks}
                                theadColor="#000"
                              />{" "}
                            </div>
                            <div
                              className="tab-pane p-3"
                              id={`comments`}
                              role="tabpanel"
                            >
                              <Comments taskId={taskData && taskData._id} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      Are you sure you want to delete the Task "
                      {selectedTask.name}" ?
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
              </div>

              <div className="tab-pane p-3" id="messages2" role="tabpanel">
                <MyTask />
              </div>
              <div className="tab-pane p-3" id="settings2" role="tabpanel">
                <div className="card task">
                  <div className="row cardd">
                    <i
                      class="mdi mdi-account iconSize"
                      style={{ color: "var(--color-secondary1)" }}
                    />
                    <i class="mdi mdi-settings iconSize" />
                  </div>
                  <div className="row cSettings">
                    <h2>Task Settings</h2>
                  </div>
                  <div className="border-b" />
                  <div className="row cardd">
                    <Link to="/task-priority">Task Priority</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;

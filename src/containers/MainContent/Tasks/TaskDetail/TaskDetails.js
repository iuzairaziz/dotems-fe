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
                <i
                  className="mdi mdi-view-list
                  iconsS my-primary-icon"
                  onClick={() => {
                    props.history.push({
                      pathname: "/task-details/" + item._id,
                    });
                  }}
                />
                <i
                  className="mdi mdi-pencil-box iconsS my-seconday-icon"
                  onClick={() => {
                    setSelectedTask(item);
                    toggleEdit();
                  }}
                />
                <i
                  className="mdi mdi-delete-forever iconsS my-danger-icon"
                  onClick={() => {
                    setSelectedTask(item);
                    toggleDelete();
                  }}
                />
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

  const detail = [
    { label: "Title", value: taskData && taskData.name },
    {
      label: "Project",
      value: taskData && taskData.project ? taskData.project.name : "None",
    },
    {
      label: "Project Ratio",
      value: taskData && `${taskData.projectRatio}%`,
    },

    { label: "Status", value: taskData && taskData.status },
    {
      label: "Team Lead",
      value: taskData && taskData.teamLead ? taskData.teamLead.name : "None",
    },
    {
      label: "Parent Task",
      value:
        taskData && taskData.parentTask ? taskData.parentTask.name : "None",
    },
    {
      label: "Added By",
      value: taskData && taskData.addedBy ? taskData.addedBy.name : "None",
    },

    {
      label: "Start Time",
      value: taskData && moment(taskData.startTime).format("DD/MM/YY"),
    },
    {
      label: "End Time",
      value: taskData && moment(taskData.endTime).format("DD/MM/YY"),
    },
    {
      label: "Estimate Hours",
      value: taskData && Number(taskData.estHrs).toFixed(2),
    },
    {
      label: "Actual Hours",
      value: taskData && taskData.timesheet && taskData.timesheet.actualHrs,
    },
    {
      label: "Work Done",
      value: taskData && `${taskData.workDone}%`,
    },
    {
      label: "Team Members",
      value:
        taskData && taskData.assignedTo
          ? taskData.assignedTo.map((item, index) => {
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
    <div className="task-detail">
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row" />
          <div className="row align-items-center">
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
          
          <div className="row">
         
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
              <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
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
                  />
                </div>
                <div className="tab-pane p-3" id="messages" role="tabpanel">
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
                  />
                </div>
                <div className="tab-pane p-3" id="settings" role="tabpanel">
                  <div className="task-comments col-12">
                    <Comments taskId={taskData && taskData._id} />
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

import React, { Component, useEffect, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import TaskForm from "../TaskForm/TaskForm";
import { Redirect } from "react-router-dom";
import taskService from "../../../../services/TaskService";
import {
  Progress,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import moment from "moment";
import $ from "jquery";
import "./TaskList.scss";
import { withRouter } from "react-router-dom";

const Tables_datatable = (props) => {
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
        label: "Actual Hours",
        field: "actHrs",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Project Ratio",
        field: "projectRatio",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Task Priority",
        field: "taskPriority",
        sort: "asc",
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
        label: "Work Done",
        field: "workDone",
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

  useEffect(() => {
    getData();
  }, [modalEdit, modalDelete]);

  const changeColor = () => {
    $(document).ready(function() {
      $("tbody > tr").each(function(index) {
        var two = $(this)
          .children("td")
          .eq(2)
          .text();
        var three = $(this)
          .children("td")
          .eq(3)
          .text();
        var finalTwo = parseInt(two);
        var finalThree = parseInt(three);
        if (finalThree > finalTwo) {
          $(this).css("color", "red");
          $(this)
            .find("a")
            .css("color", "red");
        } else {
          $(this).css("color", "black");
          $(this)
            .find("a")
            .css("color", "black");
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
    taskService
      .getParentTasks()
      .then((res) => {
        let data = { ...dataa };
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            title: item.name ? item.name : "N/A",
            project: (
              <Link to={`/viewprojects/${item.project && item.project._id}`}>
                {" "}
                {item.project ? item.project.name : "N/A"}
              </Link>
            ),
            estimatedHrs: item.estHrs ? item.estHrs.toFixed(2) : "N/A",
            actHrs: item.timesheet ? item.timesheet.actualHrs : "N/A",
            workDone: item.workDone ? item.workDone : "N/A",
            projectRatio: item.projectRatio ? (
              <Progress color="teal" value={item.projectRatio}>
                {item.projectRatio + "%"}
              </Progress>
            ) : (
              "N/A"
            ),
            status: (
              <span className="badge badge-teal">
                {item.status ? item.status : "N/A"}
              </span>
            ),
            taskPriority: (
              <span
                className="badge"
                style={{
                  backgroundColor: `${item.taskPriority &&
                    item.taskPriority.color}`,
                  minWidth: `${50}`,
                  paddingTop: `${5}`,
                  paddingBottom: `${5}`,
                }}
              >
                {item.taskPriority ? item.taskPriority.name : "N/A"}
              </span>
            ),
            teamLead: item.teamLead ? item.teamLead.name : "N/A",
            //  (
            //   <Link to={`/userdetails/${item.teamLead._id}`}>
            //     {" "}
            //     {item.teamLead ? item.teamLead.name : "N/A"}{" "}
            //   </Link>
            // ),
            parentTask: item.parentTask ? item.parentTask.name : "N/A",
            addedBy: item.addedBy ? (
              <Link to={`/userdetails/${item.addedBy._id}`}>
                {item.addedBy.name}{" "}
              </Link>
            ) : (
              "N/A"
            ),
            startTime: item.startTime
              ? moment(item.startTime).format("DD/MMM/YYYY")
              : "N/A",
            endTime: item.endTime
              ? moment(item.endTime).format("DD/MMM/YYYY")
              : "N/A",
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AUX>
      <div className="page-content-wrapper task-list">
        <div className="container-fluid">
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
                // scrollX
                // autoWidth
                data={dataa}
                theadColor="#000"
              />
            </div>
            <div>
              <Modal
                style={{ maxWidth: "90%" }}
                isOpen={modalEdit}
                toggle={toggleEdit}
              >
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
                <ModalHeader toggle={toggleDelete}>Delete Task ?</ModalHeader>
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
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default withRouter(Tables_datatable);

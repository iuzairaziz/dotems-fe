import React, { Component, useEffect, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import TaskForm from "../TaskForm/TaskForm";
import taskService from "../../../../services/TaskService";
import {
  Progress,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const SubTask = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedTask, setSelectedTask] = useState({ name: "" });
  const [dataa, setData] = useState({
    columns: [
      {
        label: "Task Name",
        field: "title",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Team Member",
        field: "project",
        sort: "asc",
        // width: 270,
      },
    //   {
    //     label: "Estimated Hours",
    //     field: "estimatedHrs",
    //     sort: "asc",
    //     // width: 200,
    //   },
      {
        label: "Nature",
        field: "projectRatio",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Start Date",
        field: "startTime",
        sort: "asc",
        // width: 100,
      },
      {
        label: "End Date",
        field: "endTime",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Est. Hours",
        field: "parentTask",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Actual Hours",
        field: "addedBy",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Work Done",
        field: "approvedBy",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Status",
        field: "startTime",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Est. Cost",
        field: "endTime",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Act. Cost",
        field: "actCost",
        sort: "disabled",
        width: 450,
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
      .getAllTask()
      .then((res) => {
        let data = { ...dataa };
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            title: item.name ? item.name : "none",
            project: item.project ? item.project.name : "none",
            estimatedHrs: item.estHrs ? item.estHrs : "none",
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
            startTime: item.startTime ? item.startTime : "none",
            endTime: item.endTime ? item.endTime : "none",
            action: (
              <div className="row flex-nowrap">
                {/* <div className="col"> */}
                <Link to="/subtask-details">
                <Button
                  color="info"
                  size="sm"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={() => {
                    setSelectedTask(item);
                    toggleEdit();
                  }}
                >
                  View Details
                </Button>

                </Link>
                
              </div>
            ),
          });
        });
        setData(data);
        console.log("state data", dataa);
        console.log("my task data", data);
        console.log("res data", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="mt-0 header-title">All Tasks View</h4>
                  <p className="text-muted m-b-30 font-14">
                    Below are all tasks of all projects
                  </p>

                  <MDBDataTableV5
                    // scrollX
                    fixedHeader={true}
                    responsive
                    striped
                    bordered
                    searchTop
                    hover
                    autoWidth
                    data={dataa}
                    theadColor="#000"
                  />
                </div>
              </div>
            </div>
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

export default SubTask;

import React, { Component, useEffect, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { Progress, Button } from "reactstrap";
import TaskForm from "../TaskForm/TaskForm";
import taskService from "../../../../services/TaskService";

const Tables_datatable = () => {
  const [editTask, setEditTask] = useState();
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
        label: "Approved By",
        field: "approvedBy",
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

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    taskService
      .getAllTask()
      .then((res) => {
        let data = { ...dataa };
        res.data.map((item, index) => {
          data.rows.push({
            title: item.name ? item.name : "none",
            project: item.project ? item.project : "none",
            estimatedHrs: item.estHrs ? item.estHrs : "none",
            projectRatio: (
              <Progress color="teal" value="60">
                {item.projectRatio ? item.projectRatio : "none"}
              </Progress>
            ),
            status: (
              <span className="badge badge-teal">
                {item.status ? item.status : "none"}
              </span>
            ),
            parentTask: item.parentTask ? item.parentTask.name : "None",
            addedBy: item.addedBy ? item.addedBy : "none",
            approvedBy: item.approvedBy ? item.approvedBy.name : "none",
            startTime: item.startTime ? item.startTime : "none",
            endTime: item.endTime ? item.endTime : "none",
            action: (
              <div className="row flex-nowrap">
                {/* <div className="col"> */}
                <Button
                  color="info"
                  size="sm"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={setEditTask(item)}
                >
                  Edit
                </Button>
                {/* </div> */}
                {/* <div className="col"> */}
                <Button color="danger" size="sm">
                  Delete
                </Button>
                {/* </div> */}
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
            <div className="col-md-4 m-t-30">
              <div className=" text-center">
                <p className="text-muted">Standard modal</p>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  Standard modal
                </button>
              </div>

              <div
                id="myModal"
                className="modal fade"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title mt-0" id="myModalLabel">
                        Edit Task
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-hidden="true"
                      >
                        ×
                      </button>
                    </div>
                    <div className="modal-body">
                      <TaskForm editForm={true} editData={editTask} />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary waves-effect"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
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
};

export default Tables_datatable;

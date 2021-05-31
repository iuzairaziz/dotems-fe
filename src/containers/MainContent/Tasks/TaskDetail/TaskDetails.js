import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import userValidation from "../../../../validations/user-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CountryService from "../../../../services/CountryService";
import UserService from "../../../../services/UserService";
import ProjectService from "../../../../services/ProjectService";
import PlatformService from "../../../../services/PlatformService";
import TechnologyService from "../../../../services/TechnologyService";
import ServiceService from "../../../../services/ServiceService";
import NatureService from "../../../../services/NatureService";
import ClientService from "../../../../services/ClientService";
import TaskService from "../../../../services/TaskService";

const TaskDetail = (props) => {
  const [taskData, setTaskData] = useState({});
  const [subTasks, setSubTask] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    TaskService.getTaskDetailsById(props.location.taskId)
      .then((res) => {
        const { task, subTasks } = res.data;
        console.log(task);
        setTaskData(task);
        setSubTask(subTasks);
      })
      .catch((err) => {
        TaskService.handleError();
        console.log("Inside task detail component", err);
      });
  };

  return (
    <>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row" />
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={taskData.name}
                  className="form-control"
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Project</label>
                <input
                  value={taskData.project}
                  className="form-control"
                  readOnly={true}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Est Hrs</label>

                <input
                  value={taskData.estHrs}
                  className="form-control"
                  readOnly={true}
                />
              </div>
            </div>

            <div className="col">
              {" "}
              <div className="form-group">
                <label>Project Ratio</label>
                <input
                  value={`${taskData.projectRatio}%`}
                  className="form-control"
                  readOnly={true}
                />
              </div>{" "}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Status</label>
                <input
                  value={taskData.status}
                  className="form-control"
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Team Lead</label>
                <input
                  value={taskData.teamLead}
                  className="form-control"
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Parent Task</label>
                <input
                  value={taskData.parentTask}
                  className="form-control"
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Added By</label>
                <input
                  value={taskData.addedBy}
                  className="form-control"
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Approved By</label>
                <input
                  value={taskData.approvedBy}
                  className="form-control"
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Team Members</label>{" "}
                <input
                  value={taskData.assignedTo}
                  className="form-control"
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Start Time</label>
                <input
                  value={taskData.startTime}
                  className="form-control"
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>End Time</label>
                <input
                  value={taskData.endTime}
                  className="form-control"
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Description</label>
                <input
                  value={taskData.description}
                  className="form-control"
                  readOnly={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetail;

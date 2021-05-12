import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import timesheetValidations from "../../../../validations/timesheet-validations";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Button } from "reactstrap";
import Select from "react-select";
import TimesheetService from "../../../../services/TimesheetService";
import TaskService from "../../../../services/TaskService";
import userService from "../../../../services/UserService";
import ProjectService from "../../../../services/ProjectService";
import DatePicker from "react-datepicker";

const TaskForm = (props) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const user = userService.userLoggedInInfo();
  useEffect(() => {
    getEmployeeProjects(user._id);
  }, []);

  const isEmptyObj = (obj) => {
    for (var x in obj) {
      return false;
    }
    return true;
  };

  const getEmployeeProjectTasks = ({ projectId, empId }) => {
    TaskService.getEmployeeProjectTasks({ projectId, empId })
      .then((res) => {
        if (isEmptyObj(res.data)) {
          TaskService.handleCustomMessage("No Tasks are assigned to you!");
          return;
        }
        let options = [];
        res.data.map((item, index) => {
          options.push({ label: item.name, value: item._id });
        });
        setTasks(options);
      })
      .catch((err) => {
        TaskService.handleError();
      });
  };

  const getEmployeeProjects = (empID) => {
    ProjectService.getEmployeeProject(empID)
      .then((res) => {
        let options = [];
        res.data.map((item, index) => {
          if (item.name) {
            options.push({
              value: item._id,
              label: item.name,
            });
          }
          console.log("project options", options);
        });
        setProjects(options);
      })
      .catch((err) => {
        TaskService.handleError();
        console.log(err);
      });
  };
  const timesheet = props.timesheet;
  const editable = props.editable;
  console.log("from timesheet form ", timesheet);

  return (
    // <>
    <Formik
      initialValues={{
        task: editable && timesheet.task.name,
        project: editable && timesheet.task.project.name,
        date: editable && timesheet.date,
        workedHrs: editable && timesheet.estHrs,
        remarks: editable && timesheet.remarks,
      }}
      validationSchema={timesheetValidations.timesheetValidation}
      onSubmit={(values, actions) => {
        editable
          ? TimesheetService.updateTask(timesheet._id, {
              employee: user._id,
              task: values.task.value,
              date: values.date,
              workedHrs: values.workedHrs,
              remarks: values.remarks,
            })
              .then((res) => {
                TimesheetService.handleMessage("update");
                props.toggle();
              })
              .catch((err) => {
                TimesheetService.handleError();
                props.toggle();
              })
          : TimesheetService.addTimesheet({
              employee: user._id,
              task: values.task.value,
              date: values.date,
              workedHrs: values.workedHrs,
              remarks: values.remarks,
            })
              .then((res) => {
                TimesheetService.handleMessage("add");
              })
              .catch((err) => {
                TimesheetService.handleError();
              });
        console.log("project", values.project);
      }}
    >
      {(props) => {
        const formatPercent = (value) => value + "%";
        const formatHrs = (value) => value + " Hrs";

        return (
          <>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Project</label>
                  <Select
                    value={props.values.project}
                    onChange={(selected) => {
                      props.setFieldValue("project", selected);
                      console.log("project id", selected.value);
                      getEmployeeProjectTasks({
                        projectId: selected.value,
                        empId: user._id,
                      });
                    }}
                    options={projects}
                  />
                  <span id="err">{props.errors.project}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Task</label>
                  <Select
                    value={props.values.task}
                    onChange={(selected) => {
                      props.setFieldValue("task", selected);
                    }}
                    options={tasks}
                  />
                  <span id="err">{props.errors.project}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Date</label>
                  <DatePicker
                    className="form-control"
                    selected={props.values.date}
                    onChange={(date) => props.setFieldValue("date", date)}
                  />
                  <span id="err">{props.errors.assignedTo}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Hours Worked on Task</label>
                  <span id="right_badge" className="float-right">
                    {props.values.workedHrs + " Hours"}
                  </span>
                  <Slider
                    min={0}
                    max={24}
                    type="number"
                    step={0.1}
                    format={formatHrs}
                    value={props.values.workedHrs}
                    onChange={(value) => {
                      props.setFieldValue("workedHrs", value);
                    }}
                  />
                  <span id="err">{props.errors.workedHrs}</span>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label>Remarks</label>
                  <textarea
                    id="textarea"
                    className="form-control"
                    onChange={props.handleChange("remarks")}
                    rows="2"
                    placeholder="Add some remarks"
                  >
                    {props.values.remarks}
                  </textarea>
                  <span id="err">{props.errors.remarks}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <Button
                  color="success"
                  className="mt-3"
                  onClick={props.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </>
        );
      }}
    </Formik>
    // </>
  );
};

export default TaskForm;

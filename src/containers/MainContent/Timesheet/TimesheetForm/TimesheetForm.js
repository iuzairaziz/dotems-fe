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
import WeeklyCalendar from "../../../../components/MyComponents/WeeklyCalendar/WeeklyCalendar";
import "./TimesheetForm.scss";

const TaskForm = (props) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedDays, setSelectedDays] = useState([1,2,3,4,5,6,7]);
  const [toUpdate,setToUpdate] = useState(false);
  const [inputs, setInputs] = useState({
    r1:[1,2,3,4,5,6,7],
    r2:[1,2,3,4,5,6,7],
  });

  const user = userService.userLoggedInInfo();
  useEffect(() => {
    getEmployeeTasksGroupByProject(user._id);
  }, []);

  useEffect(() => {
    console.log("s days in form", selectedDays);
  }, selectedDays);

  const isEmptyObj = (obj) => {
    for (var x in obj) {
      return false;
    }
    return true;
  };

  const getEmployeeTasksGroupByProject = (empId) => {
    TaskService.getEmployeeTasksGroupByProject(empId)
      .then((res) => {
        // if (isEmptyObj(res.data)) {
        //   TaskService.handleCustomMessage("No Tasks are assigned to you!");
        //   return;
        // }
        console.log("tasks by projects", res.data);
        let inputs={};
        // res.data.map((item,pIndx)=>{
        //   item.tasks.map((task,tIndx)=>{
        //     task.ts.map((ts,tsIndx)=>{
        //       ts.map((sts,stsIndx)=>{
        //         input[`${tIndx}`]
        //       })
        //     })
        //   })
        // })
        setEmployeeData(res.data);
      })
      .catch((err) => {
        TaskService.handleError();
      });
  };

  const getWeeklyTimesheetByTask = ({ startDate, endDate, taskId }) => {
    TimesheetService.getWeeklyTimesheetByTask({
      startDate,
      endDate,
      taskId,
    }).then((res) => {});
  };

  const timesheet = props.timesheet;
  const editable = props.editable;
  console.log("from timesheet form ", timesheet);
  let counter=0;
  return (
    <>
      {/* <Formik
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
    </Formik> */}

      <form action="http://localhost:8080/timesheet/weekly" method="post" >
        <button type="submit">submit</button>
        <table class="table table-bordered" id="timesheet-form">
          <thead>
            <tr>
              <th scope="col" colSpan={9}>
                <WeeklyCalendar
                  setWeekNum={() => console.log("week number")}
                  setSelectedDays={setSelectedDays}
                />
              </th>
            </tr>
            <tr>
              <th scope="col" className="col-8">
                Task Details
              </th>
              <th scope="col">MON</th>
              <th scope="col">Tue</th>
              <th scope="col">Wed</th>
              <th scope="col">ThR</th>
              <th scope="col">FRI</th>
              <th scope="col">SAT</th>
              <th scope="col">SUN</th>
              <th scope="col">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <input name="empId" value={user._id} type="hidden" />
            
            {employeeData.map((project, pIndex) => {
              
              return (
                <>
                  <tr key={pIndex}>
                    <td className="table-info">
                      <strong>{project.project.name}</strong>
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  {project.tasks.map((task, tIndex) => {
                    counter+=1;
                    return (
                      <tr key={tIndex}>
                        <input name={`task${counter}taskId`} value={task._id} type="hidden" />
                        <td style={{ paddingLeft: "25px" }}>{task.name}</td>
                        <td>
                          <input name={`task${counter}day0hrs`}  placeholder={123}  />
                          <input name={`task${counter}day0date`} value={selectedDays[0]} type="hidden" />
                          
                        </td>
                        <td>
                          <input name={`task${counter}day1hrs`} />
                          <input name={`task${counter}day1date`} value={selectedDays[1]} type="hidden"/>        
                        </td>
                        <td>
                          <input name={`task${counter}day2hrs`} />
                          <input name={`task${counter}day2date`} value={selectedDays[2]} type="hidden"/>
                        </td>
                        <td>
                          <input name={`task${counter}day3hrs`} />
                          <input name={`task${counter}day3date`} value={selectedDays[3]} type="hidden"/>
                        </td>
                        <td>
                          <input name={`task${counter}day4hrs`} />
                          <input name={`task${counter}day4date`} value={selectedDays[4]} type="hidden"/>
                        </td>
                        <td>
                          <input name={`task${counter}day5hrs`} />
                          <input name={`task${counter}day5date`} value={selectedDays[5]} type="hidden"/>
                        </td>
                        <td>
                          <input name={`task${counter}day6hrs`} />
                          <input name={`task${counter}day6date`} value={selectedDays[6]} type="hidden"/>
                        </td>
                        <td>
                          {/* <input
                            name={`d1t${task._id}`}
                            
                          /> */}
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
            <input name="counter" value={counter} type="hidden" />
            <tr>
              <td>Mark</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

export default TaskForm;

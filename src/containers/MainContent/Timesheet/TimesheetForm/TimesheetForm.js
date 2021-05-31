import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import timesheetValidations from "../../../../validations/timesheet-validations";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Button } from "reactstrap";
import Select from "react-select";
import moment from "moment";
import TimesheetService from "../../../../services/TimesheetService";
import TaskService from "../../../../services/TaskService";
import userService from "../../../../services/UserService";
import ProjectService from "../../../../services/ProjectService";
import DatePicker from "react-datepicker";
import WeeklyCalendar from "../../../../components/MyComponents/WeeklyCalendar/WeeklyCalendar";
import "./TimesheetForm.scss";

const TaskForm = (props) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [toUpdate,setToUpdate] = useState(false);
  const [inputs, setInputs] = useState([{}]);

  const user = userService.userLoggedInInfo();
  useEffect(() => {
    getEmployeeTasksGroupByProject(user._id,selectedDays[0],selectedDays[6]);
  }, [selectedDays]);

  useEffect(() => {
    console.log("s days in form", selectedDays);
  }, [selectedDays]);


  useEffect(() => {
    console.log("updated emplyee data", employeeData);
  }, [employeeData]);

  const isEmptyObj = (obj) => {
    for (var x in obj) {
      return false;
    }
    return true;
  };
  

  const handleChange = (e,projectIndx,taskIndx,timesheetIndx)=>{
    console.log("handle chnge",e.target.value,projectIndx,taskIndx,timesheetIndx);
    let arr = employeeData;
    let ts = arr[projectIndx].tasks[taskIndx].timesheet[timesheetIndx];
    arr[projectIndx].tasks[taskIndx].timesheet[timesheetIndx]={...ts,workedHrs:Number(e.target.value)};
    // console.log("typeof arr",typeof(arr));
    setEmployeeData([...arr]);
  }

  const getEmployeeTasksGroupByProject = (empId,startDate,endDate) => {
    TaskService.getEmployeeTasksGroupByProject({empId,startDate,endDate})
      .then((res) => {
        // let counter=0;
        // let inputs={};
        // res.data.map((item,pIndx)=>{
        //   item.tasks.map((task,tIndx)=>{
        //     counter+=1;
        //     input[`${task._id}`] = task.timesheet[0]?task.timesheet[0].workedHrs:'';
        //     input[`task${counter}day0hrs`] = task.timesheet[0]?task.timesheet[0].workedHrs:'';
            
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

  let counter=0;
  let rowTotal=0;
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
              <th scope="col" className="dayDisplay">{moment(selectedDays[0]).format("ddd MMM/DD")}</th>
              <th scope="col" className="dayDisplay">{moment(selectedDays[1]).format("ddd MMM/DD")}</th>
              <th scope="col" className="dayDisplay">{moment(selectedDays[2]).format("ddd MMM/DD")}</th>
              <th scope="col" className="dayDisplay">{moment(selectedDays[3]).format("ddd MMM/DD")}</th>
              <th scope="col" className="dayDisplay">{moment(selectedDays[4]).format("ddd MMM/DD")}</th>
              <th scope="col" className="dayDisplay">{moment(selectedDays[5]).format("ddd MMM/DD")}</th>
              <th scope="col" className="dayDisplay">{moment(selectedDays[6]).format("ddd MMM/DD")}</th>
              <th scope="col" className="dayDisplay">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <input name="empId" value={user._id} type="hidden" />
            
            {employeeData.map((project, pIndex) => {
              
              return (
                <>
                  <tr key={pIndex}>
                    <td className="table-info" colSpan="9">
                      <strong>{project.project.name}</strong>
                    </td>
                    
                  </tr>
                  {project.tasks.map((task, tIndex) => {
                    counter+=1;
                    return (
                      <tr key={tIndex}>
                        <input name={`task${counter}taskId`} value={task._id} type="hidden" />
                        <td style={{ paddingLeft: "25px" }}>{task.name}</td>
                        {task.timesheet.map((ts,tsIndx)=>{
                          return(
                            <td className="inputCol">
                          <input type="number" name={`task${counter}day0hrs`}  value={ts.workedHrs} onChange={(e)=>handleChange(e,pIndex,tIndex,tsIndx)}/>
                          <input name={`task${counter}day0date`} value={selectedDays[0]} type="hidden" />
                          
                        </td>
                          )
                        })}
                        {/* <td className="inputCol">
                          <input type="number" name={`task${counter}day0hrs`}  value={task.timesheet[0]?task.timesheet[0].workedHrs:''} onChange={(e)=>handleChange(e,pIndex,tIndex,0)}/>
                          <input name={`task${counter}day0date`} value={selectedDays[0]} type="hidden" />
                          
                        </td>
                        <td className="inputCol">
                          <input name={`task${counter}day1hrs`} value={task.timesheet[1]?task.timesheet[1].workedHrs:''} onChange={(e)=>handleChange(e,pIndex,tIndex,1)}/>
                          <input name={`task${counter}day1date`} value={selectedDays[1]} type="hidden"/>        
                        </td>
                        <td className="inputCol">
                          <input name={`task${counter}day2hrs`} value={task.timesheet[2]?task.timesheet[2].workedHrs:''} onChange={(e)=>handleChange(e,pIndex,tIndex,2)}/>
                          <input name={`task${counter}day2date`} value={selectedDays[2]} type="hidden"/>
                        </td>
                        <td className="inputCol">
                          <input name={`task${counter}day3hrs`} value={task.timesheet[3]?task.timesheet[3].workedHrs:''} onChange={(e)=>handleChange(e,pIndex,tIndex,3)}/>
                          <input name={`task${counter}day3date`} value={selectedDays[3]} type="hidden"/>
                        </td>
                        <td className="inputCol">
                          <input name={`task${counter}day4hrs`} value={task.timesheet[4]?task.timesheet[4].workedHrs:''} onChange={(e)=>handleChange(e,pIndex,tIndex,4)}/>
                          <input name={`task${counter}day4date`} value={selectedDays[4]} type="hidden"/>
                        </td>
                        <td className="inputCol">
                          <input name={`task${counter}day5hrs`} value={task.timesheet[5]?task.timesheet[5].workedHrs:''} onChange={(e)=>handleChange(e,pIndex,tIndex,5)}/>
                          <input name={`task${counter}day5date`} value={selectedDays[5]} type="hidden"/>
                        </td>
                        <td className="inputCol">
                          <input name={`task${counter}day6hrs`} value={task.timesheet[6]?task.timesheet[6].workedHrs:''} onChange={(e)=>handleChange(e,pIndex,tIndex,6)}/>
                          <input name={`task${counter}day6date`} value={selectedDays[6]} type="hidden"/>
                        </td> */}
                        <td className="inputCol">
                          
                          {task.timesheet.map((t,index)=>{
                            if(index===0)rowTotal=0
                            rowTotal+=t.workedHrs;
                            if(index===task.timesheet.length-1)return rowTotal
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
            <input name="counter" value={counter} type="hidden" />
            
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </>
  );
};

export default TaskForm;

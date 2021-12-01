import React, { useEffect, useState } from "react";
import "react-rangeslider/lib/index.css";
import Select from "react-select";
import moment from "moment";
import TimesheetService from "../../../../services/TimesheetService";
import TaskService from "../../../../services/TaskService";
import userService from "../../../../services/UserService";
import WeeklyCalendar from "../../../../components/MyComponents/WeeklyCalendar/WeeklyCalendar";
import "./TimesheetForm.scss";
import Configuration from "../../../../config/configuration";
import LeaveService from "../../../../services/LeaveService";

const TaskFormDaily = (props) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [finalSwitch, setFinalSwitch] = useState(false);
  const [finalSheet, setFinalSheet] = useState(false);
  const [saveSettings, setSaveSettings] = useState();

  const user = userService.userLoggedInInfo();
  const { PM, ADMIN, CEO } = new Configuration().Roles;
  useEffect(() => {
    // console.log("employyee data",employeeData);
    getEmployeeTasksGroupByProject(
      isRole([ADMIN, PM, CEO]) ? selectedUser.value : user._id,
      selectedDays[0],
      selectedDays[6]
    );
  }, [selectedDays, selectedUser]);

  useEffect(() => {
    console.log("s days in form", selectedDays);
  }, [selectedDays]);

  useEffect(() => {
    console.log("updated emplyee data", employeeData);
  }, [employeeData]);

  useEffect(() => {
    getSaveSettings();
  }, []);

  const isEmptyObj = (obj) => {
    for (var x in obj) {
      return false;
    }
    return true;
  };

  //   const getAllUsers = () => {
  //     userService.getUsers("", "", "", "").then((res) => {
  //       let options = [];
  //       res.data.map((item, index) => {
  //         options.push({ value: item._id, label: item.name });
  //       });
  //       setUsers(options);
  //     });
  //   };

  const getSaveSettings = () => {
    LeaveService.getAllLeaveSettings().then((res) => {
      let options = [];
      res.data.map((item) => {
        options.push(item);
      });
      setSaveSettings(options);
      console.log("opt", options);
      console.log("res", res.data);
    });
  };

  const handleChange = (
    e,
    projectIndx,
    taskIndx,
    timesheetIndx,
    date,
    toChange
  ) => {
    console.log(
      "handle chnge",
      e.target.value,
      projectIndx,
      taskIndx,
      timesheetIndx
    );
    let arr = employeeData;
    if (toChange === "completedWork") {
      arr[projectIndx].tasks[taskIndx] = {
        ...arr[projectIndx].tasks[taskIndx],
        workDone: e.target.value,
      };
    } else {
      let ts = arr[projectIndx].tasks[taskIndx].timesheet[timesheetIndx];
      if (toChange === "hours") {
        arr[projectIndx].tasks[taskIndx].timesheet[timesheetIndx] = {
          ...ts,
          workedHrs: Number(e.target.value),
          date: date,
        };
      }
      if (toChange === "remarks") {
        arr[projectIndx].tasks[taskIndx].timesheet[timesheetIndx] = {
          ...ts,
          remarks: e.target.value,
          date: date,
        };
      }
    }
    setEmployeeData([...arr]);
  };

  const getEmployeeTasksGroupByProject = (empId, startDate, endDate) => {
    TaskService.getEmployeeTasksGroupByProject({ empId, startDate, endDate })
      .then((res) => {
        setEmployeeData(() => res.data);
        if (res.data[0] && res.data[0].tasks[0].timesheet[0].final) {
          setFinalSheet(true);
          setFinalSwitch(true);
        } else {
          setFinalSheet(false);
          setFinalSwitch(false);
        }
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

  let counter = 0;
  let rowTotal = 0;
  const isRole = userService.isUserRole;
  return (
    <>
      <form
        id="timesheet-form"
        onSubmit={(e) => {
          e.preventDefault();
          TimesheetService.submitDailyTimesheet({
            employeeData: employeeData,
            empId: isRole([ADMIN, PM, CEO]) ? selectedUser.value : user._id,
            days: moment(),
            // final: finalSwitch,
          })
            .then((res) => {
              TimesheetService.handleMessage("add");
              getEmployeeTasksGroupByProject(
                isRole([ADMIN, PM, CEO]) ? selectedUser.value : user._id,
                moment(),
                moment()
              );
            })
            .catch((err) => {
              TimesheetService.handleError();
            });
        }}
        method="post"
      >
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col" className="col-8">
                Task Details
              </th>
              <th scope="col" className="dayDisplay">
                {moment(selectedDays[0]).format("dddd Do MMMM YY")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="9" className="not-found-icon p-0">
                {employeeData.length === 0 && (
                  <>
                    <i class="mdi mdi-library-books" />
                    <p>No Records Found</p>
                  </>
                )}
              </td>
            </tr>

            {employeeData.map((project, pIndex) => {
              return (
                <>
                  <tr key={pIndex}>
                    <td className="project-name" colSpan="9">
                      <strong>Project: {project.name}</strong>
                    </td>
                  </tr>
                  {project.tasks.map((task, tIndex) => {
                    counter += 1;
                    return (
                      <tr key={tIndex}>
                        <td style={{ paddingLeft: "25px" }}>
                          {task.name}
                          <div className="float-right worked">
                            <div>Completed %</div>
                            <span className="workedVal">
                              {task.workDone ? task.workDone + "%" : 0 + "%"}
                            </span>
                            <input
                              type="range"
                              className="form-range float-right"
                              min="0"
                              max="100"
                              value={task.workDone ? task.workDone : 0}
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  pIndex,
                                  tIndex,
                                  "",
                                  "",
                                  "completedWork"
                                )
                              }
                              step="1"
                              disabled={
                                isRole([ADMIN, PM, CEO]) ? true : finalSheet
                              }
                              // id="customRange3"
                            />
                          </div>
                        </td>
                        {[0].map((item, tsIndx) => {
                          return (
                            <td key={tsIndx} className="inputCol">
                              <input
                                type="number"
                                name={`task${counter}day${tsIndx}hrs`}
                                value={
                                  task.timesheet[tsIndx]
                                    ? task.timesheet[tsIndx].workedHrs
                                      ? task.timesheet[tsIndx].workedHrs
                                      : ""
                                    : ""
                                }
                                onChange={(e) =>
                                  handleChange(
                                    e,
                                    pIndex,
                                    tIndex,
                                    tsIndx,
                                    selectedDays[tsIndx],
                                    "hours"
                                  )
                                }
                              />
                              <div className="remarksModal">
                                <label>Remarks</label>
                                <textarea
                                  placeholder="Write some remarks about this..."
                                  value={
                                    task.timesheet[tsIndx]
                                      ? task.timesheet[tsIndx].remarks
                                        ? task.timesheet[tsIndx].remarks
                                        : ""
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleChange(
                                      e,
                                      pIndex,
                                      tIndex,
                                      tsIndx,
                                      selectedDays[tsIndx],
                                      "remarks"
                                    )
                                  }
                                />
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
        {isRole([ADMIN, PM, CEO]) ? (
          selectedUser.value && (
            <button
              type="submit"
              className="btn btn-primary my-primary-button m-0"
            >
              Save
            </button>
          )
        ) : (
          <button
            type="submit"
            className="btn btn-primary my-primary-button m-0"
          >
            Save
          </button>
        )}
      </form>
    </>
  );
};

export default TaskFormDaily;

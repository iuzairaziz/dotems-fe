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

const TaskForm = (props) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const user = userService.userLoggedInInfo();
  const { PM, ADMIN, CEO } = new Configuration().Roles;
  useEffect(() => {
    // console.log("employyee data",employeeData);
    getEmployeeTasksGroupByProject(
      isRole([ADMIN, PM, CEO]) ? selectedUser.value : user._id,
      selectedDays[0],
      selectedDays[6]
    );
    getAllUsers();
  }, [selectedDays, selectedUser]);

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

  const getAllUsers = () => {
    userService.getUsers("", "", "", "").then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ value: item._id, label: item.name });
      });
      setUsers(options);
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
    // console.log("typeof arr",typeof(arr));
    setEmployeeData([...arr]);
  };

  const getEmployeeTasksGroupByProject = (empId, startDate, endDate) => {
    TaskService.getEmployeeTasksGroupByProject({ empId, startDate, endDate })
      .then((res) => {
        setEmployeeData(() => res.data);
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
        onSubmit={(e) => {
          e.preventDefault();
          console.log("event", e);
          TimesheetService.submitWeeklyTimesheet({
            employeeData: employeeData,
            empId: isRole([ADMIN, PM, CEO]) ? selectedUser.value : user._id,
            days: selectedDays,
          })
            .then((res) => {
              TimesheetService.handleMessage("add");
            })
            .catch((err) => {
              TimesheetService.handleError();
            });
        }}
        method="post"
      >
        <table className="table table-bordered" id="timesheet-form">
          <thead>
            <tr>
              <th
                scope="col"
                className="calendars"
                colSpan={isRole([ADMIN, PM, CEO]) ? 5 : 9}
              >
                <span className="my-calendar">
                  <WeeklyCalendar
                    setWeekNum={() => console.log("week number")}
                    setSelectedDays={setSelectedDays}
                  />
                </span>
              </th>
              {isRole([ADMIN, PM, CEO]) && (
                <th colSpan={4}>
                  <Select
                    placeholder="Select Employee"
                    // value={selectedUser.label}
                    className="emp-select"
                    onChange={(obj) => {
                      setSelectedUser(obj);
                      console.log("object", obj);
                    }}
                    options={users}
                  />
                </th>
              )}
            </tr>
            <tr>
              <th scope="col" className="col-8">
                Task Details
              </th>
              <th scope="col" className="dayDisplay">
                {moment(selectedDays[0]).format("ddd MMM/DD")}
              </th>
              <th scope="col" className="dayDisplay">
                {moment(selectedDays[1]).format("ddd MMM/DD")}
              </th>
              <th scope="col" className="dayDisplay">
                {moment(selectedDays[2]).format("ddd MMM/DD")}
              </th>
              <th scope="col" className="dayDisplay">
                {moment(selectedDays[3]).format("ddd MMM/DD")}
              </th>
              <th scope="col" className="dayDisplay">
                {moment(selectedDays[4]).format("ddd MMM/DD")}
              </th>
              <th scope="col" className="dayDisplay">
                {moment(selectedDays[5]).format("ddd MMM/DD")}
              </th>
              <th scope="col" className="dayDisplay">
                {moment(selectedDays[6]).format("ddd MMM/DD")}
              </th>
              <th scope="col" className="dayDisplay">
                TOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <input name="empId" value={user._id} type="hidden" /> */}
            <tr>
              <td colSpan="9" className="not-found-icon">
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
                      <strong>{project.project.name}</strong>
                    </td>
                  </tr>
                  {project.tasks.map((task, tIndex) => {
                    counter += 1;
                    return (
                      <tr key={tIndex}>
                        {/* <input
                          name={`task${counter}taskId`}
                          value={task._id}
                          type="hidden"
                        /> */}
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
                              // id="customRange3"
                            />
                          </div>
                        </td>
                        {[0, 1, 2, 3, 4, 5, 6].map((item, tsIndx) => {
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
                              {/* <input
                                name={`task${counter}day${tsIndx}date`}
                                value={selectedDays[tsIndx]}
                                type="hidden"
                              /> */}
                              {/* <button onClick={(e)=>{e.preventDefault()}} className="btn btn-primary remarksBtn">+</button> */}
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
                        <td className="inputCol">
                          {task.timesheet.map((t, index) => {
                            if (index === 0) rowTotal = 0;
                            rowTotal += t.workedHrs;
                            if (index === task.timesheet.length - 1)
                              return rowTotal;
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
            {/* <input name="counter" value={counter} type="hidden" /> */}
          </tbody>
        </table>
        {isRole([ADMIN, PM, CEO]) ? (
          selectedUser.value && (
            <button type="submit" className="btn btn-primary my-primary-button">
              Save
            </button>
          )
        ) : (
          <button type="submit" className="btn btn-primary my-primary-button">
            Save
          </button>
        )}
      </form>
    </>
  );
};

export default TaskForm;

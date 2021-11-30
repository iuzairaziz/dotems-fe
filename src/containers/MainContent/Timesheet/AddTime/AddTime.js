import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import TimesheetFormWeekly from "../TimesheetForm/TimesheetFormWeekly";
import TimesheetFormDaily from "../TimesheetForm/TimesheetFormDaily";
import LeaveService from "../../../../services/LeaveService";
import { useState, useEffect } from "react";

const AddTime = () => {
  const [leaveSettings, setLeaveSettings] = useState();

  const getLeaveSetting = () => {
    LeaveService.getAllLeaveSettings().then((res) => {
      let options = [];

      res.data.map((item, index) => {
        options.push({
          timesheetSave: item.timesheetSave,
        });
      });
      // const setting = res.data;
      setLeaveSettings(options);
      console.log("res", res.data);
    });
  };
  console.log("settings", leaveSettings);

  useEffect(() => {
    getLeaveSetting();
  }, []);
  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="mt-0">Timesheet</h3>
              <p className="text-muted m-b-30 font-14">
                Please add number of hours worked on the task.
              </p>
              <TimesheetFormWeekly />
              {/* {leaveSettings && leaveSettings === "weekend" ? 
              <TimesheetFormWeekly /> :  <TimesheetFormDaily /> }  */}
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default AddTime;

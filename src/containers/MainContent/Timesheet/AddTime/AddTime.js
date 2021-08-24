import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import TimesheetForm from "../TimesheetForm/TimesheetForm";

const AddTime = () => {
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
              <TimesheetForm />
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default AddTime;

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
              <h4 className="mt-0 header-title">Add Working Hours to a Task</h4>
              <p className="text-muted m-b-30 font-14">
                Please fill the form below to add number of hours worked on a
                task
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

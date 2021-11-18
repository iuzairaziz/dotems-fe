import React, { Component } from "react";
import AUX from "../../../../../../hoc/Aux_";
import WorkingDayForm from "../WorkingDayForm/WorkingDayForm";

const AddWorkingDay = () => {
  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h3 className="mt-0">Add New Working Day</h3>
                  <p className="text-muted m-b-30 font-14">
                    Please fill the form below to add a new nature.
                  </p>
                  <WorkingDayForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default AddWorkingDay;

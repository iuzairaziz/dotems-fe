import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import MachineForm from "../MachineForm/MachineForm";
const AddCountry = () => {
  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="m-0 p-0">Add New Machine</h4>
                  <p className="text-muted m-b-30 font-14">
                    Please fill the form below to add a new machine.
                  </p>
                  <MachineForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default AddCountry;

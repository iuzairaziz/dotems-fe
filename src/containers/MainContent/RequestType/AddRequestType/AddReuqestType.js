import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import RequestForm from "../RequestForm/RequestForm";

const AddService = () => {
  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h3 className="mt-0">Add New Request Type</h3>
                  <p className="text-muted m-b-30 font-14">
                    Please fill the form below to add a new request type.
                  </p>
                  <RequestForm redirect />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default AddService;

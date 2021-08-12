import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import RequestForm from "../RequestForm/RequestForm";

const AddRequest = () => {
  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="m-0 p-0">Make Request</h4>
                  <p className="text-muted m-b-30 font-14">
                    Please fill the form below to make new request.
                  </p>
                  <RequestForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default AddRequest;

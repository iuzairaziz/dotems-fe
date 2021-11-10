import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import ClientLabelForm from "../ClientLabelForm/ClientLabelForm";

const AddCountry = () => {
  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h3 className="m-0">Add New Client Label</h3>
                  <p className="text-muted m-b-30 font-14">
                    Please fill the form below to add a new Client Label.
                  </p>
                  <ClientLabelForm />
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

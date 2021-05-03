import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import PlatformForm from "../PlatformForm/PlatformForm";

const AddPlatform = () => {
  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="mt-0 header-title">Add New Platform</h4>
                  <p className="text-muted m-b-30 font-14">
                    Please fill the form below to add a new Platform for the
                    projects.
                  </p>
                  <PlatformForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default AddPlatform;

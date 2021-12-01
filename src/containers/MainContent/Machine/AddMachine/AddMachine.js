import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import MachineForm from "../MachineForm/MachineForm";
import MachineList from "../MachineList/MachineList";

const AddCountry = () => {
  return (
    <AUX>
      <div className="col-lg-12">
        <div className="card m-b-20">
          <div className="card-body">
            <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
              <li className="nav-item ">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#profile1"
                  role="tab"
                >
                  <span className="d-none d-md-block">View Machine</span>
                  <span className="d-block d-md-none">
                    <i className="mdi mdi-account h5" />
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#home1"
                  role="tab"
                >
                  <span className="d-none d-md-block"> + Add Machine</span>
                  <span className="d-block d-md-none">
                    <i className="mdi mdi-home-variant h5" />
                  </span>
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div
                className="tab-pane p-3 active"
                id="profile1"
                role="tabpanel"
              >
                <MachineList />
              </div>
              <div className="tab-pane  p-3" id="home1" role="tabpanel">
                <div className="page-content-wrapper">
                  <div className="container-fluid">
                    <MachineForm />
                  </div>
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

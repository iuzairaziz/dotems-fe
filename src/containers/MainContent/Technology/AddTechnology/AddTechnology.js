import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import TechnologyForm from "../TechnologyForm/TechnologyForm";
import TechnologyList from "../TechnologyList/TechnologyList";

const AddTechnology = () => {
  return (
    <AUX>
      <div className="col-lg-12">
        <div className="card m-b-20">
          <div className="card-body">
            <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#profile1"
                  role="tab"
                >
                  <span className="d-none d-md-block">View Technology </span>
                  <span className="d-block d-md-none">
                    <i className="mdi mdi-account h5" />
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link "
                  data-toggle="tab"
                  href="#home1"
                  role="tab"
                >
                  <span className="d-none d-md-block">+ Add Technology</span>
                  <span className="d-block d-md-none">
                    <i className="mdi mdi-home-variant h5" />
                  </span>
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane  p-3" id="home1" role="tabpanel">
                <div className="page-content-wrapper">
                  <div className="container-fluid">
                    <TechnologyForm redirect />
                  </div>
                </div>
              </div>
              <div
                className="tab-pane active p-3"
                id="profile1"
                role="tabpanel"
              >
                <TechnologyList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default AddTechnology;

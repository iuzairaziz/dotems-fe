import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import AccessoryForm from "../AccessoryForm/AccessoryForm";

const AddCountry = () => {
  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="card m-b-20">
                <div className="card-body">
                  <AccessoryForm redirect />
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

import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import RoleForm from "../RoleForm/RoleForm";

const AddRole = () => {
  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h3 className="mt-0">Add New Role</h3>
                  <p className="text-muted m-b-30 font-14">
                    Please fill the form below to add a new Role.
                  </p>
                  <RoleForm redirect />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default AddRole;

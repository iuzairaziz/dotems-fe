import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";

const UserDetails = (props) => {
  {
    console.log("props", props.location.UserProps);
    const user = props.location.UserProps;
    console.log("Project Name", user.name);

    return (
      <AUX>
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={user.name}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>UserName</label>
                          <input
                            className="form-control"
                            value={user.email}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Joining Date </label>
                          <input
                            type="text"
                            className="form-control"
                            value={user.joiningDate}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Machine Number</label>
                          <input
                            className="form-control"
                            value={user.machineNo.machineNo}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Salary </label>
                          <input
                            type="text"
                            className="form-control"
                            value={user.salary}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Status</label>
                          <input
                            className="form-control"
                            value={user.status}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Gender </label>
                          <input
                            type="text"
                            className="form-control"
                            value={user.gender}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Role</label>
                          <input
                            className="form-control"
                            value={user.userRole}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Working Hours </label>
                          <input
                            type="text"
                            className="form-control"
                            value={user.workingHrs}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Working Days</label>
                          <input
                            className="form-control"
                            value={user.workingDays}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Technology</label>
                          <input
                            type="text"
                            className="form-control"
                            value={user.technology.map((item) => {
                              return item.name;
                              {
                                console.log("tech name", item.name);
                              }
                            })}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
};

export default UserDetails;

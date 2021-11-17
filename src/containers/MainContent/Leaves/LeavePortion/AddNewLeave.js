import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import LeaveDetails from "../LeaveDetails/LeaveDetails";
import LeaveList from "../LeaveList/LeaveList";
import NewLeaveSettings from "../LeaveSettings/NewLeaveSettings";
import NewLeave from "../NewLeave/NewLeave";

class AddNewLeave extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <AUX>
        <div className="row">
          <div className="col-lg-12">
            <div className="card m-b-20">
              <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#home2"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Dashboard</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-home-variant h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#profile2"
                      role="tab"
                    >
                      <span className="d-none d-md-block"> + Request</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-account h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#messages2"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Settings</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-email h5" />
                      </span>
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div
                    className="tab-pane active p-3"
                    id="home2"
                    role="tabpanel"
                  >
                    <LeaveDetails />
                  </div>
                  <div className="tab-pane p-3" id="profile2" role="tabpanel">
                    <NewLeave />
                  </div>
                  <div className="tab-pane p-3" id="messages2" role="tabpanel">
                    <NewLeaveSettings />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <h4 className="mb-3 p-0">Add New User</h4>
                    <UserForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </AUX>
    );
  }
}

export default AddNewLeave;

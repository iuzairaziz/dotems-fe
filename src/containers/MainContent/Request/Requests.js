import React, { Component } from "react";
import AUX from "../../../hoc/Aux_";
import RequestList from "./ViewRequest/ViewRequest";
import RequestRecieved from "./ViewRequest/ViewReceivedRequest";
import AddRequest from "./AddRequest/AddRequest";
import MyRequest from "./MyRequest/MyRequests";

class Requests extends Component {
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
                      <span className="d-none d-md-block">View Requests</span>
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
                      <span className="d-none d-md-block"> Add Request</span>
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
                      <span className="d-none d-md-block">My Request</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-email h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#messages3"
                      role="tab"
                    >
                      <span className="d-none d-md-block">
                        Recieved Request
                      </span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-email h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#messages4"
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
                    <RequestList />
                    {/* <LeaveDetails /> */}
                  </div>
                  <div className="tab-pane p-3" id="profile2" role="tabpanel">
                    <AddRequest />
                    {/* <NewLeave /> */}
                  </div>
                  <div className="tab-pane p-3" id="messages2" role="tabpanel">
                    <MyRequest />
                    {/* <NewLeaveSettings /> */}
                  </div>
                  <div className="tab-pane p-3" id="messages3" role="tabpanel">
                    <RequestRecieved />
                    {/* <NewLeaveSettings /> */}
                  </div>
                  <div className="tab-pane p-3" id="messages4" role="tabpanel">
                    <p>Settings</p>
                    {/* <NewLeaveSettings /> */}
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

export default Requests;

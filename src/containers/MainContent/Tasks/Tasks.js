import React, { Component } from "react";
import AUX from "../../../hoc/Aux_";
import NewTask from "./NewTask/NewTask";
import TaskDetail from "./TaskDetail/TaskDetails";
import MyTasks from "./TaskList/MyTaskList";
import Tables_datatable from "./TaskList/TaskList";

class Tasks extends Component {
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
                      <span className="d-none d-md-block">View Task</span>
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
                      <span className="d-none d-md-block">My Task</span>
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
                      <span className="d-none d-md-block"> + Add Task</span>
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
                    <Tables_datatable />
                  </div>
                  <div className="tab-pane p-3" id="profile2" role="tabpanel">
                    <MyTasks />
                    {/* <NewLeave /> */}
                  </div>
                  <div className="tab-pane p-3" id="messages2" role="tabpanel">
                    <NewTask />
                    {/* <NewLeaveSettings /> */}
                  </div>
                  <div className="tab-pane p-3" id="messages3" role="tabpanel">
                    <p>lorem</p>
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

export default Tasks;

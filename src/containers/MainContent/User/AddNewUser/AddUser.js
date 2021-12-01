import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import UserForm from "../AddUserForm/AddUserForm";
import UserList from "../UserList/UserList";
import ChangePasswordForm from "../AddUserForm/ChangePasswordForm";
import { Link } from "react-router-dom";
import "./AddUser.scss";

class AddProjects extends Component {
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
                      href="#profile2"
                      role="tab"
                    >
                      <span className="d-none d-md-block">User List</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-account h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link "
                      data-toggle="tab"
                      href="#home2"
                      role="tab"
                    >
                      <span className="d-none d-md-block"> + Add User</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-home-variant h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#settings2"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Settings</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-settings h5" />
                      </span>
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div
                    className="tab-pane active p-3"
                    id="profile2"
                    role="tabpanel"
                  >
                    <UserList />
                  </div>
                  <div className="tab-pane  p-3" id="home2" role="tabpanel">
                    <UserForm />
                  </div>
                  <div className="tab-pane p-3" id="settings2" role="tabpanel">
                    <div className="card user">
                      <div className="row cardd">
                        <i
                          class="mdi mdi-account iconSize"
                          style={{ color: "var(--color-secondary1)" }}
                        />
                        <i class="mdi mdi-settings iconSize" />
                      </div>
                      <div className="row cSettings">
                        <h2>User Settings</h2>
                      </div>
                      <div className="border-b" />
                      <div className="row cardd">
                        <Link to="/role/add">Roles</Link>
                      </div>
                      <div className="row cardd">
                        <Link to="/permissions">Roles & Permissions</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/add-designation">Designation</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/add-employee-type">Employee Type</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/add-department">Department</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/leave/add-new-working-day">
                          Working Days
                        </Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/working-hours-add">Working Hours</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/working-shift-add">Working Shift</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/add-machine">Machine</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/resource-cost-add">Resource Cost</Link>
                      </div>
                      <div className="row cardd ">
                        <Link to="/add-leave-policy">Leave Policy</Link>
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
}

export default AddProjects;

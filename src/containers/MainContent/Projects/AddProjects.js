import React, { Component } from "react";
import AUX from "../../../hoc/Aux_";
import ProjectForm from "../Projects/ProjectFrom";
import ViewProject from "../Projects/ViewProjects";
import MyProject from "../Projects/MyProject";
import { Link } from "react-router-dom";
import "./AddProjects.scss";

class AddProjects extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
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
                    href="#home1"
                    role="tab"
                  >
                    <span className="d-none d-md-block">My Projects</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-clipboard-account h5" />
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#profile1"
                    role="tab"
                  >
                    <span className="d-none d-md-block">Project List</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-clipboard-text h5" />
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#messages1"
                    role="tab"
                  >
                    <span className="d-none d-md-block">+ Add Project</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-plus h5" />
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#settings1"
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
                <div className="tab-pane active p-3" id="home1" role="tabpanel">
                  <MyProject />
                </div>
                <div className="tab-pane p-3" id="profile1" role="tabpanel">
                  <ViewProject />
                </div>
                <div className="tab-pane p-3" id="messages1" role="tabpanel">
                  <ProjectForm />
                </div>
                <div className="tab-pane p-3" id="settings1" role="tabpanel">
                  <div className="card project">
                    <div className="row cardd">
                      <i
                        class="mdi mdi-file-powerpoint-box iconSize"
                        style={{ color: "var(--color-secondary1)" }}
                      />
                      <i
                        class="mdi mdi-settings iconSize"
                        style={{ color: "var(--color-secondary1)" }}
                      />
                    </div>
                    <div className="row cSettings">
                      <h2>Project Settings</h2>
                    </div>
                    <div className="border-b" />
                    <div className="row cardd ">
                      <Link to="/addclient">Client</Link>
                    </div>
                    <div className="row cardd">
                      <Link to="/add-platform">Platform</Link>
                    </div>
                    <div className="row cardd ">
                      <Link to="/add-technology">Technology</Link>
                    </div>
                    <div className="row cardd ">
                      <Link to="/add-service">Service Type</Link>
                    </div>
                    <div className="row cardd ">
                      <Link to="/add-nature">Project Nature</Link>
                    </div>
                    <div className="row cardd ">
                      <Link to="/addstatus">Status</Link>
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

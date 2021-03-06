import React, { Component } from "react";
import AUX from "../../../hoc/Aux_";
import ClientsForm from "../Client/ClientsForm";
import ClientList from "../Client/ViewClients";
import "./ClientForm.scss";
import { Link } from "react-router-dom";
class AddClients extends Component {
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
                    href="#profile1"
                    role="tab"
                  >
                    <span className="d-none d-md-block">Client List</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-view-list h5" />
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
                    <span className="d-none d-md-block">+ Add Client</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-plus h5" />
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
                    <span className="d-none d-md-block">Settings</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-settings h5" />{" "}
                    </span>
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  className="tab-pane active p-3"
                  id="profile1"
                  role="tabpanel"
                >
                  <ClientList />
                </div>
                <div className="tab-pane  p-3" id="home1" role="tabpanel">
                  <div className="page-content-wrapper">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-lg-12">
                          <ClientsForm redirect />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane p-3" id="messages1" role="tabpanel">
                  <div className="card client">
                    <div className="row cardd">
                      <i
                        class="mdi mdi-account-multiple iconSize"
                        style={{ color: "var(--color-secondary1)" }}
                      />
                      <i class="mdi mdi-settings iconSize" />
                    </div>
                    <div className="row cSettings">
                      <h2>Client Settings</h2>
                    </div>
                    <div className="border-b" />
                    <div className="row cardd">
                      <Link to="/add-platform">Platform</Link>
                    </div>
                    <div className="row cardd ">
                      <Link to="/add-clientlabel">Client Label</Link>
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

export default AddClients;

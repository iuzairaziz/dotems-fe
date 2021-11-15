import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import UserForm from "../AddUserForm/AddUserForm";
import UserList from "../UserList/UserList";
import ChangePasswordForm from "../AddUserForm/ChangePasswordForm";

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
                {/* <h4 className="mt-0 header-title">Custom Tabs Justified</h4>
                    <p className="text-muted m-b-30 font-14">
                      Example of custom tabs
                    </p> */}

                <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#home2"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Add User</span>
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
                      <span className="d-none d-md-block">User List</span>
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
                      <span className="d-none d-md-block">Update Password</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-email h5" />
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
                    id="home2"
                    role="tabpanel"
                  >
                    <UserForm />
                  </div>
                  <div className="tab-pane p-3" id="profile2" role="tabpanel">
                    <UserList />
                  </div>
                  <div className="tab-pane p-3" id="messages2" role="tabpanel">
                    <ChangePasswordForm />
                  </div>
                  <div className="tab-pane p-3" id="settings2" role="tabpanel">
                    <p className="font-14 mb-0">
                      Trust fund seitan letterpress, keytar raw denim keffiyeh
                      etsy art party before they sold out master cleanse
                      gluten-free squid scenester freegan cosby sweater. Fanny
                      pack portland seitan DIY, art party locavore wolf cliche
                      high life echo park Austin. Cred vinyl keffiyeh DIY salvia
                      PBR, banh mi before they sold out farm-to-table VHS viral
                      locavore cosby sweater. Lomo wolf viral, mustache
                      readymade thundercats keffiyeh craft beer marfa ethical.
                      Wolf salvia freegan, sartorial keffiyeh echo park vegan.
                    </p>
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

export default AddProjects;

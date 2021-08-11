import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import ChangePasswordForm from "../AddUserForm/ChangePasswordForm";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <AUX>
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <h3 className="mb-2">Change Password</h3>
                    <ChangePasswordForm />
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

export default ChangePassword;

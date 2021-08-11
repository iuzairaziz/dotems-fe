import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import UpdateUserForm from "../AddUserForm/UpdateUserForm";

class updateUsers extends Component {
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
            
                    <h3 className="m-0">User Profile</h3>
                    <UpdateUserForm />
                
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
}

export default updateUsers;

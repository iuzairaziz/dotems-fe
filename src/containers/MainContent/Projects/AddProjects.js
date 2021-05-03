import React, { Component } from "react";
import AUX from "../../../hoc/Aux_";
import ProjectForm from "../Projects/ProjectFrom";

class AddProjects extends Component {
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
                    <h4 className="mt-0 header-title">Add New Project</h4>
                    <ProjectForm />
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

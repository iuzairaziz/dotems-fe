import React, { Component } from "react";
import AUX from "../../../hoc/Aux_";
import ProjectForm from "../Projects/ProjectFrom";
import ViewProject from "../Projects/ViewProjects";
import MyProject from "../Projects/MyProject";

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
              {/* <h4 className="mt-0 header-title">Custom Tabs</h4>
                    <p className="text-muted m-b-30 font-14">
                      Example of custom tabs
                    </p> */}

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
                  <p className="font-14 mb-0">
                    Trust fund seitan letterpress, keytar raw denim keffiyeh
                    etsy art party before they sold out master cleanse
                    gluten-free squid scenester freegan cosby sweater. Fanny
                    pack portland seitan DIY, art party locavore wolf cliche
                    high life echo park Austin. Cred vinyl keffiyeh DIY salvia
                    PBR, banh mi before they sold out farm-to-table VHS viral
                    locavore cosby sweater. Lomo wolf viral, mustache readymade
                    thundercats keffiyeh craft beer marfa ethical. Wolf salvia
                    freegan, sartorial keffiyeh echo park vegan.
                  </p>
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

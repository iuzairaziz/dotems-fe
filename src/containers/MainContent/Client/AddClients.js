import React, { Component } from "react";
import AUX from "../../../hoc/Aux_";
import ClientsForm from "../Client/ClientsForm";
import ClientList from "../Client/ViewClients";

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
                    href="#home1"
                    role="tab"
                  >
                    <span className="d-none d-md-block">+ Add Client</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-home-variant h5" />
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
                    <span className="d-none d-md-block">Client List</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-account h5" />
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
                      <i className="mdi mdi-email h5" />
                    </span>
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane active p-3" id="home1" role="tabpanel">
                  <div className="page-content-wrapper">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-lg-12">
                          {/* <div className="card m-b-20"> */}
                          {/* <div className="card-body"> */}
                          <ClientsForm redirect />
                          {/* </div> */}
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane p-3" id="profile1" role="tabpanel">
                  <ClientList />
                </div>
                <div className="tab-pane p-3" id="messages1" role="tabpanel">
                  <p className="font-14 mb-0">
                    Etsy mixtape wayfarers, ethical wes anderson tofu before
                    they sold out mcsweeney's organic lomo retro fanny pack
                    lo-fi farm-to-table readymade. Messenger bag gentrify
                    pitchfork tattooed craft beer, iphone skateboard locavore
                    carles etsy salvia banksy hoodie helvetica. DIY synth PBR
                    banksy irony. Leggings gentrify squid 8-bit cred pitchfork.
                    Williamsburg banh mi whatever gluten-free, carles pitchfork
                    biodiesel fixie etsy retro mlkshk vice blog. Scenester cred
                    you probably haven't heard of them, vinyl craft beer blog
                    stumptown. Pitchfork sustainable tofu synth chambray yr.
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

export default AddClients;

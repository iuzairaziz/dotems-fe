import React, { Component } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import ClientValidation from "../../../validations/client-validations";

class ViewClients extends Component {
  render() {
    const data = {
      columns: [
        {
          label: "Client Name",
          field: "clientName",
          sort: "asc",
          width: 125,
        },
        {
          label: "Company Name",
          field: "companyName",
          sort: "asc",
          width: 125,
        },
        {
          label: "Email",
          field: "Email",
          sort: "disabled",
          width: 200,
        },
        {
          label: "Address",
          field: "Address",
          sort: "disabled",
          width: 200,
        },
        {
          label: "Contact Number",
          field: "contactNum",
          sort: "disabled",
          width: 125,
        },
        {
          label: "Contact Number",
          field: "otherContact",
          sort: "disabled",
          width: 125,
        },
        {
          label: "URL",
          field: "URL",
          sort: "disabled",
          width: 150,
        },
        {
          label: "Country",
          field: "country",
          sort: "asc",
          width: 75,
        },
      ],
    };
    return (
      <AUX>
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">Clients</h4>

                    <MDBDataTable bordered hover data={data} />
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

export default ViewClients;

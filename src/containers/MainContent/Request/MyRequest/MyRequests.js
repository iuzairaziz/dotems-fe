import React, { Component, useEffect, useState } from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import AUX from "../../../../hoc/Aux_";
import RequestService from "../../../../services/Request";
import moment from "moment";

const MyRequest = (props) => {
  const [dataa, setData] = useState({
    columns: [
      {
        label: "Request Type",
        field: "rType",
      },
      {
        label: "Status",
        field: "status",
      },
      {
        label: "Request Date",
        field: "rDate",
      },
      {
        label: "Admin Action Date",
        field: "aAction",     
      },
      {
        label: "Admin Remarks",
        field: "aReamrks",   
      },
      {
        label: "Action",
        field: "action",   
      },
    ],
    rows: [],
  });



  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="mt-0 header-title">My Requests</h4>
                  <MDBDataTableV5
                    fixedHeader={true}
                    responsive
                    striped
                    bordered
                    searchTop
                    hover
                    data={dataa}
                    theadColor="#000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default MyRequest;

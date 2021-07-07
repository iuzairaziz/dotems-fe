import React, { Component, useEffect, useState } from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import AUX from "../../../../hoc/Aux_";

const LeaveList = () => {
  const [dataa, setData] = useState({
    columns: [
      {
        label: "User",
        field: "user",
        // sort: "asc",
        // width: 150,
      },
      {
        label: "Leave Type",
        field: "lType",
        // sort: "asc",
        // width: 270,
      },
      {
        label: "Dates",
        field: "dates",
        // sort: "asc",
        // width: 200,
      },
      {
        label: "Description",
        field: "description",
        // sort: "asc",
        // width: 100,
      },

      {
        label: "Admin Remarks",
        field: "aReamrks",
        // sort: "asc",
        // width: 100,
      },

      {
        label: "Admin Action",
        field: "aAction",
        // sort: "asc",
        // width: 100,
      },
      {
        label: "Status",
        field: "status",
        // sort: "asc",
        // width: 100,
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
                  <h4 className="mt-0 header-title">Tasks</h4>

                  <MDBDataTableV5
                    // scrollX
                    fixedHeader={true}
                    responsive
                    striped
                    bordered
                    searchTop
                    hover
                    // autoWidth
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

export default LeaveList;

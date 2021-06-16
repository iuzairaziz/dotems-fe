import React, { Component, useEffect, useState } from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import AUX from "../../../../hoc/Aux_";

const MyTasks = () => {
  const [dataa, setData] = useState({
    columns: [
      {
        label: "Title",
        field: "title",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Project",
        field: "project",
        sort: "asc",
        // width: 270,
      },
      {
        label: "Estimated Hours",
        field: "estimatedHrs",
        sort: "asc",
        // width: 200,
      },
      {
        label: "Project Ratio",
        field: "projectRatio",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Team Lead",
        field: "teamLead",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Parent Task",
        field: "parentTask",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Added By",
        field: "addedBy",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Start Time",
        field: "startTime",
        sort: "asc",
        // width: 100,
      },
      {
        label: "End Time",
        field: "endTime",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "disabled",
        width: 450,
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
                    autoWidth
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

export default MyTasks;

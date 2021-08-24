import React, { useEffect, useState } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const AttendanceList = () => {
  const [data, setData] = useState({
    columns: [
      {
        label: "Employee Name",
        field: "name",
        sort: "asc",
      },
      {
        label: "Time In",
        field: "timeIN",
      },
      {
        label: "Time Out",
        field: "timeOut",
      },
      {
        label: "Total Time",
        field: "totalTime",
      },
      {
        label: "Over Time",
        field: "overTime",
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
                  <div className="row align-items-center mb-3">
                    <div className="col">
                      <h3 className="m-0 p-0">All Attendance</h3>
                    </div>
                  </div>
                  <MDBDataTableV5
                    responsive
                    striped
                    small
                    onPageChange={(val) => console.log(val)}
                    bordered={true}
                    //  materialSearch
                    searchTop
                    searchBottom={false}
                    pagingTop
                    barReverse
                    hover
                    // scrollX
                    data={data}
                    theadColor="#000"
                  />
                </div>
              </div>
            </div>
            <div />
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default AttendanceList;

import React, { useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import Button from "reactstrap/lib/Button";
import { Link } from "react-router-dom";

const LeaveWorkingDays = () => {
  const [dataa, setData] = useState({
    columns: [
      {
        label: "Working Day Type",
        field: "type",
        sort: "asc",
      },
      {
        label: "Action",
        field: "action",
      },
    ],
    rows: [],
  });

  return (
    <div className="row">
      <div className="col col-md-6">
        <div className="card m-b-20">
          <div className="card-body">
            <div>
              <Link to="/leave/add-new-working-day">
                <Button className="mt-3 my-primary-button float-right">
                  + ADD
                </Button>
              </Link>
            </div>{" "}
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
  );
};

export default LeaveWorkingDays;

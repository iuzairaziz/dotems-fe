import React from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import { Progress, Button } from "reactstrap";
import PlatformForm from "../PlatformForm/PlatformForm";
const PlatformList = () => {
  const data = {
    columns: [
      {
        label: "Title",
        field: "title",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        // width: 150,
      },
    ],
    rows: [
      {
        title: "Tiger Nixon",
        action: (
          <div className="row">
            {/* <div className="col"> */}
            <Button
              color="info"
              size="sm"
              data-toggle="modal"
              data-target="#myModal"
              className="mr-2"
            >
              Edit
            </Button>
            {/* </div> */}
            {/* <div className="col"> */}
            <Button color="danger" size="sm">
              Delete
            </Button>
            {/* </div> */}
          </div>
        ),
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
                  <h4 className="mt-0 header-title">All Platforms View</h4>
                  <p className="text-muted m-b-30 font-14">
                    Below are all Platforms Records
                  </p>

                  <MDBDataTable
                    // scrollX
                    striped
                    bordered
                    hover
                    // autoWidth
                    data={data}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4 m-t-30">
              <div className=" text-center">
                <p className="text-muted">Standard modal</p>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  Standard modal
                </button>
              </div>

              <div
                id="myModal"
                className="modal fade"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title mt-0" id="myModalLabel">
                        Edit Platform
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-hidden="true"
                      >
                        ×
                      </button>
                    </div>
                    <div className="modal-body">
                      <PlatformForm />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary waves-effect"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default PlatformList;

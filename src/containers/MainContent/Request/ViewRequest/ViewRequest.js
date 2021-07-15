import React, { Component, useEffect, useState } from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import AUX from "../../../../hoc/Aux_";
import RequestService from "../../../../services/Request";
import moment from "moment";

const RequestList = (props) => {
  const [dataa, setData] = useState({
    columns: [
      {
        label: "User",
        field: "user",
        // sort: "asc",
        // width: 150,
      },
      {
        label: "Reqyest Type",
        field: "rType",
        // sort: "asc",
        // width: 270,
      },
      {
        label: "Request Date",
        field: "rDate",
        // sort: "asc",
        // width: 200,
      },

      // {
      //   label: "Admin Remarks",
      //   field: "aReamrks",
      //   // sort: "asc",
      //   // width: 100,
      // },

      {
        label: "Admin Action Date",
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
      {
        label: "Action",
        field: "action",
        // sort: "asc",
        // width: 100,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    RequestService.getAllRequest()
      .then((res) => {
        let updatedData = { ...dataa };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            user: item.user ? item.user.name : "N/A",
            rType: item.requestType ? item.requestType.name : "N/A",
            rDate: moment(item.createdAt).format("MM-DD-YYYY"),
            // description: item.description ? item.description : "N/A",
            // aReamrks: item.adminRemark ? item.adminRemark : "N/A",
            aAction: item.adminActionDate
              ? moment(item.adminActionDate).format("LL")
              : "N/A",
            status: item.status ? item.status : "N/A",
            action: (
              <div className="row flex-nowrap d-flex justify-content-start">
                <i
                  className="mdi mdi-eye 
                  iconsS my-primary-icon ml-4"
                  onClick={() => {
                    props.history.push({
                      pathname: "/request-single-detail/" + item._id,
                    });
                  }}
                />
              </div>
            ),
          });
        });
        console.log("Leaves", updatedData);

        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="mt-0 header-title">Leaves</h4>

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

export default RequestList;

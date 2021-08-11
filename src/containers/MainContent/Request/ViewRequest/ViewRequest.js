import React, { Component, useEffect, useState } from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import AUX from "../../../../hoc/Aux_";
import RequestService from "../../../../services/Request";
import UserService from "../../../../services/UserService";

import moment from "moment";
import userService from "../../../../services/UserService";

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
        label: "Request Type",
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
        label: "Admin Status",
        field: "adminStatus",
        // sort: "asc",
        // width: 100,
      },
      {
        label: "User Status",
        field: "userStatus",
        // sort: "asc",
        // width: 100,
      },
      {
        label: "Request Sent To",
        field: "requestRecievers",
        // sort: "asc",
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

  const userId = userService.userLoggedInInfo();

  const getData = () => {
    RequestService.getAllRequest(userId._id)
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
            adminStatus: item.adminStatus ? item.adminStatus : "N/A",
            userStatus: item.userStatus ? item.userStatus : "N/A",
            requestRecievers: item.requestRecievers
              ? item.requestRecievers.map((item) => <div>{item.name}</div>)
              : "N/A",
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
                  <h3 className="m-0">All Requests</h3>

                  <MDBDataTableV5
                    responsive
                    striped
                    small
                    onPageChange={(val) => console.log(val)}
                    bordered={true}
                    // materialSearch
                    searchTop
                    searchBottom={false}
                    pagingTop
                    barReverse
                    hover
                    // scrollX
                    fixedHeader={true}
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

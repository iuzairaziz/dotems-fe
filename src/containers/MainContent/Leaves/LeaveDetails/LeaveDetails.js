import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import "./LeaveDetails.scss";
import LeaveService from "../../../../services/LeaveService";
import UserService from "../../../../services/UserService";
import moment from "moment";

const LeaveDetails = (props) => {
  let loggedUser = UserService.userLoggedInInfo();
  console.log("logged user", loggedUser);

  const [dataa, setData] = useState({
    columns: [
      {
        label: "Type of Leave",
        field: "type",
        sort: "asc",
      },
      {
        label: "Dates",
        field: "dates",
        // sort: "asc",
      },

      //   {
      //     label: "To",
      //     field: "to",
      //     // sort: "asc",
      //   },

      // {
      //   label: "Description",
      //   field: "description",
      // },
      {
        label: "Posting Date",
        field: "postingDate",
      },
      // {
      //   label: "Admin Remarks",
      //   field: "aRemarks",
      // },
      {
        label: "Action",
        field: "action",
      },
    ],
    rows: [],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    LeaveService.allUserLeaves(loggedUser._id)
      .then((res) => {
        let updatedData = { ...dataa };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            type: item.type ? item.type.name : "N/A",
            postingDate: item.createdAt ? item.createdAt : "N/A",
            dates: item.dates
              ? item.dates.map((item, index) => {
                  return (
                    <div>
                      {moment(item.date).format("LL")}
                      <br />
                    </div>
                  );
                })
              : "none",
            action: (
              <div className="row flex-nowrap justify-content-start">
                <i
                  className="mdi mdi-eye 
                  iconsS my-primary-icon"
                  onClick={() => {
                    props.history.push({
                      pathname: "/single-detail/" + item._id,
                    });
                  }}
                />
              </div>
            ),
          });
        });
        console.log("Leaves", updatedData);
        console.log("Leaves info", dataa);
        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <AUX>
      <div className="LeaveDetails">
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <h3>Leave Details</h3>

                    <div className="row main">
                      <div className="col">
                        <h5>Sick Leave: 12</h5>
                      </div>
                      <div className="col">
                        <h5>Casual Leave: 12</h5>
                      </div>
                      <div className="col">
                        <h5>Half Day Leave: 12</h5>
                      </div>
                      <div className="col">
                        <h5>Short Leave: 12</h5>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col">
                        <span>Used Leave: </span>
                        <span className="sub"> 0</span>
                      </div>
                      <div className="col">
                        <span>Used Leave: </span>
                        <span className="sub"> 0</span>
                      </div>
                      <div className="col">
                        <span>Used Leave: </span>
                        <span className="sub"> 0</span>
                      </div>
                      <div className="col">
                        <span>Used Leave: </span>
                        <span className="sub"> 3</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <span>Remaining Leave: </span>
                        <span className="sub1">12</span>
                      </div>
                      <div className="col">
                        <span>Remaining Leave: </span>
                        <span className="sub1">12</span>
                      </div>
                      <div className="col">
                        <span>Remaining Leave: </span>
                        <span className="sub1">12</span>
                      </div>
                      <div className="col">
                        <span>Remaining Leave: </span>
                        <span className="sub1">9</span>
                      </div>
                    </div>
                    <hr />
                    <h3 className="main">Leave Table</h3>
                    <div className="row">
                      <div className="col-12">
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
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default LeaveDetails;

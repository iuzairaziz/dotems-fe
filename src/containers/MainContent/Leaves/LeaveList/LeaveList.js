import React, { Component, useEffect, useState } from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import AUX from "../../../../hoc/Aux_";
import LeaveService from "../../../../services/LeaveService";
import moment from "moment";
import userService from "../../../../services/UserService";
import Select from "react-select";
import { Link } from "react-router-dom";

const LeaveList = (props) => {
  const [state, setState] = useState({
    users: [],
    statuses: [
      { label: "Pending", value: "pending" },
      { label: "Approved", value: "approved" },
      { label: "Unpaid", value: "unpaid" },
    ],
    selectedUser: null,
    selectedStatus: null,
  });
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
        label: "Total Days",
        field: "tDays",
      },
      {
        label: "Admin Action Date",
        field: "aAction",
        // sort: "asc",
        // width: 100,
      },
      {
        label: "PM Status",
        field: "PMStatus",
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
    getUsers();
  }, []);

  const getUsers = () => {
    userService.getUsers("", "", "", "").then((res) => {
      setState((prevState) => ({ ...prevState, users: toOptions(res.data) }));
    });
  };

  const toOptions = (arr) => {
    let options = [{ label: "All", value: "" }];
    arr.map((item, index) => {
      options.push({ label: item.name, value: item._id });
    });
    return options;
  };

  const filters = { user: state.selectedUser, status: state.selectedStatus };

  const getData = () => {
    LeaveService.allLeavesFiltered(filters)
      .then((res) => {
        let updatedData = { ...dataa };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            user: (
              <Link to={`/userdetails/${item.user._id}`}>
                {" "}
                {item.user ? item.user.name : "N/A"}
              </Link>
            ),
            lType: item.type ? item.type.name : "N/A",
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
              tDays: item.dates ? item.dates.length
              : "none",
            aAction: item.adminActionDate
              ? moment(item.adminActionDate).format("LL")
              : "N/A",
            PMStatus: item.pmStatus ? item.pmStatus : "N/A",
            adminStatus: item.adminStatus ? item.adminStatus : "N/A",
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

        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <h4 className="mt-0 header-title">User</h4>
          <div className="row my-3">
            <div className="col col-md-4">
              {/* <label>Platform Filter</label> */}
              <Select
                name="clientName"
                // onBlur={props.handleBlur}
                // value={props.values.clientName}
                // onChange={(val) => props.setFieldValue("clientName", val)}
                placeholder="Employee..."
                options={state.users}
              />
            </div>
            <div className="col col-md-4">
              {/* <label>Platform Filter</label> */}
              <Select
                name="clientName"
                // onBlur={props.handleBlur}
                // value={props.values.clientName}
                // onChange={(val) => props.setFieldValue("clientName", val)}
                placeholder="Status..."
                options={state.statuses}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/* <div className="card m-b-20">
                <div className="card-body"> */}

              <MDBDataTableV5
                // scrollX
                // fixedHeader={true}
                responsive
                striped
                small
                onPageChange={(val) => console.log(val)}
                bordered={true}
                materialSearch
                // searchTop
                searchTop
                searchBottom={false}
                pagingTop
                barReverse
                hover
                // autoWidth
                data={dataa}
                theadColor="#000"
              />
              {/* </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default LeaveList;

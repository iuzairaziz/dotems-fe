import React, { Component, useEffect, useState } from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import AUX from "../../../../hoc/Aux_";
import LeaveService from "../../../../services/LeaveService";
import moment from "moment";
import userService from "../../../../services/UserService";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { Link } from "react-router-dom";

const LeaveList = (props) => {
  const [state, setState] = useState({
    users: [],
    statuses: [
      { label: "All", value: "" },
      { label: "Pending", value: "pending" },
      { label: "Approved", value: "approved" },
      { label: "Unpaid", value: "unpaid" },
    ],
    selectedUser: null,
    selectedStatus: null,
    selectedPmStatus: null,
    selectedDateStart: null,
    selectedDateEnd: null,
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
  }, [
    state.selectedUser,
    state.selectedStatus,
    state.selectedPmStatus,
    state.selectedDateStart,
    state.selectedDateEnd,
  ]);

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

  const filters = {
    user: state.selectedUser,
    adminStatus: state.selectedStatus,
    pmStatus: state.selectedPmStatus,
    startDate: state.selectedDateStart,
    endDate: state.selectedDateEnd,
  };

  const getData = () => {
    LeaveService.allLeavesFiltered(filters)
      .then((res) => {
        let updatedData = { ...dataa };
        updatedData.rows = [];
        res.data
          .filter((item) => item.dates.length > 0)
          .map((item, index) => {
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
              tDays: item.dates ? item.dates.length : "none",
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
          <h4 className="mt-0 header-title">Leave List</h4>
          <div className="row my-3">
            <div className="col-md-3">
              <label>Leave Dates Start Range</label>

              <DatePicker
                className="form-control"
                value={state.selectedDateStart}
                selected={state.selectedDateStart}
                onChange={(val) =>
                  setState((prevState) => ({
                    ...prevState,
                    selectedDateStart: val,
                  }))
                }
              />
            </div>
            <div className="col-md-3">
              <label>Leave Dates End Range</label>
              <DatePicker
                className="form-control"
                value={state.selectedDateEnd}
                selected={state.selectedDateEnd}
                onChange={(val) =>
                  setState((prevState) => ({
                    ...prevState,
                    selectedDateEnd: val,
                  }))
                }
              />
            </div>
            <div className="col col-md-2">
              <label>Employee Filter</label>
              <Select
                name="clientName"
                // onBlur={props.handleBlur}
                // value={props.values.clientName}
                // onChange={(val) => props.setFieldValue("clientName", val)}
                onChange={(val) =>
                  setState((prevState) => ({
                    ...prevState,
                    selectedUser: val.value,
                  }))
                }
                placeholder="Employee..."
                options={state.users}
              />
            </div>

            <div className="col col-md-2">
              <label>PM Status Filter</label>
              <Select
                name="clientName"
                // onBlur={props.handleBlur}
                // value={props.values.clientName}
                onChange={(val) =>
                  setState((prevState) => ({
                    ...prevState,
                    selectedPmStatus: val.value,
                  }))
                }
                placeholder="Status..."
                options={state.statuses}
              />
            </div>

            <div className="col col-md-2">
              <label>Admin Status Filter</label>
              <Select
                name="clientName"
                // onBlur={props.handleBlur}
                // value={props.values.clientName}
                onChange={(val) =>
                  setState((prevState) => ({
                    ...prevState,
                    selectedStatus: val.value,
                  }))
                }
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

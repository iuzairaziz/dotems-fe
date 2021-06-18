import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";
import moment from "moment";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import UserService from "../../../../services/UserService";
import { Progress } from "reactstrap";

const UserDetails = (props) => {
  {
    const [userData, setUserData] = useState();
    const [taskData, setTaskData] = useState([]);

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
      ],
      rows: [],
    });

    console.log("props", props.match.params.id);
    const userID = props.match.params.id;

    useEffect(() => {
      getData(userID);
    }, []);

    const getData = (id) => {
      UserService.getUserById(id)
        .then((res) => {
          const { tasks, user } = res.data;
          console.log(tasks);
          setUserData(user);
          setTaskData(tasks);
          let data = { ...dataa };
          data.rows = [];
          tasks.map((item, index) => {
            data.rows.push({
              title: item.name ? item.name : "none",
              project: (
                <Link to={`/projectdetails/${item.project._id}`}>
                  {" "}
                  {item.project ? item.project.name : "none"}{" "}
                </Link>
              ),
              estimatedHrs: item.estHrs ? item.estHrs.toFixed(2) : "none",
              projectRatio: item.projectRatio ? (
                <Progress color="teal" value={item.projectRatio}>
                  {item.projectRatio + "%"}
                </Progress>
              ) : (
                "N/A"
              ),
              status: item.status ? item.status : "none",
              teamLead: item.teamLead ? (
                <Link to={`/userdetails/${item.teamLead._id}`}>
                  {" "}
                  {item.teamLead.name}{" "}
                </Link>
              ) : (
                "none"
              ),
              addedBy: item.addedBy ? item.addedBy.name : "none",
              startTime: item.startTime
                ? moment(item.startTime).format("DD/MMM/YYYY")
                : "none",
              endTime: item.endTime
                ? moment(item.endTime).format("DD/MMM/YYYY")
                : "none",
            });
          });
          setData(data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    console.log("Tasks", taskData);

    return (
      <AUX>
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={userData && userData.name}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>UserName</label>
                          <input
                            className="form-control"
                            value={userData && userData.email}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Joining Date </label>
                          <input
                            type="text"
                            className="form-control"
                            value={moment(
                              userData && userData.joiningDate
                            ).format("LL")}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Machine Number</label>
                          <input
                            className="form-control"
                            value={
                              userData &&
                              userData.machineNo &&
                              userData.machineNo.machineNo
                            }
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Salary </label>
                          <input
                            type="text"
                            className="form-control"
                            value={userData && userData.salary}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Status</label>
                          <input
                            className="form-control"
                            value={userData && userData.status}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Gender </label>
                          <input
                            type="text"
                            className="form-control"
                            value={userData && userData.gender}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Role</label>
                          <input
                            className="form-control"
                            value={userData && userData.userRole}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Working Hours </label>
                          <input
                            type="text"
                            className="form-control"
                            value={userData && userData.workingHrs}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Working Days</label>
                          <input
                            className="form-control"
                            value={userData && userData.workingDays}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Technology</label>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              userData &&
                              userData.technology.map((item) => {
                                return item.name;
                                {
                                  console.log("tech name", item.name);
                                }
                              })
                            }
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {taskData.length != 0 && (
            <div className="col-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="mt-0 header-title">User Tasks</h4>

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
          )}
        </div>
      </AUX>
    );
  }
};

export default UserDetails;

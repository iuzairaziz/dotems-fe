import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";
import moment from "moment";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import UserService from "../../../../services/UserService";
import { Progress } from "reactstrap";
import "./UserDetails.scss";

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

    console.log("User", userData);

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
        <div className="page-content-wrapper userD">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="col-12">
                  <div className="card m-b-20">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="labell">Name: </span>
                          <span className="valuee">
                            {userData && userData.name}
                          </span>
                        </div>
                        <div className="col">
                          <div>
                            <span className="labell">UserName: </span>
                            <span className="valuee">
                              {userData && userData.email}
                            </span>
                          </div>
                        </div>
                        <div className="col">
                          <div>
                            <span className="labell">Joining Date: </span>
                            <span className="valuee">
                              {moment(userData && userData.joiningDate).format(
                                "DD-MM-YYYY"
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="col">
                          <div>
                            <span className="labell">Machine Number: </span>
                            <span className="valuee">
                              {userData &&
                                userData.machineNo &&
                                userData.machineNo.machineNo}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row gap">
                        <div className="col">
                          <span className="labell">Role: </span>
                          <span className="valuee">
                            {userData && userData.userRole}
                          </span>
                        </div>
                        <div className="col">
                          <span className="labell">Salary: </span>
                          <span className="valuee">
                            {userData && userData.salary}
                          </span>
                        </div>
                        <div className="col">
                          <span className="labell">Status: </span>
                          <span className="valuee">
                            {userData && userData.status}
                          </span>
                        </div>
                        <div className="col">
                          <span className="labell">Gender: </span>
                          <span className="valuee">
                            {userData && userData.gender}
                          </span>
                        </div>
                      </div>
                      <div className="row gap">
                        <div className="col">
                          <span className="labell">Contact # </span>
                          <span className="valuee">
                            {userData && userData.contact}
                          </span>
                        </div>
                        <div className="col">
                          <span className="labell">Other Contact: </span>
                          <span className="valuee">
                            {userData && userData.otherContact}
                          </span>
                        </div>
                        <div className="col">
                          <span className="labell">Working Hours: </span>
                          <span className="valuee">
                            {userData && userData.workingHrs}
                          </span>
                        </div>
                        <div className="col">
                          <span className="labell">Working Days: </span>
                          <span className="valuee">
                            {userData && userData.workingDays}
                          </span>
                        </div>
                      </div>
                      <div className="row gap">
                        <div className="col">
                          <span className="labell">Personal Mail: </span>
                          <span className="valuee">
                            {userData && userData.emailPersonal}
                          </span>
                        </div>
                        <div className="col">
                          <span className="labell">Address: </span>
                          <span className="valuee">
                            {userData && userData.address}
                          </span>
                        </div>
                      </div>
                      <div className="row gap">
                        <div className="col">
                          <span className="labell">Guardian Name: </span>
                          <span className="valuee">
                            {userData && userData.nameEmergency}
                          </span>
                        </div>
                        <div className="col">
                          <span className="labell">Guardian Number: </span>
                          <span className="valuee">
                            {userData && userData.contactEmergency}
                          </span>
                        </div>
                      </div>
                      <div className="row gap">
                        <div className="col">
                          <span className="labell">Technology: </span>
                          <span className="valuee">
                            {userData &&
                              userData.technology.map((item) => {
                                return item.name;
                                {
                                  console.log("tech name", item.name);
                                }
                              })}
                          </span>
                        </div>
                      </div>

                      {taskData.length != 0 && (
                        <div className="col-12 gap">
                          <h4 className="mt-0 header-title">User Tasks</h4>

                          <MDBDataTableV5
                           responsive
                           striped
                           small
                           bordered={true}
                           materialSearch
                           searchTop
                           searchBottom={false}
                           pagingTop
                           barReverse
                           hover
                            // scrollX
                            // autoWidth
                            data={dataa}
                            theadColor="#000"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
};

export default UserDetails;

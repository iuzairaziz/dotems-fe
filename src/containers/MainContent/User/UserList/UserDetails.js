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

    const detail = [
      { label: "Name", value: userData && userData.name },
      {
        label: "UserName",
        value: userData && userData.email,
      },

      {
        label: "Joining Date",
        value: userData && moment(userData.joiningDate).format("DD-MM-YYYY"),
      },
      {
        label: "Machine Number",
        value: userData && userData.machineNo && userData.machineNo.machineNo,
      },
      {
        label: "Salary",
        value: userData && userData.salary,
      },
      { label: "Role", value: userData && userData.userRole },
      { label: "Designation", value: userData && userData.designation.name },
      {
        label: "Status",
        value: userData && userData.status,
      },
      {
        label: "Gender",
        value: userData && userData.gender,
      },

      {
        label: "Contact Number",
        value: userData && userData.contact,
      },
      {
        label: "Other Contact",
        value: userData && userData.otherContact,
      },
      {
        label: "Working Hours",
        value: userData && userData.workingHrs,
      },
      {
        label: "Working Days",
        value: userData && userData.workingDays,
      },
      {
        label: "Personal Mail",
        value: userData && userData.emailPersonal,
      },
      {
        label: "Address",
        value: userData && userData.address,
      },
      {
        label: "Guardian Name",
        value: userData && userData.nameEmergency,
      },
      {
        label: "Guardian Address",
        value: userData && userData.contactEmergency,
      },
      {
        label: "Technology",
        value:
          userData &&
          userData.technology &&
          userData.technology.map((item, index) => {
            return (
              <div>
                {item.name}
                <br />
              </div>
            );
            if (index === 0) {
              return item.name;
            } else if (index >= 0) {
              return `, ${item.name} `;
            }
          }),
      },
    ];

    return (
      <AUX>
        <div className="page-content-wrapper userD">
          <div className="container-fluid">
            <div className="row">
              <div className="row  gapp ">
                {detail.map((item, indx) => {
                  return (
                    <>
                      <div
                        className={`labell ${
                          item.label === "Team Members"
                            ? "col-3 col-md-2"
                            : "col-3 col-md-2 "
                        } mb-3 d-flex align-items-center `}
                      >
                        <div>{item.label}</div>
                      </div>
                      <div
                        className={`valuee ${
                          item.label === "Team Members"
                            ? "col-9 col-md-6"
                            : "col-3 col-md-2  pt-2"
                        } col-3 col-md-2 mb-3"`}
                      >
                        {item.value}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            {taskData.length != 0 && (
              <div className="col-12 gap">
                <h3 className="mt-0">User Tasks</h3>
                <MDBDataTableV5
                  responsive
                  striped
                  small
                  bordered={true}
                  searchTop
                  searchBottom={false}
                  pagingTop
                  barReverse
                  hover
                  data={dataa}
                  theadColor="#000"
                />
              </div>
            )}
          </div>
        </div>
      </AUX>
    );
  }
};

export default UserDetails;

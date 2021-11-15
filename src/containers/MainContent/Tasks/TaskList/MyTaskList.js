import React, { Component, useEffect, useState } from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import AUX from "../../../../hoc/Aux_";
import TaskService from "../../../../services/TaskService";
import { Progress, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import moment from "moment";
import UserService from "../../../../services/UserService";
import $ from "jquery";

const MyTasks = (props) => {
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
        label: "Actual Hours",
        field: "actHrs",
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
      {
        label: "Work Done",
        field: "workDone",
        sort: "asc",
        // width: 100,
      },

      {
        label: "Action",
        field: "action",
        sort: "disabled",
        width: 450,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    getData();
  }, []);

  $(document).ready(function() {
    $("tr").each(function(index) {
      var two = $(this)
        .children("td")
        .eq(2)
        .text();
      var three = $(this)
        .children("td")
        .eq(3)
        .text();
      var finalTwo = parseInt(two);
      var finalThree = parseInt(three);
      if (finalThree > finalTwo) {
        $(this).css("color", "red");
        $(this)
          .find("a")
          .css("color", "red");
      }
    });
  });

  let loggedUser = UserService.userLoggedInInfo();

  const getData = () => {
    TaskService.getAllEmployeeTasks(loggedUser._id)
      .then((res) => {
        let data = { ...dataa };
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            title: item.name ? item.name : "N/A",
            project: item.project ? item.project.name : "N/A",
            estimatedHrs: item.estHrs ? item.estHrs.toFixed(2) : "N/A",
            projectRatio: item.projectRatio ? (
              <Progress color="teal" value={item.projectRatio}>
                {item.projectRatio + "%"}
              </Progress>
            ) : (
              "N/A"
            ),
            status: (
              <div>
                <select
                  class="form-select"
                  defaultValue={item.status ? item.status : "N/A"}
                  onChange={(e) =>
                    TaskService.updateTask(item._id, { status: e.target.value })
                  }
                  aria-label="Default select example"
                >
                  <option value="pending">Pending</option>
                  <option value="working">Working</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            ),
            teamLead: item.teamLead ? item.teamLead.name : "N/A",
            parentTask: item.parentTask ? item.parentTask.name : "N/A",
            workDone: item.workDone ? item.workDone : "N/A",
            actHrs: item.timesheet ? item.timesheet.actualHrs : "N/A",
            addedBy: item.addedBy ? (
              <Link to={`/userdetails/${item.addedBy._id}`}>
                {item.addedBy.name}{" "}
              </Link>
            ) : (
              "N/A"
            ),
            startTime: item.startTime
              ? moment(item.startTime).format("DD/MMM/YYYY")
              : "N/A",
            endTime: item.endTime
              ? moment(item.endTime).format("DD/MMM/YYYY")
              : "N/A",
            action: (
              <div className="row flex-nowrap justify-content-center">
                <i
                  className="mdi mdi-eye 
                  iconsS my-primary-icon"
                  onClick={() => {
                    props.history.push({
                      pathname: "/task-details/" + item._id,
                    });
                  }}
                />
              </div>
            ),
          });
        });
        setData(data);
        console.log("state data", dataa);
        console.log("my task data", data);
        console.log("res data", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h3>My Tasks</h3>

                  <MDBDataTableV5
                    responsive
                    striped
                    small
                    onPageChange={(val) => console.log(val)}
                    bordered={true}
                    //  materialSearch
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default MyTasks;

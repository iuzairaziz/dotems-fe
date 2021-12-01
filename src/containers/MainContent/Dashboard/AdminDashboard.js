import React, { Component, useEffect, useState } from "react";
import { PieChart } from "react-easy-chart";
import Request from "../../../services/Request";
import TaskService from "../../../services/TaskService";
import ProjectService from "../../../services/ProjectService";
import { data } from "jquery";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import moment from "moment";
import PresentEmployes from "../Attendance/PresentEmployes";

const AdminDashboard = () => {
  const [pendingRequest, setPendingRequest] = useState([]);
  const [resolvedRequest, setResolvedRequest] = useState([]);
  const [nonResolvedRequest, setNonResolvedRequest] = useState([]);
  const [requests, setRequests] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [pendingStatus, setPendingStatus] = useState([]);
  const [completedStatus, setCompletedStatus] = useState([]);
  const [workingStatus, setWorkingStatus] = useState([]);
  const [pendingProject, setPendingProject] = useState([]);
  const [workingProject, setWorkingProject] = useState([]);
  const [completeProject, setCompleteProject] = useState([]);
  const [projects, setProjects] = useState([]);

  const projectColoumn = [
    {
      label: "Project Name",
      field: "project",
      sort: "asc",
      // width: 270,
    },
    {
      label: "Status",
      field: "status",
    },
    {
      label: "Cost",
      field: "cost",
      // sort: "asc",
      // width: 100,
    },
    {
      label: "Deadline",
      field: "endTime",
    },
    {
      label: "Days Left",
      field: "dayleft",
    },
    {
      label: "Action",
      field: "action",
      sort: "disabled",
      // width: 450,
    },
  ];

  const requestColoumn = [
    {
      label: "User",
      field: "user",
      sort: "asc",
      // width: 270,
    },
    {
      label: "Request Type",
      field: "type",
    },
    {
      label: "Sent to",
      field: "sent",
      // sort: "asc",
      // width: 100,
    },
    {
      label: "Admin Status",
      field: "status",
    },
    {
      label: "Request Date",
      field: "request",
    },
    {
      label: "Action",
      field: "action",
      sort: "disabled",
      // width: 450,
    },
  ];

  const [pendingProjectDataTable, setPendingProjectDataTable] = useState({
    columns: projectColoumn,
    rows: [],
  });
  const [workingProjectDataTable, setWorkingProjectDataTable] = useState({
    columns: projectColoumn,
    rows: [],
  });
  const [completedProjectDataTable, setCompletedProjectDataTable] = useState({
    columns: [
      {
        label: "Project Name",
        field: "project",
        sort: "asc",
        // width: 270,
      },
      {
        label: "Status",
        field: "status",
      },
      {
        label: "Cost",
        field: "cost",
        // sort: "asc",
        // width: 100,
      },
      {
        label: "Deadline",
        field: "endTime",
      },
      {
        label: "Action",
        field: "action",
        sort: "disabled",
        // width: 450,
      },
    ],
    rows: [],
  });

  const [pendingRequestDataTable, setPendingRequestDataTable] = useState({
    columns: requestColoumn,
    rows: [],
  });

  useEffect(() => {
    getTaskData();
    getRequestData();
    getProjectsData();
  }, []);

  const getRequestData = () => {
    Request.getAllRequest().then((res) => {
      const request = res.data;
      setRequests(request);
      const arr = [];
      const pendingArr = { ...pendingRequestDataTable };
      pendingArr.rows = [];
      request
        .filter((adminStatus) => adminStatus.adminStatus === "Pending")
        .map((item) => {
          arr.push(item);
          pendingArr.rows.push({
            user: item.user ? item.user.name : "N/A",
            type: item.requestType ? item.requestType.name : "N/A",
            sent: item.requestRecievers
              ? item.requestRecievers.map((item) => <div>{item.name}</div>)
              : "N/A",
            status: item.adminStatus ? item.adminStatus : "N/A",
            request: moment(item.createdAt).format("MM-DD-YYYY"),
            action: (
              <div className="row flex-nowrap justify-content-center">
                <i
                  className="mdi mdi-eye
                      iconsS my-primary-icon"
                />
              </div>
            ),
          });
        });
      setPendingRequest(arr);
      setPendingRequestDataTable(pendingArr);
      const arr1 = [];
      request
        .filter((adminStatus) => adminStatus.adminStatus === "Resolved")
        .map((item) => {
          arr1.push(item);
        });
      setResolvedRequest(arr1);
      const arr2 = [];
      request
        .filter((adminStatus) => adminStatus.adminStatus === "Not Resolved")
        .map((item) => {
          arr2.push(item);
        });
      setNonResolvedRequest(arr2);
    });
  };

  const getTaskData = () => {
    TaskService.getParentTasks().then((res) => {
      const task = res.data;
      setTasks(task);
      console.log("task", task.length);
      const arr = [];
      task
        .filter((tasks) => tasks.status === "pending")
        .map((item) => {
          arr.push(item);
        });
      setPendingStatus(arr);
      console.log("pending task", arr);
      const arr1 = [];
      task
        .filter((tasks) => tasks.status === "completed")
        .map((item) => {
          arr1.push(item);
        });
      setCompletedStatus(arr1);
      const arr2 = [];
      task
        .filter((tasks) => tasks.status === "working")
        .map((item) => {
          arr2.push(item);
        });
      setWorkingStatus(arr2);
    });
  };

  const getProjectsData = () => {
    ProjectService.getAllProject("", "", "", "").then((res) => {
      const project = res.data;
      setProjects(project);
      console.log("projects", project);
      const arr = [];
      const pendingArr = { ...pendingProjectDataTable };
      pendingArr.rows = [];
      project
        .filter((status) => status.status.name === "Pending")
        .map((item) => {
          arr.push(item);
          pendingArr.rows.push({
            project: item.name ? item.name : "N/A",
            status: item.status ? item.status.name : "N/A",
            dayleft: item.workDone ? item.workDone : "N/A",
            cost: item.cost ? item.cost : "N/A",
            endTime: item.cEndDate
              ? moment(item.cEndDate).format("DD/MMM/YYYY")
              : "N/A",
            action: (
              <div className="row flex-nowrap justify-content-center">
                <i
                  className="mdi mdi-eye
                      iconsS my-primary-icon"
                  // onClick={() => {
                  //   props.history.push({
                  //     pathname: "/task-details/" + item._id,
                  //   });
                  // }}
                />
              </div>
            ),
          });
        });
      setPendingProjectDataTable(pendingArr);
      setPendingProject(arr);
      const arr1 = [];
      const workingArr = { ...workingProjectDataTable };
      workingArr.rows = [];
      project
        .filter((status) => status.status.name === "Complete")
        .map((item) => {
          arr1.push(item);
          workingArr.rows.push({
            project: item.name ? item.name : "N/A",
            status: item.status ? item.status.name : "N/A",
            dayleft: item.workDone ? item.workDone : "N/A",
            cost: item.cost ? item.cost : "N/A",
            endTime: item.cEndDate
              ? moment(item.cEndDate).format("DD/MMM/YYYY")
              : "N/A",
            action: (
              <div className="row flex-nowrap justify-content-center">
                <i
                  className="mdi mdi-eye
                      iconsS my-primary-icon"
                />
              </div>
            ),
          });
        });
      setWorkingProject(arr1);
      setWorkingProjectDataTable(workingArr);
      const arr2 = [];
      const completeArr = { ...completedProjectDataTable };
      completeArr.rows = [];
      project
        .filter((status) => status.status.name === "Working")
        .map((item) => {
          arr2.push(item);
          completeArr.rows.push({
            project: item.name ? item.name : "N/A",
            status: item.status ? item.status.name : "N/A",
            dayleft: item.workDone ? item.workDone : "N/A",
            cost: item.cost ? item.cost : "N/A",
            endTime: item.cEndDate
              ? moment(item.cEndDate).format("DD/MMM/YYYY")
              : "N/A",
            action: (
              <div className="row flex-nowrap justify-content-center">
                <i
                  className="mdi mdi-eye
                      iconsS my-primary-icon"
                />
              </div>
            ),
          });
        });
      setCompleteProject(arr2);
      setCompletedProjectDataTable(completeArr);
      console.log("rows", pendingArr.rows);
      //   console.log("project data", project);
      //   console.log("pedning project data", arr);
      //   console.log("resolved request data", resolvedRequest && resolvedRequest.length);
      //   console.log("non-resolved request data", nonResolvedRequest);
    });
  };

  console.log("Project Table", pendingProjectDataTable.rows);

  return (
    <div className="admin-dashboard page-content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3">
            <div className="card m-b-20">
              <div className="card-body">
                <h4 className="mt-0 header-title m-b-30">
                  Total Projects: {projects && projects.length}
                </h4>

                <div className="text-center">
                  <PieChart
                    size={100}
                    innerHoleSize={75}
                    data={[
                      {
                        key: "A",
                        value: pendingProject && pendingProject.length,
                        color: "#90a4ae",
                      },
                      {
                        key: "B",
                        value: workingProject && workingProject.length,
                        color: "#121a37",
                      },
                      {
                        key: "C",
                        value: completeProject && completeProject.length,
                        color: "#226194",
                      },
                    ]}
                  />
                  <div className="clearfix" />

                  <ul className="list-inline row m-t-30 clearfix">
                    <li className="col-4">
                      <p className="m-b-5 font-18 font-600">
                        {pendingProject && pendingProject.length}
                      </p>
                      <p className="mb-0">Pending</p>
                    </li>
                    <li className="col-4">
                      <p className="m-b-5 font-18 font-600">
                        {workingProject && workingProject.length}
                      </p>
                      <p className="mb-0">Working</p>
                    </li>
                    <li className="col-4">
                      <p className="m-b-5 font-18 font-600">
                        {completeProject && completeProject.length}
                      </p>
                      <p className="mb-0">Completed</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3">
            <div className="card m-b-20">
              <div className="card-body">
                <h4 className="mt-0 header-title m-b-30">
                  Total Tasks: {tasks && tasks.length}
                </h4>

                <div className="text-center">
                  <PieChart
                    size={100}
                    innerHoleSize={50}
                    data={[
                      {
                        key: "A",
                        value: pendingStatus && pendingStatus.length,
                        color: "#90a4ae",
                      },
                      {
                        key: "B",
                        value: workingStatus && workingStatus.length,
                        color: "#121a37",
                      },
                      {
                        key: "C",
                        value: completedStatus && completedStatus.length,
                        color: "#226194",
                      },
                    ]}
                  />
                  {/* <div className=" bg-red d-flex justify-content-center">
                                <span className="mini-stat-icon bg-primary font-size-100px"><i className="mdi mdi-clipboard-text font-size-100px"></i></span>
                                </div> */}
                  <div className="clearfix" />

                  <ul className="list-inline row m-t-30 clearfix">
                    <li className="col-4">
                      <p className="m-b-5 font-18 font-600">
                        {pendingStatus && pendingStatus.length}
                      </p>
                      <p className="mb-0">Pending</p>
                    </li>
                    <li className="col-4">
                      <p className="m-b-5 font-18 font-600">
                        {workingStatus && workingStatus.length}
                      </p>
                      <p className="mb-0">Working</p>
                    </li>
                    <li className="col-4">
                      <p className="m-b-5 font-18 font-600">
                        {completedStatus && completedStatus.length}
                      </p>
                      <p className="mb-0">Completed</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3">
            <div className="card m-b-20">
              <div className="card-body">
                <h4 className="mt-0 header-title m-b-30">Total Leaves</h4>

                <div className="text-center">
                  <PieChart
                    size={100}
                    innerHoleSize={25}
                    data={[
                      { key: "A", value: 35, color: "#90a4ae" },
                      { key: "B", value: 35, color: "#121a37" },
                      { key: "C", value: 30, color: "#226194" },
                    ]}
                  />
                  {/* <div className=" bg-red d-flex justify-content-center">
                                <span className="mini-stat-icon bg-primary font-size-100px"><i className="mdi mdi-calendar-multiple-check font-size-100px"></i></span>
                                </div> */}
                  <div className="clearfix" />

                  <ul className="list-inline row m-t-30 clearfix">
                    <li className="col-4">
                      <p className="m-b-5 font-18 font-600">7,541</p>
                      <p className="mb-0">Pending</p>
                    </li>
                    <li className="col-4">
                      <p className="m-b-5 font-18 font-600">7,541</p>
                      <p className="mb-0">Working</p>
                    </li>
                    <li className="col-4">
                      <p className="m-b-5 font-18 font-600">125</p>
                      <p className="mb-0">Completed</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3">
            <div className="card m-b-20">
              <div className="card-body">
                <h4 className="mt-0 header-title m-b-30">
                  {" "}
                  Total Requests: {requests && requests.length}
                </h4>

                <div className="text-center">
                  <PieChart
                    size={100}
                    innerHoleSize={0}
                    data={[
                      {
                        key: "A",
                        value: nonResolvedRequest && nonResolvedRequest.length,
                        color: "#90a4ae",
                      },
                      {
                        key: "B",
                        value: resolvedRequest && resolvedRequest.length,
                        color: "#121a37",
                      },
                      {
                        key: "C",
                        value: pendingRequest && pendingRequest.length,
                        color: "#226194",
                      },
                    ]}
                  />
                  <div className="clearfix" />

                  <ul className="list-inline row m-t-30 clearfix">
                    <li className="col-4">
                      <p className="m-b-5 font-18 font-600">
                        {nonResolvedRequest && nonResolvedRequest.length}
                      </p>
                      <p className="mb-0">Resolved</p>
                    </li>
                    <li className="col-4">
                      <p className="m-b-5 font-18 font-600">
                        {resolvedRequest && resolvedRequest.length}
                      </p>
                      <p className="mb-0">Unresolved</p>
                    </li>
                    <li className="col-4">
                      <p className="m-b-5 font-18 font-600">
                        {pendingRequest && pendingRequest.length}
                      </p>
                      <p className="mb-0">Pending</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card m-b-20">
              <div className="card-body">
                {/* <h4 className="mt-0 header-title">Justify Tabs</h4> */}
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item waves-effect waves-light">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#attendance"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Attendance</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-home-variant h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item waves-effect waves-light">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#leave"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Leaves</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-account h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item waves-effect waves-light">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#projects"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Projects</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-email h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item waves-effect waves-light">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#request"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Request</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-settings h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item waves-effect waves-light">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#machine"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Machine</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-settings h5" />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item waves-effect waves-light">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#timesheet"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Timesheet</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-settings h5" />
                      </span>
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div
                    className="tab-pane active p-3"
                    id="attendance"
                    role="tabpanel"
                  >
                    <div className="col-lg-12">
                      <ul
                        className="nav nav-tabs nav-tabs-custom"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#leavePresent"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Present</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-home-variant h5" />
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#leaveAbsent"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Absent</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-account h5" />
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#leaveLeave"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Leave</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-email h5" />
                            </span>
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div
                          className="tab-pane active p-3"
                          id="leavePresent"
                          role="tabpanel"
                        >
                          <PresentEmployes />{" "}
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="leaveAbsent"
                          role="tabpanel"
                        >
                          <p className="font-14 mb-0">Absent</p>
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="leaveLeave"
                          role="tabpanel"
                        >
                          <p className="font-14 mb-0">Leave</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane p-3" id="leave" role="tabpanel">
                    {/* Inside of Leave accordian starting */}
                    <div className="col-lg-12">
                      <ul
                        className="nav nav-tabs nav-tabs-custom"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#pendingLeave"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Pending</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-home-variant h5" />
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#acceptedLeave"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Accepeted</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-account h5" />
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#unpaidLeave"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Unpaid</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-email h5" />
                            </span>
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div
                          className="tab-pane active p-3"
                          id="pendingLeave"
                          role="tabpanel"
                        >
                          <p className="font-14 mb-0">Pending</p>
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="acceptedLeave"
                          role="tabpanel"
                        >
                          <p className="font-14 mb-0">Accepted</p>
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="unpaidLeave"
                          role="tabpanel"
                        >
                          <p className="font-14 mb-0">Unpaid</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane p-3" id="projects" role="tabpanel">
                    {/* Inside Project Accordian Starting  */}
                    <div className="col-lg-12">
                      <ul
                        className="nav nav-tabs nav-tabs-custom"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#pendingProject"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Pending</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-home-variant h5" />
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#workingProject"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Working</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-account h5" />
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#completeProject"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Complete</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-email h5" />
                            </span>
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div
                          className="tab-pane active p-3"
                          id="pendingProject"
                          role="tabpanel"
                        >
                          <MDBDataTableV5
                            //    responsive
                            striped
                            small
                            onPageChange={(val) => console.log(val)}
                            bordered={true}
                            materialSearch
                            searchTop
                            searchBottom={false}
                            pagingTop
                            barReverse
                            hover
                            className="borderRed"
                            // scrollX
                            // autoWidth

                            data={pendingProjectDataTable}
                            theadColor="#000"
                          />
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="workingProject"
                          role="tabpanel"
                        >
                          <MDBDataTableV5
                            //    responsive
                            striped
                            small
                            onPageChange={(val) => console.log(val)}
                            bordered={true}
                            materialSearch
                            searchTop
                            searchBottom={false}
                            pagingTop
                            barReverse
                            hover
                            className="borderRed"
                            // scrollX
                            // autoWidth

                            data={workingProjectDataTable}
                            theadColor="#000"
                          />
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="completeProject"
                          role="tabpanel"
                        >
                          <MDBDataTableV5
                            //    responsive
                            striped
                            small
                            onPageChange={(val) => console.log(val)}
                            bordered={true}
                            materialSearch
                            searchTop
                            searchBottom={false}
                            pagingTop
                            barReverse
                            hover
                            className="borderRed"
                            // scrollX
                            // autoWidth

                            data={completedProjectDataTable}
                            theadColor="#000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane p-3" id="request" role="tabpanel">
                    {/* Inside of Request Accordian  */}
                    <div className="col-lg-12">
                      <ul
                        className="nav nav-tabs nav-tabs-custom"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#pendingRequest"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Pending</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-home-variant h5" />
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#approveRequest"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Approved</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-account h5" />
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#rejectRequest"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Rejected</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-email h5" />
                            </span>
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div
                          className="tab-pane active p-3"
                          id="pendingRequest"
                          role="tabpanel"
                        >
                          <MDBDataTableV5
                            //    responsive
                            striped
                            small
                            onPageChange={(val) => console.log(val)}
                            bordered={true}
                            materialSearch
                            searchTop
                            searchBottom={false}
                            pagingTop
                            barReverse
                            hover
                            className="borderRed"
                            // scrollX
                            // autoWidth

                            data={pendingRequestDataTable}
                            theadColor="#000"
                          />
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="approveRequest"
                          role="tabpanel"
                        >
                          <p className="font-14 mb-0">Approved</p>
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="rejectRequest"
                          role="tabpanel"
                        >
                          <p className="font-14 mb-0">Rejected</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane p-3" id="machine" role="tabpanel">
                    {/* Inside of Machine Accordian  */}
                    <div className="col-lg-12">
                      <ul
                        className="nav nav-tabs nav-tabs-custom"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#free"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Free</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-home-variant h5" />
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#inUse"
                            role="tab"
                          >
                            <span className="d-none d-md-block">In-Use</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-account h5" />
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#faulty"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Faulty</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-email h5" />
                            </span>
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div
                          className="tab-pane active p-3"
                          id="free"
                          role="tabpanel"
                        >
                          <p className="font-14 mb-0">Free</p>
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="inUse"
                          role="tabpanel"
                        >
                          <p className="font-14 mb-0">INUSE</p>
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="faulty"
                          role="tabpanel"
                        >
                          <p className="font-14 mb-0">Faulty</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane p-3" id="timesheet" role="tabpanel">
                    {/* Inside TimeSheet Accordian  */}
                    <div className="col-lg-12">
                      <ul
                        className="nav nav-tabs nav-tabs-custom"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#daily"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Daily</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-home-variant h5" />
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#weekly"
                            role="tab"
                          >
                            <span className="d-none d-md-block">Weekly</span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-account h5" />
                            </span>
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div
                          className="tab-pane active p-3"
                          id="daily"
                          role="tabpanel"
                        >
                          <p className="font-14 mb-0">Daily</p>
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="weekly"
                          role="tabpanel"
                        >
                          <p className="font-14 mb-0">Weekly</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

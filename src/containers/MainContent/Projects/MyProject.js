import React, { Component, useState, useEffect } from "react";
import AUX from "../../../hoc/Aux_";
import { Link, useHistory } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import moment from "moment";
import ProjectService from "../../../services/ProjectService";
import "./ViewProject.scss";
import userService from "../../../services/UserService";
import ProjectForm from "../Projects/ProjectFrom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Configuration from "../../../config/configuration";

const MyProjects = (props, match) => {
  let history = useHistory();
  const [editTask, setEditTask] = useState();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedProject, setSelectedProject] = useState({ name: "" });
  const [filter, setFilter] = useState([]);
  const [statusfilter, setStatusFilter] = useState([]);
  const [technologyfilter, setTechnologyFilter] = useState([]);
  const [applyfilter, setApplyFilter] = useState("");
  const [applystatusfilter, setApplyStatusFilter] = useState("");
  const [applyTechnologyfilter, setApplyTechnologyFilter] = useState("");
  const [cStart, setcStart] = useState("");

  const [dataa, setData] = useState({
    columns: [
      {
        label: "Project Name",
        field: "projectName",
        sort: "asc",
      },
      {
        label: "Technology ",
        field: "technology",
        sort: "true",
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
      },
      {
        label: "Start Date",
        field: "startDate",
        sort: "asc",
      },
      {
        label: "End Date",
        field: "endDate",
        sort: "asc",
      },
      {
        label: "Total Est. Hrs",
        field: "EstHrs",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Total Actual Hrs",
        field: "ActHrs",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Work Done",
        field: "wrkdone",
        sort: "asc",
      },
      {
        label: "Action",
        field: "action",
        sort: "disabled",
        // width: 150,
      },
    ],
    rows: [],
  });

  let loggedUser = userService.userLoggedInInfo();
  const toggleEdit = () => setModalEdit(!modalEdit);
  const roless = new Configuration().Roles;
  const { PM } = roless;

  useEffect(() => {
    if (loggedUser.userRole.includes(roless.PM)) {
      getPMData(loggedUser._id);
    } else if (
      loggedUser.userRole.some((role) => {
        return (
          role === roless.INTERNEE ||
          role === roless.PROBATION ||
          role === roless.EMPLOYEE
        );
      })
    ) {
      getData(loggedUser._id);
    }
  }, []);

  //   const changeColor = () => {
  //     $("tbody > tr").each(function(index) {
  //       // console.log("trs", this);
  //       var ninth = $(this)
  //         .children("td")
  //         .eq(9)
  //         .text();
  //       var eight = $(this)
  //         .children("td")
  //         .eq(8)
  //         .text();
  //       var finalNinth = parseInt(ninth);
  //       var finalEight = parseInt(eight);
  //       if (finalNinth > finalEight) {
  //         $(this).css("color", "red");
  //         $(this)
  //           .find("a")
  //           .css("color", "red");
  //       } else {
  //         $(this).css("color", "black");
  //         $(this)
  //           .find("a")
  //           .css("color", "black");
  //       }
  //     });
  //   };
  //   $(document).ready(function() {
  //     changeColor();
  //     $(document).on("click", "th", function() {
  //       changeColor();
  //     });
  //   });

  const calEstHrs = (project) => {
    let EstTime = 0;
    project.phase.map((item1, index) => {
      if (index === 0) EstTime = 0;
      EstTime += Number(item1.estTime);
    });
    return EstTime;
  };

  const getPMData = (id) => {
    ProjectService.getPMProject(id)
      .then((res) => {
        let data = { ...dataa };
        let EstTime = 0;
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            index: index,
            projectName: item.name ? item.name : "N/A",
            orderNum: item.orderNum ? item.orderNum : "N/A",
            technology: item.technology
              ? item.technology.map((item, index) => {
                  return (
                    <div>
                      {item.name}
                      <br />
                    </div>
                  );
                })
              : "none",
            status: item.status ? item.status.name : "N/A",
            startDate: item.pmStartDate
              ? moment(item.pmStartDate).format("DD/MMM/YYYY")
              : "N/A",
            endDate: item.pmEndDate
              ? moment(item.pmEndDate).format("DD/MMM/YYYY")
              : "N/A",
            projectManager: item.projectManager
              ? item.projectManager.name
              : "N/A",
            teamMember: item.assignedUser ? item.assignedUser.name : "N/A",
            ActHrs: item.actualHrs ? <div>{item.actualHrs}</div> : "N/A",
            wrkdone: item.workDone ? item.workDone.toFixed(2) : "N/A",
            EstHrs: item.phase ? calEstHrs(item) : "N/A",
            action: (
              <div className="row flex-nowrap align-items-center">
                <i
                  className="mdi mdi-eye
                  iconsS my-primary-icon"
                  onClick={() => {
                    props.history.push({
                      pathname: "/viewprojects/" + item._id,
                    });
                  }}
                />
                <i
                  className="mdi mdi-pencil-box
                  iconsS my-seconday-icon"
                  onClick={() => {
                    setSelectedProject(item);
                    toggleEdit();
                  }}
                />
              </div>
            ),
          });
        });
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = (id) => {
    ProjectService.myprojects(id)
      .then((res) => {
        let data = { ...dataa };
        let EstTime = 0;
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            index: index,
            projectName: item.name ? item.name : "N/A",
            orderNum: item.orderNum ? item.orderNum : "N/A",
            technology: item.technology
              ? item.technology.map((item, index) => {
                  return (
                    <div>
                      {item.name}
                      <br />
                    </div>
                  );
                })
              : "none",
            status: item.status ? item.status.name : "N/A",
            startDate: item.pmStartDate
              ? moment(item.pmStartDate).format("DD/MMM/YYYY")
              : "N/A",
            endDate: item.pmEndDate
              ? moment(item.pmEndDate).format("DD/MMM/YYYY")
              : "N/A",
            projectManager: item.projectManager
              ? item.projectManager.name
              : "N/A",
            teamMember: item.assignedUser ? item.assignedUser.name : "N/A",
            ActHrs: item.actualHrs ? <div>{item.actualHrs}</div> : "N/A",
            wrkdone: item.workDone ? item.workDone.toFixed(2) : "N/A",
            EstHrs: item.phase ? calEstHrs(item) : "N/A",
            action: (
              <div className="row flex-nowrap align-items-center">
                <i
                  className="mdi mdi-eye
                  iconsS my-primary-icon"
                  onClick={() => {
                    props.history.push({
                      pathname: "/viewprojects/" + item._id,
                    });
                  }}
                />
              </div>
            ),
          });
        });
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AUX>
      <div className="page-content-wrapper project-list-view">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <MDBDataTableV5
                responsive
                striped
                small
                onPageChange={(val) => console.log(val)}
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
          </div>
        </div>
        <Modal
          style={{ maxWidth: "90%" }}
          isOpen={modalEdit}
          toggle={toggleEdit}
        >
          <ModalHeader toggle={toggleEdit}>Edit Project</ModalHeader>
          <ModalBody>
            <ProjectForm
              editable={true}
              project={selectedProject}
              toggle={toggleEdit}
            />
          </ModalBody>
        </Modal>
      </div>
    </AUX>
  );
};

export default MyProjects;

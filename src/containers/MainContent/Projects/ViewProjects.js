import React, { Component, useState, useEffect } from "react";
import AUX from "../../../hoc/Aux_";
import { Link, useHistory } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProjectForm from "../Projects/ProjectFrom";
import ProjectService from "../../../services/ProjectService";
import PlatformService from "../../../services/PlatformService";
import StatusService from "../../../services/StatusService";
import TechnologyService from "../../../services/TechnologyService";
import "./ViewProject.scss";
import $ from "jquery";
import userService from "../../../services/UserService";
import { withRouter } from "react-router-dom";

const ViewProjects = (props, match) => {
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

  const loogedInUser = userService.userLoggedInInfo();

  const [dataa, setData] = useState({
    columns: [
      {
        label: "Project Name",
        field: "projectName",
        sort: "asc",
      },
      {
        label: "Client Name",
        field: "clientName",
        sort: "asc",
        width: 150,
      },

      {
        label: "Platform",
        field: "platform",
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
        label: "Deadline",
        field: "CendDate",
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

  useEffect(() => {
    getData();
  }, [
    modalEdit,
    modalDelete,
    applyfilter,
    applystatusfilter,
    applyTechnologyfilter,
    cStart,
  ]);
  useEffect(() => {
    getPlatform();
    getStatus();
    getTechnology();
  }, []);

  const changeColor = () => {
    $("tbody > tr").each(function(index) {
      // console.log("trs", this);
      var ninth = $(this)
        .children("td")
        .eq(9)
        .text();
      var eight = $(this)
        .children("td")
        .eq(8)
        .text();
      var finalNinth = parseInt(ninth);
      var finalEight = parseInt(eight);
      if (finalNinth > finalEight) {
        $(this).css("color", "red");
        $(this)
          .find("a")
          .css("color", "red");
      } else {
        $(this).css("color", "black");
        $(this)
          .find("a")
          .css("color", "black");
      }
    });
  };
  $(document).ready(function() {
    changeColor();
    $(document).on("click", "th", function() {
      changeColor();
    });
  });

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = (id) => {
    ProjectService.deleteProject(id)
      .then((res) => {
        ProjectService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        ProjectService.handleError();
        toggleDelete();
      });
  };

  const getPlatform = () => {
    PlatformService.getAllPlatform().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          id: item._id,
        });
        setFilter(options);
      });
    });
  };

  const getStatus = () => {
    StatusService.getAllStatus().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          id: item._id,
        });
        setStatusFilter(options);
      });
    });
  };
  const getTechnology = () => {
    TechnologyService.getAllTechnologies().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          id: item._id,
        });
        setTechnologyFilter(options);
      });
    });
  };

  const calEstHrs = (project) => {
    let EstTime = 0;
    project.phase.map((item1, index) => {
      if (index === 0) EstTime = 0;
      EstTime += Number(item1.estTime);
    });
    return EstTime;
  };

  const getData = () => {
    ProjectService.getProjectReport({
      applyfilter,
      applystatusfilter,
      applyTechnologyfilter,
      cStart,
    })
      .then((res) => {
        let data = { ...dataa };
        let EstTime = 0;
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            index: index,
            projectName: item.name ? item.name : "N/A",
            // clientName: (
            //   <Link to={`/client-details/${item.client._id}`}>
            //     {" "}
            //     {item.client ? item.client.name : "N/A"}
            //   </Link>
            // ),
            orderNum: item.orderNum ? item.orderNum : "N/A",
            platform: item.platform ? item.platform.name : "N/A",
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
            // item.technology ? item.technology.name : "N/A",
            serviceType: item.service ? item.service.name : "N/A",
            status: item.status ? item.status.name : "N/A",
            projectNature: item.nature ? item.nature.name : "N/A",
            CstartDate: item.cStartDate ? item.cStartDate : "N/A",
            CendDate: item.cEndDate
              ? moment(item.cEndDate).format("DD/MMM/YYYY")
              : "N/A",
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
            currency: item.currency ? item.currency.name : "N/A",
            cost: item.cost ? item.cost : "N/A",
            Rprofit: item.Rprofit ? item.Rprofit : "N/A",
            pDeduction: item.Pdeduction ? item.Pdeduction : "N/A",
            ActHrs: item.actualHrs ? <div>{item.actualHrs}</div> : "N/A",
            wrkdone: item.workDone ? item.workDone.toFixed(2) : "N/A",
            EstHrs: item.phase ? calEstHrs(item) : "N/A",
            action: (
              <div class="dropdown">
                <button
                  type="button"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i class="mdi mdi-view-list" size={40} />
                </button>
                <div class="dropdown-menu">
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      props.history.push({
                        pathname: "/viewprojects/" + item._id,
                      });
                    }}
                  >
                    View
                  </a>
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      setSelectedProject(item);
                      toggleEdit();
                    }}
                  >
                    Edit
                  </a>
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      setSelectedProject(item);
                      toggleDelete();
                    }}
                  >
                    Delete
                  </a>
                </div>
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
              <div className="row">
                <div className="col-3">
                  <label>Platform Filter</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setApplyFilter(e.target.value);
                    }}
                  >
                    <option key={1} value={""}>
                      All
                    </option>
                    {filter.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-3">
                  <label>Status Filter</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setApplyStatusFilter(e.target.value);
                    }}
                  >
                    <option key={1} value={""}>
                      All
                    </option>
                    {statusfilter.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-3">
                  <label>Technology Filter</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setApplyTechnologyFilter(e.target.value);
                    }}
                  >
                    <option key={1} value={""}>
                      All
                    </option>
                    {technologyfilter.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-3">
                  <label>Start Date Filter</label>

                  <DatePicker
                    className="form-control"
                    value={cStart}
                    selected={cStart}
                    onChange={(cStart) => {
                      setcStart(cStart);
                      console.log("datepicker", cStart);
                    }}
                  />
                </div>
              </div>

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
            <Modal isOpen={modalDelete} toggle={toggleDelete}>
              <ModalHeader toggle={toggleDelete}>Delete Project?</ModalHeader>
              <ModalBody>
                Are you sure you want to delete the Project "
                {selectedProject.name}"?
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    handleDelete(selectedProject._id);
                  }}
                >
                  Yes
                </Button>{" "}
                <Button color="secondary" onClick={toggleDelete}>
                  No
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default withRouter(ViewProjects);

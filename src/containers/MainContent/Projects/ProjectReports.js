import React, { Component, useState, useEffect } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import ClientValidation from "../../../validations/client-validations";
import DatePicker from "react-datepicker";
import moment from "moment";
import CurrencyService from "../../../services/CurrencyService";
import {
  Progress,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ProjectService from "../../../services/ProjectService";
import StatusService from "../../../services/StatusService";
import $ from "jquery";

const ProjectReports = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedProject, setSelectedProject] = useState({ name: "" });
  const [selectedCurrency, SetSelectedCurrency] = useState("");
  const [statusfilter, setStatusFilter] = useState([]);
  const [applystatusfilter, setApplyStatusFilter] = useState("");
  const [clientStart, setClientStart] = useState("");
  const [clientDeadline, setClientDeadline] = useState("");

  const [dataa, setData] = useState({
    columns: [
      {
        label: "Project Name",
        field: "projectName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Estimate Hours",
        field: "EstHrs",
        sort: "disabled",
      },
      {
        label: "Actual Hours",
        field: "ActHrs",
        sort: "disabled",
      },
      {
        label: "Work Done",
        field: "wrkdone",
        sort: "disabled",
      },
      {
        label: "Project Cost",
        field: "cost",
        sort: "disabled",
        width: 100,
      },
      {
        label: "Platform Deduction",
        field: "Pdeduction",
        sort: "disabled",
      },
      {
        label: "Other Deduction",
        field: "Odeduction",
        sort: "disabled",
      },
      // {
      //   label: "Percent Deduction",
      //   field: "percentage",
      //   sort: "disabled",

      // },
      {
        label: "Reserve Profit",
        field: "Rprofit",
        sort: "disabled",
      },

      {
        label: "Project Cost Balance",
        field: "PCB",
        sort: "disabled",
      },

      {
        label: "Project Income (PKR)",
        field: "Pincome",
        sort: "disabled",
      },

      {
        label: "Resource Expense (PKR)",
        field: "Rexpense",
        sort: "disabled",
      },

      {
        label: "Total Profit (PKR)",
        field: "Tprofit",
        sort: "disabled",
      },
    ],
    rows: [],
  });
  useEffect(() => {
    getData();
  }, [modalEdit, modalDelete, applystatusfilter, clientStart, clientDeadline]);

  useEffect(() => {
    getStatus();
  }, []);
  const changeColor = () => {
    $(document).ready(function() {
      $("tr").each(function(index) {
        var eleven = $(this)
          .children("td")
          .eq(11)
          .text();

        var finalEleven = parseInt(eleven);
        if (finalEleven < 0) {
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
    });
  };

  $(document).ready(function() {
    changeColor();
    $(document).on("click", "th", function() {
      changeColor();
    });
  });

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

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = (id) => {
    ProjectService.deleteTask(id)
      .then((res) => {
        ProjectService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        ProjectService.handleError();
        toggleDelete();
      });
  };
  const getExchangeRate = (id) => {
    CurrencyService.getCurrencyById(id).then((res) => {
      return res.data;
      console.log("currency", res.data);
    });
  };

  const getData = () => {
    ProjectService.getProjectReport({
      applystatusfilter,
      clientStart,
      clientDeadline,
    })
      .then((res) => {
        let data = { ...dataa };
        let EstTime = 0;
        data.rows = [];
        res.data.map((item, index) => {
          console.log(item.phase);
          data.rows.push({
            projectName: (
              <Link to={`/viewproject/${item._id}`}>
                {item.name ? item.name : "N/A"}
              </Link>
            ),
            cost: item.cost ? `${item.cost} (${item.currency.name})` : "N/A",
            Rprofit: item.Rprofit
              ? `${((item.Rprofit / 100) * item.cost).toFixed(2)} (${
                  item.currency.name
                })`
              : "N/A",
            Pdeduction: item.Pdeduction
              ? `${((item.Pdeduction / 100) * item.cost).toFixed(2)} (${
                  item.currency.name
                })`
              : "N/A",
            PCB: `${(
              item.cost -
              (item.otherDeduction +
                (item.Pdeduction / 100) * item.cost +
                (item.Rprofit / 100) * item.cost)
            ).toFixed(2)} (${item.currency.name})`,
            Pincome: item.currency
              ? (
                  item.currency.exchangeRate *
                  (item.cost -
                    ((item.Pdeduction / 100) * item.cost +
                      (item.Rprofit / 100) * item.cost) -
                    item.otherDeduction)
                ).toFixed(2)
              : "N/A",
            Odeduction: item.otherDeduction
              ? `${item.otherDeduction} (${item.currency.name})`
              : "N/A",
            ActHrs: (
              <Link to={`/projectdetails/${item._id}`}>
                {item.actualHrs ? item.actualHrs : "N/A"}
              </Link>
            ),
            wrkdone: item.workDone ? `${item.workDone.toFixed(2)}%` : "N/A",
            EstHrs: item.phase
              ? item.phase.map((item1, index, key) => {
                  if (index === 0) EstTime = 0;
                  EstTime += Number(item1.estHrs);

                  if (index === item.phase.length - 1) {
                    return EstTime;
                  }
                })
              : "N/A",
            Rexpense: item.projectResourcesExpense
              ? item.projectResourcesExpense.allResourcesExpense.toFixed(2)
              : "N/A",
            Tprofit: item.assignedUser
              ? item.currency.exchangeRate *
                  (item.cost -
                    ((item.Pdeduction / 100) * item.cost +
                      (item.Rprofit / 100) * item.cost) -
                    item.otherDeduction) -
                item.projectResourcesExpense.allResourcesExpense.toFixed(2)
              : "N/A",
          });
        });
        setData(data);
        console.log("state data", dataa);
        console.log("my project data", data);
        console.log("res data", res.data);
        console.log("EstHrs", EstTime);
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
                  <h4 className="mb-3">Projects' Report</h4>
                  <div className="row">
                    <div className="col-4">
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

                    <div className="col-4">
                      <label>Client Start Date</label>

                      <DatePicker
                        className="form-control"
                        value={clientStart}
                        selected={clientStart}
                        onChange={(clientStart) => {
                          setClientStart(clientStart);
                          console.log("datepicker", clientStart);
                        }}
                      />
                    </div>
                    <div className="col-4">
                      <label>Client Deadline</label>

                      <DatePicker
                        className="form-control"
                        value={clientDeadline}
                        selected={clientDeadline}
                        onChange={(clientDeadline) => {
                          setClientDeadline(clientDeadline);
                          console.log("datepicker", clientDeadline);
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

export default ProjectReports;

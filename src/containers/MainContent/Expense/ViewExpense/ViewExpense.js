import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link, useHistory } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import ClientValidation from "../../../../validations/client-validations";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  Progress,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ProjectForm from "../../Projects/ProjectFrom";
import ProjectService from "../../../../services/ProjectService";
import ExpenseService from "../../../../services/ExpenseService";
import PlatformService from "../../../../services/PlatformService";
import StatusService from "../../../../services/StatusService";
import TechnologyService from "../../../../services/TechnologyService";

const ViewExpense = () => {
  let history = useHistory();
  const [editTask, setEditTask] = useState();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({ name: "" });
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
        label: "Expense Date",
        field: "expenseDate",
        sort: "asc",
        width: 200,
      },
      // {
      //   label: "Client Name",
      //   field: "clientName",
      //   sort: "asc",
      //   width: 150,
      // },
      // {
      //   label: "Order Num",
      //   field: "orderNum",
      //   sort: "disabled",
      //   width: 100,
      // },

      {
        label: "Expense Name",
        field: "expenseName",
        sort: "disabled",
        width: 200,
      },
      {
        label: "Expense Cost ",
        field: "expenseCost",
        sort: "disabled",
        width: 200,
      },
      // {
      //   label: "Service Type",
      //   field: "serviceType",
      //   sort: "disabled",
      //   width: 100,
      // },
      // {
      //   label: "Project Nature",
      //   field: "projectNature",
      //   sort: "asc",
      //   width: 100,
      // },
      //   {
      //     label: "Status",
      //     field: "status",
      //     sort: "disabled",
      //     width: 100,
      //   },
      //   {
      //     label: "Start Date",
      //     field: "startDate",
      //     sort: "disabled",
      //     width: 100,
      //   },
      //   {
      //     label: "End Date",
      //     field: "endDate",
      //     sort: "disabled",
      //     width: 100,
      //   },
      //   {
      //     label: "Total Estimate Hrs",
      //     field: "Est. Hrs",
      //     sort: "disabled",
      //     // width: 100,
      //   },
      //   {
      //     label: "Total Actual Hrs",
      //     field: "ActHrs",
      //     sort: "disabled",
      //     // width: 100,
      //   },
      //   // {
      //   label: "Project Manager",
      //   field: "projectManager",
      //   sort: "disabled",
      //   width: 100,
      // },
      // {
      //   label: "Team Members",
      //   field: "teamMember",
      //   sort: "disabled",
      //   width: 100,
      // },
      // {
      //   label: "Project Cost",
      //   field: "cost",
      //   sort: "disabled",
      //   width: 100,
      // },
      // {
      //   label: "Reserve Profit",
      //   field: "Rprofit",
      //   sort: "disabled",

      // },
      //  {
      //    label: "Estimate Hours",
      //    field: "EstHrs",
      //    sort: "disabled",

      //  },
      //  {
      //    label: "Actual Hours",
      //    field: "ActHrs",
      //   sort: "disabled",

      //  },
      //   {
      //     label: "Work Done",
      //     field: "wrkdone",
      //     sort: "disabled",
      //   },
      // {
      //   label: "Project Income Rs.",
      //   field: "Pincome",
      //   sort: "disabled",

      // },
      // {
      //   label: "Platform Deduction",
      //   field: "Pdeduction",
      //   sort: "disabled",

      // },
      // {
      //   label: "Resource Expense",
      //   field: "Rprofit",
      //   sort: "disabled",

      // },
      // {
      //   label: "Total Profit",
      //   field: "Tprofit",
      //   sort: "disabled",

      // },
      // {
      //   label: "Currency",
      //   field: "currency",
      //   sort: "disabled",
      //   // width: 150,
      // },
      //   {
      //     label: "View Details",
      //     field: "details",
      //     sort: "disabled",
      //     // width: 150,
      //   },
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
  }, [cStart, dataa]);
  useEffect(() => {
    getPlatform();
    getStatus();
    getTechnology();
  }, []);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = (id) => {
    ExpenseService.deleteExpense(id)
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
  const getData = () => {
    ExpenseService.getAllExpense(cStart)
      .then((res) => {
        let data = { ...dataa };
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            expenseName: item.name ? item.name : "none",
            expenseCost: item.cost ? item.cost : "none",
            expenseDate: moment(item.date).format("Do MMM YY")
              ? moment(item.date).format("Do MMM YY")
              : "none",
            action: (
              <div className="row flex-nowrap">
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedExpense(item);
                    toggleDelete();
                  }}
                >
                  Delete
                </Button>
              </div>
            ),
          });
        });
        setData(data);
        console.log("state data", dataa);
        console.log("my project data", data);
        console.log("res data", res);
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
                  <h4 className="mt-0 header-title">All Countries</h4>
                  <div className="row">
                    <div className="col-12">
                      <label>Expense Date Filter</label>
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
                    // scrollX
                    striped
                    bordered
                    hover
                    responsive
                    // autoWidth
                    data={dataa}
                  />
                </div>
              </div>
            </div>

            <div>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>
                  Delete Country ?
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the country "
                  {selectedExpense.name}" ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      console.log("Expense Id", selectedExpense._id);
                      handleDelete(selectedExpense._id);
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
      </div>
    </AUX>
  );
};

export default ViewExpense;

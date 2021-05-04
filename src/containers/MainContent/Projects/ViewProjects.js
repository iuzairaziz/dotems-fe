import React, { Component, useState, useEffect } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import ClientValidation from "../../../validations/client-validations";
import { Progress, Button } from "reactstrap";
import ProjectForm from "../Projects/ProjectFrom";
import ProjectService from "../../../services/ProjectService";

const ViewProjects = () => {
  const [editTask, setEditTask] = useState();
  const [dataa, setData] = useState({
    columns: [
      {
        label: "Project Name",
        field: "projectName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Client Name",
        field: "clientName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Order Num",
        field: "orderNum",
        sort: "disabled",
        width: 100,
      },

      {
        label: "Platform",
        field: "platform",
        sort: "disabled",
        width: 125,
      },
      {
        label: "Service Type",
        field: "serviceType",
        sort: "disabled",
        width: 100,
      },
      // {
      //   label: "Project Nature",
      //   field: "projectNature",
      //   sort: "asc",
      //   width: 100,
      // },
      {
        label: "Status",
        field: "status",
        sort: "disabled",
        width: 100,
      },
      {
        label: "Start Date",
        field: "startDate",
        sort: "disabled",
        width: 100,
      },
      {
        label: "End Date",
        field: "endDate",
        sort: "disabled",
        width: 100,
      },
      // {
      //   label: "Project Manager",
      //   field: "projectManager",
      //   sort: "disabled",
      //   width: 100,
      // },
      {
        label: "Cost",
        field: "cost",
        sort: "disabled",
        width: 100,
      },
      // {
      //   label: "Technology ",
      //   field: "technology",
      //   sort: "disabled",
      //   width: 125,
      // },
    ],
    rows: [],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    ProjectService.getAllProject()
      .then((res) => {
        let data = { ...dataa };
        res.data.map((item, index) => {
          data.rows.push({
            projectName: item.name ? item.name : "none",
            clientName: item.client ? item.client.name : "none",
            orderNum: item.orderNum ? item.orderNum : "none",
            platform: item.platform ? item.platform : "none",
            serviceType: item.service ? item.service : "none",
            status: (
              <span className="badge badge-teal">
                {item.status ? item.status : "none"}
              </span>
            ),
            startDate: item.startDate ? item.startDate : "none",
            endDate: item.endDate ? item.endDate : "none",
            cost: item.cost ? item.cost : "none",
            action: (
              <div className="row flex-nowrap">
                {/* <div className="col"> */}
                <Button
                  color="info"
                  size="sm"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={setEditTask(item)}
                >
                  Edit
                </Button>
                {/* </div> */}
                {/* <div className="col"> */}
                <Button color="danger" size="sm">
                  Delete
                </Button>
                {/* </div> */}
              </div>
            ),
          });
        });
        setData(data);
        console.log("state data", dataa);
        console.log("my project data", data);
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
                  <h4 className="mt-0 header-title">Clients</h4>

                  <MDBDataTable striped bordered hover data={dataa} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="myModal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Edit Client
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <ProjectForm />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary waves-effect"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default ViewProjects;

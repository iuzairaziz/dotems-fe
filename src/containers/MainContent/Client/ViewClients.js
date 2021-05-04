import React, { Component, useEffect, useState } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import ClientValidation from "../../../validations/client-validations";
import { Progress, Button } from "reactstrap";
import ClientsForm from "../Client/ClientsForm";
import ClientService from "../../../services/ClientService";

const ViewClients = () => {
  const [editTask, setEditTask] = useState();
  const [dataa, setData] = useState({
    columns: [
      {
        label: "Client Name",
        field: "clientName",
        sort: "asc",
        width: 125,
      },
      {
        label: "Company Name",
        field: "companyName",
        sort: "asc",
        width: 125,
      },
      {
        label: "Email",
        field: "Email",
        sort: "disabled",
        width: 200,
      },
      {
        label: "Address",
        field: "Address",
        sort: "disabled",
        width: 200,
      },
      {
        label: "Contact Number",
        field: "contactNum",
        sort: "disabled",
        width: 125,
      },
      {
        label: "URL",
        field: "URL",
        sort: "disabled",
        width: 150,
      },
      {
        label: "Country",
        field: "country",
        sort: "asc",
        width: 75,
      },
      {
        label: "Date of Joining",
        field: "dateOfJoin",
        sort: "disabled",
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        sort: "disabled",
        width: 150,
      },
    ],
    rows: [],
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    ClientService.getAllClient()
      .then((res) => {
        let data = { ...dataa };
        res.data.map((item, index) => {
          data.rows.push({
            clientName: item.name ? item.name : "none",
            companyName: item.companyName ? item.companyName : "none",
            Email: item.email ? item.email : "none",
            Address: item.address ? item.address : "none",
            contactNum: item.mobileNo ? item.mobileNo : "none",
            URL: item.url ? item.url : "none",
            dateOfJoin: item.dateOfJoin ? item.dateOfJoin : "none",
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
                  <h4 className="mt-0 header-title">Clients</h4>

                  <MDBDataTableV5 striped bordered hover data={dataa} />
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
              <ClientsForm />
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

export default ViewClients;

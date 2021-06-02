import React, { Component, useEffect, useState } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import clientValidation from "../../../validations/client-validations";
import ClientsForm from "../Client/ClientsForm";
import ClientService from "../../../services/ClientService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ViewClients = () => {
  const [editTask, setEditTask] = useState();
  const [selectedClient, setSelectedClient] = useState({ name: "" });
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

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
  }, [modalEdit, modalDelete]);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = (id) => {
    ClientService.deleteClient(id)
      .then((res) => {
        ClientService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        ClientService.handleError();
        toggleDelete();
      });
  };

  const getData = () => {
    ClientService.getAllClient()
      .then((res) => {
        let updatedData = { ...dataa };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            clientName: item.name ? item.name : "none",
            companyName: item.companyName ? item.companyName : "none",
            Email: item.email ? item.email : "none",
            Address: item.address ? item.address : "none",
            contactNum: item.mobileNo ? item.mobileNo : "none",
            URL: item.url ? item.url : "none",
            dateOfJoin: item.dateOfJoin ? item.dateOfJoin : "none",
            country: item.country ? item.country.name : "none",
            action: (
              <div className="row flex-nowrap">
                <Button
                  onClick={() => {
                    setSelectedClient(item);
                    toggleEdit();
                  }}
                  color="info"
                  size="sm"
                >
                  Edit
                </Button>

                <Button
                  color="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedClient(item);
                    toggleDelete();
                  }}
                >
                  Delete
                </Button>
              </div>
            ),
          });
        });
        console.log("clients", updatedData);

        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="mt-0 header-title">All Clients</h4>

                  <MDBDataTableV5
                    // scrollX
                    fixedHeader={true}
                    responsive
                    striped
                    bordered
                    searchTop
                    hover
                    autoWidth
                    data={dataa}
                    theadColor="#000"
                  />
                </div>
              </div>
            </div>

            <div>
              <Modal isOpen={modalEdit} toggle={toggleEdit}>
                <ModalHeader toggle={toggleEdit}>Edit Client</ModalHeader>
                <ModalBody>
                  <ClientsForm
                    editable={true}
                    client={selectedClient}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>Delete Client ?</ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the client "
                  {selectedClient.name}" ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleDelete(selectedClient._id);
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

export default ViewClients;

import React, { Component, useEffect, useState } from "react";
import AUX from "../../../hoc/Aux_";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import ClientsForm from "../Client/ClientsForm";
import ClientService from "../../../services/ClientService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";
import "./ViewClient.scss";
import { withRouter } from "react-router-dom";

const ViewClients = (props) => {
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
            clientName: item.name ? item.name : "N/A",
            companyName: item.companyName ? item.companyName : "N/A",
            Email: item.email ? item.email : "N/A",
            Address: item.address ? item.address : "N/A",
            contactNum: item.mobileNo ? item.mobileNo : "N/A",
            URL: item.url ? item.url : "N/A",
            dateOfJoin: item.dateOfJoin
              ? moment(item.dateOfJoin).format("DD/MMM/YYYY")
              : "N/A",
            country: item.country ? item.country : "N/A",
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
                        pathname: "/client-details/" + item._id,
                      });
                    }}
                  >
                    View
                  </a>
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      setSelectedClient(item);
                      toggleEdit();
                    }}
                  >
                    Edit
                  </a>
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      setSelectedClient(item);
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

export default withRouter(ViewClients);

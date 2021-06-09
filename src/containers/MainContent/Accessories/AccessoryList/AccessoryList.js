import React, { useEffect, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import AccessoryForm from "../AccessoryForm/AccessoryForm";
import AccessoryService from "../../../../services/AccessoryService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CountryList = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [selectedAccessory, setSelectedAccessory] = useState({ name: "" });
  const [data, setData] = useState({
    columns: [
      {
        label: "Title",
        field: "title",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        // width: 150,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    getAccessory();
  }, [modalEdit, modalDelete]);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = (id) => {
    AccessoryService.deleteAccessory(id)
      .then((res) => {
        AccessoryService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        AccessoryService.handleError();
        toggleDelete();
      });
  };

  const getAccessory = () => {
    AccessoryService.getAllaccessory()
      .then((res) => {
        let updatedData = { ...data };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            title: item.name ? item.name : "none",
            action: (
              <div className="row flex-nowrap">
                <Button
                  onClick={() => {
                    setSelectedAccessory(item);
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
                    setSelectedAccessory(item);
                    toggleDelete();
                  }}
                >
                  Delete
                </Button>
              </div>
            ),
          });
        });
        console.log("Accessory", updatedData);
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
                  <h4 className="mt-0 header-title">All Countries</h4>

                  <MDBDataTableV5
                    // scrollX
                    striped
                    bordered
                    hover
                    responsive
                    // autoWidth
                    data={data}
                  />
                </div>
              </div>
            </div>

            <div>
              <Modal isOpen={modalEdit} toggle={toggleEdit}>
                <ModalHeader toggle={toggleEdit}>Edit Accessory</ModalHeader>
                <ModalBody>
                  <AccessoryForm
                    editable={true}
                    accessory={selectedAccessory}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>
                  Delete Accessory ?
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the Accessory "
                  {selectedAccessory.name}" ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleDelete(selectedAccessory._id);
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

export default CountryList;

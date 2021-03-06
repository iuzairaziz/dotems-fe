import React, { useEffect, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import AccessoryForm from "../AccessoryForm/AccessoryForm";
import AccessoryService from "../../../../services/AccessoryService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./AccessoryList.scss";
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
        label: "Quantity",
        field: "quantity",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Used",
        field: "used",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Free",
        field: "free",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Faulty",
        field: "faulty",
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
              <div className="row flex-nowrap justify-content-start ">
                <i
                  className="mdi mdi-pencil-box iconsS my-primary-icon"
                  onClick={() => {
                    setSelectedAccessory(item);
                    toggleEdit();
                  }}
                />
                <i
                  className="mdi mdi-delete-forever iconsS my-danger-icon"
                  onClick={() => {
                    setSelectedAccessory(item);
                    toggleDelete();
                  }}
                />
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
                  <MDBDataTableV5
                    small
                    bordered={true}
                    //  materialSearch
                    searchTop
                    searchBottom={false}
                    pagingTop
                    barReverse
                    striped
                    bordered
                    hover
                    responsive
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

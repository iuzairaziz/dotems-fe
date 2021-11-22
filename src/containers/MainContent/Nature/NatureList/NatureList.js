import React, { useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import NatureForm from "../NatureForm/NatureForm";
import NatureService from "../../../../services/NatureService";
import "./NatureList.scss";
import { Link } from "react-router-dom";

const NatureList = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [selectedNature, setSelectedNature] = useState({ name: "" });
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
    getNature();
  }, [modalEdit, modalDelete]);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = (id) => {
    NatureService.deleteNature(id)
      .then((res) => {
        NatureService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        NatureService.handleError();
        toggleDelete();
      });
  };

  const getNature = () => {
    NatureService.getAllNature()
      .then((res) => {
        let updatedData = { ...data };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            title: item.name ? item.name : "none",
            action: (
              <div className="row flex-nowrap">
                <i
                  className="mdi mdi-pencil-box iconsS my-seconday-icon ml-2"
                  onClick={() => {
                    setSelectedNature(item);
                    toggleEdit();
                  }}
                />
                <i
                  className="mdi mdi-delete-forever iconsS my-danger-icon"
                  onClick={() => {
                    setSelectedNature(item);
                    toggleDelete();
                  }}
                />
              </div>
            ),
          });
        });
        console.log("countries", updatedData);
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
                bordered={true}
                //  materialSearch
                searchTop
                searchBottom={false}
                pagingTop
                barReverse
                hover
                // scrollX
                // autoWidth
                data={data}
              />
            </div>
            <div>
              <Modal isOpen={modalEdit} toggle={toggleEdit}>
                <ModalHeader toggle={toggleEdit}>Edit Nature</ModalHeader>
                <ModalBody>
                  <NatureForm
                    editable={true}
                    nature={selectedNature}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>Delete Nature ?</ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the Nature "
                  {selectedNature.name}" ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleDelete(selectedNature._id);
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

export default NatureList;

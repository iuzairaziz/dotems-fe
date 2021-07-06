import React, { useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { MDBDataTable } from "mdbreact";
import TechnologyForm from "../TechnologyForm/TechnologyForm";
import TechnologyService from "../../../../services/TechnologyService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./TechnologyList.scss";

const TechnologyList = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [selectedTechnology, setSelectedTechnology] = useState({ name: "" });
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
    getTechnologies();
  }, [modalEdit, modalDelete]);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = (id) => {
    TechnologyService.deleteTechnology(id)
      .then((res) => {
        TechnologyService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        TechnologyService.handleError();
        toggleDelete();
      });
  };

  const getTechnologies = () => {
    TechnologyService.getAllTechnologies()
      .then((res) => {
        let updatedData = { ...data };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            title: item.name ? item.name : "none",
            action: (
              <div className="row flex-nowrap">
                <i
                  className="mdi mdi-eye iconsS my-primary-icon ml-2"
                  onClick={() => {
                    setSelectedTechnology(item);
                    toggleEdit();
                  }}
                />
                <i
                  className="mdi mdi-delete-forever iconsS my-danger-icon"
                  onClick={() => {
                    setSelectedTechnology(item);
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
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="mt-0 header-title">All Tasks View</h4>
                  <p className="text-muted m-b-30 font-14">
                    Below are all tasks of all projects
                  </p>

                  <MDBDataTable
                    // scrollX
                    striped
                    bordered
                    hover
                    // autoWidth
                    data={data}
                  />
                </div>
              </div>
            </div>
            <div>
              <Modal isOpen={modalEdit} toggle={toggleEdit}>
                <ModalHeader toggle={toggleEdit}>Edit Technology</ModalHeader>
                <ModalBody>
                  <TechnologyForm
                    editable={true}
                    technology={selectedTechnology}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>
                  Delete Technology ?
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the Technology "
                  {selectedTechnology.name}" ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleDelete(selectedTechnology._id);
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

export default TechnologyList;

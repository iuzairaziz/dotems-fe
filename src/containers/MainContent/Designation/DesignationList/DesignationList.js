import React, { useEffect, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import DesignationForm from "../DesignationForm/DesignationForm";
import DesignationService from "../../../../services/DesignationService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./DesignationList.scss";

const CountryList = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState({ name: "" });
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
    getCountry();
  }, [modalEdit, modalDelete]);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = (id) => {
    DesignationService.deleteDesignation(id)
      .then((res) => {
        DesignationService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        DesignationService.handleError();
        toggleDelete();
      });
  };

  const getCountry = () => {
    DesignationService.getAllDesignation()
      .then((res) => {
        let updatedData = { ...data };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            title: item.name ? item.name : "none",
            action: (
              <div className="row flex-nowrap">
                <i
                  className="mdi mdi-pencil-box iconsS my-seconday-icon ml-1"
                  onClick={() => {
                    setSelectedCountry(item);
                    toggleEdit();
                  }}
                />
                <i
                  className="mdi mdi-delete-forever iconsS my-danger-icon"
                  onClick={() => {
                    setSelectedCountry(item);
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
                  <div className="row align-items-center mb-3">
                    <div className="col">
                      <h3 className="m-0 p-0">All Designations</h3>
                    </div>
                    <div className="col">
                      <Link to="/add-designation">
                        <Button
                          color="success"
                          className="my-primary-button float-right"
                        >
                          Add Designation
                        </Button>
                      </Link>
                    </div>
                  </div>

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
              </div>
            </div>

            <div>
              <Modal isOpen={modalEdit} toggle={toggleEdit}>
                <ModalHeader toggle={toggleEdit}>Edit Country</ModalHeader>
                <ModalBody>
                  <DesignationForm
                    editable={true}
                    country={selectedCountry}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>
                  Delete Country ?
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the country "
                  {selectedCountry.name}" ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleDelete(selectedCountry._id);
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

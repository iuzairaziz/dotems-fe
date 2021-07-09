import React, { useEffect, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import RequestTypeForm from "../../RequestType/RequestForm/RequestForm";
import RequestTypeService from "../../../../services/RequestTypeService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const LeaveTypeList = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [selectedRequestType, setSelectedRequestType] = useState({ name: "" });

  const [data, setData] = useState({
    columns: [
      {
        label: "Leave type",
        field: "name",
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
    getLeaveType();
  }, [modalEdit, modalDelete]);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = (id) => {
    RequestTypeService.deleteRequestType(id)
      .then((res) => {
        RequestTypeService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        RequestTypeService.handleCustomMessage(err.response.data);
        toggleDelete();
      });
  };

  const getLeaveType = () => {
    RequestTypeService.getAllRequestType()
      .then((res) => {
        let updatedData = { ...data };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            name: item.name ? item.name : "none",
            action: (
              <div className="row flex-nowrap">
                <i
                  className="mdi mdi-pencil-box iconsS my-seconday-icon ml-2"
                  onClick={() => {
                    setSelectedRequestType(item);
                    toggleEdit();
                  }}
                />
                <i
                  className="mdi mdi-delete-forever iconsS my-danger-icon"
                  onClick={() => {
                    setSelectedRequestType(item);
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
                  <h4 className="mt-0 header-title">All Leave Type View</h4>
                  <p className="text-muted m-b-30 font-14">
                    Below are all Leave Type Records
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
                <ModalHeader toggle={toggleEdit}>Edit Leave Type</ModalHeader>
                <ModalBody>
                  <RequestTypeForm
                    editable={true}
                    RequestType={selectedRequestType}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>
                  Delete Request Type Form ?
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the Request Type "
                  {selectedRequestType.name}" ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleDelete(selectedRequestType._id);
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

export default LeaveTypeList;

import React, { useEffect, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import EmployeeTypeForm from "../../EmployeeType/EmployeeTypeForm/EmployeeTypeForm";
import EmployeeTypeService from "../../../../services/EmployeeTypeService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const LeaveTypeList = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [selectedEmployeeType, setSelectedEmployeeType] = useState({
    name: "",
  });

  const [data, setData] = useState({
    columns: [
      {
        label: "Employee type",
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
    EmployeeTypeService.deleteEmployeeType(id)
      .then((res) => {
        EmployeeTypeService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        EmployeeTypeService.handleCustomMessage(err.response.data);
        toggleDelete();
      });
  };

  const getLeaveType = () => {
    EmployeeTypeService.getAllEmployeeType()
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
                    setSelectedEmployeeType(item);
                    toggleEdit();
                  }}
                />
                <i
                  className="mdi mdi-delete-forever iconsS my-danger-icon"
                  onClick={() => {
                    setSelectedEmployeeType(item);
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
                      <h3 className="m-0 p-0">All Employee types</h3>
                    </div>
                    <div className="col">
                      <Link to="/add-employee-type">
                        <Button
                          color="success"
                          className="my-primary-button float-right"
                        >
                          Add Employee Type
                        </Button>
                      </Link>
                    </div>
                  </div>

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
                <ModalHeader toggle={toggleEdit}>
                  Edit Employee Type
                </ModalHeader>
                <ModalBody>
                  <EmployeeTypeForm
                    editable={true}
                    EmployeeType={selectedEmployeeType}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>
                  Delete Employee Type Form ?
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the Employee Type "
                  {selectedEmployeeType.name}" ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleDelete(selectedEmployeeType._id);
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

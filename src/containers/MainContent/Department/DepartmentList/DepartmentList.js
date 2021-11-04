import React, { useEffect, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import DepartmentForm from "../../Department/DepartmentForm/DepartmentForm";
import DepartmentService from "../../../../services/DepartmentService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const LeaveTypeList = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState({
    name: "",
  });

  const [data, setData] = useState({
    columns: [
      {
        label: "Department",
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
    DepartmentService.deleteDepartment(id)
      .then((res) => {
        DepartmentService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        DepartmentService.handleCustomMessage(err.response.data);
        toggleDelete();
      });
  };

  const getLeaveType = () => {
    DepartmentService.getAllDepartment()
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
                    setSelectedDepartment(item);
                    toggleEdit();
                  }}
                />
                <i
                  className="mdi mdi-delete-forever iconsS my-danger-icon"
                  onClick={() => {
                    setSelectedDepartment(item);
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
                      <h3 className="m-0 p-0">All Departments</h3>
                    </div>
                    <div className="col">
                      <Link to="/add-department">
                        <Button
                          color="success"
                          className="my-primary-button float-right"
                        >
                          Add Department
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
                <ModalHeader toggle={toggleEdit}>Edit Department</ModalHeader>
                <ModalBody>
                  <DepartmentForm
                    editable={true}
                    Department={selectedDepartment}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>
                  Delete Department ?
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the Department "
                  {selectedDepartment.name}" ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleDelete(selectedDepartment._id);
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

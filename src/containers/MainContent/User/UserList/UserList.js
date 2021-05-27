import React, { Component, useEffect, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import UserService from "../../../../services/UserService";
import UserForm from "../AddUserForm/AddUserForm"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ViewUsers = () => {
  const [editTask, setEditTask] = useState();
  const [selectedUser, setSelectedUser] = useState({ name: "" });
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [dataa, setData] = useState({
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 125,
      },
      {
        label: "UserName",
        field: "username",
        sort: "asc",
        width: 125,
      },
      {
        label: "Date of Joining",
        field: "dateOfJoin",
        sort: "disabled",
        width: 150,
      },
      {
        label: "Machine Number",
        field: "machinenum",
        sort: "disabled",
        width: 200,
      },
      {
        label: "Salary",
        field: "salary",
        sort: "disabled",
        width: 200,
      },
      {
        label: "Status",
        field: "status",
        sort: "disabled",
        width: 125,
      },
      {
        label: "Gender",
        field: "gender",
        sort: "disabled",
        width: 150,
      },
      {
        label: "Role",
        field: "role",
        sort: "asc",
        width: 75,
      },
      {
        label: "Working Hours",
        field: "workingHrs",
        sort: "asc",
        width: 75,
      },
      {
        label: "Working Days",
        field: "workingDays",
        sort: "asc",
        width: 75,
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
    UserService.deleteUsers(id)
      .then((res) => {
        UserService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        UserService.handleError();
        toggleDelete();
      });
  };

  const getData = () => {
    UserService.getUsers()
      .then((res) => {
        let updatedData = { ...dataa };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            name: item.name ? item.name : "none",
            username: item.email ? item.email : "none",
            dateOfJoin: item.joiningDate ? item.joiningDate : "none",
            machinenum: item.machineNo ? item.machineNo : "none",
            salary: item.salary ? item.salary : "none",
            status: item.status ? item.status : "none",
            gender: item.gender ? item.gender : "none",
            role: item.userRole ? item.userRole : "none",
            workingHrs: item.workingHrs ? item.workingHrs : "none",
            workingDays: item.workingDays ? item.workingDays : "none",
            
            action: (
              <div className="row flex-nowrap">
                <Button
                  onClick={() => {
                    setSelectedUser(item);
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
                    setSelectedUser(item);
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
                  <h4 className="mt-0 header-title">All Employees</h4>

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
                <ModalHeader toggle={toggleEdit}>Edit User</ModalHeader>
                <ModalBody>
                  <UserForm
                    editable={true}
                    client={selectedUser}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>Delete User?</ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the client 
                  {selectedUser.name}" ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleDelete(selectedUser._id);
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

export default ViewUsers;

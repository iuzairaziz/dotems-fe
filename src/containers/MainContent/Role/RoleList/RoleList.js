import React, { useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { MDBDataTable, MDBBtn } from "mdbreact";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import RoleForm from "../RoleForm/RoleForm";
import RoleService from "../../../../services/RoleService";
import "./RoleList.scss";
import { Link } from "react-router-dom";

const RoleList = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [selectedRole, setSelectedRole] = useState({ name: "" });
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
    getRole();
  }, [modalEdit, modalDelete]);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = (id) => {
    RoleService.deleteRole(id)
      .then((res) => {
        RoleService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        RoleService.handleError();
        toggleDelete();
      });
  };

  const getRole = () => {
    RoleService.getAllRole()
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
                    setSelectedRole(item);
                    toggleEdit();
                  }}
                />
                <i
                  className="mdi mdi-delete-forever iconsS my-danger-icon"
                  onClick={() => {
                    setSelectedRole(item);
                    toggleDelete();
                  }}
                />
              </div>
            ),
          });
        });
        console.log("roles", updatedData);
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
                      <h3 className="m-0 p-0">All Roles</h3>
                    </div>
                    <div className="col">
                      <Link to="/role/add">
                        <Button
                          color="success"
                          className="my-primary-button float-right"
                        >
                          Add Roles
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <MDBDataTable
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
                <ModalHeader toggle={toggleEdit}>Edit Role</ModalHeader>
                <ModalBody>
                  <RoleForm
                    editable={true}
                    role={selectedRole}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>Delete Role ?</ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the Role "{selectedRole.name}"
                  ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleDelete(selectedRole._id);
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

export default RoleList;

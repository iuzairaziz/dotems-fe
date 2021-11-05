import React, { Component, useEffect, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import TechnologyService from "../../../../services/TechnologyService";
import moment from "moment";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";
import UserService from "../../../../services/UserService";
import UserForm from "../AddUserForm/AddUserForm";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./UserList.scss";

const ViewUsers = (props) => {
  const [editTask, setEditTask] = useState();
  const [selectedUser, setSelectedUser] = useState({ name: "" });
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [technologyfilter, setTechnologyFilter] = useState([]);
  const [applyTechnologyfilter, setApplyTechnologyFilter] = useState("");
  const [applyRolefilter, setApplyRoleFilter] = useState("");
  const [minimumSalary, setMinimumSalary] = useState("");
  const [maximumSalary, setMaximumSalary] = useState("");

  const [dataa, setData] = useState({
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 125,
      },
      // {
      //   label: "UserName",
      //   field: "username",
      //   sort: "asc",
      //   width: 125,
      // },
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
      // {
      //   label: "Gender",
      //   field: "gender",
      //   sort: "disabled",
      //   width: 150,
      // },
      {
        label: "Role",
        field: "role",
        sort: "asc",
        width: 75,
      },
      // {
      //   label: "Working Hours",
      //   field: "workingHrs",
      //   sort: "asc",
      //   width: 75,
      // },
      {
        label: "Technology",
        field: "technology",
      },
      // {
      //   label: "Working Days",
      //   field: "workingDays",
      //   sort: "asc",
      //   width: 75,
      // },
      // {
      //   label: "View Details",
      //   field: "details"
      // },
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
  }, [
    modalEdit,
    modalDelete,
    applyTechnologyfilter,
    applyRolefilter,
    minimumSalary,
    maximumSalary,
  ]);

  useEffect(() => {
    getTechnology();
  }, []);

  const getTechnology = () => {
    TechnologyService.getAllTechnologies().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          id: item._id,
        });
        setTechnologyFilter(options);
      });
    });
  };
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
    UserService.getUsers(
      applyTechnologyfilter,
      applyRolefilter,
      minimumSalary,
      maximumSalary
    )
      .then((res) => {
        let updatedData = { ...dataa };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            name: item.name ? item.name : "N/A",
            username: item.email ? item.email : "N/A",
            dateOfJoin: item.joiningDate
              ? moment(item.joiningDate).format("DD/MMM/YYYY")
              : "N/A",
            machinenum: item.machineNo ? (
              <Link to={`/machine-details/${item.machineNo._id}`}>
                {" "}
                {item.machineNo.machineNo}{" "}
              </Link>
            ) : (
              "none"
            ),
            salary: item.salary ? item.salary : "N/A",
            status: item.status ? item.status : "N/A",
            gender: item.gender ? item.gender : "N/A",
            role: item.userRole
              ? item.userRole.map((item, index) => {
                  return (
                    <div>
                      {item}
                      <br />
                    </div>
                  );
                })
              : "none",
            //  item.userRole ? item.userRole : "N/A",
            workingHrs: item.workingHrs ? item.workingHrs : "N/A",
            workingDays: item.workingDays ? item.workingDays : "N/A",
            technology: item.technology
              ? item.technology.map((item, index) => {
                  return (
                    <div>
                      {item.name}
                      <br />
                    </div>
                  );
                })
              : "none",
            action: (
              <div class="dropdown">
                <button
                  type="button"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i class="mdi mdi-view-list" size={40} />
                </button>
                <div class="dropdown-menu">
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      props.history.push({
                        pathname: "/userdetails/" + item._id,
                      });
                    }}
                    // href="#"
                  >
                    View
                  </a>
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      setSelectedUser(item);
                      toggleEdit();
                    }}
                    // href="#"
                  >
                    Edit
                  </a>
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      setSelectedUser(item);
                      toggleDelete();
                    }}
                    // href="#"
                  >
                    Delete
                  </a>
                </div>
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
                  <div className="row align-items-center mb-3">
                    <div className="col">
                      <h3 className="m-0 p-0">All Employees</h3>
                    </div>
                    <div className="col">
                      <Link to="/add-user">
                        <Button
                          color="success"
                          className="my-primary-button float-right"
                        >
                          Add User
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <label>Technology Filter</label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setApplyTechnologyFilter(e.target.value);
                        }}
                      >
                        <option key={1} value={""}>
                          All
                        </option>
                        {technologyfilter.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-3">
                      <label>Role Filter</label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setApplyRoleFilter(e.target.value);
                        }}
                      >
                        <option key={1} value={""}>
                          All
                        </option>
                        <option key={2} value={"Internee"}>
                          Internee
                        </option>
                        <option key={3} value={"Probation"}>
                          Probation
                        </option>
                        <option key={4} value={"Employee"}>
                          Employee
                        </option>
                      </select>
                    </div>
                    <div className="col-3">
                      <label>Minimum Salary</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => {
                          setMinimumSalary(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-3">
                      <label>Maximum Salary</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => {
                          setMaximumSalary(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <MDBDataTableV5
                    responsive
                    striped
                    small
                    onPageChange={(val) => console.log(val)}
                    bordered={true}
                    //  materialSearch
                    searchTop
                    searchBottom={false}
                    pagingTop
                    barReverse
                    hover
                    // scrollX
                    // fixedHeader={true}
                    // responsive
                    // striped
                    // bordered
                    // searchTop
                    // hover
                    // autoWidth
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
                    user={selectedUser}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>Delete User?</ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the user
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

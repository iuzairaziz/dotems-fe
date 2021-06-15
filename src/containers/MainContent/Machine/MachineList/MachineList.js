import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link, useHistory } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  Progress,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import MachineForm from "../MachineForm/MachineForm";
import MachineService from "../../../../services/MachineService";

const ViewMachines = (props) => {
  let history = useHistory();
  const [editTask, setEditTask] = useState();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState({ name: "" });

  const [dataa, setData] = useState({
    columns: [
      {
        label: "Machine Name",
        field: "machineName",
        sort: "asc",
      },
      {
        label: "Machine No ",
        field: "machineNo",
        sort: "disabled",
      },

      {
        label: "Resource Name",
        field: "resourceName",
        sort: "disabled",
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
    getData();
  }, [modalEdit, modalDelete]);
  useEffect(() => {}, []);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = (id) => {
    MachineService.deleteMachine(id)
      .then((res) => {
        MachineService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        MachineService.handleError();
        toggleDelete();
      });
  };

  const getData = () => {
    MachineService.getAllMachines()
      .then((res) => {
        let data = { ...dataa };
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            machineName: item.name ? item.name : "none",
            machineNo: item.machineNo ? item.machineNo : "none",
            resourceName: item.resourceName ? item.resourceName.name : "none",

            // details: (
            //   <div className="row flex-nowrap">
            //     <Button
            //       color="purple"
            //       size="sm"
            //       data-toggle="modal"
            //       data-target="#myModal"
            //       onClick={() => {
            //         props.history.push({
            //           pathname: "/projectdetails",
            //           projectProps: item._id,
            //         });
            //       }}
            //     >
            //       View Details
            //     </Button>
            //   </div>
            // ),
            action: (
              <div className="row flex-nowrap">
                <Button
                  className="my-seconday-button"
                  size="sm"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={() => {
                    props.history.push({
                      pathname: `/machine-details/${item._id}`,
                    });
                  }}
                >
                  View
                </Button>

                <Button
                  className="my-primary-button"
                  size="sm"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={() => {
                    setSelectedMachine(item);
                    toggleEdit();
                  }}
                >
                  Edit
                </Button>

                <Button
                  className="my-danger-button"
                  size="sm"
                  onClick={() => {
                    setSelectedMachine(item);
                    toggleDelete();
                  }}
                >
                  Delete
                </Button>
              </div>
            ),
          });
        });
        setData(data);
        console.log("state data", dataa);
        console.log("my project data", data);
        console.log("res data", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="mt-0 header-title">Machines</h4>
                  <MDBDataTableV5
                    // scrollX
                    fixedHeader={true}
                    responsive
                    striped
                    bordered
                    searchTop
                    hover
                    data={dataa}
                    theadColor="#000"
                  />
                </div>
              </div>
            </div>
            <Modal isOpen={modalEdit} toggle={toggleEdit}>
              <ModalHeader toggle={toggleEdit}>Edit Project</ModalHeader>
              <ModalBody>
                <MachineForm
                  editable={true}
                  machine={selectedMachine}
                  toggle={toggleEdit}
                />
              </ModalBody>
            </Modal>
            <Modal isOpen={modalDelete} toggle={toggleDelete}>
              <ModalHeader toggle={toggleDelete}>Delete Project?</ModalHeader>
              <ModalBody>
                Are you sure you want to delete the Project?
                {selectedMachine.name}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    handleDelete(selectedMachine._id);
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
    </AUX>
  );
};

export default ViewMachines;

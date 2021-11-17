import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link, useHistory } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import DatePicker from "react-datepicker";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

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
import "./MachineList.scss";

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

            action: (
              <div className="row flex-nowrap">
                <i
                  className="mdi mdi-eye
                  iconsS my-primary-icon"
                  onClick={() => {
                    props.history.push({
                      pathname: `/machine-details/${item._id}`,
                    });
                  }}
                />
                <i
                  className="mdi mdi-pencil-box iconsS my-seconday-icon"
                  onClick={() => {
                    setSelectedMachine(item);
                    toggleEdit();
                  }}
                />
                <i
                  className="mdi mdi-delete-forever iconsS my-danger-icon"
                  onClick={() => {
                    setSelectedMachine(item);
                    toggleDelete();
                  }}
                />
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
                  <div className="row align-items-center mb-3">
                    <div className="col" />
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
                    data={dataa}
                    theadColor="#000"
                  />
                </div>
              </div>
            </div>
            <Modal isOpen={modalEdit} toggle={toggleEdit}>
              <ModalHeader toggle={toggleEdit}>Edit Machine</ModalHeader>
              <ModalBody>
                <MachineForm
                  editable={true}
                  machine={selectedMachine}
                  toggle={toggleEdit}
                />
              </ModalBody>
            </Modal>
            <Modal isOpen={modalDelete} toggle={toggleDelete}>
              <ModalHeader toggle={toggleDelete}>Delete Machine?</ModalHeader>
              <ModalBody>
                Are you sure you want to delete the Machine?
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

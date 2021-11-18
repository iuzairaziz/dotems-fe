import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import Button from "reactstrap/lib/Button";
import { Link } from "react-router-dom";
import WorkingDayService from "../../../../../services/WorkingDayService";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import WorkingDayForm from "./WorkingDayForm/WorkingDayForm";

const LeaveWorkingDays = (props) => {
  const [workingDay, setWorkingDay] = useState({ name: "" });
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [dataa, setData] = useState({
    columns: [
      {
        label: "Working Day Type",
        field: "type",
        sort: "asc",
      },
      {
        label: "Action",
        field: "action",
      },
    ],
    rows: [],
  });
  useEffect(() => {
    getData();
  }, [modalEdit, modalDelete]);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);
  const getData = () => {
    WorkingDayService.getWorkingDays()
      .then((res) => {
        let updatedData = { ...dataa };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            type: item.name ? item.name : "N/A",
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
                        pathname: `/leave/add-new-working-day/${item._id}`,
                      });
                    }}
                  >
                    View
                  </a>
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      setWorkingDay(item);
                      toggleEdit();
                    }}
                  >
                    Edit
                  </a>
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      setWorkingDay(item);
                      toggleDelete();
                    }}
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

  const handleDelete = (id) => {
    WorkingDayService.deleteWorkingDay(id)
      .then((res) => {
        WorkingDayService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        WorkingDayService.handleError();
        toggleDelete();
      });
  };

  return (
    <div className="row">
      <div className="col col-md-6">
        <div className="card m-b-20">
          <div className="card-body">
            <div>
              <Link to="/leave/add-new-working-day">
                <Button className="mt-3 my-primary-button float-right">
                  + ADD
                </Button>
              </Link>
            </div>{" "}
            <MDBDataTableV5
              // scrollX
              fixedHeader={true}
              responsive
              striped
              bordered
              searchTop
              hover
              // autoWidth
              data={dataa}
              theadColor="#000"
            />
          </div>
          <div>
            <Modal isOpen={modalEdit} toggle={toggleEdit}>
              <ModalHeader toggle={toggleEdit}>Edit Client</ModalHeader>
              <ModalBody>
                <WorkingDayForm
                  editable
                  workingDay={workingDay}
                  toggle={toggleEdit}
                />
              </ModalBody>
            </Modal>
            <Modal isOpen={modalDelete} toggle={toggleDelete}>
              <ModalHeader toggle={toggleDelete}>Delete Client ?</ModalHeader>
              <ModalBody>
                Are you sure you want to delete the working day "
                {workingDay.name}" ?
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    handleDelete(workingDay._id);
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
  );
};

export default LeaveWorkingDays;

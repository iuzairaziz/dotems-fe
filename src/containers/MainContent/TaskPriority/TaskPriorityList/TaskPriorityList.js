import React, { useEffect, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import { MDBDataTableV5 } from "mdbreact";
import TaskPriorityForm from "../TaskPriorityForm/TaskPriorityForm";
import TaskPriorityService from "../../../../services/TaskPriority";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const TaskPriorityList = () => {
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
        label: "Preset",
        field: "preset",
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
    getTaskPriority();
  }, [modalEdit, modalDelete]);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = (id) => {
    TaskPriorityService.deleteClientLabel(id)
      .then((res) => {
        TaskPriorityService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        TaskPriorityService.handleError();
        toggleDelete();
      });
  };

  const getTaskPriority = () => {
    TaskPriorityService.getAllTaskPriority()
      .then((res) => {
        let updatedData = { ...data };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            title: item.name ? item.name : "none",
            preset: (
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  // id="exampleRadios1"
                  value="option1"
                  onChange={(e) =>
                    TaskPriorityService.putTaskPriorityPreset(item._id).then(
                      () => {
                        getTaskPriority();
                      }
                    )
                  }
                  checked={item.preset ? true : false}
                />
              </div>
            ),
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
              <MDBDataTableV5
                responsive
                striped
                small
                bordered={true}
                searchTop
                searchBottom={false}
                pagingTop
                barReverse
                hover
                data={data}
              />
            </div>

            <div>
              <Modal isOpen={modalEdit} toggle={toggleEdit}>
                <ModalHeader toggle={toggleEdit}>Edit Label</ModalHeader>
                <ModalBody>
                  <TaskPriorityForm
                    editable={true}
                    country={selectedCountry}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>
                  Delete Designation?
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the Label "
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

export default TaskPriorityList;

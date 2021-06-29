import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import Select from "react-select";
import {
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import shortValidations from "../../../../validations/short-validations";
import "../MachineForm/MachineForm.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MachineService from "../../../../services/MachineService";
import AccessoryForm from "../../Accessories/AccessoryForm/AccessoryForm";
import HistoryService from "../../../../services/HistoryService";
import AccessoryService from "../../../../services/AccessoryService";
import userService from "../../../../services/UserService";
import MachineValidation from "../../../../validations/machine-validations";
const MachineForm = (props) => {
  const [users, setUsers] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [accessoryModal, setAccessoryModal] = useState(false);

  const acc = props.machine;
  console.log("deatils", acc);
  const editable = props.editable;

  useEffect(() => {
    getAccessories();
  }, [accessoryModal]);

  const toggleAccessoryEdit = () => setAccessoryModal(!accessoryModal);

  const statusOption = [
    { value: "In-Use", label: "In-Use" },
    { value: "Faulty", label: "Faulty" },
    { value: "Free", label: "Free" },
    { value: "Sold", label: "Sold" },
  ];
  const owenershipOptions = [
    { value: "Personal", label: "Personal" },
    { value: "Company", label: "Company" },
  ];

  const getAccessories = () => {
    AccessoryService.getAllaccessory().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      console.log("Accesory", options);
      setAccessory(options);
    });
  };
  var AccessoriesArray = [];
  editable &&
    acc.Accessory.map((item) => {
      AccessoriesArray.push({
        label: item.name,
        value: item._id,
        id: item._id,
      });
    });
  return (
    <Formik
      initialValues={{
        ownership: props.editable &&
          acc.Ownership && {
            label: acc.Ownership,
            value: acc.Ownership,
          },
        serialno: props.editable && acc.serialNo,
        status: props.editable &&
          acc.Status && { label: acc.Status, value: acc.Status },
        machineNo: props.editable && acc.machineNo,
        storage: props.editable && acc.Storage,
        machineName: props.editable && acc.name,
        processor: props.editable && acc.Processor,
        memory: props.editable && acc.Memory,
        graphics: props.editable && acc.Graphics,
        accessories: props.editable && AccessoriesArray,
        notes: props.editable
          ? EditorState.createWithContent(convertFromRaw(JSON.parse(acc.Notes)))
          : EditorState.createEmpty(),
      }}
      // validationSchema={MachineValidation.newMachineValidation}
      onSubmit={(values, actions) => {
        let arr = [];
        var historyAccessoriesArray = [];

        values.accessories.map((item) => {
          arr.push(item.value);
          historyAccessoriesArray.push(item.label);
        });
        props.editable
          ? MachineService.updateMachine(acc._id, {
              name: values.machineName,
              machineNo: values.machineNo,
              Storage: values.storage,
              Memory: values.memory,
              Processor: values.processor,
              Ownership: values.ownership.label,
              Graphics: values.graphics,
              Accessory: arr,
              Status: values.status.label,
              Display: values.status,
              Notes: JSON.stringify(
                convertToRaw(values.notes.getCurrentContent())
              ),
              serialNo: values.serialno,
            })
              .then((res) => {
                props.toggle();
                console.log("response data sasasasasres", res.data);
                MachineService.handleMessage("update");
                HistoryService.addHistory({
                  docId: acc._id,
                  onModel: "Machine",
                  document: JSON.stringify({
                    Graphics: res.data.Graphics,
                    Memory: res.data.Memory,
                    Ownership: res.data.Ownership,
                    Processor: res.data.Processor,
                    Status: res.data.Status,
                    Storage: res.data.Storage,
                    machineNo: res.data.machineNo,
                    name: res.data.name,
                    serialNo: res.data.serialNo,
                    Accessory: historyAccessoriesArray,
                  }),
                })
                  .then((res) => {
                    props.toggle();
                  })
                  .catch((err) => {
                    props.toggle();
                  });
              })
              .catch((err) => {
                props.toggle();
                MachineService.handleError();
              })
          : MachineService.addMachine({
              name: values.machineName,
              machineNo: values.machineNo,
              Storage: values.storage,
              Memory: values.memory,
              Processor: values.processor,
              Graphics: values.graphics,
              Accessory: arr,
              Status: values.status.label,
              Notes: JSON.stringify(
                convertToRaw(values.notes.getCurrentContent())
              ),
              Ownership: values.ownership.label,
              serialNo: values.serialno,
            })
              .then((res) => {
                props.toggle && props.toggle();
                HistoryService.addHistory({
                  docId: res.data._id,
                  onModel: "Machine",
                  document: JSON.stringify({
                    Graphics: res.data.Graphics,
                    Memory: res.data.Memory,
                    Ownership: res.data.Ownership,
                    Processor: res.data.Processor,
                    Status: res.data.Status,
                    Storage: res.data.Storage,
                    machineNo: res.data.machineNo,
                    name: res.data.name,
                    serialNo: res.data.serialNo,
                    Accessory: historyAccessoriesArray,
                  }),
                });
                MachineService.handleMessage("add");
              })
              .catch((err) => {
                console.log("machine err", err);
                MachineService.handleError();
              });
      }}
    >
      {(props) => {
        return (
          <div className="machineform">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Machine Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.machineName}
                    onChange={props.handleChange("machineName")}
                    placeholder="Enter Machine Name"
                  />
                  <span id="err">{props.errors.machineName}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label className="control-label">Ownsership</label>
                  <Select
                    value={props.values.ownership}
                    onChange={(val) => props.setFieldValue("ownership", val)}
                    options={owenershipOptions}
                  />
                  <span id="err">{props.errors.ownership}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Serial No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.serialno}
                    onChange={props.handleChange("serialno")}
                    placeholder="Enter Serial No"
                  />
                  <span id="err">{props.errors.serialno}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Status</label>
                  <Select
                    value={props.values.status}
                    onChange={(val) => props.setFieldValue("status", val)}
                    options={statusOption}
                  />
                  <span id="err">{props.errors.status}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Machine No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.machineNo}
                    onChange={props.handleChange("machineNo")}
                    placeholder="Enter Machine Number"
                  />
                  <span id="err">{props.errors.machineNo}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Processor</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.processor}
                    onChange={props.handleChange("processor")}
                    placeholder="Enter Processor"
                  />
                  <span id="err">{props.errors.processor}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Storage</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.storage}
                    onChange={props.handleChange("storage")}
                    placeholder="Enter Storage"
                  />
                  <span id="err">{props.errors.storage}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Memory</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.memory}
                    onChange={props.handleChange("memory")}
                    placeholder="Enter Memory Name"
                  />
                  <span id="err">{props.errors.memory}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Graphics</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.graphics}
                    onChange={props.handleChange("graphics")}
                    placeholder="Enter Graphics Deatils"
                  />
                  <span id="err">{props.errors.graphics}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label className="control-label">Accessories</label>
                    </div>
                    <div className="col">
                      <div
                        className="d-flex justify-content-end"
                        id="add-new-Buttonm "
                        onClick={() => {
                          toggleAccessoryEdit();
                        }}
                      >
                        <i className="mdi mdi-plus-circle icon-add" />
                      </div>
                    </div>
                  </div>
                  <Select
                    className="select-override"
                    value={props.values.accessories}
                    onChange={(val) => props.setFieldValue("accessories", val)}
                    options={accessory}
                    isMulti={true}
                  />
                  <span id="err">{props.errors.accessories}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Notes</label>
                  <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editor"
                    editorState={props.values.notes}
                    // editorStyle={{minHeight:"500px",overflowY:"scroll !important"}}
                    onEditorStateChange={(val) => {
                      props.setFieldValue("notes", val);
                    }}
                  />
                  <span id="err">{props.errors.notes}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Button
                  className="mt-3 my-primary-button"
                  onClick={props.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
            <Modal
              style={{ maxWidth: "70%" }}
              isOpen={accessoryModal}
              toggle={toggleAccessoryEdit}
            >
              <ModalHeader toggle={toggleAccessoryEdit}>
                Add New Accessory
              </ModalHeader>
              <ModalBody>
                <AccessoryForm toggle={toggleAccessoryEdit} />
              </ModalBody>
            </Modal>
          </div>
        );
      }}
    </Formik>
  );
};

export default MachineForm;

import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import Select from "react-select";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import shortValidations from "../../../../validations/short-validations";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MachineService from "../../../../services/MachineService";
import AccessoryService from "../../../../services/AccessoryService";
import userService from "../../../../services/UserService";
import MachineValidation from "../../../../validations/machine-validations";
const MachineForm = (props) => {
  const [users, setUsers] = useState([]);
  const [accessory, setAccessory] = useState([]);

  const acc = props.machine;
  const editable = props.editable;

  useEffect(() => {
    getUsers();
    getAccessories();
  }, []);

  const statusOption = [
    { value: "In-Use", label: "In-Use" },
    { value: "Personal", label: "Personal" },
    { value: "Faulty", label: "Faulty" },
    { value: "Free", label: "Free" },
    { value: "Sold", label: "Sold" },
  ];

  const getAccessories = () => {
    AccessoryService.getAllaccessory().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ value: item._id, label: item.name });
      });
      setAccessory(options);
    });
  };

  const getUsers = () => {
    userService.getUsers("", "", "", "").then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ value: item._id, label: item.name });
      });
      setUsers(options);
    });
  };
  var AccessoriesArray = [];
  editable &&
    acc.Accessory.map((item) =>
      AccessoriesArray.push({ label: item.name, value: item._id })
    );
  return (
    <Formik
      initialValues={{
        resourceName: props.editable &&
          acc.resourceName && {
            label: acc.resourceName.name,
            value: acc.resourceName._id,
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
      validationSchema={MachineValidation.newMachineValidation}
      onSubmit={(values, actions) => {
        console.log("dhsghdhgsdhgsghd", values);
        let arr = [];
        values.accessories.map((item) => {
          arr.push(item.value);
        });
        props.editable
          ? MachineService.updateMachine(acc._id, {
              name: values.machineName,
              machineNo: values.machineNo,
              Storage: values.storage,
              Memory: values.memory,
              Processor: values.processor,
              Graphics: values.graphics,
              Accessory: arr,
              Status: values.status.label,
              Display: values.status,
              Notes: JSON.stringify(
                convertToRaw(values.notes.getCurrentContent())
              ),
              resourceName: values.resourceName.value,
              serialNo: values.serialno,
            })
              .then((res) => {
                props.toggle();
                MachineService.handleMessage("update");
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
              Display: values.status,
              Notes: JSON.stringify(
                convertToRaw(values.notes.getCurrentContent())
              ),
              resourceName: values.resourceName.value,
              serialNo: values.serialno,
            })
              .then((res) => {
                MachineService.handleMessage("add");
              })
              .catch((err) => {
                MachineService.handleError();
              });
      }}
    >
      {(props) => {
        return (
          <>
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
                  <label className="control-label">Resource Name</label>
                  <Select
                    value={props.values.resourceName}
                    onChange={(val) => props.setFieldValue("resourceName", val)}
                    options={users}
                  />
                  <span id="err">{props.errors.resourceName}</span>
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
                  <label>Accessories</label>
                  <Select
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
                  color="success"
                  className="mt-3"
                  onClick={props.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default MachineForm;

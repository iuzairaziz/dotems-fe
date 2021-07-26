import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import Select from "react-select";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import UserService from "../../../../services/UserService";

import {
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import RequestTypeService from "../../../../services/RequestTypeService";
import RequestTypeForm from "../../RequestType/RequestForm/RequestForm";
import RequestService from "../../../../services/Request";

import shortValidations from "../../../../validations/short-validations";
import userService from "../../../../services/UserService";
const RequestForm = (props) => {
  const [requestType, setRequestType] = useState([]);
  const [requestTypeModal, setRequestTypeModal] = useState(false);
  const [description, setDescription] = useState(EditorState.createEmpty());

  useEffect(() => {
    getRequestType();
  }, [requestTypeModal]);
  const toggleRequestTypeEdit = () => setRequestTypeModal(!requestTypeModal);

  const userId = userService.userLoggedInInfo();
  console.log(userId);

  const getRequestType = () => {
    RequestTypeService.getAllRequestType().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      console.log("Accesory", options);
      setRequestType(options);
    });
  };

  return (
    <Formik
      initialValues={{
        requestType: props.editable && props.Request._id,
        description: props.editable
          ? EditorState.createWithContent(
              convertFromRaw(JSON.parse(props.Request.description))
            )
          : EditorState.createEmpty(),
      }}
      validationSchema={shortValidations.requestValidation}
      onSubmit={(values, actions) => {
        console.log(actions);
        props.editable
          ? RequestService.updateRequest(props.Request._id, {
              requestType: values.requestType.value,
              description: JSON.stringify(
                convertToRaw(values.description.getCurrentContent())
              ),
            })
              .then((res) => {
                props.toggle();
                RequestService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                RequestService.handleCustomMessage(err.response.data);
              })
          : RequestService.addRequest({
              user: userId._id,
              requestType: values.requestType.value,
              description: JSON.stringify(
                convertToRaw(values.description.getCurrentContent())
              ),
            })
              .then((res) => {
                props.toggle && props.toggle();
                RequestService.handleMessage("add");
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                RequestService.handleCustomMessage(err.response.data);
              });
      }}
    >
      {(props) => {
        return (
          <>
            <div className="row">
              <div className="col">
                <label className="control-label">Request Type</label>
              </div>
              <div className="col">
                <div
                  className="d-flex justify-content-end"
                  id="add-new-Buttonm "
                  onClick={() => {
                    toggleRequestTypeEdit();
                  }}
                >
                  <i className="mdi mdi-plus-circle icon-add" />
                </div>
              </div>
            </div>
            <Select
             className={`my-select${
              props.touched.requestType && props.errors.requestType
                ? "is-invalid"
                : props.touched.requestType && "is-valid"
            }`}
              name="requestType"
              onBlur={props.handleBlur}
              className="select-override zIndex"
              value={props.values.requestType}
              onChange={(val) => props.setFieldValue("requestType", val)}
              options={requestType}
            />
            <span id="err" className="invalid-feedback">
              {props.touched.requestType && props.errors.requestType}
            </span>
            <div className="form-group">
              <div className="row">
                <div className="col mt-4">
                  <label>Description</label>
                  <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editor"
                    name="description"
                    onBlur={() => props.handleBlur("description")}
                    editorState={props.values.description}
                    // editorStyle={{minHeight:"500px",overflowY:"scroll !important"}}
                    onEditorStateChange={(val) => {
                      props.setFieldValue("description", val);
                    }}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.description && props.errors.description}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Button
                  color="success"
                  className="mt-3 my-primary-button"
                  onClick={props.handleSubmit}
                >
                  Submit
                </Button>
              </div>
              <div className="col">
                <Modal
                  style={{ maxWidth: "70%" }}
                  isOpen={requestTypeModal}
                  toggle={toggleRequestTypeEdit}
                >
                  <ModalHeader toggle={toggleRequestTypeEdit}>
                    Add New Accessory
                  </ModalHeader>
                  <ModalBody>
                    <RequestTypeForm toggle={toggleRequestTypeEdit} />
                  </ModalBody>
                </Modal>
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default RequestForm;

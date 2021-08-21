import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import Select from "react-select";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import UserService from "../../../../services/UserService";
import { useHistory } from "react-router-dom";
import {
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ProjectService from "../../../../services/ProjectService";
import RequestTypeForm from "../../RequestType/RequestForm/RequestForm";
import RequestService from "../../../../services/Request";
import shortValidations from "../../../../validations/short-validations";
import userService from "../../../../services/UserService";

const ProjectPaymentForm = (props) => {
  const [project, setProject] = useState([]);
  const [requestType, setRequestType] = useState([]);
  const [sendRequestTo, setSendRequestTo] = useState([]);
  const [requestTypeModal, setRequestTypeModal] = useState(false);
  const [description, setDescription] = useState(EditorState.createEmpty());

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    ProjectService.getAllProject().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setProject(options);
      console.log(res.data);
    });
  };

  return (
    <Formik
      initialValues={{
        requestType: "",
        sendRequestToUsers: [],
        description: props.editable
          ? EditorState.createWithContent(
              convertFromRaw(JSON.parse(props.Request.description))
            )
          : EditorState.createEmpty(),
      }}
      validationSchema={shortValidations.requestValidation}
      onSubmit={(values, actions) => {
        console.log(actions);
        console.log("Valuesssssssssss", values);
        let array = [];
        values.sendRequestToUsers.map((item) => array.push(item.value));
        props.editable
          ? RequestService.updateRequest(props.Request._id, {
              requestType: values.requestType.value,
              requestRecievers: values.sendRequestToUsers,
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
              requestType: values.requestType.value,
              requestRecievers: array,
              description: JSON.stringify(
                convertToRaw(values.description.getCurrentContent())
              ),
            })
              .then((res) => {
                props.toggle && props.toggle();
                RequestService.handleMessage("add");
                // history.push("/my-requests");
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
                <label className="control-label">Project</label>
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
              options={project}
            />
            <span id="err" className="invalid-feedback">
              {props.touched.requestType && props.errors.requestType}
            </span>
          </>
        );
      }}
    </Formik>
  );
};

export default ProjectPaymentForm;

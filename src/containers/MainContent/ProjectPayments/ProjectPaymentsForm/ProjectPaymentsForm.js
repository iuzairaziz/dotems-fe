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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
              </div>
              <div className="col">
              <div className="form-group">
                <label>Payment Description</label>
                <input
                  name="projectName"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.projectName && props.errors.projectName
                      ? "is-invalid"
                      : props.touched.projectName && "is-valid"
                  }`}
                  // value={props.values.projectName}
                  // onChange={props.handleChange("projectName")}
                  placeholder="Enter Description"
                />
                <span id="err" className="invalid-feedback">
                  {/* {props.touched.projectName && props.errors.projectName} */}
                </span>
              </div>
            </div>
            </div>
            <div className="row">
            {/* <div className="row"> */}
            <div className="col">
              <div className="form-group">
                <label>Amount Recieve Date</label>
                <div>
                  <DatePicker
                    name="cStartDate"
                    onBlur={props.handleBlur}
                    className={`form-control ${
                      props.touched.cStartDate && props.errors.cStartDate
                        ? "is-invalid"
                        : props.touched.cStartDate && "is-valid"
                    }`}
                    selected={props.values.cStartDate}
                    onChange={(date) => {
                      props.setFieldValue("cStartDate", date);
                      console.log("datepicker", date);
                    }}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.cStartDate && props.errors.cStartDate}
                  </span>
                </div>
              </div>
            </div>
            {/* </div> */}
            <div className="col">
              <div className="form-group">
                <label>Amount Recieved</label>
                <input
                  name="projectName"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.projectName && props.errors.projectName
                      ? "is-invalid"
                      : props.touched.projectName && "is-valid"
                  }`}
                  // value={props.values.projectName}
                  // onChange={props.handleChange("projectName")}
                  placeholder="Enter Amount"
                />
                <span id="err" className="invalid-feedback">
                  {/* {props.touched.projectName && props.errors.projectName} */}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Exchange Rate</label>
                <input
                  name="projectName"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.projectName && props.errors.projectName
                      ? "is-invalid"
                      : props.touched.projectName && "is-valid"
                  }`}
                  // value={props.values.projectName}
                  // onChange={props.handleChange("projectName")}
                  placeholder="Enter Exchange Rate"
                />
                <span id="err" className="invalid-feedback">
                  {/* {props.touched.projectName && props.errors.projectName} */}
                </span>
              </div>
           
            </div>
          
            </div>
            <div className="primary-button">
              <Button
                className="mt-3 my-primary-button"
                // onClick={props.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default ProjectPaymentForm;

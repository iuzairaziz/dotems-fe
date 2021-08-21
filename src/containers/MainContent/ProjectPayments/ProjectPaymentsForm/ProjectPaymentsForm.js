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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import paymentValidation from "../../../../validations/payment-validations";
import PaymentService from "../../../../services/PaymentService"


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

  const editable = props.editable;
  const payment = props.payment;

  return (
    <Formik
      initialValues={{
        recievedAmount: editable && payment.recievedAmount,
        exchangeRate: editable && payment.exchangeRate,
        PaymentDescription: editable && payment.PaymentDescription,
        project: editable &&
          project.client && {
            label: project.project.name,
            value: project.project._id,
          },
        PaymentRecievedDate: editable && project.PaymentRecievedDate,
      }}
      // validationSchema={shortValidations.requestValidation}
      onSubmit={(values, actions) => {
        console.log(actions);
        console.log("Valuesssssssssss", values);
        let array = [];
        // values.sendRequestToUsers.map((item) => array.push(item.value));
        props.editable
          ? PaymentService.updatePayment({
            recievedAmount: values.recievedAmount,
            exchangeRate: values.exchangeRate,
            PaymentDescription: values.PaymentDescription,
            PaymentRecievedDate: values.PaymentRecievedDate,
            project: values.project.value,
             
            })
              .then((res) => {
                props.toggle();
                PaymentService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                PaymentService.handleCustomMessage(err.response.data);
              })
          : PaymentService.addPayment({
            paymentDetails : [{
              recievedAmount: values.recievedAmount,
              exchangeRate: values.exchangeRate,
              PaymentDescription: values.PaymentDescription,
              PaymentRecievedDate: values.PaymentRecievedDate,
            }],
            project: values.project.value,
            })
              .then((res) => {
                PaymentService.handleMessage("add")
              })
              .catch((err) => {
                PaymentService.handleCustomMessage(err.response.data);
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
                props.touched.project && props.errors.project
                  ? "is-invalid"
                  : props.touched.project && "is-valid"
              }`}
              name="project"
              onBlur={props.handleBlur}
              className="select-override zIndex"
              value={props.values.project}
              onChange={(val) => props.setFieldValue("project", val)}
              options={project}
            />
            <span id="err" className="invalid-feedback">
              {props.touched.project && props.errors.project}
            </span>
              </div>
              <div className="col">
              <div className="form-group">
                <label>Payment Description</label>
                <input
                  name="PaymentDescription"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.PaymentDescription && props.errors.PaymentDescription
                      ? "is-invalid"
                      : props.touched.PaymentDescription && "is-valid"
                  }`}
                  value={props.values.PaymentDescription}
                  onChange={props.handleChange("PaymentDescription")}
                  placeholder="Enter Description"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.PaymentDescription && props.errors.PaymentDescription}
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
                    name="PaymentRecievedDate"
                    onBlur={props.handleBlur}
                    className={`form-control ${
                      props.touched.PaymentRecievedDate && props.errors.PaymentRecievedDate
                        ? "is-invalid"
                        : props.touched.PaymentRecievedDate && "is-valid"
                    }`}
                    selected={props.values.PaymentRecievedDate}
                    onChange={(date) => {
                      props.setFieldValue("PaymentRecievedDate", date);
                      console.log("datepicker", date);
                    }}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.PaymentRecievedDate && props.errors.PaymentRecievedDate}
                  </span>
                </div>
              </div>
            </div>
            {/* </div> */}
            <div className="col">
              <div className="form-group">
                <label>Amount Recieved</label>
                <input
                  name="recievedAmount"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.recievedAmount && props.errors.recievedAmount
                      ? "is-invalid"
                      : props.touched.recievedAmount && "is-valid"
                  }`}
                  value={props.values.recievedAmount}
                  onChange={props.handleChange("recievedAmount")}
                  placeholder="Enter Amount"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.recievedAmount && props.errors.recievedAmount}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Exchange Rate</label>
                <input
                  name="exchangeRate"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.exchangeRate && props.errors.exchangeRate
                      ? "is-invalid"
                      : props.touched.exchangeRate && "is-valid"
                  }`}
                  value={props.values.exchangeRate}
                  onChange={props.handleChange("exchangeRate")}
                  placeholder="Enter Exchange Rate"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.exchangeRate && props.errors.exchangeRate}
                </span>
              </div>
           
            </div>
          
            </div>
            <div className="primary-button">
              <Button
                className="mt-3 my-primary-button"
                onClick={props.handleSubmit}
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

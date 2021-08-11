import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import shortValidations from "../../../../../validations/short-validations";
import LeaveService from "../../../../../services/LeaveService";
import { useHistory } from "react-router-dom";

const LeaveTypeForm = (props) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        name: props.editable && props.leaveType.name,
        number: props.editable && props.leaveType.totalLeaves,
      }}
      validationSchema={shortValidations.leaveTypeValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? LeaveService.updateLeaveType(props.leaveType._id, {
              name: values.name,
              totalLeaves: values.number,
            })
              .then((res) => {
                props.toggle();
                LeaveService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                LeaveService.handleCustomMessage(err.response.data);
              })
          : LeaveService.addLeaveType({
              name: values.name,
              totalLeaves: values.number,
            })
              .then((res) => {
                props.toggle && props.toggle();
                LeaveService.handleMessage("add");
                history.push("/view-leave-type");
                actions.setFieldValue("name", "");
                actions.setFieldValue("number", "");
              })
              .catch((err) => {
                LeaveService.handleCustomMessage(err.response.data);
              });
      }}
    >
      {(props) => {
        return (
          <>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Leave Type</label>
                  <input
                    type="text"
                    className={`form-control ${
                      props.touched.name && props.errors.name
                        ? "is-invalid"
                        : props.touched.name && "is-valid"
                    }`}  
                    className="form-control"
                    value={props.values.name}
                    onChange={props.handleChange("name")}
                    placeholder="Enter Leave type"
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.name && props.errors.name}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Number of Leaves</label>
                  <input
                    type="text"
                    className={`form-control ${
                      props.touched.number && props.errors.number
                        ? "is-invalid"
                        : props.touched.number && "is-valid"
                    }`}  
                    className="form-control"
                    value={props.values.number}
                    onChange={props.handleChange("number")}
                    placeholder="Enter number of leaves"
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.number && props.errors.number}
                  </span>
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
          </>
        );
      }}
    </Formik>
  );
};

export default LeaveTypeForm;

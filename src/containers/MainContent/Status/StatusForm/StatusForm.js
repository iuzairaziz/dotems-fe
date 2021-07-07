import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";

import shortValidations from "../../../../validations/short-validations";
import StatusService from "../../../../services/StatusService";

const StatusForm = (props) => {
  return (
    <Formik
      initialValues={{
        status: props.editable && props.platform.name,
      }}
      validationSchema={shortValidations.statusValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? StatusService.updateStatus(props.platform._id, {
              name: values.status,
            })
              .then((res) => {
                props.toggle();
                StatusService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                StatusService.handleError();
              })
          : StatusService.addStatus({ name: values.status })
              .then((res) => {
                props.toggle && props.toggle();
                StatusService.handleMessage("add");
                actions.setFieldValue("status", "");
              })
              .catch((err) => {
                StatusService.handleError();
              });
      }}
    >
      {(props) => {
        return (
          <>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Status</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.status}
                    onChange={props.handleChange("status")}
                    placeholder="Enter Name"
                  />
                  <span id="err">
                    {props.touched.status && props.errors.status}
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
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default StatusForm;

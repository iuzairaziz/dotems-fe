import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";

import shortValidations from "../../../../validations/short-validations";
import StatusService from "../../../../services/StatusService";

const StatusForm = (props) => {
  return (
    <Formik
      initialValues={{
        title: props.editable && props.platform.name,
      }}
      validationSchema={shortValidations.statusValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? StatusService.AddStatus(props.platform._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                StatusService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                StatusService.handleError();
              })
          : StatusService.addStatus({ name: values.title })
              .then((res) => {
                StatusService.handleMessage("add");
                actions.setFieldValue("title", "");
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
                    value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err">{props.errors.title}</span>
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

export default StatusForm;

import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import ServiceServices from "../../../../services/ServiceService";

import shortValidations from "../../../../validations/short-validations";
const ServiceForm = (props) => {
  return (
    <Formik
      initialValues={{
        title: props.editable && props.service.name,
      }}
      validationSchema={shortValidations.serviceValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? ServiceServices.updateService(props.service._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                ServiceServices.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                ServiceServices.handleError();
              })
          : ServiceServices.addService({ name: values.title })
              .then((res) => {
                ServiceServices.handleMessage("add");
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                ServiceServices.handleError();
              });
      }}
    >
      {(props) => {
        return (
          <>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Title</label>
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

export default ServiceForm;

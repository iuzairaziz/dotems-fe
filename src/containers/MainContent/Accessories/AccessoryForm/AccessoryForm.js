import React, { Component, useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";

import shortValidations from "../../../../validations/short-validations";
import AccessoryService from "../../../../services/AccessoryService";
const AccessoryForm = (props) => {
  return (
    <Formik
      initialValues={{
        title: props.editable && props.accessory.name,
      }}
      validationSchema={shortValidations.accessoryValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? AccessoryService.updateAccessoryy(props.accessory._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                AccessoryService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                AccessoryService.handleCustomMessage(err.response.data);
              })
          : AccessoryService.addAccessory({ name: values.title })
              .then((res) => {
                props.toggle && props.toggle();
                AccessoryService.handleMessage("add");
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                AccessoryService.handleCustomMessage(err.response.data);
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
                    className={`form-control ${
                      props.touched.title && props.errors.title
                        ? "is-invalid"
                        : props.touched.title && "is-valid"
                    }`}                     value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err" className="invalid-feedback">{props.errors.title}</span>
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

export default AccessoryForm;

import React, { Component, useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import shortValidations from "../../../../validations/short-validations";
import AccessoryService from "../../../../services/AccessoryService";
import { useHistory } from "react-router-dom";

const AccessoryForm = (props) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        title: props.editable && props.accessory.name,
        quantity: props.editable && props.accessory.quantity,
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
                if (props.redirect) {
                  history.push("/view-accessory");
                  actions.setFieldValue("title", "");
                }
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
                    }`}
                    value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err" className="invalid-feedback">
                    {props.errors.title}
                  </span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className={`form-control ${
                      props.touched.title && props.errors.title
                        ? "is-invalid"
                        : props.touched.title && "is-valid"
                    }`}
                    value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Quantity"
                  />
                  <span id="err" className="invalid-feedback">
                    {props.errors.title}
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

export default AccessoryForm;

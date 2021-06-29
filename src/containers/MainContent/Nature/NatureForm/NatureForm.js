import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";

import shortValidations from "../../../../validations/short-validations";
import NatureService from "../../../../services/NatureService";
const NatureForm = (props) => {
  return (
    <Formik
      initialValues={{
        title: props.editable && props.nature.name,
      }}
      validationSchema={shortValidations.natureValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? NatureService.updateNature(props.nature._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                NatureService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                NatureService.handleError();
              })
          : NatureService.addNature({ name: values.title })
              .then((res) => {
                props.toggle && props.toggle();
                NatureService.handleMessage("add");
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                NatureService.handleError();
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
                  <span id="err">
                    {props.touched.title && props.errors.title}
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

export default NatureForm;

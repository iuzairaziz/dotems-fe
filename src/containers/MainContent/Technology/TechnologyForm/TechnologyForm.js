import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";

import shortValidations from "../../../../validations/short-validations";
import TechnologyService from "../../../../services/TechnologyService";

const TechnologyForm = (props) => {
  return (
    <Formik
      initialValues={{
        title: props.editable && props.technology.name,
      }}
      validationSchema={shortValidations.technologyValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? TechnologyService.updateTechnology(props.technology._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                TechnologyService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                TechnologyService.handleError();
              })
          : TechnologyService.addTechnology({ name: values.title })
              .then((res) => {
                TechnologyService.handleMessage("add");
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                TechnologyService.handleError();
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
                  // className=""
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

export default TechnologyForm;

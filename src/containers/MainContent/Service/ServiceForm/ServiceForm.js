import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";

import shortValidations from "../../../../validations/short-validations";
const ServiceForm = () => {
  return (
    <Formik
      initialValues={{
        title: "",
      }}
      validationSchema={shortValidations.serviceValidation}
      onSubmit={(values, actions) => {
        // console.log(values);
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
                <Button color="success" className="mt-3">
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

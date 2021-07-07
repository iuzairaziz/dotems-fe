import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";

import shortValidations from "../../../../validations/short-validations";
import CountryService from "../../../../services/CountryService";
const CountryForm = (props) => {
  return (
    <Formik
      initialValues={{
        title: props.editable && props.country.name,
      }}
      validationSchema={shortValidations.countryValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? CountryService.updateCountry(props.country._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                CountryService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                CountryService.handleCustomMessage(err.response.data);
              })
          : CountryService.addCountry({ name: values.title })
              .then((res) => {
                CountryService.handleMessage("add");
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                CountryService.handleCustomMessage(err.response.data);
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

export default CountryForm;

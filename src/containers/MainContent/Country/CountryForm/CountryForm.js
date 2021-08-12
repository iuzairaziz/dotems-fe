import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import shortValidations from "../../../../validations/short-validations";
import CountryService from "../../../../services/CountryService";

const CountryForm = (props) => {
  const history = useHistory();

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
                history.push("/country");
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
                    className={`form-control ${
                      props.touched.title && props.errors.title
                        ? "is-invalid"
                        : props.touched.title && "is-valid"
                    }`}                       value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err" className="invalid-feedback">
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

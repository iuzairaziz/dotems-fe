import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import shortValidations from "../../../../validations/short-validations";
import DesignationService from "../../../../services/DesignationService";

const DesignationForm = (props) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        title: props.editable && props.country.name,
      }}
      validationSchema={shortValidations.countryValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? DesignationService.updateDesignation(props.country._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                DesignationService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                DesignationService.handleCustomMessage(err.response.data);
              })
          : DesignationService.addDesignation({ name: values.title })
              .then((res) => {
                props.toggle && props.toggle();
                DesignationService.handleMessage("add");
                if (props.redirect) {
                  history.push("/designation");
                }
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                DesignationService.handleCustomMessage(err.response.data);
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

export default DesignationForm;

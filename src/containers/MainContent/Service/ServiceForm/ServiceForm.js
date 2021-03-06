import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import ServiceServices from "../../../../services/ServiceService";
import { useHistory } from "react-router-dom";
import shortValidations from "../../../../validations/short-validations";

const ServiceForm = (props) => {
  const history = useHistory();

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
                ServiceServices.handleCustomMessage(err.response.data);
              })
          : ServiceServices.addService({ name: values.title })
              .then((res) => {
                props.toggle && props.toggle();
                ServiceServices.handleMessage("add");
                if (props.redirect) {
                  // history.push("/service");
                  actions.setFieldValue("title", "");
                }
              })
              .catch((err) => {
                ServiceServices.handleCustomMessage(err.response.data);
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

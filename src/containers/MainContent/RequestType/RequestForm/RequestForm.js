import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import RequestService from "../../../../services/RequestTypeService";
import shortValidations from "../../../../validations/short-validations";
const RequestForm = (props) => {
  return (
    <Formik
      initialValues={{
        title: props.editable && props.RequestType.name,
      }}
      validationSchema={shortValidations.requestTypeValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? RequestService.updateRequestType(props.RequestType._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                RequestService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                RequestService.handleCustomMessage(err.response.data);
              })
          : RequestService.addRequestType({ name: values.title })
              .then((res) => {
                props.toggle && props.toggle();
                RequestService.handleMessage("add");
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                RequestService.handleCustomMessage(err.response.data);
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
                    }`}                        value={props.values.title}
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

export default RequestForm;

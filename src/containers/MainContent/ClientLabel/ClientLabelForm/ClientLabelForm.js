import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import shortValidations from "../../../../validations/short-validations";
import ClientLabelService from "../../../../services/ClientLabelService";

const ClientLabelForm = (props) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        title: props.editable && props.country.name,
      }}
      validationSchema={shortValidations.clientLabelValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? ClientLabelService.updateClientLabel(props.country._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                ClientLabelService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                ClientLabelService.handleCustomMessage(err.response.data);
              })
          : ClientLabelService.addClientLabel({ name: values.title })
              .then((res) => {
                ClientLabelService.handleMessage("add");
                history.push("/view-clientlabel");
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                ClientLabelService.handleCustomMessage(err.response.data);
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

export default ClientLabelForm;

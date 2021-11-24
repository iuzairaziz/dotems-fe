import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import shortValidations from "../../../../validations/short-validations";
import StatusService from "../../../../services/StatusService";

const StatusForm = (props) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        status: props.editable && props.platform.name,
      }}
      validationSchema={shortValidations.statusValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? StatusService.updateStatus(props.platform._id, {
              name: values.status,
            })
              .then((res) => {
                props.toggle();
                StatusService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                StatusService.handleCustomMessage(err.response.data);
              })
          : StatusService.addStatus({ name: values.status })
              .then((res) => {
                props.toggle && props.toggle();
                StatusService.handleMessage("add");
                if (props.redirect) {
                  // history.push("/viewstatus");
                  actions.setFieldValue("status", "");
                }
              })
              .catch((err) => {
                StatusService.handleCustomMessage(err.response.data);
              });
      }}
    >
      {(props) => {
        return (
          <>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Status</label>
                  <input
                    type="text"
                    className={`form-control ${
                      props.touched.status && props.errors.status
                        ? "is-invalid"
                        : props.touched.status && "is-valid"
                    }`}
                    value={props.values.status}
                    onChange={props.handleChange("status")}
                    placeholder="Enter Name"
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.status && props.errors.status}
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

export default StatusForm;

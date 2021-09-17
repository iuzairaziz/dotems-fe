import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import shortValidations from "../../../../validations/short-validations";
import PlatformService from "../../../../services/PlatformService";
import { useHistory } from "react-router-dom";

const PlatformForm = (props) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        title: props.editable && props.platform.name,
      }}
      validationSchema={shortValidations.platformValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? PlatformService.updatePlatform(props.platform._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                PlatformService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                PlatformService.handleCustomMessage(err.response.data);
              })
          : PlatformService.addPlatform({ name: values.title })
              .then((res) => {
                props.toggle && props.toggle();
                PlatformService.handleMessage("add");
                if (props.redirect) {
                  history.push("/platform");
                  actions.setFieldValue("title", "");
                }
              })
              .catch((err) => {
                PlatformService.handleCustomMessage(err.response.data);
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

export default PlatformForm;

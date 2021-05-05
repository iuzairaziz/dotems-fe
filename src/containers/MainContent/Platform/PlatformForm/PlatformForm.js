import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";

import shortValidations from "../../../../validations/short-validations";
import PlatformService from "../../../../services/PlatformService";
const PlatformForm = (props) => {
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
                PlatformService.handleError();
              })
          : PlatformService.addPlatform({ name: values.title })
              .then((res) => {
                PlatformService.handleMessage("add");
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                PlatformService.handleError();
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
                  color="success"
                  className="mt-3"
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

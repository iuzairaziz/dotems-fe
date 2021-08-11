import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import shortValidations from "../../../../validations/short-validations";
import TechnologyService from "../../../../services/TechnologyService";

const TechnologyForm = (props) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        title: props.editable && props.technology.name,
      }}
      validationSchema={shortValidations.technologyValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? TechnologyService.updateTechnology(props.technology._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                TechnologyService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                TechnologyService.handleCustomMessage(err.response.data);
              })
          : TechnologyService.addTechnology({ name: values.title })
              .then((res) => {
                props.toggle && props.toggle();
                TechnologyService.handleMessage("add");
                history.push("/technology");
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                TechnologyService.handleCustomMessage(err.response.data);
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
                    }`}                      value={props.values.title}
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
                  // className=""
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

export default TechnologyForm;

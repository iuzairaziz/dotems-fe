import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import TaskPriorityService from "../../../../services/TaskPriority";
import shortValidations from "../../../../validations/short-validations";
import ClientLabelService from "../../../../services/ClientLabelService";

const TaskPriorityForm = (props) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        title: props.editable && props.country.name,
        color: props.editable && props.country.color,
      }}
      validationSchema={shortValidations.clientLabelValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? TaskPriorityService.updateTaskPriority(props.country._id, {
              name: values.title,
              color: values.color,
            })
              .then((res) => {
                props.toggle();
                TaskPriorityService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                TaskPriorityService.handleCustomMessage(err.response.data);
              })
          : TaskPriorityService.addTaskPriority({
              name: values.title,
              color: values.color,
            })
              .then((res) => {
                TaskPriorityService.handleMessage("add");
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                TaskPriorityService.handleCustomMessage(err.response.data);
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
            <div className="form-group row">
              <label for="example-color-input" className="col-2 col-form-label">
                Color
              </label>
              <div className="col-12">
                <input
                  className={`form-control ${
                    props.touched.color && props.errors.color
                      ? "is-invalid"
                      : props.touched.color && "is-valid"
                  }`}
                  value={props.values.color}
                  onChange={props.handleChange("color")}
                  type="color"
                  // id="example-color-input"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.color && props.errors.color}
                </span>
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

export default TaskPriorityForm;

import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import DepartmentService from "../../../../services/DepartmentService";
import shortValidations from "../../../../validations/short-validations";
import { useHistory } from "react-router-dom";

const DepartmentForm = (props) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        title: props.editable && props.Department.name,
      }}
      validationSchema={shortValidations.departmentValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? DepartmentService.updateDepartment(props.Department._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                DepartmentService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                DepartmentService.handleCustomMessage(err.response.data);
              })
          : DepartmentService.addDepartment({ name: values.title })
              .then((res) => {
                props.toggle && props.toggle();
                DepartmentService.handleMessage("add");
                if (props.redirect) {
                  history.push("/view-department");
                  actions.setFieldValue("title", "");
                }
              })
              .catch((err) => {
                DepartmentService.handleCustomMessage(err.response.data);
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

export default DepartmentForm;

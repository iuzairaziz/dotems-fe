import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import EmployeeTypeService from "../../../../services/EmployeeTypeService";
import shortValidations from "../../../../validations/short-validations";
import { useHistory } from "react-router-dom";

const EmployeeTypeForm = (props) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        title: props.editable && props.EmployeeType.name,
      }}
      validationSchema={shortValidations.employeeTypeValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? EmployeeTypeService.updateEmployeeType(props.EmployeeType._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                EmployeeTypeService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                EmployeeTypeService.handleCustomMessage(err.response.data);
              })
          : EmployeeTypeService.addEmployeeType({ name: values.title })
              .then((res) => {
                props.toggle && props.toggle();
                EmployeeTypeService.handleMessage("add");
                if (props.redirect) {
                  history.push("/view-employee-type");
                  actions.setFieldValue("title", "");
                }
              })
              .catch((err) => {
                EmployeeTypeService.handleCustomMessage(err.response.data);
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

export default EmployeeTypeForm;

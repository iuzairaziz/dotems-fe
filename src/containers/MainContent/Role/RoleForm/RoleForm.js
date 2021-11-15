import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import shortValidations from "../../../../validations/short-validations";
import RoleService from "../../../../services/RoleService";
import { useHistory } from "react-router-dom";

const RoleForm = (props) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        title: props.editable && props.role.name,
      }}
      validationSchema={shortValidations.RoleValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? RoleService.updateRole(props.role._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                RoleService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                RoleService.handleCustomMessage(err.response.data);
              })
          : RoleService.addRole({ name: values.title })
              .then((res) => {
                props.toggle && props.toggle();
                RoleService.handleMessage("add");
                if (props.redirect) {
                  history.push("/role");
                  actions.setFieldValue("title", "");
                }
              })
              .catch((err) => {
                RoleService.handleCustomMessage(err.response.data);
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

export default RoleForm;

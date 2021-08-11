import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import expenseValidation from "../../../../validations/expense-validations";
import { Dropdown, Button } from "reactstrap";
import ExpenseCategoryService from "../../../../services/ExpenseCategoryService";
import ProjectService from "../../../../services/ProjectService";
import { useHistory } from "react-router-dom";


const ExpensForm = (props) => {
  const user = props.user;
  const editable = props.editable;

  console.log("from project form ", user);

  return (
    <Formik
      initialValues={{
        name: editable && user.name,
      }}
      validationSchema={expenseValidation.newExpenseValidation}
      onSubmit={(values, actions) => {
        editable
          ? ProjectService.updateProject(user._id, {
              name: values.projectName,
            })
              .then((res) => {
                ProjectService.handleMessage("update");
                props.toggle();
              })
              .catch((err) => {
                ProjectService.handleCustomMessage(err.response.data);
                props.toggle();
              })
          : ExpenseCategoryService.addExpenseCategory({
              name: values.name,
            })
              .then((res) => {
                ExpenseCategoryService.handleMessage("add");
                
              })
              .catch((err) => {
                ExpenseCategoryService.handleCustomMessage(err.response.data);
              });
      }}
    >
      {(props) => (
        <>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Expense Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    props.touched.name && props.errors.name
                      ? "is-invalid"
                      : props.touched.name && "is-valid"
                  }`}                    value={props.values.name}
                  onChange={props.handleChange("name")}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback">{props.touched.name && props.errors.name}</span>
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
      )}
    </Formik>
  );
};

export default ExpensForm;

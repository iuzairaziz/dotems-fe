import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import expenseValidation from "../../../../validations/expense-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CountryService from "../../../../services/CountryService";
import ExpenseCategoryService from "../../../../services/ExpenseCategoryService";
import ProjectService from "../../../../services/ProjectService";
import PlatformService from "../../../../services/PlatformService";
import TechnologyService from "../../../../services/TechnologyService";
import ServiceService from "../../../../services/ServiceService";
import NatureService from "../../../../services/NatureService";
import userService from "../../../../services/UserService";
import ClientService from "../../../../services/ClientService";

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
                ProjectService.handleError();
                props.toggle();
              })
          : ExpenseCategoryService.addExpenseCategory({
              name: values.name,
            })
              .then((res) => {
                ExpenseCategoryService.handleMessage("add");
              })
              .catch((err) => {
                ExpenseCategoryService.handleError();
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
                  className="form-control"
                  value={props.values.name}
                  onChange={props.handleChange("name")}
                  placeholder="Enter Name"
                />
                <span id="err">{props.errors.name}</span>
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
      )}
    </Formik>
  );
};

export default ExpensForm;

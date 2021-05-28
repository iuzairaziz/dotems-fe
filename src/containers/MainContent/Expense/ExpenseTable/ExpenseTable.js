import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import expenseValidation from "../../../../validations/expense-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CountryService from "../../../../services/CountryService";
import ExpenseCategoryService from "../../../../services/ExpenseCategoryService";
import ExpenseService from "../../../../services/ExpenseService";
import ProjectService from "../../../../services/ProjectService";
import PlatformService from "../../../../services/PlatformService";
import TechnologyService from "../../../../services/TechnologyService";
import ServiceService from "../../../../services/ServiceService";
import NatureService from "../../../../services/NatureService";
import userService from "../../../../services/UserService";
import ClientService from "../../../../services/ClientService";

const ExpensForm = (props) => {
  const [data, setData] = useState([]);
  const [dbValues, setDBValues] = useState({});
  const [obj, setObj] = useState([{}]);

  const user = props.user;
  const editable = props.editable;
  console.log("from project form ", user);
  useEffect(() => {
    getExpenseCategory();
  }, []);

  const getExpenseCategory = () => {
    ExpenseCategoryService.getAllExpenseCategory().then((res) => {
      let options = [];
      let initialValues = {};
      res.data.map((item, index) => {
        options.push(item.name);
        initialValues[item.name] = "";
      });
      setData(options);
      setDBValues(initialValues);
    });
    console.log("Data Set object", data);
  };

  return (
    <Formik
      initialValues={dbValues}
      onSubmit={(values, actions) => {
        let keys = Object.keys(values);
        let toSend = [];
        keys.map((item) => {
          toSend.push({ name: item, cost: values[item] });
        });
        console.log(toSend);
        console.log(values);

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
          : ExpenseService.addExpense(toSend)
              .then((res) => {
                ExpenseService.handleMessage("add");
              })
              .catch((err) => {
                ExpenseService.handleError();
              });
      }}
    >
      {(props) => (
        <>
          {data.map((item, index) => {
            return (
              <>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>{item}</label>
                      <input
                        type="Number"
                        className="form-control"
                        name={item}
                        value={props.values[item]}
                        placeholder="Enter Cost"
                        onChange={(e) =>
                          props.setFieldValue(`${item}`, e.target.value)
                        }
                      />
                      <span id="err">{props.errors.name}</span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

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
import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import ExpenseCategoryService from "../../../../services/ExpenseCategoryService";
import ExpenseService from "../../../../services/ExpenseService";
import ProjectService from "../../../../services/ProjectService";
import { useHistory } from "react-router-dom";


const ExpensForm = (props) => {
  const [data, setData] = useState([]);
  const [dbValues, setDBValues] = useState({});
  const [multioptions, setMultioptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([{}]);

  const history = useHistory();
  const user = props.user;
  const editable = props.editable;
  console.log("from project form ", user);
  useEffect(() => {
    getExpense();
    getExpenseCategory();
  }, []);

  const getExpense = () => {
    ExpenseCategoryService.getAllExpenseCategory().then((res) => {
      let multiOption = [];
      res.data.map((item, index) => {
        multiOption.push({
          label: item.name,
          value: item.name,
        });
      });
      setMultioptions(multiOption);
      console.log("Multi Select options", multioptions);
    });
  };

  const getExpenseCategory = () => {
    ExpenseCategoryService.getAllExpenseCategory("").then((res) => {
      let options = [];
      let initialValues = {};
      multioptions.map((item, index) => {
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
        console.log("slected Option", selectedOption);
        let keys = Object.keys(values);
        let toSend = [];
        keys.map((item) => {
          toSend.push({
            name: item,
            cost: values[item],
            date: props.date,
          });
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
                history.push("/view-expense");
              })
              .catch((err) => {
                ExpenseService.handleError();
              });
      }}
    >
      {(props) => (
        <>
          <div className="form-group mb-0">
            <label className="control-label">Select Expenses</label>
            <Select
              onChange={(val) => {
                setSelectedOption(val);
              }}
              // value={selectedOption}
              options={multioptions}
              isMulti={true}
            />
            {/* <span id="err">{props.errors.teamMembers}</span> */}
          </div>
          {selectedOption.map((item, index) => {
            return (
              <>
                <div className="row" key={index}>
                  <div className="col">
                    <div className="form-group">
                      <label>{item.value}</label>
                      <input
                        type="Number"
                        className={`form-control ${
                          props.touched.name && props.errors.name
                            ? "is-invalid"
                            : props.touched.name && "is-valid"
                        }`}                          name={item}
                        value={props.values[item]}
                        placeholder="Enter Cost"
                        onChange={(e) =>
                          props.setFieldValue(`${item.label}`, e.target.value)
                        }
                      />
                      <span id="err" className="invalid-feedback">{props.errors.name}</span>
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

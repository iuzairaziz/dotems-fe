import React, { Component, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import ExpenseTable from "../ExpenseTable/ExpenseTable";
import DatePicker from "react-datepicker";
import Select from "react-select";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

const Expense = (props) => {
  const [date, setDate] = useState(new Date());

  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h3 className="mb-3">Add New Expense</h3>
                  <ExpenseForm />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h3 className="mb-3">Expense Table</h3>
                  <div className="form-group">
                    <label>Expense Date</label>
                    <div>
                      <DatePicker
                        className="form-control"
                        selected={date}
                        value={null}
                        onChange={(date) => {
                          console.log(
                            "Date Format Check",
                            moment(date).format("YYYY-MM-DD")
                          );
                          setDate(moment(date).format("YYYY-MM-DD"));
                          console.log("datepicker", date);
                        }}
                      />
                    </div>
                  </div>
                  <ExpenseTable date={date} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default Expense;

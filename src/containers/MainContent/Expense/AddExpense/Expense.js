import React, { Component, useState } from "react";
import AUX from "../../../../hoc/Aux_";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import ExpenseTable from "../ExpenseTable/ExpenseTable";
import DatePicker from "react-datepicker";
import Select from "react-select";

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
                  <h4 className="mt-0 header-title">Add New Expense</h4>
                  <ExpenseForm />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="mt-0 header-title">Expense Table</h4>
                  <div className="form-group">
                    <label>Start Date</label>
                    <div>
                      <DatePicker
                        className="form-control"
                        selected={date}
                        onChange={(date) => {
                          setDate(date);
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

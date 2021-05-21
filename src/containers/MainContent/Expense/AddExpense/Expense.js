import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import ExpenseTable from "../ExpenseTable/ExpenseTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddProjects extends Component {
  constructor() {
    super();
    this.state = {
      values: {},
    };
  }

  render() {
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
                          selected={this.state.values}
                          onChange={(date) => {
                            this.setState({ values: date });
                            console.log("datepicker", date);
                          }}
                        />
                      </div>
                    </div>
                    <ExpenseTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
}

export default AddProjects;

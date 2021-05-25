import React, { Component } from "react";
import AUX from "../../../hoc/Aux_";
import CurrencyForm from "../Currency/CurrencyForm"

class AddCurrency extends Component {
    constructor() {
      super();
      this.state = {};
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
                      <h4 className="mt-0 header-title">Add New Currency</h4>
                      <CurrencyForm />
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
  
  export default AddCurrency;
import React, { Component, useEffect, useState } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";
import $ from "jquery";
import CurrencyService from "../../../services/CurrencyService";
import { Button } from "reactstrap";

const CurrencyList = () => {
  const [selectedCurrency, setSelectedCurrency] = useState({ name: "" });
  const [data, setDataa] = useState();
  const [dataEUR, setDataaEUR] = useState();
  const [dataGBP, setDataaGBP] = useState();

  useEffect(() => {
    getCurrency();
    getCurrencyRates();
    getCurrencyGBP();
  }, []);

  const getCurrencyRates = async () => {
    var rates = await CurrencyService.onGet();
    setDataa(rates.USD_PKR.toFixed(2));
  };

  const getCurrency = async () => {
    var rates = await CurrencyService.onGetEUR();
    setDataaEUR(rates.EUR_PKR.toFixed(2));
  };

  const getCurrencyGBP = async () => {
    var rates = await CurrencyService.onGetGBP();
    setDataaGBP(rates.GBP_PKR.toFixed(2));
  };

  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <div className="row align-items-center mb-3">
                    <div className="col">
                      <h3 className="m-0 p-0">All Currencies</h3>
                    </div>
                    <div className="col">
                      <Link to="/addcurrency">
                        <Button
                          color="success"
                          className="my-primary-button float-right"
                        >
                          Add Currency
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <table className="table table-editable" id="mydtable">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Exchange Rate</th>
                      </tr>
                    </thead>
                    <tr>
                      <td>USD $</td>
                      <td>{data}</td>
                    </tr>
                    <tr>
                      <td>Euro €</td>
                      <td>{dataEUR}</td>
                    </tr>
                    <tr>
                      <td>Pound £</td>
                      <td>{dataGBP}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default CurrencyList;

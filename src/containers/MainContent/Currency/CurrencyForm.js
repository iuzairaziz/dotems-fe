
  import React from "react";
  import { Button } from "reactstrap";
  import { Formik } from "formik";
  
  import shortValidations from "../../../validations/short-validations";
  import CurrencyService from "../../../services/CurrencyService";

  const CurrencyForm = (props) => {
    return (
      <Formik
        initialValues={{
            name: props.editable && props.currency.name,
            exchangeRate: props.exchangeRate && props.currency.exchangeRate,
        }}
        validationSchema={shortValidations.CurrencyValidation}
        onSubmit={(values, actions) => {
          props.editable
            ? CurrencyService.updateCurrency(props.platform._id, {
                name: values.name,
                exchangeRate: values.exchangeRate,
              })
                .then((res) => {
                  props.toggle();
                  CurrencyService.handleMessage("update");
                })
                .catch((err) => {
                  props.toggle();
                  CurrencyService.handleError();
                })
            : CurrencyService.addCurrency({ name: values.name,
                exchangeRate: values.exchangeRate, })
                .then((res) => {
                    CurrencyService.handleMessage("add");
                  actions.setFieldValue("title", "");
                })
                .catch((err) => {
                    CurrencyService.handleError();
                });
        }}
      >
        {(props) => {
          return (
            <>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>Name</label>
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
                <div className="col">
                  <div className="form-group">
                    <label>Exchange Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      value={props.values.exchangeRate}
                      onChange={props.handleChange("exchangeRate")}
                      placeholder="Enter Exchange Rate"
                    />
                    <span id="err">{props.errors.exchangeRate}</span>
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
          );
        }}
      </Formik>
    );
  };
  
  export default CurrencyForm;
  
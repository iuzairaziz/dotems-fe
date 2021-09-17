import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import shortValidations from "../../../validations/short-validations";
import CurrencyService from "../../../services/CurrencyService";
import { useHistory } from "react-router-dom";

const CurrencyForm = (props) => {
  const history = useHistory();

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
                CurrencyService.handleCustomMessage(err.response.data);
              })
          : CurrencyService.addCurrency({
              name: values.name,
              exchangeRate: values.exchangeRate,
            })
              .then((res) => {
                props.toggle && props.toggle();
                CurrencyService.handleMessage("add");
                if (props.redirect) {
                  history.push("/viewcurrency");
                  actions.setFieldValue("title", "");
                }
              })
              .catch((err) => {
                CurrencyService.handleCustomMessage(err.response.data);
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
                    className={`form-control ${
                      props.touched.name && props.errors.name
                        ? "is-invalid"
                        : props.touched.name && "is-valid"
                    }`}
                    value={props.values.name}
                    onChange={props.handleChange("name")}
                    placeholder="Enter Name"
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.name && props.errors.name}
                  </span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Exchange Rate</label>
                  <input
                    type="text"
                    className={`form-control ${
                      props.touched.exchangeRate && props.errors.exchangeRate
                        ? "is-invalid"
                        : props.touched.exchangeRate && "is-valid"
                    }`}
                    value={props.values.exchangeRate}
                    onChange={props.handleChange("exchangeRate")}
                    placeholder="Enter Exchange Rate"
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.exchangeRate && props.errors.exchangeRate}
                  </span>
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
        );
      }}
    </Formik>
  );
};

export default CurrencyForm;

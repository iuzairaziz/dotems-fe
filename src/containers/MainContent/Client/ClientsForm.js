import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import clientValidation from "../../../validations/client-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ClientService from "../../../services/ClientService";
import CountryService from "../../../services/CountryService";
import AddCountryForm from "../Country/CountryForm/CountryForm";

import {
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const ClientsForm = (props) => {
  const [default_date, set_default_date] = useState(0);
  const [dataa, setData] = useState();
  const [country, setCountry] = useState([]);
  const [countryModal, setCountryModal] = useState(false);
  const history = useHistory();

  const handleDefault = (date) => {
    console.log(date);
    set_default_date(date);
  };

  console.log("Countryyyyyyyyyyy", country);

  const toggleCountryEdit = () => setCountryModal(!countryModal);

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = () => {
    CountryService.getAllCountry().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setCountry(options);
    });
  };
  const client = props.client;
  const editable = props.editable;
  console.log("from client form ", client);

  return (
    <Formik
      initialValues={{
        title: editable && client.name,
        compName: editable && client.companyName,
        email: editable && client.email,
        adrs: editable && client.address,
        conNum: editable && client.mobileNo,
        ul: editable && client.url,
        dateOfJoin: editable && client.dateOfJoin,
        country: editable &&
          client.country && {
            label: client.country.name,
            value: client.country._id,
          },
      }}
      validationSchema={clientValidation.authSchemaValidation}
      onSubmit={(values, actions) => {
        console.log("countries", values.country);
        editable
          ? ClientService.updateClient(client._id, {
              name: values.title,
              companyName: values.compName,
              email: values.email,
              address: values.adrs,
              mobileNo: values.conNum,
              dateOfJoin: values.dateOfJoin,
              url: values.ul,
              country: values.country.value,
            })
              .then((res) => {
                ClientService.handleMessage("update");
                props.toggle();
              })
              .catch((err) => {
                ClientService.handleCustomMessage(err.response.data);
                props.toggle();
              })
          : ClientService.addClient({
              name: values.title,
              companyName: values.compName,
              email: values.email,
              address: values.adrs,
              mobileNo: values.conNum,
              dateOfJoin: values.dateOfJoin,
              url: values.ul,
              country: values.country.value,
            })
              .then((res) => {
                props.toggle && props.toggle();
                ClientService.handleMessage("add");
                history.push("/viewclient");
              })
              .catch((err) => {
                ClientService.handleCustomMessage(err.response.data);
              });
        console.log("country", values.country);
      }}
    >
      {(props) => (
        <>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Client Name</label>
                <input
                  name="endTime"
                  onBlur={props.handleBlur}
                  type="title"
                  className={`form-control ${
                    props.touched.title && props.errors.title
                      ? "is-invalid"
                      : props.touched.title && "is-valid"
                  }`}
                  value={props.values.title}
                  onChange={props.handleChange("title")}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.title && props.errors.title}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  name="compName"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.compName && props.errors.compName
                      ? "is-invalid"
                      : props.touched.compName && "is-valid"
                  }`}
                  value={props.values.compName}
                  onChange={props.handleChange("compName")}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.compName && props.errors.compName}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.email && props.errors.email
                      ? "is-invalid"
                      : props.touched.email && "is-valid"
                  }`}
                  value={props.values.email}
                  onChange={props.handleChange("email")}
                  placeholder="Enter Email"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.email && props.errors.email}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Address</label>
                <input
                  name="adrs"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.adrs && props.errors.adrs
                      ? "is-invalid"
                      : props.touched.adrs && "is-valid"
                  }`}
                  value={props.values.adrs}
                  onChange={props.handleChange("adrs")}
                  placeholder="Enter Address"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.adrs && props.errors.adrs}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  name="conNum"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.conNum && props.errors.conNum
                      ? "is-invalid"
                      : props.touched.conNum && "is-valid"
                  }`}
                  value={props.values.conNum}
                  onChange={props.handleChange("conNum")}
                  placeholder="Enter Number"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.conNum && props.errors.conNum}
                </span>
              </div>
            </div>
            <div className="col">
              {" "}
              <div className="form-group">
                <label>Date of Joining</label>
                <div>
                  <DatePicker
                    name="dateOfJoin"
                    onBlur={props.handleBlur}
                    className={`form-control ${
                      props.touched.dateOfJoin && props.errors.dateOfJoin
                        ? "is-invalid"
                        : props.touched.dateOfJoin && "is-valid"
                    }`}
                    selected={props.values.dateOfJoin}
                    onChange={(date) => {
                      props.setFieldValue("dateOfJoin", date);
                      console.log("datepicker", date);
                    }}
                  />
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>URL</label>
                <input
                  name="ul"
                  onBlur={props.handleBlur}
                  type="text"
                  defaultValue="http://"
                  className={`form-control ${
                    props.touched.ul && props.errors.ul
                      ? "is-invalid"
                      : props.touched.ul && "is-valid"
                  }`}
                  value={props.values.ul}
                  onChange={props.handleChange("ul")}
                  placeholder="Enter URL"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.ul && props.errors.ul}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Country</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleCountryEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>
                <Select
                  name="country"
                  onBlur={props.handleBlur}
                  value={props.values.country}
                  className={`my-select${
                    props.touched.country && props.errors.country
                      ? "is-invalid"
                      : props.touched.country && "is-valid"
                  }`}
                  onChange={(val) => props.setFieldValue("country", val)}
                  options={country}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.country && props.errors.country}
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
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={countryModal}
            toggle={toggleCountryEdit}
          >
            <ModalHeader toggle={toggleCountryEdit}>New Country</ModalHeader>
            <ModalBody>
              <AddCountryForm toggle={toggleCountryEdit} />
            </ModalBody>
          </Modal>
        </>
      )}
    </Formik>
  );
};
export default ClientsForm;

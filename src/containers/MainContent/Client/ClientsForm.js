import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import clientValidation from "../../../validations/client-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ClientService from "../../../services/ClientService";
import CountryService from "../../../services/CountryService";

const ClientsForm = (props) => {
  const [default_date, set_default_date] = useState(0);
  const [dataa, setData] = useState();

  const handleDefault = (date) => {
    console.log(date);
    set_default_date(date);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    CountryService.getAllCountry().then((res) => {
      let data = { ...dataa };
    });
  };

  return (
    <Formik
      initialValues={{
        title: props.editable && props.client.clientName,
        title: props.editable && props.client.companyName,
        title: props.editable && props.client.Email,
        title: props.editable && props.client.Address,
        title: props.editable && props.client.contactNum,
        title: props.editable && props.client.url,
        title: props.editable && props.client.dateOfJoin,
        title: props.editable && props.client.country,
      }}
      validationSchema={clientValidation.authSchemaValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? ClientService.updateClient(props.client._id, {
              clientName: values.title,
              companyName: values.title,
              Email: values.title,
              Address: values.title,
              contactNum: values.title,
              dateOfJoin: values.title,
              url: values.title,
              country: values.title,
            })
              .then((res) => {
                props.toggle();
                ClientService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                ClientService.handleError();
              })
          : ClientService.addClient({ name: values.title })
              .then((res) => {
                ClientService.handleMessage("add");
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                ClientService.handleError();
              });
      }}
    >
      {(props) => (
        <>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.clientName}
                  onChange={props.handleChange("clientName")}
                  placeholder="Enter Name"
                />
                <span id="err">{props.errors.clientName}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.companyName}
                  onChange={props.handleChange("companyName")}
                  placeholder="Enter Name"
                />
                <span id="err">{props.errors.companyName}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.Email}
                  onChange={props.handleChange("Email")}
                  placeholder="Enter Email"
                />
                <span id="err">{props.errors.Email}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.Address}
                  onChange={props.handleChange("Address")}
                  placeholder="Enter Address"
                />
                <span id="err">{props.errors.Address}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.contactNum}
                  onChange={props.handleChange("contactNum")}
                  placeholder="Enter Number"
                />
                <span id="err">{props.errors.contactNum}</span>
              </div>
            </div>
            <div className="col">
              {" "}
              <div className="form-group">
                <label>Date of Joining</label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={default_date}
                    onChange={props.handleChange("dateOfJoin")}
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
                  type="text"
                  className="form-control"
                  value={props.values.url}
                  onChange={props.handleChange("url")}
                  placeholder="Enter URL"
                />
                <span id="err">{props.errors.URL}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Country</label>

                <Select
                  value={props.values.country}
                  onChange={props.handleChange("country")}
                  options={dataa}
                />
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
      )}
    </Formik>
  );
};
export default ClientsForm;

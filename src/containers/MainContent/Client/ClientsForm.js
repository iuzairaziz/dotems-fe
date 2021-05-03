import React, { Component } from "react";
import { Formik } from "formik";
import ClientValidation from "../../../validations/client-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";

const ClientsForm = () => {
  return (
    <Formik
      initialValues={{
        clientName: "",
        companyName: "",
        Email: "",
        Address: "",
        contactNum: "",
        otherContact: "",
        URL: "",
        country: "",
      }}
      validationSchema={ClientValidation.ClientSchemaValidation}
      onSubmit={(values, actions) => {
        // console.log(values);
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
              <div className="form-group">
                <label>Other Contact</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.otherContact}
                  onChange={props.handleChange("otherContact")}
                  placeholder="Enter Number"
                />
                <span id="err">{props.errors.otherContact}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.URL}
                  onChange={props.handleChange("URL")}
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
                  options={["Pakistan", "USA"]}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-mb-2">
              <Button color="success">Save</Button>{" "}
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

export default ClientsForm;

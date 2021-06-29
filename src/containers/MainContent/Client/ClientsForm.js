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
  const [country, setCountry] = useState([]);

  const handleDefault = (date) => {
    console.log(date);
    set_default_date(date);
  };

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = () => {
    CountryService.getAllCountry().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          value: item._id,
        });
        setCountry(options);
      });
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
                ClientService.handleError();
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
              })
              .catch((err) => {
                ClientService.handleError();
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
                  type="text"
                  className="form-control"
                  value={props.values.title}
                  onChange={props.handleChange("title")}
                  placeholder="Enter Name"
                />
                <span id="err">
                  {props.touched.title && props.errors.title}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.compName}
                  onChange={props.handleChange("compName")}
                  placeholder="Enter Name"
                />
                <span id="err">
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
                  type="text"
                  className="form-control"
                  value={props.values.email}
                  onChange={props.handleChange("email")}
                  placeholder="Enter Email"
                />
                <span id="err">
                  {props.touched.email && props.errors.email}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.adrs}
                  onChange={props.handleChange("adrs")}
                  placeholder="Enter Address"
                />
                <span id="err">{props.touched.adrs && props.errors.adrs}</span>
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
                  value={props.values.conNum}
                  onChange={props.handleChange("conNum")}
                  placeholder="Enter Number"
                />
                <span id="err">
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
                    className="form-control"
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
                  type="text"
                  className="form-control"
                  value={props.values.ul}
                  onChange={props.handleChange("ul")}
                  placeholder="Enter URL"
                />
                <span id="err">{props.touched.ul && props.errors.ul}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Country</label>
                <Select
                  value={props.values.country}
                  onChange={(val) => props.setFieldValue("country", val)}
                  options={country}
                />
                <span id="err">
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
        </>
      )}
    </Formik>
  );
};
export default ClientsForm;

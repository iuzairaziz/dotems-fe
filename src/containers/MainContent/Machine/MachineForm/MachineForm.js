import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import Select from "react-select";

import shortValidations from "../../../../validations/short-validations";
import CountryService from "../../../../services/CountryService";
import userService from "../../../../services/UserService";
const MachineForm = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    userService.getUsers("", "", "", "").then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ value: item._id, label: item.name });
      });
      setUsers(options);
    });
  };
  return (
    <Formik
      initialValues={{
        resourceName: props.editable && users,
      }}
      // validationSchema={shortValidations.countryValidation}
      onSubmit={(values, actions) => {
        console.log(users);
        props.editable
          ? CountryService.updateCountry(props.country._id, {
              name: values.title,
            })
              .then((res) => {
                props.toggle();
                CountryService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                CountryService.handleError();
              })
          : CountryService.addCountry({ name: values.title })
              .then((res) => {
                CountryService.handleMessage("add");
                actions.setFieldValue("title", "");
              })
              .catch((err) => {
                CountryService.handleError();
              });
      }}
    >
      {(props) => {
        return (
          <>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Machine Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err">{props.errors.title}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label className="control-label">Resource Name</label>
                  <Select
                    value={props.values.resourceName}
                    onChange={(val) => props.setFieldValue("resourceName", val)}
                    options={users}
                    isMulti={true}
                  />
                  <span id="err">{props.errors.teamMembers}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Processor</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err">{props.errors.title}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Memory</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err">{props.errors.title}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Graphics</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err">{props.errors.title}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Accessories</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err">{props.errors.title}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Display</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err">{props.errors.title}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Battery</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err">{props.errors.title}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Charger</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err">{props.errors.title}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Notes</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err">{props.errors.title}</span>
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

export default MachineForm;

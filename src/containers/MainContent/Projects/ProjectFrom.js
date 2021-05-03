import React, { Component, useState } from "react";
import { Formik } from "formik";
import ProjectValidation from "../../../validations/project-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProjectForm = () => {
  const [default_date, set_default_date] = useState(0);
  const [end_date, set_end_date] = useState(0);

  const handleDefault = (date) => {
    console.log(date);
    set_default_date(date);
  };
  const handleEnd = (date) => {
    console.log(date);
    set_end_date(date);
  };
  return (
    <Formik
      initialValues={{
        projectName: "",
        clientName: "",
        orderNum: "",
        cost: "",
        platform: "",
        technology: "",
        serviceType: "",
        status: "",
        startDate: "",
        endDate: "",
        projectManager: "",
        teamMembers: "",
        projectNature: "",
      }}
      validationSchema={ProjectValidation.ProjectSchemaValidation}
      onSubmit={(values, actions) => {
        // console.log(values);
      }}
    >
      {(props) => (
        <>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.projectName}
                  onChange={props.handleChange("projectName")}
                  placeholder="Enter Name"
                />
                <span id="err">{props.errors.projectName}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Client Name</label>

                <Select
                  value={props.values.clientName}
                  onChange={props.handleChange("clientName")}
                  options={["Pakistan", "USA"]}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Order Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.orderNum}
                  onChange={props.handleChange("orderNum")}
                  placeholder="Enter Order Number"
                />
                <span id="err">{props.errors.orderNum}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Platform</label>

                <Select
                  value={props.values.platform}
                  onChange={props.handleChange("platform")}
                  options={["Pakistan", "USA"]}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Technology</label>

                <Select
                  value={props.values.technology}
                  onChange={props.handleChange("technology")}
                  options={["Pakistan", "USA"]}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Services Type</label>

                <Select
                  value={props.values.serviceType}
                  onChange={props.handleChange("serviceType")}
                  options={["Pakistan", "USA"]}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Status</label>

                <Select
                  value={props.values.status}
                  onChange={props.handleChange("status")}
                  options={["Pakistan", "USA"]}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Project Nature</label>

                <Select
                  value={props.values.projectNature}
                  onChange={props.handleChange("projectNature")}
                  options={["Pakistan", "USA"]}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {" "}
              <div className="form-group">
                <label>Start Date</label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={default_date}
                    onChange={handleDefault}
                  />
                </div>
              </div>{" "}
            </div>
            <div className="col">
              {" "}
              <div className="form-group">
                <label>End Date</label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={end_date}
                    onChange={handleEnd}
                  />
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Project Manager</label>

                <Select
                  value={props.values.projectManager}
                  onChange={props.handleChange("projectManager")}
                  options={["Pakistan", "USA"]}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-0">
                <label className="control-label">Team Members</label>
                <Select
                  value={props.values.teamMembers}
                  onChange={props.handleChange("teamMembers")}
                  options={["Uzair", "Nehal", "Sarosh"]}
                  isMulti={true}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Cost</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.cost}
                  onChange={props.handleChange("cost")}
                  placeholder="Enter Amount"
                />
                <span id="err">{props.errors.cost}</span>
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

export default ProjectForm;

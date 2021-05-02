import React, { Component } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import ClientValidation from "../../../validations/client-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";

class AddClients extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const options = [
      { value: "Alaska", label: "Alaska" },
      { value: "Connecticut", label: "Connecticut" },
      { value: "Delaware", label: "Delaware" },
      { value: "Florida", label: "Florida" },
      { value: "Georgia", label: "Georgia" },
      { value: "Indiana", label: "Indiana" },
      { value: "Maine", label: "Maine" },
      { value: "Maryland", label: "Maryland" },
      { value: "Massachusetts", label: "Massachusetts" },
      { value: "Michigan", label: "Michigan" },
      { value: "New Hampshire", label: "New Hampshire" },
      { value: "New Jersey", label: "New Jersey" },
      { value: "New York", label: "New York" },
      { value: "North Carolina", label: "North Carolina" },
      { value: "Ohio", label: "Ohio" },
      { value: "Pennsylvania", label: "Pennsylvania" },
      { value: "Rhode Island", label: "Rhode Island" },
      { value: "South Carolina", label: "South Carolina" },
      { value: "Vermont", label: "Vermont" },
      { value: "Virginia", label: "Virginia" },
      { value: "West Virginia", label: "West Virginia" },
    ];
    const { selectedOption } = this.state;
    return (
      <AUX>
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">Add New Client</h4>

                    <Formik
                      initialValues={{
                        firstName: "",
                        lastName: "",
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
                                <span id="err">
                                  {props.errors.otherContact}
                                </span>
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
                                  options={options}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-mb-2">
                              <Button color="success">Save</Button>{" "}
                            </div>
                            <div className="col">
                              <Button outline color="danger">
                                Cancel
                              </Button>{" "}
                            </div>
                          </div>
                        </>
                      )}
                    </Formik>
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

export default AddClients;

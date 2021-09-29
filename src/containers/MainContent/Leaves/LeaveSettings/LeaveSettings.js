import React from "react";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";

const LeaveSettings = (props) => {
  return (
    <div className="leave-settings">
      <div className="container">
        <h1 className="mb-8">Leave Settings</h1>
        <div className="project-settings">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Notice Days</label>
                <input
                  name="projectName"
                  onBlur={props.handleBlur}
                  type="text"
                  //   className={`form-control ${
                  //     props.touched.projectName && props.errors.projectName
                  //       ? "is-invalid"
                  //       : props.touched.projectName && "is-valid"
                  //   }`}
                  //   value={props.values.projectName}
                  //   onChange={props.handleChange("projectName")}
                  placeholder="Enter Number of Days"
                  className="form-control"
                />
                <span id="err" className="invalid-feedback">
                  {/* {props.touched.projectName && props.errors.projectName}  */}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Sandwich</label>
                  </div>
                </div>
                <Select
                  //   name="currency"
                  //     onFocus={() => props.setFieldTouched("currency")}
                  //     className={`my-select ${
                  //       props.touched.currency && props.errors.currency
                  //         ? "is-invalid"
                  //         : props.touched.currency && "is-valid"
                  //     }`}
                  //     value={props.values.currency}
                  //     onChange={(val) => props.setFieldValue("currency", val)}
                  className="my-select"
                  options={[
                    { value: "Before", label: "Before" },
                    { value: "After", label: "After" },
                    { value: "Between", label: "Between" },
                  ]}
                />
                <span id="err" className="invalid-feedback">
                  {/* {props.touched.currency && props.errors.currency} */}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Days Off</label>
                  </div>
                </div>
                <Select
                  //   name="currency"
                  //     onFocus={() => props.setFieldTouched("currency")}
                  //     className={`my-select ${
                  //       props.touched.currency && props.errors.currency
                  //         ? "is-invalid"
                  //         : props.touched.currency && "is-valid"
                  //     }`}
                  //     value={props.values.currency}
                  //     onChange={(val) => props.setFieldValue("currency", val)}
                  className="my-select"
                  isMulti={true}
                  options={[
                    { value: "Monday", label: "Monday" },
                    { value: "Tuesday", label: "Tuesday" },
                    { value: "Wednesday", label: "Wednesday" },
                    { value: "Thursday", label: "Thursday" },
                    { value: "Friday", label: "Friday" },
                    { value: "Saturday", label: "Saturday" },
                    { value: "Sunday", label: "Sunday" },
                  ]}
                />
                <span id="err" className="invalid-feedback">
                  {/* {props.touched.currency && props.errors.currency} */}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <Button
              className="mt-3 my-primary-button"
              onClick={props.handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveSettings;

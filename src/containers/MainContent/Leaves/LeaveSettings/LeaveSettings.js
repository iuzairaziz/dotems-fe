import React from "react";
import Select from "react-select";

const LeaveSettings = (props) => {
  return (
    <div className="leave-settings">
      <div className="container">
        <h1>Project Settings</h1>
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
        </div>
      </div>
    </div>
  );
};

export default LeaveSettings;

import React from "react";
import { Formik } from "formik";
import authValidation from "../../../../validations/auth-validations";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Button } from "reactstrap";
const TaskForm = () => {
  return (
    <Formik
      initialValues={{
        title: "",
        project: "",
        estimatedHrs: 0,
        projectRatio: 0,
        parentTask: "",
      }}
      validationSchema={authValidation.authSchemaValidation}
      onSubmit={(values, actions) => {
        // console.log(values);
      }}
    >
      {(props) => {
        const formatPercent = (value) => value + "%";
        const formatHrs = (value) => value + " Hrs";

        return (
          <>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Title</label>
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
                  <label>Project</label>
                  <select
                    className="form-control"
                    value={props.values.project}
                    onChange={props.handleChange("project")}
                  >
                    <option>Select1</option>
                    <option>Large select</option>
                    <option>Small select</option>
                  </select>
                  <span id="err">{props.errors.project}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Estimated Hours</label>
                  <span id="right_badge" className="float-right">
                    {props.values.estimatedHrs + " Hours"}
                  </span>
                  <Slider
                    min={0}
                    max={100}
                    type="number"
                    //   step={0.5}
                    format={formatHrs}
                    value={props.values.estimatedHrs}
                    //   onChange={props.handleChange("projectRatio")}
                    onChange={(value) => {
                      // console.log("valueee==", value);
                      props.setFieldValue("estimatedHrs", value);
                    }}
                  />
                  <span id="err">{props.errors.estimatedHrs}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Parent Task</label>
                  <select
                    className="form-control"
                    value={props.values.parentTask}
                    onChange={props.handleChange("parentTask")}
                  >
                    <option>None</option>
                    <option>Task 1</option>
                    <option>Task 2</option>
                  </select>
                  <span id="err">{props.errors.parentTask}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Project Ratio</label>
                  <span id="right_badge" className="float-right">
                    {props.values.projectRatio + " %"}
                  </span>
                  <br />
                  <span id="left_badge">0</span>
                  <span id="right_badge" className="float-right">
                    100
                  </span>
                  <Slider
                    min={0}
                    max={100}
                    type="number"
                    format={formatPercent}
                    value={props.values.projectRatio}
                    //   onChange={props.handleChange("projectRatio")}
                    onChange={(value) => {
                      // console.log("valueee==", value);
                      props.setFieldValue("projectRatio", value);
                    }}
                  />
                  <span id="err">{props.errors.projectRatio}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Button color="success" className="mt-3">
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

export default TaskForm;

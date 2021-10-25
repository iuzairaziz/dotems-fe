import React from "react";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import { Formik } from "formik";
import LeaveService from "../../../../services/LeaveService";

const LeaveSettings = (props) => {
  const editable = props.editable;
  const leaveSettings = props.leaveSettings;

  var daysOf = [];

  editable &&
    leaveSettings.daysOff &&
    leaveSettings.daysOff.map((item) =>
      daysOf.push({ label: item, value: item })
    );

  return (
    <Formik
      initialValues={{
        sandwhich: editable &&
          leaveSettings.sandwhich && {
            label: leaveSettings.sandwhich,
            value: leaveSettings.sandwhich,
          },
        noticeDays: editable && leaveSettings.noticeDays,
        daysOff: editable && leaveSettings.daysOff && daysOf ? daysOf : [],
        timesheetSave: editable && leaveSettings.timesheetSave && {
          label: leaveSettings.timesheetSave,
          value: leaveSettings.timesheet,
        }
      }}
      onSubmit={(values, actions) => {
        const days = [];
        values.daysOff.map((item) => {
          days.push(item.value);
          console.log("user days", days);
        });
        // const projectSettings = {};
        // projectSettings.noticeDays = values.noticeDays,
        // projectSettings.sandwhich = values.sandwhich.value,
        // projectSettings.daysOff = days,
        // projectSettings.timesheetSave = values.timesheetSave.value,
        // props.editable
        //   ? LeaveService.leaveSettings(props.nature._id, {
        //       noticeDays: values.noticeDays,
        //       sandwhich: values.sandwhich.value,
        //       daysOff: days,
        //       timesheetSave: values.timesheetSave.value,
        //     })
        //       .then((res) => {
        //         props.toggle();
        //         LeaveService.handleMessage("update");
        //       })
        //       .catch((err) => {
        //         props.toggle();
        //         LeaveService.handleCustomMessage(err.response.data);
        //       })
        //   :
           LeaveService.leaveSettings(
            {
              noticeDays: values.noticeDays,
              sandwhich: values.sandwhich.value,
              daysOff: days,
              timesheetSave: values.timesheetSave.value,
            }
            )
              .then((res) => {
                props.toggle && props.toggle();
                LeaveService.handleMessage("add");
                if (props.redirect) {
                  actions.setFieldValue("title", "");
                }
              })
              .catch((err) => {
                LeaveService.handleCustomMessage(err.response.data);
              });
      }}
    >
      {(props) => {
        return (
          <>
            <div className="leave-settings">
              <div className="container">
                <h1 className="mb-4 mt-3"> Settings</h1>
                <div className="project-settings">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>Notice Days</label>
                        <input
                          name="noticeDays"
                          onBlur={props.handleBlur}
                          type="text"
                          className={`form-control ${
                            props.touched.noticeDays && props.errors.noticeDays
                              ? "is-invalid"
                              : props.touched.noticeDays && "is-valid"
                          }`}
                          value={props.values.noticeDays}
                          onChange={props.handleChange("noticeDays")}
                          placeholder="Enter Number of Days"
                          // className="form-control"
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.noticeDays && props.errors.noticeDays}
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
                          name="sandwhich"
                          onBlur={props.handleBlur}
                          className={`my-select${
                            props.touched.sandwhich && props.errors.sandwhich
                              ? "is-invalid"
                              : props.touched.sandwhich && "is-valid"
                          }`}
                          value={props.values.sandwhich}
                          onChange={(selected) => {
                            props.setFieldValue("sandwhich", selected);
                          }}
                          defaultValue={props.values.sandwhich}
                          options={[
                            { value: "before", label: "Before" },
                            { value: "after", label: "After" },
                            { value: "between", label: "Between" },
                          ]}
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.sandwhich && props.errors.sandwhich}
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
                          name="daysOff"
                          className={`my-select${
                            props.touched.daysOff && props.errors.daysOff
                              ? "is-invalid"
                              : props.touched.daysOff && "is-valid"
                          }`}
                          onBlur={props.handleBlur}
                          value={props.values.daysOff}
                          isMulti={true}
                          onChange={(selected) => {
                            props.setFieldValue("daysOff", selected);
                          }}
                          options={[
                            { value: "monday", label: "Monday" },
                            { value: "tuesday", label: "Tuesday" },
                            { value: "wednesday", label: "Wednesday" },
                            { value: "thursday", label: "Thursday" },
                            { value: "friday", label: "Friday" },
                            { value: "saturday", label: "Saturday" },
                            { value: "sunday", label: "Sunday" },
                          ]}
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.daysOff && props.errors.daysOff}
                        </span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <div className="row">
                          <div className="col">
                            <label className="control-label">Timesheet</label>
                          </div>
                        </div>
                        <Select
                          name="timesheetSave"
                          onBlur={props.handleBlur}
                          className={`my-select${
                            props.touched.timesheetSave && props.errors.timesheetSave
                              ? "is-invalid"
                              : props.touched.timesheetSave && "is-valid"
                          }`}
                          value={props.values.timesheetSave}
                          onChange={(selected) => {
                            props.setFieldValue("timesheetSave", selected);
                          }}
                          defaultValue={props.values.timesheetSave}
                          options={[
                            { value: "daily", label: "Daily" },
                            { value: "weekend", label: "Weekend" },
                          ]}
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.timesheetSave && props.errors.timesheetSave}
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
          </>
        );
      }}
    </Formik>
  );
};

export default LeaveSettings;

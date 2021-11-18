import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import shortValidations from "../../../../validations/short-validations";
import { useHistory, useParams } from "react-router-dom";
import WorkingDayService from "../../../../services/WorkingDayService";
import WorkingHoursService from "../../../../services/WorkingHoursService";
import workingShiftService from "../../../../services/workingShiftService";

const WorkingShiftForm = (props) => {
  const history = useHistory();
  const { id } = useParams();
  console.log("Working day id", id);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, []);
  const getData = () => {
    WorkingHoursService.getWorkingHourById(id)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  console.log("Working Hour", data);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: props.editable
          ? props.workingHours.name
          : data
          ? data.name
          : null,
        startTime: props.editable
          ? props.workingHours.hours
          : data
          ? data.hours
          : null,
        endTime: props.editable
          ? props.workingHours.hours
          : data
          ? data.hours
          : null,
        startBreakTime: props.editable
          ? props.workingHours.hours
          : data
          ? data.hours
          : null,
        EndBreakTime: props.editable
          ? props.workingHours.hours
          : data
          ? data.hours
          : null,
      }}
      validationSchema={shortValidations.workingShiftValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? WorkingHoursService.updateWorkingHours(props.workingHours._id, {
              name: values.title,
              hours: values.hours,
            })
              .then((res) => {
                props.toggle();
                WorkingHoursService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                WorkingDayService.handleCustomMessage(err.response.data);
              })
          : workingShiftService
              .addWorkingShift({
                name: values.title,
                startTime: values.startTime,
                endTime: values.endTime,
                startBreakTime: values.startBreakTime,
                endBreakTime: values.EndBreakTime,
              })
              .then((res) => {
                props.toggle && props.toggle();
                WorkingDayService.handleMessage("add");
                if (props.redirect) {
                  history.push("/nature");
                  actions.setFieldValue("title", "");
                }
              })
              .catch((err) => {
                WorkingDayService.handleCustomMessage(err.response.data);
              });
      }}
    >
      {(props) => {
        return (
          <>
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        name="title"
                        type="text"
                        className={`form-control ${
                          props.touched.title && props.errors.title
                            ? "is-invalid"
                            : props.touched.title && "is-valid"
                        }`}
                        disabled={id}
                        value={props.values.title}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="Enter Name"
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.title && props.errors.title}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Start Time</label>
                      <input
                        name="startTime"
                        type="time"
                        className={`form-control ${
                          props.touched.startTime && props.errors.startTime
                            ? "is-invalid"
                            : props.touched.startTime && "is-valid"
                        }`}
                        disabled={id}
                        value={props.values.startTime}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.startTime && props.errors.startTime}
                      </span>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>End Time</label>
                      <input
                        name="endTime"
                        type="time"
                        className={`form-control ${
                          props.touched.endTime && props.errors.endTime
                            ? "is-invalid"
                            : props.touched.endTime && "is-valid"
                        }`}
                        disabled={id}
                        value={props.values.endTime}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.endTime && props.errors.endTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Start Break Time</label>
                      <input
                        name="startBreakTime"
                        type="time"
                        className={`form-control ${
                          props.touched.startBreakTime &&
                          props.errors.startBreakTime
                            ? "is-invalid"
                            : props.touched.startBreakTime && "is-valid"
                        }`}
                        disabled={id}
                        value={props.values.startBreakTime}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.startBreakTime &&
                          props.errors.startBreakTime}
                      </span>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>End Break Time</label>
                      <input
                        name="EndBreakTime"
                        type="time"
                        className={`form-control ${
                          props.touched.EndBreakTime &&
                          props.errors.EndBreakTime
                            ? "is-invalid"
                            : props.touched.EndBreakTime && "is-valid"
                        }`}
                        disabled={id}
                        value={props.values.EndBreakTime}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.EndBreakTime &&
                          props.errors.EndBreakTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!id && (
              <div className="row">
                <div className="col">
                  <Button
                    className="mt-3 my-primary-button"
                    onClick={props.handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default WorkingShiftForm;

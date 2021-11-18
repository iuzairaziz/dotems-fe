import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import shortValidations from "../../../../validations/short-validations";
import { useHistory, useParams } from "react-router-dom";
import WorkingDayService from "../../../../services/WorkingDayService";
import WorkingHoursService from "../../../../services/WorkingHoursService";

const WorkingHoursForm = (props) => {
  const history = useHistory();
  const { id } = useParams();
  console.log("Working day id", id);
  const [data, setData] = useState(null);
  const [time, setTime] = useState("");
  console.log(time);
  console.log(typeof time);

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
        hours: props.editable
          ? props.workingHours.hours
          : data
          ? data.hours
          : null,
      }}
      validationSchema={shortValidations.workingHoursValidation}
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
          : WorkingHoursService.addWorkingHours({
              name: values.title,
              hours: values.hours,
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
                  <div className="col">
                    <div className="form-group">
                      <label>Hours</label>
                      <input
                        name="hours"
                        type="number"
                        className={`form-control ${
                          props.touched.hours && props.errors.hours
                            ? "is-invalid"
                            : props.touched.hours && "is-valid"
                        }`}
                        disabled={id}
                        value={props.values.hours}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="Enter Hours"
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.hours && props.errors.hours}
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

export default WorkingHoursForm;

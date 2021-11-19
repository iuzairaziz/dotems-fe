import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Field, Formik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import AttendanceService from "../../../services/AttendanceService";
import moment from "moment";

const AttendanceForm = (props) => {
  const history = useHistory();
  const { id } = useParams();
  console.log("Working day id", id);

  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    setDate(moment().format("D-M-YYYY"));
    setTime(moment().format("H:mm"));
    console.log(time, date);
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        timeIn: false,
        timeOut: false,
        name: date && date,
        time: time && time,
        date: date && date,
        latitude: latitude && latitude,
        longitude: longitude && longitude,
      }}
      onSubmit={(values, actions) => {
        console.log(values);
        values.timeIn &&
          AttendanceService.addTimeInAttendance({
            name: values.name,
            time: values.time,
            date: values.date,
            latitude: values.latitude,
            longitude: values.longitude,
          })
            .then((res) => {
              props.toggle && props.toggle();
              AttendanceService.handleMessage("add");
              if (props.redirect) {
                history.push("/nature");
                actions.setFieldValue("title", "");
              }
            })
            .catch((err) => {
              AttendanceService.handleCustomMessage(err.response.data);
            });
        values.timeOut &&
          AttendanceService.addTimeInAttendance({
            name: values.name,
            time: values.time,
            date: values.date,
            latitude: values.latitude,
            longitude: values.longitude,
          })
            .then((res) => {
              props.toggle && props.toggle();
              AttendanceService.handleMessage("add");
              if (props.redirect) {
                history.push("/nature");
                actions.setFieldValue("title", "");
              }
            })
            .catch((err) => {
              AttendanceService.handleCustomMessage(err.response.data);
            });
      }}
    >
      {(props) => {
        return (
          <>
            <div className="row justify-content-center align-items-center">
              <div className="col=md-4">
                <div className="form-group">
                  <label>Time In</label>
                </div>
              </div>
              <div className="col-md-4">
                {" "}
                <Field
                  name="timeIn"
                  type="checkbox"
                  className={`form-control ${
                    props.touched.timeIn && props.errors.timeIn
                      ? "is-invalid"
                      : props.touched.timeIn && "is-valid"
                  }`}
                  disabled={id}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.timeIn && props.errors.timeIn}
                </span>
              </div>

              <div className="col-md-4">
                {" "}
                <Button
                  type="submit"
                  className="mt-3 my-primary-button"
                  onClick={props.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
            <div className="row justify-content-center align-items-center">
              <div className="col=md-4">
                <div className="form-group">
                  <label>Time Out</label>
                </div>
              </div>
              <div className="col-md-4">
                {" "}
                <Field
                  name="timeOut"
                  type="checkbox"
                  className={`form-control ${
                    props.touched.timeOut && props.errors.timeOut
                      ? "is-invalid"
                      : props.touched.timeOut && "is-valid"
                  }`}
                  disabled={id}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.title && props.errors.title}
                </span>
              </div>
              <div className="col-md-4">
                {" "}
                <Button
                  className="mt-3 my-primary-button"
                  onClick={props.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>

            {!id && (
              <div className="row">
                <div className="col" />
              </div>
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default AttendanceForm;

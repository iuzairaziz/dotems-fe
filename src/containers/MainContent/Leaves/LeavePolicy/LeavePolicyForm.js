import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import shortValidations from "../../../../validations/short-validations";
import { MDBDataTableV5 } from "mdbreact";
import { useHistory, useParams } from "react-router-dom";
import WorkingDayService from "../../../../services/WorkingDayService";
import WorkingHoursService from "../../../../services/WorkingHoursService";
import LeaveType from "../../../../services/LeaveService";
import moment from "moment";

const LeavePolicyForm = (props) => {
  const history = useHistory();
  const { id } = useParams();
  console.log("Working day id", id);
  const [data, setData] = useState(null);
  const [time, setTime] = useState("");

  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [workingHours, setWorkingHours] = useState({
    name: "",
    hours: "",
  });
  console.log(time);
  console.log(typeof time);

  const [dataa, setDataa] = useState({
    columns: [
      {
        label: "Enable",
        field: "check",
        sort: "asc",
      },
      {
        label: "Type",
        field: "type",
        sort: "asc",
      },
      {
        label: "Effective Date",
        field: "effectiveDate",
        sort: "asc",
      },
      {
        label: "Total Leave",
        field: "TotalLeave",
        sort: "asc",
      },
      {
        label: "Max Per Mo Leave",
        field: "maxPerMonthLeave",
        sort: "asc",
      },
      {
        label: "DisAlowNegbal",
        field: "DisAllowNeqBal",
        sort: "asc",
      },
      {
        label: "sandwich",
        field: "sandwich",
        sort: "asc",
      },
      {
        label: "notice period",
        field: "noticePeriod",
        sort: "asc",
      },
      {
        label: "sandwich",
        field: "sandwich2",
        sort: "asc",
      },
    ],
    rows: [],
  });

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);
  const [checkbox1, setCheckbox1] = useState("");

  const showLogs2 = (e) => {
    setCheckbox1(e);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      console.log(typeof position.coords.longitude);

      var date = moment().format("D-M-YYYY");
      var time = moment().format("H:mm");
      console.log(time, date);
      //   var today = new Date().toLocaleDateString();
      //   var time =
      //     today.getDate() +
      //     "-" +
      //     today.getMonth() +
      //     "-" +
      //     today.getFullYear() +
      //     "-" +
      //     today.getHours() +
      //     ":" +
      //     today.getMinutes();
      console.log(time);
    });
    // getData();
  }, []);
  const getData = () => {
    LeaveType.getAllLeaveType()
      .then((res) => {
        console.log(res);
        let updatedData = { ...dataa };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            type: item.name ? item.name : "N/A",
            effectiveDate: (
              <div className="form-group">
                <input
                  name="title"
                  type="text"
                  //   className={`form-control ${
                  //     props.touched.title && props.errors.title
                  //       ? "is-invalid"
                  //       : props.touched.title && "is-valid"
                  //   }`}
                  disabled={id}
                  //   value={props.values.title}
                  //   onChange={props.handleChange}
                  //   onBlur={props.handleBlur}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback">
                  {/* {props.touched.title && props.errors.title} */}
                </span>
              </div>
            ),
            TotalLeave: (
              <div className="form-group">
                <input
                  name="title"
                  type="date"
                  disabled={id}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback" />
              </div>
            ),
            maxPerMonthLeave: (
              <div className="form-group">
                <input
                  name="title"
                  type="text"
                  disabled={id}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback" />
              </div>
            ),
            DisAllowNeqBal: (
              <div className="form-group">
                <input
                  name="title"
                  type="text"
                  disabled={id}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback" />
              </div>
            ),
            noticePeriod: (
              <div className="form-group">
                <input
                  name="title"
                  type="text"
                  disabled={id}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback" />
              </div>
            ),
            sandwich: (
              <div className="form-group">
                <input
                  name="title"
                  type="text"
                  disabled={id}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback" />
              </div>
            ),
            sandwich2: (
              <div className="form-group">
                <input
                  name="title"
                  type="text"
                  disabled={id}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback" />
              </div>
            ),
          });
        });
        console.log("clients", updatedData);

        setDataa(updatedData);
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
                </div>
                <div className="row">
                  <MDBDataTableV5
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={dataa}
                    checkbox
                    headCheckboxID="id2"
                    bodyCheckboxID="checkboxes2"
                    getValueCheckBox={(e) => {
                      showLogs2(e);
                    }}
                  />
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

export default LeavePolicyForm;

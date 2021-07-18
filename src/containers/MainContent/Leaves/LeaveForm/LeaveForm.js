import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MultipleDatePicker from "react-multiple-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { Formik } from "formik";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Dropdown, Button } from "reactstrap";
import LeaveService from "../../../../services/LeaveService";
import { useState } from "react";
import { useEffect } from "react";
import userService from "../../../../services/UserService";
import moment from "moment";

const LeaveForm = (props) => {
  const editable = props.editable;
  const project = props.project;
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [sandwhichSpan, setSandwhichSpan] = useState(false);
  const [probationSpan, setProbationSpan] = useState(false);
  const [leaveCount, setLeaveCount] = useState(0);
  const loggedInUser = userService.userLoggedInInfo();

  useEffect(() => {
    getleaveTypes();
    if (loggedInUser.userRole === "Probation") {
      setProbationSpan(true);
    }
  }, []);

  const getleaveTypes = () => {
    LeaveService.getAllLeaveType()
      .then((res) => {
        let options = []; // for react select
        res.data.map((item, index) => {
          options.push({ label: item.name, value: item._id });
        });
        if (loggedInUser.status === "Single") {
          let filterArray = [];
          filterArray = options.filter((item) => item.label !== "Maternity");
          console.log("Filter Array", filterArray);
          setLeaveTypes(filterArray);
          console.log("admin");
        } else {
          setLeaveTypes(options);
        }
      })
      .catch((err) => {
        LeaveService.handleCustomMessage(err.response.data);
      });
  };

  return (
    <Formik
      initialValues={{
        leaveDates: editable && project.leaveDate,
        leaveType: editable && project.leaveType,
        description: editable
          ? EditorState.createWithContent(
              convertFromRaw(JSON.parse(project.description))
            )
          : EditorState.createEmpty(),
      }}
      //   validationSchema={clientValidation.authSchemaValidation}
      onSubmit={(values, actions) => {
        console.log("countries", values.country);
        LeaveService.newLeave({
          user: loggedInUser._id,
          type: values.leaveType.value,
          description: JSON.stringify(
            convertToRaw(values.description.getCurrentContent())
          ),
          dates: values.leaveDates,
        })
          .then((res) => {
            props.toggle && props.toggle();
            actions.resetForm();
            LeaveService.handleMessage("add");
          })
          .catch((err) => {
            LeaveService.handleCustomMessage(err.response.data);
          });
        console.log("country", values.country);
      }}
    >
      {(props) => (
        <>
          <div className={`${probationSpan ? "sandwhich" : "sandwhich2"} mb-3`}>
            Note:- All Leaves Will Be Paid Leaves
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Leave Type</label>
                <Select
                  name="leaveType"
                  className="zIndex"
                  onBlur={props.handleBlur}
                  value={props.values.leaveType}
                  onChange={(selected) => {
                    props.setFieldValue("leaveType", selected);
                  }}
                  options={leaveTypes}
                />
                <span id="err">
                  {props.touched.leaveType && props.errors.leaveType}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label>Leave Dates</label>
                  </div>
                  <div className="col d-flex justify-content-end">
                    <div>Leave Count :- {leaveCount}</div>
                  </div>
                </div>
                <div>
                  <div className="input-group-multi">
                    <MultipleDatePicker
                      id="uniqueTxt"
                      name="leaveDates"
                      onBlur={props.handleBlur}
                      onSubmit={(dates) => {
                        setSandwhichSpan(false);
                        let formattedDates = [];
                        console.log("dass", dates);
                        dates.map((item) => {
                          formattedDates.push(
                            moment(item).format("YYYY-MM-DD")
                          );
                        });
                        console.log(formattedDates);
                        let arr = [];

                        dates.map((date) => {
                          var dt = moment(date).format("YYYY-MM-DD");
                          arr.push(dt);
                        });

                        let sandwhich = arr.filter(
                          (item) => moment(item).format("dddd") === "Friday"
                        );
                        let sandwhich1 = arr.filter(
                          (item) => moment(item).format("dddd") === "Monday"
                        );
                        console.log("Length", sandwhich.length);
                        for (
                          let counter = 0;
                          counter < sandwhich.length;
                          counter++
                        ) {
                          if (
                            moment(sandwhich[counter]).format("dddd") ===
                            "Friday"
                          ) {
                            if (
                              moment(sandwhich1[counter]).format("dddd") ===
                              "Monday"
                            ) {
                              var new_date = moment(
                                sandwhich[counter],
                                "YYYY-MM-DD"
                              )
                                .add("days", 1)
                                .format("YYYY-MM-DD");
                              var new_date1 = moment(
                                sandwhich[counter],
                                "YYYY-MM-DD"
                              )
                                .add("days", 2)
                                .format("YYYY-MM-DD");
                              console.log(new_date);
                              console.log(new_date1);

                              let finalSandwhich = [];
                              finalSandwhich.push(new_date, new_date1);
                              finalSandwhich.map((item) => {
                                formattedDates.push(item);
                              });
                              console.log("Formatted Dates", formattedDates);
                              setSandwhichSpan(true);
                            }
                          } else {
                            formattedDates.pop();
                            setLeaveCount(0);
                          }
                        }
                        let dateObjs = [];
                        formattedDates.map((item) => {
                          dateObjs.push(new Date(item));
                        });
                        props.setFieldValue("leaveDates", formattedDates);
                        setLeaveCount(formattedDates.length);
                      }}
                    />
                    <span
                      className={`${
                        sandwhichSpan ? "sandwhich" : "sandwhich2"
                      }`}
                    >
                      It will be considered a sandwhich
                    </span>
                    <span id="err">
                      {props.touched.leaveDates && props.errors.leaveDates}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <h4 className="mt-0 header-title">Description</h4>
              <Editor
                name="description"
                onBlur={props.handleBlur}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editor"
                editorState={props.values.description}
                onEditorStateChange={(val) => {
                  props.setFieldValue("description", val);
                }}
              />
              <span id="err">
                {props.touched.description && props.errors.description}
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Button
                color="success"
                className="mt-3 my-primary-button"
                onClick={props.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

export default LeaveForm;

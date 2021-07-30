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
import Configuration from "../../../../config/configuration";

const LeaveForm = (props) => {
  const editable = props.editable;
  const project = props.project;
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [sandwhichSpan, setSandwhichSpan] = useState(false);
  const [probationSpan, setProbationSpan] = useState(false);
  const [pendingLeaveSpan, setPendingLeaveSpan] = useState(false);
  const [leaveCount, setLeaveCount] = useState(0);
  const loggedInUser = userService.userLoggedInInfo();
  const [remainingLeave, setRemaingLeave] = useState([]);
  const [pendingLeave, setPendingLeave] = useState({});
  const [selectedType, setSelectedType] = useState({});
  const totalLeave =
    leaveTypes &&
    leaveTypes.filter((item) => item.value === selectedType.value)[0];
  console.log("Total", totalLeave);

  const Roles = new Configuration().Roles;

  useEffect(() => {
    getleaveTypes();
    if (loggedInUser.userRole === Roles.Probation) {
      setProbationSpan(true);
    }
  }, []);

  const getRemainingLeave = (formData) => {
    LeaveService.typeRemainingLeaves(formData)
      .then((res) => {
        const leaves = res.data;
        setRemaingLeave(leaves);
        console.log("leave data", leaves);
      })
      .catch((err) => {
        LeaveService.handleCustomMessage(err.response.data);
      });
  };
  const getPendingLeave = (formData) => {
    LeaveService.pendingLeaves(formData)
      .then((res) => {
        const leaves = res.data;
        setPendingLeave(leaves);
        if (leaves.pendingLeaves > 0) {
          setPendingLeaveSpan(true);
        } else {
          setPendingLeaveSpan(false);
        }
        console.log("pending leave data", leaves);
      })
      .catch((err) => {
        LeaveService.handleCustomMessage(err.response.data);
      });
  };

  useEffect(() => {
    getRemainingLeave({
      leaveType: selectedType && selectedType.value,
      user: loggedInUser._id,
    });
    getPendingLeave({
      leaveType: selectedType && selectedType.value,
      user: loggedInUser._id,
    });
  }, [selectedType]);

  const getleaveTypes = () => {
    LeaveService.getAllLeaveType()
      .then((res) => {
        let options = []; // for react select

        res.data.map((item, index) => {
          options.push({
            label: item.name,
            value: item._id,
            totalLeaves: item.totalLeaves,
          });
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
            LeaveService.handleMessage("applied");
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
            Note: All Leaves Will Be Paid Leaves
          </div>
          <div
            className={`${pendingLeaveSpan ? "sandwhich" : "sandwhich2"} mb-3`}
          >
            {totalLeave && totalLeave.totalLeaves
              ? totalLeave.totalLeaves - remainingLeave.usedLeaves > 0 ||
                typeof remainingLeave.usedLeaves === "undefined"
                ? `${
                    pendingLeave.pendingLeaves >
                    totalLeave.totalLeaves - remainingLeave.usedLeaves
                      ? `Note: You Have ${
                          pendingLeave.pendingLeaves
                        } Pending Leaves if ${
                          totalLeave && totalLeave.totalLeaves
                            ? totalLeave.totalLeaves -
                                remainingLeave.usedLeaves <
                              0
                              ? "0"
                              : remainingLeave.usedLeaves
                              ? totalLeave.totalLeaves -
                                remainingLeave.usedLeaves
                              : "0"
                            : totalLeave && totalLeave.totalLeaves
                        } Remaining Leaves Are Approved Then ${
                          totalLeave && totalLeave.totalLeaves
                            ? totalLeave.totalLeaves -
                                remainingLeave.usedLeaves <
                              0
                              ? "0"
                              : remainingLeave.usedLeaves
                              ? Math.abs(
                                  totalLeave.totalLeaves -
                                    remainingLeave.usedLeaves -
                                    pendingLeave.pendingLeaves
                                )
                              : "0"
                            : totalLeave && totalLeave.totalLeaves
                        } Leaves Will Be Unpaid`
                      : `Note: You Have ${
                          pendingLeave.pendingLeaves
                        } Pending Leaves`
                  } `
                : `Note: You Have ${
                    pendingLeave.pendingLeaves
                  } Pending Leaves Your  ${
                    pendingLeave.pendingLeaves
                  } Leaves Will be Unpaid`
              : "none 2"}
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="control-label">Leave Type</label>
                <Select
                  className={`my-select${
                    props.touched.leaveType && props.errors.leaveType
                      ? "is-invalid"
                      : props.touched.leaveType && "is-valid"
                  }`}
                  name="leaveType"
                  className="zIndex"
                  onBlur={props.handleBlur}
                  value={props.values.leaveType}
                  onChange={(selected) => {
                    props.setFieldValue("leaveType", selected);
                    setSelectedType(selected);
                  }}
                  options={leaveTypes}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.leaveType && props.errors.leaveType}
                </span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label>Leave Dates</label>
                  </div>
                  <div className="col d-flex justify-content-end">
                    <div>Leave Count : {leaveCount}</div>
                  </div>
                </div>
                <div>
                  <div className="input-group-multi">
                    <MultipleDatePicker
                      id="uniqueTxt"
                      className={`form-control ${
                        props.touched.leaveDates && props.errors.leaveDates
                          ? "is-invalid"
                          : props.touched.leaveDates && "is-valid"
                      }`}
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
                        console.log("Length", sandwhich);
                        if (
                          sandwhich.length > 0 ||
                          (sandwhich.length > 0 && sandwhich1.length > 0)
                        ) {
                          for (
                            let counter = 0;
                            counter < sandwhich.length;
                            counter++
                          ) {
                            if (sandwhich.length > 0 && sandwhich1.length > 0) {
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

                                  setSandwhichSpan(true);
                                }
                              } else {
                                formattedDates.pop();
                                setLeaveCount(0);
                              }
                            }
                            if (sandwhich.length > 0) {
                              if (
                                moment(sandwhich[counter]).format("dddd") ===
                                "Friday"
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

                                setSandwhichSpan(true);
                              } else {
                                formattedDates.pop();
                                setLeaveCount(0);
                              }
                            }
                          }
                        }
                        if (sandwhich1.length > 0) {
                          for (
                            let counter = 0;
                            counter < sandwhich1.length;
                            counter++
                          ) {
                            if (
                              moment(sandwhich1[counter]).format("dddd") ===
                              "Monday"
                            ) {
                              var new_date = moment(
                                sandwhich1[counter],
                                "YYYY-MM-DD"
                              )
                                .subtract("days", 1)
                                .format("YYYY-MM-DD");
                              var new_date1 = moment(
                                sandwhich1[counter],
                                "YYYY-MM-DD"
                              )
                                .subtract("days", 2)
                                .format("YYYY-MM-DD");
                              console.log(new_date);
                              console.log(new_date1);

                              let finalSandwhich = [];
                              finalSandwhich.push(new_date, new_date1);
                              finalSandwhich.map((item) => {
                                formattedDates.push(item);
                              });

                              setSandwhichSpan(true);
                            } else {
                              formattedDates.pop();
                              setLeaveCount(0);
                            }
                          }
                        }
                        let dateObjs = [];
                        formattedDates.map((item) => {
                          dateObjs.push(new Date(item));
                        });
                        const uniqueSet = new Set(formattedDates);
                        const backToArray = [...uniqueSet];
                        console.log("Leave Dates Final", backToArray);
                        props.setFieldValue("leaveDates", backToArray);
                        setLeaveCount(backToArray.length);
                      }}
                    />
                    <span
                      className={`${
                        sandwhichSpan ? "sandwhich" : "sandwhich2"
                      }`}
                    >
                      It will be considered a sandwhich
                    </span>
                    <span id="err" className="invalid-feedback">
                      {props.touched.leaveDates && props.errors.leaveDates}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col sub">
                  <span>
                    <b>Total Leaves : </b>
                  </span>
                </div>
                <div className="col">
                  <span>
                    {/* {leaveData && leaveData.type.totalLeaves} */}
                    {/* {selectedType && selectedType.totalLeaves} */}
                    {totalLeave && totalLeave.totalLeaves}
                  </span>
                </div>
                <div className="col sub">
                  <span>
                    <b>Used Leaves : </b>
                  </span>
                </div>
                <div className="col">
                  <span>
                    {remainingLeave
                      ? remainingLeave && remainingLeave.usedLeaves
                      : "0"}
                  </span>
                </div>
                <div className="col sub">
                  <span>
                    <b>Remaining Leaves : </b>
                  </span>
                </div>
                <div className="col">
                  <span>
                    {totalLeave && totalLeave.totalLeaves
                      ? totalLeave.totalLeaves - remainingLeave.usedLeaves < 0
                        ? "0"
                        : remainingLeave.usedLeaves
                        ? totalLeave.totalLeaves - remainingLeave.usedLeaves
                        : "0"
                      : totalLeave && totalLeave.totalLeaves}
                  </span>
                </div>
                <div className="col sub">
                  <span>
                    <b>Unpaid Leaves : </b>
                  </span>
                </div>
                <div className="col">
                  <span>
                    {totalLeave && totalLeave.totalLeaves
                      ? totalLeave &&
                        totalLeave.totalLeaves - remainingLeave.usedLeaves > 0
                        ? "0"
                        : remainingLeave.usedLeaves
                        ? -(
                            totalLeave &&
                            totalLeave.totalLeaves - remainingLeave.usedLeaves
                          )
                        : "0"
                      : totalLeave && totalLeave.totalLeaves}
                  </span>
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
              <span id="err" className="invalid-feedback">
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

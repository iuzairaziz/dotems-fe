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

const LeaveForm = (props) => {
  const editable = props.editable;
  const project = props.project;
  const [leaveTypes, setLeaveTypes] = useState([]);
  const loggedInUser = userService.userLoggedInInfo();
  useEffect(() => {
    getleaveTypes();
  }, []);

  const getleaveTypes = () => {
    LeaveService.getAllLeaveType()
      .then((res) => {
        let options = []; // for react select
        res.data.map((item, index) => {
          options.push({ label: item.name, value: item._id });
        });
        setLeaveTypes(options);
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
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Multiple Date</label>
                <div>
                  <div className="input-group-multi">
                    <MultipleDatePicker
                      value={props.values.leaveDates}
                      id="uniqueTxt"
                      name="leaveDates"
                      onBlur={props.handleBlur}
                      onSubmit={(dates) => {
                        props.setFieldValue("leaveDates", dates);
                      }}
                    />
                    <span id="err">
                      {props.touched.leaveDates && props.errors.leaveDates}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Leave Type</label>
                <Select
                  name="leaveType"
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
          </div>

          <div className="row">
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

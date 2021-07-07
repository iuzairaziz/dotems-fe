import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MultipleDatePicker from "react-multiple-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { Formik } from "formik";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import ClientService from "../../../../services/ClientService";
import { Dropdown, Button } from "reactstrap";

const LeaveForm = (props) => {
  const editable = props.editable;
  const project = props.project;

  return (
    <Formik
      initialValues={{
        reason: editable && project.reason,
        leaveDate: editable && project.leaveDate,
        description: editable
          ? EditorState.createWithContent(
              convertFromRaw(JSON.parse(project.description))
            )
          : EditorState.createEmpty(),
      }}
      //   validationSchema={clientValidation.authSchemaValidation}
      onSubmit={(values, actions) => {
        console.log("countries", values.country);
        editable
          ? ClientService.updateClient({
              reason: values.reason,
              leaveDate: values.leaveDate,
              description: JSON.stringify(
                convertToRaw(values.description.getCurrentContent())
              ),
            })
              .then((res) => {
                ClientService.handleMessage("update");
                props.toggle();
              })
              .catch((err) => {
                ClientService.handleError();
                props.toggle();
              })
          : ClientService.addClient({
              reason: values.reason,
              leaveDate: values.leaveDate,
              description: JSON.stringify(
                convertToRaw(values.description.getCurrentContent())
              ),
            })
              .then((res) => {
                props.toggle && props.toggle();
                ClientService.handleMessage("add");
              })
              .catch((err) => {
                ClientService.handleError();
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
                      id="uniqueTxt"
                      onSubmit={(dates) => console.log("selected date", dates)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Leave Type</label>
                {/* <Select
                  name="status"
                  onBlur={props.handleBlur}
                  value={props.values.status}
                  onChange={(selected) => {
                    props.setFieldValue("status", selected);
                  }}
                  options={[
                    { value: "Single", label: "Single" },
                    { value: "Married", label: "Married" },
                  ]}
                />
                <span id="err">
                  {props.touched.status && props.errors.status}
                </span> */}
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

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import tasksValidations from "../../../../validations/tasks-validations";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Button } from "reactstrap";
import Select from "react-select";
import TaskService from "../../../../services/TaskService";
import userService from "../../../../services/UserService";
import ProjectService from "../../../../services/ProjectService";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TaskForm.scss";
import { useHistory } from "react-router-dom";

const TaskForm = (props) => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [phase, setPhase] = useState([]);
  const [description, setDescription] = useState(EditorState.createEmpty());
  const task = props.task;
  const editable = props.editable;
  const history = useHistory();

  useEffect(() => {
    getProjects();
    console.log("editable props", editable && task);
    editable && task && getProjectUsers(task.project._id);
  }, []);

  const loogedInUser = userService.userLoggedInInfo();
  const getProjectUsers = (projectId) => {
    userService.getProjectUsers(projectId).then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ value: item._id, label: item.name, id: item._id });
      });
      setUsers(options);
    });
  };

  const getTasksByProjectId = (id) => {
    TaskService.getTasksByProjectId(id).then((res) => {
      let options = [{ label: "Main", value: null }];
      res.data.map((item, index) => {
        if (!item.parentTask) {
          options.push({ label: item.name, value: item._id });
        }

        console.log("tasks options", options);
      });
      setTasks(options);
    });
  };

  const getProjects = () => {
    ProjectService.getAllProject("", "", "", "", "")
      .then((res) => {
        let options = [];
        res.data.map((item, index) => {
          // console.log("project options", options);
          if (item.name) {
            options.push({
              value: item._id,
              label: item.name,
              // id: item._id,
              pmStartDate: item.pmStartDate,
              pmEndDate: item.pmEndDate,
              remainingProjectRatio: item.tasks
                ? item.tasks.remainingProjectRatio
                : 100,
              remainingProjectEstHrs: item.projectRemainingEstTime
                ? item.projectRemainingEstTime
                : 1000,
              phase: item.phase ? item.phase : null,
            });
          }
        });
        console.log("project options", options);
        setProjects(options);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("from task form ", task);
  var assignedUsers = [];
  editable &&
    task.assignedTo.map((item) =>
      assignedUsers.push({ label: item.name, value: item._id, id: item._id })
    );
  return (
    // <>
    <Formik
      initialValues={{
        maxProjectRatio: 100,
        maxEstHrs: 1000,
        title: editable && task.name,
        project: editable &&
          task.project && { label: task.project.name, value: task.project._id },
        phase: editable &&
          task.phase && { label: task.phase.phasename, value: task.phase._id },
        estimatedHrs: editable && task.estHrs,
        projectRatio: editable && task.projectRatio,
        description: editable
          ? EditorState.createWithContent(
              convertFromRaw(JSON.parse(task.description))
            )
          : EditorState.createEmpty(),
        parentTask:
          editable && task.parentTask
            ? {
                label: task.parentTask.name,
                value: task.parentTask._id,
              }
            : { label: "None", value: null },
        assignedTo: editable && assignedUsers,
        startTime: editable && task.startTime,
        endTime: editable && task.endTime,
        pmStartDate: "",
        pmEndDate: "",
        teamLead: editable &&
          task.teamLead && {
            label: task.teamLead.name,
            value: task.teamLead._id,
          },
      }}
      validationSchema={tasksValidations.newTaskValidation}
      onSubmit={(values, actions) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        let usrs = [];
        values.assignedTo.map((item) => {
          usrs.push(item.id);
        });

        editable
          ? TaskService.updateTask(task._id, {
              name: values.title,
              startTime: values.startTime,
              endTime: values.endTime,
              description: JSON.stringify(
                convertToRaw(values.description.getCurrentContent())
              ),
              estHrs: values.estimatedHrs,
              projectRatio: values.projectRatio,
              project: values.project.value,
              parentTask: values.parentTask.value,
              assignedTo: usrs,
              teamLead: values.teamLead.value,
            })
              .then((res) => {
                TaskService.handleMessage("update");
                props.toggle();
              })
              .catch((err) => {
                TaskService.handleCustomMessage(err.response.data);
                props.toggle();
              })
          : TaskService.addTask({
              name: values.title,
              startTime: values.startTime,
              endTime: values.endTime,
              description: JSON.stringify(
                convertToRaw(values.description.getCurrentContent())
              ),
              estHrs: values.estimatedHrs,
              projectRatio: values.projectRatio,
              project: values.project.value,
              parentTask: values.parentTask.value,
              assignedTo: usrs,
              teamLead: values.teamLead.value,
              addedBy: loogedInUser._id,
            })
              .then((res) => {
                TaskService.handleMessage("add");
                history.push("/task");
              })
              .catch((err) => {
                TaskService.handleCustomMessage(err.response.data);
              });
        console.log("project", values.project);
      }}
    >
      {(props) => {
        const formatPercent = (value) => value + "%";
        const formatHrs = (value) => value + " Hrs";

        return (
          <>
            <div className="row task-form">
              <div className="col-6">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className={`form-control ${
                      props.touched.title && props.errors.title
                        ? "is-invalid"
                        : props.touched.title && "is-valid"
                    }`}
                    value={props.values.title}
                    name="title"
                    onBlur={props.handleBlur}
                    onChange={(e) => {
                      props.setFieldValue("title", e.target.value);

                      console.log(props);
                    }}
                    placeholder="Enter Name"
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.title && props.errors.title}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Project</label>
                  <Select
                    className={`my-select${
                      props.touched.status && props.errors.status
                        ? "is-invalid"
                        : props.touched.status && "is-valid"
                    } `}
                    value={props.values.project}
                    name="project"
                    onBlur={props.handleBlur}
                    onChange={(selected) => {
                      console.log("Selected Changes", selected);
                      let phases = [];
                      selected.phase.map((item) => {
                        phases.push({ label: item.phasename, value: item._id });
                      });
                      setPhase(phases);

                      props.setFieldValue("project", selected);
                      props.setFieldValue(
                        "maxProjectRatio",
                        selected.remainingProjectRatio
                      );
                      props.setFieldValue(
                        "maxEstHrs",
                        selected.remainingProjectEstHrs
                      );

                      props.setFieldValue("pmStartDate", selected.pmStartDate);
                      props.setFieldValue("pmEndDate", selected.pmEndDate);
                      getTasksByProjectId(selected.value);
                      getProjectUsers(selected.value);
                      props.setFieldValue("assignedTo", []);
                      props.setFieldValue("teamLead", {});
                    }}
                    options={projects}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.project && props.errors.project}
                  </span>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label>Estimated Hours</label>
                  <div id="right_badge" className="float-right d-flex ">
                    <input
                      type="number"
                      className={`form-control ${
                        props.touched.estimatedHrs && props.errors.estimatedHrs
                          ? "is-invalid"
                          : props.touched.estimatedHrs && "is-valid"
                      } inputWdth mr-2`}
                      value={props.values.estimatedHrs}
                      name="estimatedHrs"
                      onBlur={props.handleBlur}
                      onChange={(e) => {
                        props.setFieldValue("estimatedHrs", e.target.value);

                        console.log(props);
                      }}
                    />
                    <span className="inputFont">Hrs</span>
                    {/* {"Hrs"} */}
                  </div>
                  <br />
                  <span id="left_badge">0</span>
                  <span id="right_badge" className="float-right">
                    {props.values.maxEstHrs}
                  </span>
                  <Slider
                    min={0}
                    max={props.values.maxEstHrs}
                    type="number"
                    step={0.1}
                    format={formatHrs}
                    name="estimatedHrs"
                    onBlur={props.handleBlur}
                    value={props.values.estimatedHrs}
                    onChange={(value) => {
                      props.setFieldValue("estimatedHrs", value.toFixed(1));
                    }}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.estimatedHrs && props.errors.estimatedHrs}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Project Ratio</label>
                  <div id="right_badge" className="float-right d-flex ">
                    <input
                      type="number"
                      className={`form-control ${
                        props.touched.projectRatio && props.errors.projectRatio
                          ? "is-invalid"
                          : props.touched.projectRatio && "is-valid"
                      } inputWdth mr-2 `}
                      value={props.values.projectRatio}
                      name="projectRatio"
                      onBlur={props.handleBlur}
                      onChange={(e) => {
                        props.setFieldValue("projectRatio", e.target.value);

                        console.log(props);
                      }}
                    />
                    <span className="inputFont">%</span>
                  </div>
                  <br />
                  <span id="left_badge">0</span>
                  <span id="right_badge" className="float-right">
                    {props.values.maxProjectRatio}
                  </span>
                  <Slider
                    min={0}
                    max={props.values.maxProjectRatio}
                    type="number"
                    format={formatPercent}
                    name="projectRatio"
                    onBlur={props.handleBlur}
                    value={props.values.projectRatio}
                    onChange={(value) => {
                      // console.log("valueee==", value);
                      props.setFieldValue("projectRatio", value.toFixed(1));
                    }}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.projectRatio && props.errors.projectRatio}
                  </span>
                </div>
              </div>
              <div className="col-6 ">
                <div className="form-group">
                  <label>Parent Task</label>
                  <Select
                    className={`my-select${
                      props.touched.parentTask && props.errors.parentTask
                        ? "is-invalid"
                        : props.touched.parentTask && "is-valid"
                    }`}
                    value={props.values.parentTask}
                    name="parentTask"
                    onBlur={props.handleBlur}
                    onChange={(selected) => {
                      props.setFieldValue("parentTask", selected);
                    }}
                    options={tasks}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.parentTask && props.errors.parentTask}
                  </span>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label>Assign Task</label>
                  <Select
                    className={`my-select${
                      props.touched.assignedTo && props.errors.assignedTo
                        ? "is-invalid"
                        : props.touched.assignedTo && "is-valid"
                    }`}
                    value={props.values.assignedTo}
                    name="assignedTo"
                    onBlur={props.handleBlur}
                    onChange={(val) => props.setFieldValue("assignedTo", val)}
                    options={users}
                    isMulti={true}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.assignedTo && props.errors.assignedTo}
                  </span>
                </div>
              </div>

              <div className="col-6 ">
                <div className="form-group">
                  <label>Start Time</label>
                  <DatePicker
                    className={`form-control ${
                      props.touched.startTime && props.errors.startTime
                        ? "is-invalid"
                        : props.touched.startTime && "is-valid"
                    }zIndex`}
                    selected={props.values.startTime}
                    name="startTime"
                    onBlur={props.handleBlur}
                    onChange={(date) => {
                      props.setFieldValue("startTime", date);
                      console.log("datepicker", date);
                    }}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.startTime && props.errors.startTime}
                  </span>
                </div>
              </div>
              <div className="col-6 ">
                <div className="form-group">
                  <label>End Time</label>
                  <DatePicker
                    className={`form-control ${
                      props.touched.endTime && props.errors.endTime
                        ? "is-invalid"
                        : props.touched.endTime && "is-valid"
                    }zIndex`}
                    selected={props.values.endTime}
                    name="endTime"
                    onBlur={props.handleBlur}
                    onChange={(date) => {
                      props.setFieldValue("endTime", date);
                      console.log("datepicker", date);
                    }}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.endTime && props.errors.endTime}
                  </span>
                </div>
              </div>
              <div className="col-6 ">
                <div className="form-group">
                  <label>Team Lead</label>
                  <Select
                    className={`my-select${
                      props.touched.teamLead && props.errors.teamLead
                        ? "is-invalid"
                        : props.touched.teamLead && "is-valid"
                    }`}
                    value={props.values.teamLead}
                    name="teamLead"
                    onBlur={props.handleBlur}
                    onChange={(val) => props.setFieldValue("teamLead", val)}
                    options={users}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.teamLead && props.errors.teamLead}
                  </span>
                </div>
              </div>
              <div className="col-6 ">
                <div className="form-group">
                  <label>Project Phase</label>
                  <Select
                    className={`my-select${
                      props.touched.status && props.errors.status
                        ? "is-invalid"
                        : props.touched.status && "is-valid"
                    } `}
                    value={props.values.phase}
                    name="phase"
                    onBlur={props.handleBlur}
                    onChange={(selected) => {
                      props.setFieldValue("phase", selected);
                    }}
                    options={phase}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label>Description</label>
                  <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editor"
                    name="description"
                    onBlur={() => props.handleBlur("description")}
                    editorState={props.values.description}
                    // editorStyle={{minHeight:"500px",overflowY:"scroll !important"}}
                    onEditorStateChange={(val) => {
                      props.setFieldValue("description", val);
                    }}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.description && props.errors.description}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
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
        );
      }}
    </Formik>
    // </>
  );
};

export default TaskForm;

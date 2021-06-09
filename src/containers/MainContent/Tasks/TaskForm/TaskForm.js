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
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TaskForm.scss";

const TaskForm = (props) => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [description, setDescription] = useState(EditorState.createEmpty());

  useEffect(() => {
    getUsers();
    getProjects();
    // getTasks();
  }, []);

  const getUsers = () => {
    userService.getUsers("", "", "", "").then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ value: item._id, label: item.name, id: item._id });
      });
      setUsers(options);
    });
  };

  const getTasks = () => {
    TaskService.getAllTask().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, id: item._id });
      });
      setTasks(options);
    });
  };

  const getTasksByProjectId = (id) => {
    TaskService.getTasksByProjectId(id).then((res) => {
      let options = [{ label: "None", value: null }];
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
              id: item._id,
            });
          }
          console.log("project options", options);
        });
        setProjects(options);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const task = props.task;
  const editable = props.editable;
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
        title: editable && task.name,
        project: editable &&
          task.project && { label: task.project.name, value: task.project._id },
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
        teamLead: editable &&
          task.teamLead && {
            label: task.teamLead.name,
            value: task.teamLead._id,
          },
      }}
      validationSchema={tasksValidations.newTaskValidation}
      onSubmit={(values, actions) => {
        let usrs = [];
        values.assignedTo.map((item) => {
          usrs.push(item.id);
        });

        editable
          ? TaskService.updateTask(task._id, {
              name: values.title,
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
                TaskService.handleError();
                props.toggle();
              })
          : TaskService.addTask({
              name: values.title,
              startTime: new Date(),
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
                TaskService.handleMessage("add");
              })
              .catch((err) => {
                TaskService.handleError();
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
                    className="form-control"
                    value={props.values.title}
                    onChange={props.handleChange("title")}
                    placeholder="Enter Name"
                  />
                  <span id="err">{props.errors.title}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Project</label>
                  <Select
                    value={props.values.project}
                    onChange={(selected) => {
                      props.setFieldValue("project", selected);
                      getTasksByProjectId(selected.value);
                    }}
                    options={projects}
                  />
                  <span id="err">{props.errors.project}</span>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label>Estimated Hours</label>
                  <span id="right_badge" className="float-right">
                    {props.values.estimatedHrs + " Hours"}
                  </span>
                  <Slider
                    min={0}
                    max={100}
                    type="number"
                    step={0.1}
                    format={formatHrs}
                    value={props.values.estimatedHrs}
                    onChange={(value) => {
                      props.setFieldValue("estimatedHrs", value);
                    }}
                  />
                  <span id="err">{props.errors.estimatedHrs}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Parent Task</label>
                  <Select
                    value={props.values.parentTask}
                    onChange={(selected) => {
                      props.setFieldValue("parentTask", selected);
                    }}
                    options={tasks}
                  />
                  <span id="err">{props.errors.parentTask}</span>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label>Project Ratio</label>
                  <span id="right_badge" className="float-right">
                    {props.values.projectRatio + " %"}
                  </span>
                  <br />
                  <span id="left_badge">0</span>
                  <span id="right_badge" className="float-right">
                    100
                  </span>
                  <Slider
                    min={0}
                    max={100}
                    type="number"
                    format={formatPercent}
                    value={props.values.projectRatio}
                    onChange={(value) => {
                      // console.log("valueee==", value);
                      props.setFieldValue("projectRatio", value);
                    }}
                  />
                  <span id="err">{props.errors.projectRatio}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Assign Task</label>
                  <Select
                    value={props.values.assignedTo}
                    onChange={(val) => props.setFieldValue("assignedTo", val)}
                    options={users}
                    isMulti={true}
                  />
                  <span id="err">{props.errors.assignedTo}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Team Lead</label>
                  <Select
                    value={props.values.teamLead}
                    onChange={(val) => props.setFieldValue("teamLead", val)}
                    options={users}
                  />
                  <span id="err">{props.errors.teamLead}</span>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label>Description</label>
                  <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editor"
                    editorState={props.values.description}
                    // editorStyle={{minHeight:"500px",overflowY:"scroll !important"}}
                    onEditorStateChange={(val) => {
                      props.setFieldValue("description", val);
                    }}
                  />
                  <span id="err">{props.errors.description}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <Button
                  color="success"
                  className="mt-3"
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

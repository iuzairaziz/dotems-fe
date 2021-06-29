import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import ProjectValidation from "../../../validations/project-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CountryService from "../../../services/CountryService";
import ProjectService from "../../../services/ProjectService";
import PlatformService from "../../../services/PlatformService";
import TechnologyService from "../../../services/TechnologyService";
import ServiceService from "../../../services/ServiceService";
import NatureService from "../../../services/NatureService";
import userService from "../../../services/UserService";
import ClientService from "../../../services/ClientService";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import StatusService from "../../../services/StatusService";
import CurrencyService from "../../../services/CurrencyService";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import Editable from "react-x-editable";
import "./ProjectForm.scss";

const ProjectForm = (props) => {
  const [default_option, set_default_option] = useState(0);
  const [country, setCountry] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [service, setServiceType] = useState([]);
  const [nature, setNature] = useState([]);
  const [users, setUsers] = useState([]);
  const [client, setClient] = useState([]);
  const [status, setStatus] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [toShow, setToShow] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  const editable = props.editable;
  const project = props.project;

  const [totalCost, setTotalCost] = useState(0);
  const [phases, setPhases] = useState([
    {
      phasename: "Requirement Analysis",
      estTime: editable ? project.phase[0].estTime : "0",
    },
    {
      phasename: "Design",
      estTime: editable ? project.phase[1].estTime : "0",
    },
    {
      phasename: "Development",
      estTime: editable ? project.phase[2].estTime : "0",
    },
    {
      phasename: "Implementation",
      estTime: editable ? project.phase[3].estTime : "0",
    },
    {
      phasename: "Testing",
      estTime: editable ? project.phase[4].estTime : "0",
    },
    {
      phasename: "Documentation",
      estTime: editable ? project.phase[5].estTime : "0",
    },
    {
      phasename: "Evaluation",
      estTime: editable ? project.phase[6].estTime : "0",
    },
  ]);

  let tHours = 0;

  useEffect(() => {
    console.log(tHours);
    setTotalHours(tHours);
  }, [tHours]);

  const setThours = (value) => {
    tHours += value;
  };

  const handleOption = (opt) => {
    console.log(opt);
    set_default_option(opt);
  };

  useEffect(() => {
    getCountry();
    getPlatform();
    getTechnology();
    getServiceType();
    getNature();
    getUsers();
    getClient();
    getStatus();
    getCurrency();
  }, []);

  useEffect(() => {
    toShowData();
  }, [nature]);

  const getCurrency = () => {
    CurrencyService.getAllCurrency().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setCurrency(options);
    });
  };

  const getStatus = () => {
    StatusService.getAllStatus().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setStatus(options);
    });
  };

  const getUsers = () => {
    userService.getUsers("", "", "", "").then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ value: item._id, label: item.name });
      });
      setUsers(options);
    });
  };

  const getClient = () => {
    ClientService.getAllClient().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setClient(options);
    });
  };

  const getNature = () => {
    NatureService.getAllNature().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setNature(options);
    });
  };

  const getServiceType = () => {
    ServiceService.getAllService().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setServiceType(options);
    });
  };

  const getTechnology = () => {
    TechnologyService.getAllTechnologies().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setTechnology(options);
    });
  };

  const getPlatform = () => {
    PlatformService.getAllPlatform().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setPlatform(options);
    });
  };

  const getCountry = () => {
    CountryService.getAllCountry().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setCountry(options);
    });
  };

  console.log(project);

  const toShowData = () => {
    let options = [];
    let natre = nature;
    let keys = Object.keys(nature);
    console.log("n lenth", natre.length);
    console.log("keys lenght", keys.length);
    nature.map((item, index) => {
      options.push({ value: item.id, text: item.label });
    });
    setToShow(options);
    console.log("Data To Disply in MultiSelect", options);
    console.log("User Nature", nature);
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  var TeamMembers = [];
  editable &&
    project.assignedUser.map((item) =>
      TeamMembers.push({ label: item.name, value: item._id, id: item._id })
    );

  return (
    <Formik
      initialValues={{
        projectName: editable && project.name,
        clientName: editable &&
          project.client && {
            label: project.client.name,
            value: project.client._id,
          },
        status: editable &&
          project.status && {
            label: project.status.name,
            value: project.status._id,
          },
        description: editable
          ? EditorState.createWithContent(
              convertFromRaw(JSON.parse(project.description))
            )
          : EditorState.createEmpty(),
        cost: editable && project.cost,
        Rprofit: editable && project.Rprofit,
        platform: editable &&
          project.platform && {
            label: project.platform.name,
            value: project.platform._id,
          },
        technology: editable &&
          project.technology && {
            label: project.technology.name,
            value: project.technology._id,
          },
        serviceType: editable &&
          project.service && {
            label: project.service.name,
            value: project.service._id,
          },
        nature: editable &&
          project.nature && {
            label: project.nature.name,
            value: project.nature._id,
          },
        currency: editable &&
          project.currency && {
            label: project.currency.name,
            value: project.currency._id,
          },
        cStartDate: editable && project.cStartDate,
        cEndDate: editable && project.cEndDate,
        pmStartDate: editable && project.pmStartDate,
        pmEndDate: editable && project.pmEndDate,
        projectManager: editable &&
          project.projectManager && {
            label: project.projectManager.name,
            value: project.projectManager._id,
          },
        teamMembers: editable && TeamMembers,
        orderNum: editable && project.orderNum,
        Pdeduction: editable && project.Pdeduction,
        percentage: editable && project.percentage,
        fCost: editable && project.fCost,
        otherDeduction: editable && project.otherDeduction,
        phase: editable && phases,
      }}
      validationSchema={ProjectValidation.newProjectValidation}
      onSubmit={(values, actions) => {
        console.log(phases);
        const usrs = [];
        console.log("team members", values.teamMembers);
        values.teamMembers.map((item) => {
          usrs.push(item.value);
          console.log("users", usrs);
        });
        console.log("valuesss", values);
        editable
          ? ProjectService.updateProject(project._id, {
              name: values.projectName,
              client: values.clientName.value,
              orderNum: values.orderNum,
              platform: values.platform.value,
              technology: values.technology.value,
              service: values.serviceType.value,
              status: values.status.value,
              description: JSON.stringify(
                convertToRaw(values.description.getCurrentContent())
              ),
              nature: values.nature.value,
              cStartDate: values.cStartDate,
              cEndDate: values.cEndDate,
              pmStartDate: values.pmStartDate,
              pmEndDate: values.pmEndDate,
              projectManager: values.projectManager.value,
              assignedUser: usrs,
              cost: values.cost,
              Rprofit: values.Rprofit,
              Pdeduction: values.Pdeduction,
              percentage: values.percentage,
              fCost: values.fCost,
              currency: values.currency.value,
              otherDeduction: values.otherDeduction,
              phase: phases,
            })

              .then((res) => {
                ProjectService.handleMessage("update");
                props.toggle();
              })
              .catch((err) => {
                ProjectService.handleError();
                props.toggle();
              })
          : ProjectService.addProject({
              name: values.projectName,
              client: values.clientName.value,
              orderNum: values.orderNum,
              platform: values.platform.value,
              technology: values.technology.value,
              service: values.serviceType.value,
              status: values.status.value,
              description: JSON.stringify(
                convertToRaw(values.description.getCurrentContent())
              ),
              nature: values.nature.value,
              cStartDate: values.cStartDate,
              cEndDate: values.cEndDate,
              pmStartDate: values.pmStartDate,
              pmEndDate: values.pmEndDate,
              projectManager: values.projectManager.value,
              assignedUser: usrs,
              cost: values.cost,
              Rprofit: values.Rprofit,
              Pdeduction: values.Pdeduction,
              percentage: values.percentage,
              fCost: values.fCost,
              otherDeduction: values.otherDeduction,
              phase: phases,
              currency: values.currency.value,
            })
              .then((res) => {
                ProjectService.handleMessage("add");
              })
              .catch((err) => {
                ProjectService.handleError();
              });
        console.log("clientName", values.clientName);
        console.log("platform", values.platform);
        console.log("technology", values.technology);
        console.log("serviceType", values.serviceType);
        console.log("projectNature", values.projectNature);
        console.log("projectManager", values.projectManager);
      }}
    >
      {(props) => (
        <div className="project-form">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.projectName}
                  onChange={props.handleChange("projectName")}
                  placeholder="Enter Name"
                />
                <span id="err">
                  {props.touched.projectName && props.errors.projectName}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Client Name</label>
                <Select
                  value={props.values.clientName}
                  onChange={(val) => props.setFieldValue("clientName", val)}
                  options={client}
                />
                <span id="err">
                  {props.touched.clientName && props.errors.clientName}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Order Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.orderNum}
                  onChange={props.handleChange("orderNum")}
                  placeholder="Enter Order Number"
                />
                <span id="err">
                  {props.touched.orderNum && props.errors.orderNum}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Platform</label>
                <Select
                  value={props.values.platform}
                  onChange={(val) => props.setFieldValue("platform", val)}
                  options={platform}
                />

                <span id="err">
                  {props.touched.platform && props.errors.platform}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Technology</label>
                <Select
                  value={props.values.technology}
                  onChange={(val) => props.setFieldValue("technology", val)}
                  options={technology}
                />

                <span id="err">
                  {props.touched.technology && props.errors.technology}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Services Type</label>
                <Select
                  value={props.values.serviceType}
                  onChange={(val) => props.setFieldValue("serviceType", val)}
                  options={service}
                />
                <span id="err">
                  {props.touched.serviceType && props.errors.serviceType}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Status</label>

                <Select
                  value={props.values.status}
                  onChange={(val) => props.setFieldValue("status", val)}
                  options={status}
                />
                <span id="err">
                  {props.touched.status && props.errors.status}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Project Nature</label>
                <Select
                  value={props.values.nature}
                  onChange={(val) => props.setFieldValue("nature", val)}
                  options={nature}
                />
                <span id="err">
                  {props.touched.nature && props.errors.nature}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {" "}
              <div className="form-group">
                <label>Client Start Date</label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={props.values.cStartDate}
                    onChange={(date) => {
                      props.setFieldValue("cStartDate", date);
                      console.log("datepicker", date);
                    }}
                  />
                </div>
              </div>{" "}
            </div>
            <div className="col">
              {" "}
              <div className="form-group">
                <label>Client Deadline</label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={props.values.cEndDate}
                    onChange={(datee) => {
                      props.setFieldValue("cEndDate", datee);
                      console.log("datepicker", datee);
                    }}
                  />
                </div>
              </div>{" "}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Project Manager</label>

                <Select
                  value={props.values.projectManager}
                  onChange={(val) => props.setFieldValue("projectManager", val)}
                  options={users}
                />
                <span id="err">
                  {props.touched.projectManager && props.errors.projectManager}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-0">
                <label className="control-label">Team Members</label>
                <Select
                  value={props.values.teamMembers}
                  onChange={(val) => props.setFieldValue("teamMembers", val)}
                  options={users}
                  isMulti={true}
                />
                <span id="err">
                  {props.touched.teamMembers && props.errors.teamMembers}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Cost</label>
                <input
                  type="number"
                  className="form-control"
                  value={props.values.cost}
                  onChange={props.handleChange("cost")}
                  placeholder="Enter Amount"
                />
                <span id="err">{props.touched.cost && props.errors.cost}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Currency</label>

                <Select
                  value={props.values.currency}
                  onChange={(val) => props.setFieldValue("currency", val)}
                  options={currency}
                />
                <span id="err">
                  {props.touched.currency && props.errors.currency}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Platform Deduction</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    value={props.values.Pdeduction}
                    onChange={props.handleChange("Pdeduction")}
                    placeholder="Enter Deduction"
                  />
                  <span className="input-group-text">%</span>
                </div>
                <span id="err">
                  {props.touched.Rprofit && props.errors.Rprofit}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Reserve Profit</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    value={props.values.Rprofit}
                    onChange={props.handleChange("Rprofit")}
                    placeholder="Enter Preserve Profit"
                  />
                  <span className="input-group-text">%</span>
                </div>
                <span id="err">
                  {props.touched.Rprofit && props.errors.Rprofit}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Other Deductions</label>
                <input
                  type="number"
                  className="form-control"
                  value={props.values.otherDeduction}
                  onChange={props.handleChange("otherDeduction")}
                  placeholder="Enter Other Deductions"
                />
                <span id="err">
                  {props.touched.otherDeduction && props.errors.otherDeduction}
                </span>
              </div>
            </div>
          </div>
          <div className="container">
            {/* <form>
            <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Fixed Cost</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.fCost}
                  onChange={props.handleChange("fCost")}
                  placeholder="Enter Cost"
                />
                <span id="err">{props.errors.fCost}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Percentage</label>
                <input1
                  type="text"
                  className="form-control"
                  value={props.values.percentage}
                  onChange={props.handleChange("percentage")}
                  placeholder="Enter Percentage"
                />
                <span id="err">{props.errors.percentage}</span>
              </div>
            </div>
            </div>
          </form> */}
          </div>
          <div className="row">
            <div className="col-12">
              <h4 className="mt-0 header-title">Description</h4>
              <Editor
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
          <div className="PMArea">
            <h4>Project Manager Area</h4>
            <div className="row">
              <div className="col">
                {" "}
                <div className="form-group">
                  <label>PM Start Date</label>
                  <div>
                    <DatePicker
                      className="form-control"
                      selected={props.values.pmStartDate}
                      onChange={(date1) => {
                        props.setFieldValue("pmStartDate", date1);
                        console.log("datepicker", date1);
                      }}
                    />
                  </div>
                </div>{" "}
              </div>
              <div className="col">
                {" "}
                <div className="form-group">
                  <label>PM End Date</label>
                  <div>
                    <DatePicker
                      className="form-control"
                      selected={props.values.pmEndDate}
                      onChange={(date2) => {
                        props.setFieldValue("pmEndDate", date2);
                        console.log("datepicker", date2);
                      }}
                    />
                  </div>
                </div>{" "}
              </div>
            </div>

            <div className="page-content-wrapper">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <table className="table table-striped mb-0">
                      <thead>
                        <tr>
                          <th style={{ fontSize: "17px", fontWeight: "bold" }}>
                            Project Phase
                          </th>
                          <th style={{ fontSize: "17px", fontWeight: "bold" }}>
                            Estimate Hours
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Requirement Analysis</td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[0].estTime}
                              display={(value) => {
                                phases[0].estTime = value;
                                console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Design</td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[1].estTime}
                              display={(value) => {
                                phases[1].estTime = value;
                                console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Development </td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[2].estTime}
                              display={(value) => {
                                phases[2].estTime = value;
                                console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Testing </td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[3].estTime}
                              display={(value) => {
                                phases[3].estTime = value;
                                console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Implementation </td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[4].estTime}
                              display={(value) => {
                                phases[4].estTime = value;
                                console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Documentation </td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[5].estTime}
                              display={(value) => {
                                phases[5].estTime = value;
                                console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Evaluation </td>
                          <td>
                            <Editable
                              name="Hours"
                              dataType="text"
                              mode="inline"
                              value={phases[6].estTime}
                              display={(value) => {
                                phases[6].estTime = value;
                                console.log("value inside editable=", value);
                                setThours(value);

                                return <strong>{value}</strong>;
                              }}
                              title="Please enter Hours"
                              // value="0"
                            />
                          </td>
                        </tr>

                        <tr>
                          <td style={{ fontSize: "14px", fontWeight: "bold" }}>
                            Total Est. Hours
                          </td>
                          <td>{totalHours}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="primary-button">
              <Button
                className="mt-3 my-primary-button"
                onClick={props.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ProjectForm;

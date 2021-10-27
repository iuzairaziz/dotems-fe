import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import ProjectValidation from "../../../validations/project-validations";
import Configuration from "../../../config/configuration";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PhaseList from "../../../../src/components/MyComponents/DynamicInputField/PhaseList";
import DesignationService from "../../../services/DesignationService";
import AddClientForm from "../Client/ClientsForm";
import AddPlatform from "../Platform/PlatformForm/PlatformForm";
import AddTechnology from "../Technology/TechnologyForm/TechnologyForm";
import AddService from "../Service/ServiceForm/ServiceForm";
import AddStatus from "../Status/StatusForm/StatusForm";
import AddProjectNature from "../Nature/NatureForm/NatureForm";
import AddCurrency from "../Currency/CurrencyForm";
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
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "./ProjectForm.scss";
import { useHistory } from "react-router-dom";

const ProjectForm = (props) => {
  const [default_option, set_default_option] = useState(0);
  const [clientModal, setClientModal] = useState(false);
  const [platformModal, setPlatformModal] = useState(false);
  const [technologyModal, setTechnologyModal] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [natureModal, setNatureModal] = useState(false);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [country, setCountry] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [service, setServiceType] = useState([]);
  const [nature, setNature] = useState([]);
  const [users, setUsers] = useState([]);
  const [client, setClient] = useState([]);
  const [status, setStatus] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [toShow, setToShow] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [hideField, setHideField] = useState(true);
  const [costValue, setCostValue] = useState(false);
  const [phaseValue, setPhaseValue] = useState(true);

  const [phasesDetails, setPhasesDetails] = useState([
    {
      index: Math.random(),
      phasename: "",
      estHrs: "",
    },
  ]);

  const roless = new Configuration().Roles;
  let tHours = 0;
  const editable = props.editable;
  const project = props.project;
  const history = useHistory();

  useEffect(() => {
    editable && project && project.phase && setPhasesDetails(project.phase);
    if (editable && project && project.phase && project.phase.length > 1) {
      // console.log("phase");
      setPhaseValue(true);
    } else setPhaseValue(false);
  }, []);

  // if (editable && project && project.phase && project.phase.length > 1) {
  //   console.log("phase");
  //   setPhaseValue(true);
  // } else setPhaseValue(false);

  // console.log("phase", phaseValue);

  useEffect(() => {
    console.log(tHours);
  }, [totalHours]);

  const setThours = (value) => {
    tHours = parseInt(tHours) + parseInt(value);
    setTotalHours(parseInt(tHours));
  };
  const handleOption = (opt) => {
    set_default_option(opt);
  };
  const toggleClientEdit = () => setClientModal(!clientModal);
  const togglePlatformEdit = () => setPlatformModal(!platformModal);
  const toggleTechnologyEdit = () => setTechnologyModal(!technologyModal);
  const toggleServiceEdit = () => setServiceModal(!serviceModal);
  const toggleStatusEdit = () => setStatusModal(!statusModal);
  const toggleNatureEdit = () => setNatureModal(!natureModal);
  const toggleCurrencyEdit = () => setCurrencyModal(!currencyModal);

  useEffect(() => {
    getCountry();
    getPlatform();
    getTechnology();
    getServiceType();
    getNature();
    getClient();
    getStatus();
    getTeamMembers();
    getProjectManager();
  }, [
    clientModal,
    platformModal,
    technologyModal,
    serviceModal,
    statusModal,
    natureModal,
    currencyModal,
  ]);

  useEffect(() => {
    toShowData();
  }, [nature]);

  const getStatus = () => {
    StatusService.getAllStatus().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setStatus(options);
    });
  };

  const getProjectManager = () => {
    userService.getUsers("", "", "", "").then((res) => {
      let options = [];
      res.data
        .filter((user) => {
          return user.userRole.some((role) => {
            return role === roless.PM;
          });
        })
        .map((item, index) => {
          options.push({
            value: item._id,
            label: `${item.name}`,
          });
        });
      setUsers(options);
      // console.log("Project Manager", options);
    });
  };

  const getTeamMembers = () => {
    userService.getUsers("", "", "", "").then((res) => {
      let options = [];
      res.data
        .filter((user) => {
          return user.userRole.some((role) => {
            return (
              role === roless.INTERNEE ||
              role === roless.PROBATION ||
              role === roless.EMPLOYEE
            );
          });
        })
        .map((item, index) => {
          options.push({
            value: item._id,
            label: `${item.name}`,
          });
        });
      setTeamMember(options);
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
    DesignationService.getAllDesignation().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setCountry(options);
    });
  };

  const toShowData = () => {
    let options = [];
    let natre = nature;
    let keys = Object.keys(nature);
    nature.map((item, index) => {
      options.push({ value: item.id, text: item.label });
    });
    setToShow(options);
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  // const validate = () => (values, props) => {
  //   const errors = {};

  //   if (!values.props) {
  //     errors.props = "Required";
  //   } else if (values.props) {
  //     errors.props = "Invalid email address";
  //   }

  //   //...

  //   return errors;
  // };

  // console.log("validation", validate);

  var TeamMembers = [];
  var Technology = [];
  editable &&
    project.assignedUser &&
    project.assignedUser.map((item) =>
      TeamMembers.push({ label: item.name, value: item._id, id: item._id })
    );
  editable &&
    project.technology &&
    project.technology.map((item) =>
      Technology.push({ label: item.name, value: item._id, id: item._id })
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
        clientHours: editable && project.clientHours,
        hourlyCost: editable && project.hourlyCost,
        Rprofit: editable && project.Rprofit,
        platform: editable &&
          project.platform && {
            label: project.platform.name,
            value: project.platform._id,
          },
        technology:
          editable && project.technology && Technology ? Technology : [],
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
            label: project.currency,
            value: project.currency,
          },
        cStartDate: editable && project.cStartDate,
        cEndDate: editable && project.cEndDate,
        pmStartDate: editable && project.pmStartDate,
        pmEndDate: editable && project.pmEndDate,
        teamMembers: editable && TeamMembers ? TeamMembers : [],
        projectManager: editable &&
          project.projectManager && {
            label: project.projectManager.name,
            value: project.projectManager._id,
          },
        orderNum: editable && project.orderNum,
        Pdeduction: editable && project.Pdeduction,
        // percentage: editable && project.percentage,
        // fCost: editable && project.fCost,
        otherDeduction: editable && project.otherDeduction,
        phase: editable && project.phase,
        projectType: editable &&
          project.projectType && {
            label: project.projectType,
            value: project.projectType,
          },
      }}
      validate={(values) => {
        if (values.projectType && values.projectType.value === "hourly") {
          setCostValue(values.hourlyCost * values.clientHours);
        } else {
          setCostValue(false);
        }
        // console.log("vall", values);
      }}
      validationSchema={ProjectValidation.newProjectValidation}
      onSubmit={(values, actions, errors) => {
        const usrs = [];
        const tech = [];

        // console.log("actions", values);
        values.teamMembers.map((item) => {
          usrs.push(item.value);
        });
        values.technology.map((item) => {
          tech.push(item.value);
        });
        editable
          ? ProjectService.updateProject(project._id, {
              name: values.projectName,
              client: values.clientName.value,
              orderNum: values.orderNum,
              platform: values.platform.value,
              technology: tech,
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
              cost: costValue ? costValue : values.cost,
              hourlyCost: values.hourlyCost,
              clientHours: values.clientHours,
              Rprofit: values.Rprofit,
              Pdeduction: values.Pdeduction,
              // percentage: values.percentage,
              // fCost: values.fCost,
              otherDeduction: values.otherDeduction,
              phase: phasesDetails,
              currency: values.currency.value,
              projectType: values.projectType.value,
            })

              .then((res) => {
                ProjectService.handleMessage("update");
                props.toggle();
              })
              .catch((err) => {
                ProjectService.handleCustomMessage(err.response.data);
                props.toggle();
              })
          : ProjectService.addProject({
              name: values.projectName,
              client: values.clientName.value,
              orderNum: values.orderNum,
              platform: values.platform.value,
              technology: tech,
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
              cost: costValue ? costValue : values.cost,
              hourlyCost: values.hourlyCost,
              clientHours: values.clientHours,
              Rprofit: values.Rprofit,
              Pdeduction: values.Pdeduction,
              // percentage: values.percentage,
              // fCost: values.fCost,
              otherDeduction: values.otherDeduction,
              phase: phasesDetails,
              currency: values.currency.value,
              projectType: values.projectType.value,
            })
              .then((res) => {
                ProjectService.handleMessage("add");
                history.push("/viewproject");
              })
              .catch((err) => {
                ProjectService.handleCustomMessage(err.response.data);
              });
        console.error("actions", actions);
        console.error("err", errors);

        // setPhaseArray(project.phase);
      }}
    >
      {(props) => (
        <div className="project-form">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  name="projectName"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.projectName && props.errors.projectName
                      ? "is-invalid"
                      : props.touched.projectName && "is-valid"
                  }`}
                  value={props.values.projectName}
                  onChange={props.handleChange("projectName")}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.projectName && props.errors.projectName}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Client Name</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleClientEdit();
                      }}
                    >
                      <i className="mdi mdi-plus icon-add" />
                    </div>
                  </div>
                </div>
                <Select
                  name="clientName"
                  blurInputOnSelect={true}
                  className={`my-select ${
                    props.touched.clientName && props.errors.clientName
                      ? "is-invalid"
                      : props.touched.clientName && "is-valid"
                  }`}
                  onFocus={() => props.setFieldTouched("clientName")}
                  value={props.values.clientName}
                  onChange={(val) => props.setFieldValue("clientName", val)}
                  options={client}
                />
                <span id="err" className="invalid-feedback">
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
                  name="orderNum"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.orderNum && props.errors.orderNum
                      ? "is-invalid"
                      : props.touched.orderNum && "is-valid"
                  }`}
                  value={props.values.orderNum}
                  onChange={props.handleChange("orderNum")}
                  placeholder="Enter Order Number"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.orderNum && props.errors.orderNum}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Platform</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        togglePlatformEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>
                <Select
                  className={`my-select ${
                    props.touched.platform && props.errors.platform
                      ? "is-invalid"
                      : props.touched.platform && "is-valid"
                  }`}
                  name="platform"
                  onFocus={() => props.setFieldTouched("platform")}
                  value={props.values.platform}
                  onChange={(val) => props.setFieldValue("platform", val)}
                  options={platform}
                />

                <span id="err" className="invalid-feedback">
                  {props.touched.platform && props.errors.platform}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Project Type</label>
                <Select
                  name="projectType"
                  onFocus={() => props.setFieldTouched("projectType")}
                  className={`my-select ${
                    props.touched.projectType && props.errors.projectType
                      ? "is-invalid"
                      : props.touched.projectType && "is-valid"
                  }`}
                  value={props.values.projectType}
                  onChange={(selected) => {
                    props.setFieldValue("projectType", selected);
                    if (selected.value == "fixed") {
                      setHideField(true);
                    } else {
                      setHideField(false);
                    }
                  }}
                  options={[
                    { value: "fixed", label: "Fixed" },
                    { value: "hourly", label: "Hourly" },
                  ]}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.projectType && props.errors.projectType}
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Project Manager</label>
                <Select
                  className={`my-select ${
                    props.touched.projectManager && props.errors.projectManager
                      ? "is-invalid"
                      : props.touched.projectManager && "is-valid"
                  }`}
                  name="projectManager"
                  onFocus={() => props.setFieldTouched("projectManager")}
                  value={props.values.projectManager}
                  onChange={(val) => props.setFieldValue("projectManager", val)}
                  options={users}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.projectManager && props.errors.projectManager}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-0">
                <label className="control-label">Team Members</label>
                <Select
                  name="teamMembers"
                  onFocus={() => props.setFieldTouched("teamMembers")}
                  className={`my-select ${
                    props.touched.teamMembers && props.errors.teamMembers
                      ? "is-invalid"
                      : props.touched.teamMembers && "is-valid"
                  }`}
                  value={props.values.teamMembers}
                  onChange={(val) => props.setFieldValue("teamMembers", val)}
                  options={teamMember}
                  isMulti={true}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.teamMembers && props.errors.teamMembers}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className={`${
                hideField === true
                  ? `hide-form-field`
                  : `display-form-field col `
              }`}
            >
              <div className="form-group">
                <label>Client Hours</label>
                <input
                  name="clientHours"
                  onBlur={props.handleBlur}
                  type="number"
                  className={`form-control ${
                    props.touched.clientHours && props.errors.clientHours
                      ? "is-invalid"
                      : props.touched.clientHours && "is-valid"
                  }  `}
                  value={props.values.clientHours}
                  onChange={props.handleChange("clientHours")}
                  placeholder="Enter Hours"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.clientHours && props.errors.clientHours}
                </span>
              </div>
            </div>
            <div
              className={`${
                hideField === true
                  ? `hide-form-field`
                  : `display-form-field col `
              }`}
            >
              <div className="form-group">
                <label>Hourly Rate</label>
                <input
                  name="hourlyCost"
                  onBlur={props.handleBlur}
                  type="number"
                  className={`form-control ${
                    props.touched.hourlyCost && props.errors.hourlyCost
                      ? "is-invalid"
                      : props.touched.hourlyCost && "is-valid"
                  }`}
                  value={props.values.hourlyCost}
                  onChange={props.handleChange("hourlyCost")}
                  placeholder="Enter Hourly Rate"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.hourlyCost && props.errors.hourlyCost}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Cost</label>
                <input
                  name="cost"
                  onBlur={props.handleBlur}
                  type="number"
                  className={`form-control ${
                    props.touched.cost && props.errors.cost
                      ? "is-invalid"
                      : props.touched.cost && "is-valid"
                  }`}
                  value={costValue ? costValue : props.values.cost}
                  onChange={props.handleChange("cost")}
                  placeholder={`Enter Amount`}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.cost && props.errors.cost}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Currency</label>
                  </div>
                  {/* <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleCurrencyEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div> */}
                </div>
                <Select
                  name="currency"
                  onFocus={() => props.setFieldTouched("currency")}
                  className={`my-select ${
                    props.touched.currency && props.errors.currency
                      ? "is-invalid"
                      : props.touched.currency && "is-valid"
                  }`}
                  value={props.values.currency}
                  onChange={(val) => props.setFieldValue("currency", val)}
                  options={[
                    { value: "USD", label: "USD" },
                    { value: "PKR", label: "PKR" },
                  ]}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.currency && props.errors.currency}
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
                    name="cStartDate"
                    onFocus={() => props.setFieldTouched("cStartDate")}
                    className={`form-control ${
                      props.touched.cStartDate && props.errors.cStartDate
                        ? "is-invalid"
                        : props.touched.cStartDate && "is-valid"
                    }`}
                    selected={props.values.cStartDate}
                    onChange={(date) => {
                      props.setFieldValue("cStartDate", date);
                      // console.log("datepicker", date);
                    }}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.cStartDate && props.errors.cStartDate}
                  </span>
                </div>
              </div>{" "}
            </div>
            <div className="col">
              {" "}
              <div className="form-group">
                <label>Client Deadline</label>
                <div>
                  <DatePicker
                    name="cEndDate"
                    onFocus={() => props.setFieldTouched("cEndDate")}
                    className={`form-control ${
                      props.touched.cEndDate && props.errors.cEndDate
                        ? "is-invalid"
                        : props.touched.cEndDate && "is-valid"
                    }`}
                    selected={props.values.cEndDate}
                    onChange={(datee) => {
                      props.setFieldValue("cEndDate", datee);
                      // console.log("datepicker", datee);
                    }}
                  />
                </div>
                <span id="err" className="invalid-feedback">
                  {props.touched.cEndDate && props.errors.cEndDate}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Status</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleStatusEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>

                <Select
                  name="status"
                  onFocus={() => props.setFieldTouched("status")}
                  value={props.values.status}
                  className={`my-select ${
                    props.touched.status && props.errors.status
                      ? "is-invalid"
                      : props.touched.status && "is-valid"
                  } `}
                  onChange={(val) => props.setFieldValue("status", val)}
                  options={status}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.status && props.errors.status}
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Technology</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleTechnologyEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>
                <Select
                  name="technology"
                  onFocus={() => props.setFieldTouched("technology")}
                  className={`my-select ${
                    props.touched.technology && props.errors.technology
                      ? "is-invalid"
                      : props.touched.technology && "is-valid"
                  } `}
                  value={props.values.technology}
                  onChange={(val) => props.setFieldValue("technology", val)}
                  options={technology}
                  isMulti={true}
                />

                <span id="err" className="invalid-feedback">
                  {props.touched.technology && props.errors.technology}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Service Type</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleServiceEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>
                <Select
                  name="serviceType"
                  onFocus={() => props.setFieldTouched("serviceType")}
                  value={props.values.serviceType}
                  className={`my-select ${
                    props.touched.serviceType && props.errors.serviceType
                      ? "is-invalid"
                      : props.touched.serviceType && "is-valid"
                  } `}
                  onChange={(val) => props.setFieldValue("serviceType", val)}
                  options={service}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.serviceType && props.errors.serviceType}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Project Nature</label>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end"
                      id="add-new-Buttonm "
                      onClick={() => {
                        toggleNatureEdit();
                      }}
                    >
                      <i className="mdi mdi-plus-circle icon-add" />
                    </div>
                  </div>
                </div>
                <Select
                  name="nature"
                  onFocus={() => props.setFieldTouched("nature")}
                  value={props.values.nature}
                  className={`my-select ${
                    props.touched.nature && props.errors.nature
                      ? "is-invalid"
                      : props.touched.nature && "is-valid"
                  }`}
                  onChange={(val) => props.setFieldValue("nature", val)}
                  options={nature}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.nature && props.errors.nature}
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
                    name="Pdeduction"
                    onBlur={props.handleBlur}
                    type="number"
                    className={`form-control ${
                      props.touched.Pdeduction && props.errors.Pdeduction
                        ? "is-invalid"
                        : props.touched.Pdeduction && "is-valid"
                    }`}
                    value={props.values.Pdeduction}
                    onChange={props.handleChange("Pdeduction")}
                    placeholder="Enter Deduction"
                  />
                  <span className="input-group-text">%</span>
                </div>
                <span id="err" className="invalid-feedback">
                  {props.touched.Rprofit && props.errors.Rprofit}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Other Deductions</label>
                <input
                  name="otherDeduction"
                  onBlur={props.handleBlur}
                  type="number"
                  className={`form-control ${
                    props.touched.otherDeduction && props.errors.otherDeduction
                      ? "is-invalid"
                      : props.touched.otherDeduction && "is-valid"
                  }`}
                  value={props.values.otherDeduction}
                  onChange={props.handleChange("otherDeduction")}
                  placeholder="Enter Other Deductions"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.otherDeduction && props.errors.otherDeduction}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Reserve Profit</label>
                <div className="input-group">
                  <input
                    name="Rprofit"
                    onBlur={props.handleBlur}
                    type="number"
                    className={`form-control ${
                      props.touched.Rprofit && props.errors.Rprofit
                        ? "is-invalid"
                        : props.touched.Rprofit && "is-valid"
                    }`}
                    value={props.values.Rprofit}
                    onChange={props.handleChange("Rprofit")}
                    placeholder="Enter Preserve Profit"
                  />
                  <span className="input-group-text">%</span>
                </div>
                <span id="err" className="invalid-feedback">
                  {props.touched.Rprofit && props.errors.Rprofit}
                </span>
              </div>
            </div>
          </div>

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
              <span id="err" className="invalid-feedback">
                {props.touched.description && props.errors.description}
              </span>
            </div>
          </div>
          <div className="PMArea">
            <h4 className="d-flex justify-content-center mb-4">
              Project Manager Area
            </h4>
            <div className="row">
              <div className="col-sm-1" />
              <div className="col-sm-5">
                {" "}
                <div className="form-group">
                  <label>PM Start Date</label>
                  <div>
                    <DatePicker
                      name="pmStartDate"
                      onFocus={() => props.setFieldTouched("pmStartDate")}
                      className={`form-control ${
                        props.touched.pmStartDate && props.errors.pmStartDate
                          ? "is-invalid"
                          : props.touched.pmStartDate && "is-valid"
                      }`}
                      selected={props.values.pmStartDate}
                      onChange={(date1) => {
                        props.setFieldValue("pmStartDate", date1);
                        // console.log("datepicker", date1);
                      }}
                    />
                    <span id="err" className="invalid-feedback">
                      {props.touched.pmStartDate && props.errors.pmStartDate}
                    </span>
                  </div>
                </div>{" "}
              </div>
              <div className="col-sm-5">
                {" "}
                <div className="form-group">
                  <label>PM End Date</label>
                  <div>
                    <DatePicker
                      name="pmEndDate"
                      onFocus={() => props.setFieldTouched("pmEndDate")}
                      selected={props.values.pmEndDate}
                      className={`form-control ${
                        props.touched.pmEndDate && props.errors.pmEndDate
                          ? "is-invalid"
                          : props.touched.pmEndDate && "is-valid"
                      }`}
                      onChange={(date2) => {
                        props.setFieldValue("pmEndDate", date2);
                        // console.log("datepicker", date2);
                      }}
                    />
                    <span id="err" className="invalid-feedback">
                      {props.touched.pmEndDate && props.errors.pmEndDate}
                    </span>
                  </div>
                </div>{" "}
              </div>
              <div className="col-sm-1" />
            </div>
            <PhaseList
              setPhaseDetials={setPhasesDetails}
              phasesDetails={phasesDetails}
              editable={editable}
              phaseArray={phaseValue}
            />
          </div>
          <div className="d-flex justify-content-center row">
            <div className="primary-button">
              <Button
                className="mt-3 my-primary-button"
                onClick={props.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={clientModal}
            toggle={toggleClientEdit}
          >
            <ModalHeader toggle={toggleClientEdit}>New Client</ModalHeader>
            <ModalBody>
              <AddClientForm toggle={toggleClientEdit} />
            </ModalBody>
          </Modal>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={platformModal}
            toggle={togglePlatformEdit}
          >
            <ModalHeader toggle={togglePlatformEdit}>Add Platform</ModalHeader>
            <ModalBody>
              <AddPlatform toggle={togglePlatformEdit} />
            </ModalBody>
          </Modal>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={technologyModal}
            toggle={toggleTechnologyEdit}
          >
            <ModalHeader toggle={toggleTechnologyEdit}>
              Add Technology
            </ModalHeader>
            <ModalBody>
              <AddTechnology toggle={toggleTechnologyEdit} />
            </ModalBody>
          </Modal>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={serviceModal}
            toggle={toggleServiceEdit}
          >
            <ModalHeader toggle={toggleServiceEdit}>Add Service</ModalHeader>
            <ModalBody>
              <AddService toggle={toggleServiceEdit} />
            </ModalBody>
          </Modal>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={statusModal}
            toggle={toggleStatusEdit}
          >
            <ModalHeader toggle={toggleStatusEdit}>Add Status</ModalHeader>
            <ModalBody>
              <AddStatus toggle={toggleStatusEdit} />
            </ModalBody>
          </Modal>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={natureModal}
            toggle={toggleNatureEdit}
          >
            <ModalHeader toggle={toggleNatureEdit}>
              Add Project Nature
            </ModalHeader>
            <ModalBody>
              <AddProjectNature toggle={toggleNatureEdit} />
            </ModalBody>
          </Modal>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={currencyModal}
            toggle={toggleCurrencyEdit}
          >
            <ModalHeader toggle={toggleCurrencyEdit}>
              Add New Currency
            </ModalHeader>
            <ModalBody>
              <AddCurrency toggle={toggleCurrencyEdit} />
            </ModalBody>
          </Modal>
        </div>
      )}
    </Formik>
  );
};

export default ProjectForm;

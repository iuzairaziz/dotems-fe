import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import projectValidation from "../../../validations/project-validations";
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

const ProjectForm = (props) => {
  const [default_date, set_default_date] = useState(0);
  const [end_date, set_end_date] = useState(0);
  const [country, setCountry] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [service, setServiceType] = useState([]);
  const [nature, setNature] = useState([]);
  const [users, setUsers] = useState([]);
  const [client, setClient] = useState([]);

  const handleDefault = (date) => {
    console.log(date);
    set_default_date(date);
  };
  const handleEnd = (datee) => {
    console.log(datee);
    set_end_date(datee);
  };
  useEffect(() => {
    getCountry();
    getPlatform();
    getTechnology();
    getServiceType();
    getNature();
    getUsers();
    getClient();
  }, []);

  const getUsers = () => {
    userService.getUsers().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ value: item.name, label: item.name, id: item._id });
        setUsers(options);
      });
    });
  };

  const getClient = () => {
    ClientService.getAllClient().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          id: item._id,
        });
        setClient(options);
      });
    });
  };

  const getNature = () => {
    NatureService.getAllNature().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          id: item._id,
        });
        setNature(options);
      });
    });
  };

  const getServiceType = () => {
    ServiceService.getAllService().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          id: item._id,
        });
        setServiceType(options);
      });
    });
  };

  const getTechnology = () => {
    TechnologyService.getAllTechnologies().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          id: item._id,
        });
        setTechnology(options);
      });
    });
  };

  const getPlatform = () => {
    PlatformService.getAllPlatform().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          id: item._id,
        });
        setPlatform(options);
      });
    });
  };

  const getCountry = () => {
    CountryService.getAllCountry().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          id: item._id,
        });
        setCountry(options);
      });
    });
  };

  const project = props.project;
  const editable = props.editable;
  console.log("from project form ", project);

  return (
    <Formik
      initialValues={{
        projectName: editable && project.name,
        clientName: editable && project.client && project.client.client_name,
        status: editable && project.status,
        cost: editable && project.cost,
        platform:
          editable && project.platform && project.platform.platform_name,
        technology:
          editable && project.technology && project.technology.technology_name,
        serviceType:
          editable && project.service && project.service.service_name,
        projectNature: editable && project.nature && project.nature.nature_name,
        startDate: editable && project.startDate,
        endDate: editable && project.endDate,
        projectManager:
          editable &&
          project.projectManager &&
          project.projectManager.projectManager_name,
        teamMembers:
          editable &&
          project.assignedUser &&
          project.assignedUser.assignedUser_name,
        orderNum: editable && project.orderNumber,
      }}
      validationSchema={projectValidation.newProjectValidation}
      onSubmit={(values, actions) => {
        let usrs = [];
        values.assignedTo.map((item) => {
          usrs.push(item.id);
        });
        editable
          ? ProjectService.updateProject(project._id, {
              name: values.projectName,
              client: values.clientName,
              orderNumber: values.orderNum,
              platform: values.platform,
              technology: values.technology,
              service: values.serviceType,
              status: values.status,
              nature: values.projectNature,
              startDate: values.startDate,
              endDate: values.endDate,
              projectManager: values.projectManager,
              assignedUser: usrs,
              cost: values.cost,
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
              client: values.clientName,
              orderNumber: values.orderNum,
              platform: values.platform,
              technology: values.technology,
              service: values.serviceType,
              status: values.status,
              nature: values.projectNature,
              startDate: values.startDate,
              endDate: values.endDate,
              projectManager: values.projectManager,
              assignedUser: usrs,
              cost: values.cost,
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
        <>
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
                <span id="err">{props.errors.projectName}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Client Name</label>
                <select
                  className="form-control"
                  value={props.values.client}
                  onChange={props.handleChange("client")}
                >
                  {client.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <span id="err">{props.errors.client}</span>
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
                <span id="err">{props.errors.orderNum}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Platform</label>

                <select
                  className="form-control"
                  value={props.values.platform}
                  onChange={props.handleChange("platform")}
                >
                  {platform.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <span id="err">{props.errors.platform}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Technology</label>

                <select
                  className="form-control"
                  value={props.values.technology}
                  onChange={props.handleChange("technology")}
                >
                  {technology.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <span id="err">{props.errors.technology}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Services Type</label>
                <select
                  className="form-control"
                  value={props.values.service}
                  onChange={props.handleChange("service")}
                >
                  {service.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <span id="err">{props.errors.service}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Status</label>

                <Select
                  value={props.values.status}
                  onChange={props.handleChange("status")}
                  options={["PAksitan", "China"]}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Project Nature</label>

                <select
                  className="form-control"
                  value={props.values.nature}
                  onChange={props.handleChange("nature")}
                >
                  {nature.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <span id="err">{props.errors.nature}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {" "}
              <div className="form-group">
                <label>Start Date</label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={props.values.startDate}
                    onChange={(date) => {
                      props.setFieldValue("startDate", date);
                      console.log("datepicker", date);
                    }}
                  />
                </div>
              </div>{" "}
            </div>
            <div className="col">
              {" "}
              <div className="form-group">
                <label>Deadline</label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={props.values.endDate}
                    onChange={(datee) => {
                      props.setFieldValue("endDate", datee);
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

                <select
                  className="form-control"
                  value={props.values.users}
                  onChange={props.handleChange("users")}
                >
                  {users.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <span id="err">{props.errors.users}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-0">
                <label className="control-label">Team Members</label>
                <Select
                  value={props.values.assignedUser}
                  onChange={(val) => props.setFieldValue("assignedUser", val)}
                  options={users}
                  isMulti={true}
                />
                <span id="err">{props.errors.assignedUser}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Cost</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.cost}
                  onChange={props.handleChange("cost")}
                  placeholder="Enter Amount"
                />
                <span id="err">{props.errors.cost}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
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
      )}
    </Formik>
  );
};

export default ProjectForm;

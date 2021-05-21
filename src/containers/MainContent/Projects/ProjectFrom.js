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
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ProjectFormTable from "../Projects/ProjectFormTable"
import StatusService from "../../../services/StatusService"
import CurrencyService from "../../../services/CurrencyService"
import { EditorState } from 'draft-js';
import Editable from 'react-x-editable';


const ProjectForm = (props) => {
  const [default_date, set_default_date] = useState(0);
  const [end_date, set_end_date] = useState(0);
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
  const [toShow,setToShow] = useState([])
  const [newNature, setNewNature] = useState([{}]);
  const [teamMember, setTeamMember] = useState([])
  const [defaultProjectDate, setDefaultProjectDate] = useState("2017-12-31");
  const [endProjectDate, setEndProjectDate] = useState("2017-12-31");



 

  const handleOption = (opt) => {
    console.log(opt);
    set_default_option(opt);
  };

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
    getStatus();
    getCurrency();
  }, []);

  const getCurrency = () => {
    CurrencyService.getAllCurrency().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          id: item._id,
        });
        setCurrency(options);
      });
    });
  };

  const getStatus = () => {
    StatusService.getAllStatus().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          id: item._id,
        });
        setStatus(options);
      });
    });
  };
 

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
  // console.log("from project form ", project);

  const toShowData =() => {
    let keys = Object.keys(nature)
    keys.map((item) =>{
      setToShow({value : item , text : newNature[item]})
    })
    console.log("Data To Disply in MultiSelect",toShow);
  }


  // const ControlledEditor = () => {
  //   constructor((props) => {
  //     super(props);
  //     this.state = {
  //       editorState: EditorState.createEmpty(),
  //     };
  //   })
  
   const onEditorStateChange = (editorState) => {
      setEditorState( editorState);
    };
 
    

  return (
    <Formik
      initialValues={{
        projectName: editable && project.name,
        clientName: editable && project.client && project.client.client_name,
        status: editable && project.status && project.status.status_name,
        cost: editable && project.cost,
        Rprofit: editable && project.Rprofit,
        platform:
          editable && project.platform && project.platform.platform_name,
        technology:
          editable && project.technology && project.technology.technology_name,
        serviceType:
          editable && project.service && project.service.service_name,
        projectNature: editable && project.nature && project.nature.nature_name,
        currency: editable && project.currency && project.currency.currency_name,
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
        Pdeduction: editable && project.Pdeduction,
        percentage: editable && project.percentage,
        fCost: editable && project.fCost
      }}
      validationSchema={projectValidation.newProjectValidation}
      onSubmit={(values, actions) => {
        let usrs = [];
        console.log("team members", values.teamMembers);
        values.teamMembers.map((item) => {
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
              Rprofit: values.Rprofit,
              Pdeduction: values.Pdeduction,
              percentage: values.percentage,
              fCost: values.fCost,
              currency: values.currency,
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
              Rprofit: values.Rprofit,
              Pdeduction: values.Pdeduction,
              percentage: values.percentage,
              fCost: values.fCost,
              currency: values.currency,
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
                  value={props.values.clientName}
                  onChange={props.handleChange("clientName")}
                >
                  {client.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <span id="err">{props.errors.clientName}</span>
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
                  value={props.values.serviceType}
                  onChange={props.handleChange("serviceType")}
                >
                  {service.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <span id="err">{props.errors.serviceType}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Status</label>

                <select
                  className="form-control"
                  value={props.values.status}
                  onChange={props.handleChange("status")}
                >
                  {status.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <span id="err">{props.errors.status}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Project Nature</label>

                <select
                  className="form-control"
                  value={props.values.projectNature}
                  onChange={props.handleChange("projectNature")}
                >
                  {nature.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <span id="err">{props.errors.projectNature}</span>
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
                  value={props.values.projectManager}
                  onChange={props.handleChange("projectManager")}
                >
                  {users.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <span id="err">{props.errors.projectManager}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-0">
                <label className="control-label">Team Members</label>
                <Select
                  value={props.values.teamMembers}
                  onChange={(val) => {
                    
                    props.setFieldValue("teamMembers", val);
                    console.log("team change", val);
                    setTeamMember(val)
                    console.log("team Members", teamMember)
                    
                  }}
                  options={users}
                  isMulti={true}
                />
                <span id="err">{props.errors.teamMembers}</span>
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
            <div className="col">
              <div className="form-group">
                <label>Currency</label>
                <select
                  className="form-control"
                  value={props.values.currency}
                  onChange={props.handleChange("currency")}
                >
                  {currency.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <span id="err">{props.errors.currency}</span>
              </div>
            </div>
          </div>
          <div className="row">
          <div className="col">
              <div className="form-group">
                <label>Platform Deduction</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.Pdeduction}
                  onChange={props.handleChange("Pdeduction")}
                  placeholder="Enter Deduction"
                />
                <span id="err">{props.errors.Pdeduction}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Reserve Profit</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.values.Rprofit}
                  onChange={props.handleChange("Rprofit")}
                  placeholder="Enter Preserve Profit"
                />
                <span id="err">{props.errors.Rprofit}</span>
              </div>
            </div>
          </div>
          <div className="container">
          <form>
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
          </form>
          
          </div>
          <div className="row">
          <div className="col-12">
                            <div className="card m-b-20">
                                <div className="card-body">

                                    <h4 className="mt-0 header-title">Description</h4>
                                

                                        <Editor
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName" 
                                onEditorStateChange={onEditorStateChange}
                                />
                                
                                </div>
                            </div>
                        </div>
          </div>
          {/* <ProjectFormTable /> */}
          <div className="page-content-wrapper">
            <div className="container-fluid">

                <div className="row">
                    <div className="col-12">
                        <div className="card m-b-20">
                            <div className="card-body">

                               

                                    <table className="table table-striped mb-0">
                                <thead>
                                <tr>
                                    <th style={{fontSize: "17px", fontWeight: "bold"}}>Name</th>
                                    <th style={{fontSize: "17px", fontWeight: "bold"}}>Nature</th>
                                    <th style={{fontSize: "17px", fontWeight: "bold"}}>Est. Hours</th>
                                    <th style={{fontSize: "17px", fontWeight: "bold"}}>Est. Cost</th>
                                </tr>
                                </thead>
                                <tbody>
                                  {teamMember.map((item, index) => {
                                    return(
                                      <tr>
                                      <td>{teamMember[index].value}</td>
                                      {console.log("team Member Name", teamMember[index].value)}
                                      <td>
                                        
                                      <select 
                  className="form-control"
                  value={props.values.projectNature}
                  onChange={props.handleChange("projectNature")}
                >
                  {nature.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <span id="err">{props.errors.projectNature}</span>
                                        {/* <Editable
                                          name="Nature"
                                          dataType="select"
                                          mode="inline"
                                          title="Select Nature"
                                          options={[toShow]}
                                            value="Not Selected"
                                          /> */}
                                      </td>
                                      <td>
                                        <Editable
                                          name="Hours"
                                          dataType="text"
                                          mode="inline"
                                          title="Please enter Hours"
                                          value="0"
                                          />
                                      </td>
                                      <td>
                                        <Editable
                                          name="Cost"
                                          dataType="text"
                                          mode="inline"
                                          title="Please enter Cost"
                                          value="0"
                                          />
                                      </td>
                                      
                                  </tr>
                                    )
                                  })}
                                 
                                  
                                 
                                  <tr>
                                    <td style={{fontSize: "14px", fontWeight: "bold"}}>Total Est. Hours/Cost</td>
                                    <td></td>
                                   <td>6</td>
                                   <td>75000</td>
                                </tr>
                               
                               
                               
                                <tr>
                                    <td style={{fontSize: "14px", fontWeight: "bold"}}>Start Date</td>
                                    <td>
                                      <Editable
                                      
                                        name="username"
                                        dataType="date"
                                        mode="inline"
                                        title="Please enter username"      
                                        value={`${defaultProjectDate}`}
                                        display={(value) => {
                                          setDefaultProjectDate(value)
                                          return (
                                            <>
                                          <strong>{value}</strong>
                                            {console.log("date", defaultProjectDate)}
                                            </>
                                            );
                                          
                                        }}
                                      />
                                    </td>
                                    <td style={{fontSize: "14px", fontWeight: "bold"}}>Deadline</td>
                                    <td>
                                      <Editable
                                      
                                        name="username"
                                        dataType="date"
                                        mode="inline"
                                        title="Please enter username"      
                                        value={`${endProjectDate}`}
                                        display={(value) => {
                                          setEndProjectDate(value)
                                          return (
                                            <>
                                          <strong>{value}</strong>
                                            {console.log("end date", endProjectDate)}
                                            </>
                                            );
                                          
                                        }}
                                      />
                                    </td>
                                </tr>
                               
                              
                                </tbody>
                                <div className="button" style={{paddingLeft: "0px"}}>
                                <Button outline color="info"><i className="fa fa-plus fa-2x"></i></Button>{' '}
                                </div>
                                
                            </table>
                            </div>
                        </div>
                    </div> 
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

import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import userValidation from "../../../../validations/user-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CountryService from "../../../../services/CountryService";
import UserService from "../../../../services/UserService";
import ProjectService from "../../../../services/ProjectService";
import PlatformService from "../../../../services/PlatformService";
import TechnologyService from "../../../../services/TechnologyService";
import ServiceService from "../../../../services/ServiceService";
import NatureService from "../../../../services/NatureService";
import ClientService from "../../../../services/ClientService";

const UpdateUser = (props) => {
    const [technology, setTechnology] = useState([]);
    const [users, setUser] = useState({});

  const user = props.user;
  const editable = props.editable;

  useEffect(() =>{
    getTechnology();
    getData();
  },[] )



  const getTechnology = () => {
    TechnologyService.getAllTechnologies().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ value: item._id, label: item.name, id: item._id });
      });
      setTechnology(options);
    });
  };
 
  const getData = () => {
    let loggedUser = UserService.userLoggedInInfo();
    console.log("logged user",loggedUser);
    UserService.getUserById(loggedUser._id).then((res)=>{
      console.log("userssss",res.data);
      setUser(res.data);
    });
    
    console.log(users)
  };

  // const getLogin = () => {
  //   let userprofile = UserService.userLoggedInInfo();
  //   console.log("userprofile", userprofile)
  // };

  return (
    <Formik
      initialValues={{
        technologies: editable && user.technologies
      }}
      // validationSchema={userValidation.newUserValidation}
      onSubmit={(values, actions) => {
           UserService.updateUsers({
              
              technology: values.technology,
              
            })
              .then((res) => {
                UserService.handleMessage("update");
                props.toggle();
              })
              .catch((err) => {
                UserService.handleError();
                props.toggle();
              })
      }}
    >
      {(props) => (
        <>
        <div className="row">
        </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={users.name}
                  readOnly = {true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>User Name</label>
                <input
                  className="form-control"
                    value={users.email}
                  readOnly = {true}
                />
              </div>
            </div>
          </div>

          <div className="row">
          <div className="col">
              <div className="form-group">
                <label>Gender</label>
                <input
                  className="form-control"
                    value={users.gender}
                  readOnly = {true}
                />
              </div>
            </div>

            <div className="col">
              {" "}
              <div className="form-group">
                <label>Joining Date</label>
                <div>
                  <DatePicker
                  value= {users.joiningDate}
                    className="form-control"
                    readOnly = {true}
                  />
                </div>
              </div>{" "}
            </div>
          </div>

          <div className="row">
           

            <div className="col">
              <div className="form-group">
                <label>Salary</label>
                <input
                  className="form-control"
                    value={users.salary}
                  readOnly = {true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                    value={users.password}
                  readOnly = {true}
                />
              </div>
            </div>
          </div>
          <div className="row">
          <div className="col">
              <div className="form-group">
                <label className="control-label">Status</label>
                <input
                  className="form-control"
                    value={users.status}
                  readOnly = {true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Technology</label>
                 <Select
                    value={props.values.technology}
                    onChange={(val) => props.setFieldValue("technology", val)}
                    options={technology}
                    isMulti={true}
                  />
                <span id="err">{props.errors.technology}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Working Hours</label>
                <input
                  className="form-control"
                    value={users.workingHrs}
                  readOnly = {true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Working Days</label>
                <input
                  className="form-control"
                    value={users.workingDays}
                  readOnly = {true}
                />
              </div>
            </div>
            
          </div>
          <div className="row">
          <div className="col">
              <div className="form-group">
                <label>Machine Number</label>
                <input
                  className="form-control"
                    value={users.machineNo}
                  readOnly = {true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Designantion</label>
                <input
                  className="form-control"
                    value={users.userRole}
                  readOnly = {true}
                />
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

export default UpdateUser;

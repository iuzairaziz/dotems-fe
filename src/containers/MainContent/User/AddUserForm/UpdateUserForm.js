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
  const [viewTech, setViewTech] = useState([]);

  useEffect(() => {
    getTechnology();
    getData();
  }, []);
  useEffect(() => {
    const tech = [];
    console.log(users.technology);
    if (!isEmptyObj(users))
      users.technology.map((item) => {
        tech.push({ label: item.name, value: item._id });
      });
    console.log("Technology", tech);
    setViewTech(tech);
  }, [users]);

  const isEmptyObj = (obj) => {
    for (var x in obj) {
      return false;
    }
    return true;
  };

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
    console.log("logged user", loggedUser);
    UserService.getUserById(loggedUser._id).then((res) => {
      console.log("userssss", res.data.user);
      setUser(res.data.user);
    });

    console.log("usersssss", users);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        technologies: viewTech,
        contact: users && users.contact,
        otherContact: users && users.otherContact,
        emailPersonal: users && users.emailPersonal,
        address: users && users.address,
        contactEmergency: users && users.contactEmergency,
        nameEmergency: users && users.nameEmergency,
      }}
      validationSchema={userValidation.UpdateProfile}
      onSubmit={async (values, actions) => {
        console.log("TechNologies", values.technologies);
        let loggedUser = UserService.userLoggedInInfo();
        let techId = [];
        values.technologies.map((item, index) => {
          techId.push(item.value);
        });
        const profileData = {};
        profileData.technology = techId;
        profileData.contact = values.contact;
        profileData.otherContact = values.otherContact;
        profileData.emailPersonal = values.emailPersonal;
        profileData.address = values.address;
        profileData.contactEmergency = values.contactEmergency;
        profileData.nameEmergency = values.nameEmergency;
        UserService.updateUserProfile(profileData, loggedUser._id)
          .then((res) => {
            UserService.handleMessage("update");
          })
          .catch((err) => {
            UserService.handleError();
          });
      }}
    >
      {(props) => (
        <>
          <div className="row" />
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={users.name}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>User Name</label>
                <input
                  className="form-control"
                  value={users.email}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Add Image</label>
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    Choose file
                  </label>
                </div>
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
                  readOnly={true}
                />
              </div>
            </div>

            <div className="col">
              {" "}
              <div className="form-group">
                <label>Joining Date</label>
                <div>
                  <DatePicker
                    value={users.joiningDate}
                    className="form-control"
                    readOnly={true}
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
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Password </label>
                <input
                  type="password"
                  className="form-control"
                  value={users.password}
                  readOnly={true}
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
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Technology</label>
                <Select
                  value={props.values.technologies}
                  onChange={(val) => props.setFieldValue("technologies", val)}
                  options={technology}
                  isMulti={true}
                />
                <span id="err">
                  {props.touched.technology && props.errors.technology}
                </span>
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
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Working Days</label>
                <input
                  className="form-control"
                  value={users.workingDays}
                  readOnly={true}
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
                  value={users && users.machineNo && users.machineNo.machineNo}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Designantion</label>
                <input
                  className="form-control"
                  value={users.userRole}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  // defaultValue={props.values.contact}
                  value={props.values.contact}
                  onChange={props.handleChange("contact")}
                  placeholder="Enter Contact Number"
                />
                <span id="err">
                  {props.touched.contact && props.errors.contact}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Other Contact </label>
                <input
                  type="text"
                  className="form-control"
                  // defaultValue={props.values.otherContact}
                  value={props.values.otherContact}
                  onChange={props.handleChange("otherContact")}
                  placeholder="Enter Contact Number"
                />
                <span id="err">
                  {props.touched.otherContact && props.errors.otherContact}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Personal Email</label>
                <input
                  type="text"
                  className="form-control"
                  // defaultValue={props.values.emailPersonal}
                  value={props.values.emailPersonal}
                  onChange={props.handleChange("emailPersonal")}
                  placeholder="Enter Personal Email"
                />
                <span id="err">
                  {props.touched.emailPersonal && props.errors.emailPersonal}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Address </label>
                <input
                  type="text"
                  className="form-control"
                  // defaultValue={props.values.address}
                  value={props.values.address}
                  onChange={props.handleChange("address")}
                  placeholder="Enter Address "
                />
                <span id="err">
                  {props.touched.address && props.errors.address}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Guardian Name </label>
                <input
                  type="text"
                  className="form-control"
                  // defaultValue={props.values.nameEmergency}
                  value={props.values.nameEmergency}
                  onChange={props.handleChange("nameEmergency")}
                  placeholder="Enter Guardian Name "
                />
                <span id="err">
                  {props.touched.nameEmergency && props.errors.nameEmergency}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Guardian Contact</label>
                <input
                  type="text"
                  className="form-control"
                  // defaultValue={props.values.contactEmergency}
                  value={props.values.contactEmergency}
                  onChange={props.handleChange("contactEmergency")}
                  placeholder="Enter Guardian Contact Number"
                />
                <span id="err">
                  {props.touched.contactEmergency &&
                    props.errors.contactEmergency}
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Button
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

export default UpdateUser;

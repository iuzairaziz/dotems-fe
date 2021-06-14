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

  const user = props.user;
  const editable = props.editable;

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
      console.log("userssss", res.data);
      setUser(res.data);
    });

    console.log("usersssss", users);
  };

  // const getLogin = () => {
  //   let userprofile = UserService.userLoggedInInfo();
  //   console.log("userprofile", userprofile)
  // };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        technologies: viewTech,
      }}
      // validationSchema={userValidation.newUserValidation}

      onSubmit={async (values, actions) => {
        console.log("TechNologies", values.technologies);
        let loggedUser = UserService.userLoggedInInfo();
        let techId = [];
        values.technologies.map((item, index) => {
          techId.push(item.value);
        });
        const techObject = {};
        techObject.technology = techId;
        UserService.updateUser(techObject, loggedUser._id)
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
                <label>Password</label>
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
                  // value={
                  //   users &&
                  //   users.assignedUser.map((item) => {
                  //     return item.name;
                  //   })
                  // }
                  value={users && users.machineNo}
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

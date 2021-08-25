import React, { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import userValidation from "../../../../validations/user-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CountryService from "../../../../services/DesignationService";
import UserService from "../../../../services/UserService";
import ProjectService from "../../../../services/ProjectService";
import PlatformService from "../../../../services/PlatformService";
import TechnologyService from "../../../../services/TechnologyService";
import ServiceService from "../../../../services/ServiceService";
import NatureService from "../../../../services/NatureService";
import ClientService from "../../../../services/ClientService";
import "./UpdateUserForm.scss";
import moment from "moment";
import Alert from "../../Alert/Alert";
import Configuration from "../../../../config/configuration";

const UpdateUser = (props) => {
  const config = new Configuration();

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

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  console.log("image", selectedFile);

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("something went wrong!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch(config.apiBaseUrl + "cloudinary/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
      setFileInputState("");
      setPreviewSource("");
      setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      setErrMsg("Something went wrong!");
    }
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

  const detail = [
    { label: "Name", value: users.name },
    {
      label: "Username",
      value: users.email,
    },

    {
      label: "Gender",
      value: users.gender,
    },
    {
      label: "Joining Date",
      value: moment(users.joiningDate).format("LL"),
    },

    { label: "Salary", value: users.salary },
    {
      label: "Status",
      value: users.status,
    },
    {
      label: "Working Hours",
      value: users.workingHrs,
    },
    {
      label: "Working Days",
      value: users.workingDays,
    },

    {
      label: "Machine Number",
      value: users && users.machineNo && users.machineNo.machineNo,
    },
    {
      label: "Designantion",
      value: users && users.designation && users.designation.name,
    },
  ];

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
            UserService.handleCustomMessage(err.response.data);
          });
      }}
    >
      {(props) => (
        <>
          <div className="row UpdateP gap" />
          <div className="row gapp">
            <div className="row align-items-center">
              {detail.map((item, indx) => {
                return (
                  <>
                    <div
                      className={`labell ${
                        item.label === "Team Members"
                          ? "col-3 col-md-2"
                          : "col-3 col-md-2"
                      } mb-3 d-flex align-items-center align-self-center`}
                    >
                      <div>{item.label}</div>
                    </div>
                    <div
                      className={`valuee ${
                        item.label === "Team Members"
                          ? "col-9 col-md-6"
                          : "col-3 col-md-2"
                      } col-3 col-md-2 mb-3 align-self-center"`}
                    >
                      {item.value}
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="card m-b-20">
            <div className="card-body">
              <div>
                <h1 className="title">Upload an Image</h1>
                <Alert msg={errMsg} type="danger" />
                <Alert msg={successMsg} type="success" />
                <form onSubmit={handleSubmitFile} className="form">
                  <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                  />
                  <button className="btn" type="submit">
                    Submit
                  </button>
                </form>
                {previewSource && (
                  <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: "300px" }}
                  />
                )}
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="control-label">Technology</label>
                    <Select
                      className={`my-select${
                        props.touched.technologies && props.errors.technologies
                          ? "is-invalid"
                          : props.touched.technologies && "is-valid"
                      }`}
                      value={props.values.technologies}
                      onChange={(val) =>
                        props.setFieldValue("technologies", val)
                      }
                      options={technology}
                      isMulti={true}
                    />
                    <span id="err" className="invalid-feedback">
                      {props.touched.technology && props.errors.technology}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      type="text"
                      className={`form-control ${
                        props.touched.contact && props.errors.contact
                          ? "is-invalid"
                          : props.touched.contact && "is-valid"
                      }`} // defaultValue={props.values.contact}
                      value={props.values.contact}
                      onChange={props.handleChange("contact")}
                      placeholder="Enter Contact Number"
                    />
                    <span id="err" className="invalid-feedback">
                      {props.touched.contact && props.errors.contact}
                    </span>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>Other Contact </label>
                    <input
                      type="text"
                      className={`form-control ${
                        props.touched.otherContact && props.errors.otherContact
                          ? "is-invalid"
                          : props.touched.otherContact && "is-valid"
                      }`} // defaultValue={props.values.otherContact}
                      value={props.values.otherContact}
                      onChange={props.handleChange("otherContact")}
                      placeholder="Enter Contact Number"
                    />
                    <span id="err" className="invalid-feedback">
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
                      className={`form-control ${
                        props.touched.emailPersonal &&
                        props.errors.emailPersonal
                          ? "is-invalid"
                          : props.touched.emailPersonal && "is-valid"
                      }`} // defaultValue={props.values.emailPersonal}
                      value={props.values.emailPersonal}
                      onChange={props.handleChange("emailPersonal")}
                      placeholder="Enter Personal Email"
                    />
                    <span id="err" className="invalid-feedback">
                      {props.touched.emailPersonal &&
                        props.errors.emailPersonal}
                    </span>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>Address </label>
                    <input
                      type="text"
                      className={`form-control ${
                        props.touched.address && props.errors.address
                          ? "is-invalid"
                          : props.touched.address && "is-valid"
                      }`} // defaultValue={props.values.address}
                      value={props.values.address}
                      onChange={props.handleChange("address")}
                      placeholder="Enter Address "
                    />
                    <span id="err" className="invalid-feedback">
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
                      className={`form-control ${
                        props.touched.nameEmergency &&
                        props.errors.nameEmergency
                          ? "is-invalid"
                          : props.touched.nameEmergency && "is-valid"
                      }`} // defaultValue={props.values.nameEmergency}
                      value={props.values.nameEmergency}
                      onChange={props.handleChange("nameEmergency")}
                      placeholder="Enter Guardian Name "
                    />
                    <span id="err" className="invalid-feedback">
                      {props.touched.nameEmergency &&
                        props.errors.nameEmergency}
                    </span>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>Guardian Contact</label>
                    <input
                      type="text"
                      className={`form-control ${
                        props.touched.contactEmergency &&
                        props.errors.contactEmergency
                          ? "is-invalid"
                          : props.touched.contactEmergency && "is-valid"
                      }`} // defaultValue={props.values.contactEmergency}
                      value={props.values.contactEmergency}
                      onChange={props.handleChange("contactEmergency")}
                      placeholder="Enter Guardian Contact Number"
                    />
                    <span id="err" className="invalid-feedback">
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
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

export default UpdateUser;

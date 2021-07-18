import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../../hoc/Aux_";
import "./SingleDetail.scss";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, EditorState, convertToRaw } from "draft-js";
import LeaveService from "../../../../../services/LeaveService";
import moment from "moment";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";
import UserService from "../../../../../services/UserService";
import { Progress } from "reactstrap";
import Select from "react-select";
import userService from "../../../../../services/UserService";
import leaveService from "../../../../../services/LeaveService";
import configuration from "../../../../../config/configuration";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const SingleDetail = (props) => {
  const [leaveData, setDataa] = useState();
  const leaveID = props.match.params.id;
  let loggedUser = UserService.userLoggedInInfo();
  console.log("logged user", loggedUser);
  const [userData, setUserData] = useState();
  const [taskData, setTaskData] = useState([]);
  const [statusLeave, setStatusLeave] = useState();
  const [description, setDescription] = useState();
  const [modalEdit, setModalEdit] = useState(false);
  const loggedInUser = userService.userLoggedInInfo();

  let config = new configuration();

  const [dataa, setData] = useState({
    columns: [
      {
        label: "Title",
        field: "title",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Project",
        field: "project",
        sort: "asc",
        // width: 270,
      },
      {
        label: "Estimated Hours",
        field: "estimatedHrs",
        sort: "asc",
        // width: 200,
      },
      {
        label: "Project Ratio",
        field: "projectRatio",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Team Lead",
        field: "teamLead",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Added By",
        field: "addedBy",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Start Time",
        field: "startTime",
        sort: "asc",
        // width: 100,
      },
      {
        label: "End Time",
        field: "endTime",
        sort: "asc",
        // width: 100,
      },
    ],
    rows: [],
  });

  const toggleEdit = () => setModalEdit(!modalEdit);

  const getUserTask = (id) => {
    UserService.getUserById(loggedUser._id)
      .then((res) => {
        const { tasks, user } = res.data;
        console.log(tasks);
        setUserData(user);
        setTaskData(tasks);
        let data = { ...dataa };
        data.rows = [];
        tasks.map((item, index) => {
          data.rows.push({
            title: item.name ? item.name : "none",
            project: (
              <Link to={`/projectdetails/${item.project._id}`}>
                {" "}
                {item.project ? item.project.name : "none"}{" "}
              </Link>
            ),
            estimatedHrs: item.estHrs ? item.estHrs.toFixed(2) : "none",
            projectRatio: item.projectRatio ? (
              <Progress color="teal" value={item.projectRatio}>
                {item.projectRatio + "%"}
              </Progress>
            ) : (
              "N/A"
            ),
            status: item.status ? item.status : "none",
            teamLead: item.teamLead ? (
              <Link to={`/userdetails/${item.teamLead._id}`}>
                {" "}
                {item.teamLead.name}{" "}
              </Link>
            ) : (
              "none"
            ),
            addedBy: item.addedBy ? item.addedBy.name : "none",
            startTime: item.startTime
              ? moment(item.startTime).format("DD/MMM/YYYY")
              : "none",
            endTime: item.endTime
              ? moment(item.endTime).format("DD/MMM/YYYY")
              : "none",
          });
        });
        setData(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    getData(leaveID);
    getUserTask();
  }, [modalEdit]);

  const getData = (id) => {
    LeaveService.leaveById(id)
      .then((res) => {
        setDataa(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  console.log("Leave data", leaveData);

  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="mt-0 header-title" />
                  <div className="row">
                    <div className="col-10">
                      <h4>Leave Details</h4>{" "}
                    </div>
                    <div className="col approval">
                      <Button
                        color="success"
                        className="mt-3 my-primary-button"
                        onClick={() => {
                          toggleEdit();
                        }}
                      >
                        Take Action
                      </Button>
                    </div>
                  </div>
                  <hr />
                  <div className="row main">
                    <div className="col-2">
                      <span>
                        <b>Employee Name:</b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>{leaveData && leaveData.user.name}</span>
                    </div>
                    <div className="col-2">
                      <span>
                        <b>Leave Type: </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>{leaveData && leaveData.type.name}</span>
                    </div>
                    <div className="col-2 sub">
                      <span>
                        <b>PM Leave Status: </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>{leaveData && leaveData.pmStatus}</span>
                    </div>
                    <div className="col-2 sub">
                      <span>
                        <b>Admin Leave Status: </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>{leaveData && leaveData.adminStatus}</span>
                    </div>

                    <div className="col-2">
                      <span>
                        <b>Posting Date: </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>
                        {leaveData && moment(leaveData.createdAt).format("LL")}
                      </span>
                    </div>

                    <div className="col-2">
                      <span>
                        <b>Admin Action Date:</b>
                      </span>
                    </div>
                    <div className="col-2 sub">
                      <span>
                        {leaveData && leaveData.adminActionDate
                          ? moment(leaveData.adminActionDate).format("LL")
                          : "None"}
                      </span>
                    </div>
                    <div className="col-2 sub">
                      <span>
                        <b>Leave Dates: </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>
                        {leaveData &&
                          leaveData.dates.map((item, index) => {
                            return (
                              <div>
                                {moment(item.date).format("LL")}
                                <br />
                              </div>
                            );
                            if (index === 0) {
                              return moment(item.date).format("LL");
                            } else if (index >= 0) {
                              return `, ${moment(item.date).format("LL")} `;
                            }
                          })}
                      </span>
                    </div>
                    <div className="col-lg-12">
                      <ul
                        className="nav nav-tabs nav-tabs-custom"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#home1"
                            role="tab"
                          >
                            <span className="d-none d-md-block">
                              User Description
                            </span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-home-variant h5" />
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#profile1"
                            role="tab"
                          >
                            <span className="d-none d-md-block">
                              Admin Remarks
                            </span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-account h5" />
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#settings"
                            role="tab"
                          >
                            <span className="d-none d-md-block">
                              User Tasks
                            </span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-settings h5" />
                            </span>
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div
                          className="tab-pane active p-3"
                          id="home1"
                          role="tabpanel"
                        >
                          {leaveData && leaveData.description && (
                            <Editor
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClass"
                              toolbarStyle={{ display: "none" }}
                              readOnly
                              editorStyle={{
                                minHeight: "300px",
                              }}
                              editorState={EditorState.createWithContent(
                                convertFromRaw(
                                  JSON.parse(leaveData.description)
                                )
                              )}
                            />
                          )}
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="profile1"
                          role="tabpanel"
                        >
                          {leaveData && leaveData.adminRemark && (
                            <Editor
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClass"
                              toolbarStyle={{ display: "none" }}
                              readOnly
                              editorStyle={{
                                minHeight: "300px",
                              }}
                              editorState={EditorState.createWithContent(
                                convertFromRaw(
                                  JSON.parse(leaveData.adminRemark)
                                )
                              )}
                            />
                          )}
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="settings"
                          role="tabpanel"
                        >
                          <MDBDataTableV5
                            // scrollX
                            fixedHeader={true}
                            responsive
                            striped
                            bordered
                            searchTop
                            hover
                            // autoWidth
                            data={dataa}
                            theadColor="#000"
                          />
                        </div>
                      </div>
                    </div>
                    <Modal
                      style={{ maxWidth: "70%" }}
                      isOpen={modalEdit}
                      toggle={toggleEdit}
                    >
                      <ModalHeader toggle={toggleEdit}>Action</ModalHeader>
                      <ModalBody>
                        <form>
                          <div className="col">
                            <div className="form-group">
                              <label className="control-label">Action</label>
                              <Select
                                name="action"
                                onBlur={props.handleBlur}
                                onChange={(selected) => {
                                  setStatusLeave(selected);
                                }}
                                options={[
                                  { value: "approved", label: "approved" },
                                  { value: "rejected", label: "rejected" },
                                  { value: "unpaid", label: "unpaid" },
                                ]}
                              />
                              {/* <span id="err">
                  {props.touched.action && props.errors.action}
                </span> */}
                            </div>
                          </div>
                          <div className="col-12">
                            <h4 className="mt-0 header-title">Description</h4>
                            <Editor
                              name="description"
                              onBlur={props.handleBlur}
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editor"
                              // editorState={props.values.description}
                              onEditorStateChange={(val) => {
                                setDescription(val);
                              }}
                            />
                            {/* <span id="err">
                {props.touched.description && props.errors.description}
              </span> */}
                          </div>
                          <Button
                            color="success"
                            className="mt-3 my-primary-button"
                            onClick={() => {
                              let data = {};
                              if (loggedInUser.userRole === config.Roles.PM) {
                                data = {
                                  pmStatus: statusLeave.value,
                                  pmActionDate: new Date(),
                                  pmRemark: JSON.stringify(
                                    convertToRaw(
                                      description.getCurrentContent()
                                    )
                                  ),
                                };
                              }

                              if (
                                loggedInUser.userRole === config.Roles.ADMIN
                              ) {
                                data = {
                                  adminStatus: statusLeave.value,
                                  adminActionDate: new Date(),
                                  adminRemark: JSON.stringify(
                                    convertToRaw(
                                      description.getCurrentContent()
                                    )
                                  ),
                                };
                              }

                              leaveService.updateLeave(leaveID, data);
                              toggleEdit();
                            }}
                          >
                            Submit
                          </Button>
                        </form>
                      </ModalBody>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default SingleDetail;

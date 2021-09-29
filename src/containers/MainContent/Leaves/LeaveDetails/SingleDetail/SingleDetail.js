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
// import { Progress } from "reactstrap";
import Select from "react-select";
import userService from "../../../../../services/UserService";
import configuration from "../../../../../config/configuration";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Progress,
  Col,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import DatePicker from "react-datepicker";
import Form from "reactstrap/lib/Form";

const SingleDetail = (props) => {
  const [leaveData, setDataa] = useState();
  const leaveID = props.match.params.id;
  let loggedUser = UserService.userLoggedInInfo();
  const [userData, setUserData] = useState();
  const [taskData, setTaskData] = useState([]);
  const [statusLeave, setStatusLeave] = useState();
  const [description, setDescription] = useState();
  const [modalEdit, setModalEdit] = useState(false);
  const loggedInUser = userService.userLoggedInInfo();
  const [remainingLeave, setRemaingLeave] = useState([]);
  const [hideField, setHideField] = useState(false);

  let config = new configuration();

  const [days, setDays] = useState({
    columns: [
      {
        label: "Days",
        field: "Days",
        // sort: "asc",
        // width: 150,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Swap",
        field: "Swap",
        sort: "asc",
        // width: 150,
      },
    ],
    rows: [],
  });

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
    UserService.getUserById(id)
      .then((res) => {
        const { tasks, user } = res.data;
        // console.log(tasks);
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

  const getLeaveDays = (id) => {
    LeaveService.allUserLeaves(loggedUser._id)
      .then((res) => {
        let updatedData = { ...days };
        updatedData.rows = [];
        leaveData.dates.map((item, index) => {
          updatedData.rows.push({
            Days: moment(item.date).format("LL"),
            action: (
              <div>
                <select
                  class="form-select"
                  defaultValue={item.status ? item.status : "N/A"}
                  // onChange={(e) =>
                  //   userService.updateTask(item._id, { status: e.target.value })
                  // }
                  aria-label="Default select example"
                >
                  <option value="pending">Approved</option>
                  <option value="working">Rejected</option>
                  <option value="completed">Unpaid</option>
                  <option value="completed">Swap</option>
                </select>
              </div>
            ),
            Swap: (
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckIndeterminate"
                  />
                  <label class="form-check-label" for="flexCheckIndeterminate">
                    TBD
                  </label>
                </div>
                <DatePicker
                  // className={`form-control ${
                  //   props.touched.startTime && props.errors.startTime
                  //     ? "is-invalid"
                  //     : props.touched.startTime && "is-valid"
                  // } zIndex`}
                  // selected={props.values.startTime}
                  className="form-control"
                  name="startTime"
                  // onFocus={() => props.setFieldTouched("startTime")}
                  // onChange={(date) => {
                  //   props.setFieldValue("startTime", date);
                  //   console.log("datepicker", date);
                  // }}
                />
              </div>
            ),
          });
        });
        setDays(updatedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData(leaveID);
    getLeaveDays();
  }, [modalEdit]);

  useEffect(() => {
    getRemainingLeave({
      leaveType: (leaveData && leaveData.type._id) || "",
      user: leaveData && leaveData.user._id,
    });
    getUserTask(leaveData && leaveData.user._id);
  }, [leaveData]);

  const getData = (id) => {
    LeaveService.leaveById(id)
      .then((res) => {
        setDataa(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const getRemainingLeave = (formData) => {
    LeaveService.typeRemainingLeaves(formData).then((res) => {
      const leaves = res.data;
      setRemaingLeave(leaves);
      // console.log("leave data", leaves);
    });
  };

  // const getRemainingLeave = (formData) => {
  //   LeaveService.typeRemainingLeaves(formData).then((res) => {
  //     setRemaingLeave(res.data);
  //   }) .catch((err) => {
  //     console.log("error", err);
  //   });
  // }

  // console.log("Leave data", leaveData);
  // console.log("leave type", leaveDataa)

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
                        <b>Posting Date: </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>
                        {leaveData && moment(leaveData.createdAt).format("LL")}
                      </span>
                    </div>
                    <div className="col-2 ">
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
                        <b>Total Leaves : </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>{leaveData && leaveData.type.totalLeaves}</span>
                    </div>
                    <div className="col-2 sub">
                      <span>
                        <b>Used Leaves : </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>
                        {remainingLeave && remainingLeave.usedLeaves
                          ? remainingLeave.usedLeaves
                          : "0"}
                      </span>
                    </div>
                    <div className="col-2 sub">
                      <span>
                        <b>Remaining Leaves : </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>
                        {leaveData && leaveData.type
                          ? leaveData.type.totalLeaves -
                              remainingLeave.usedLeaves <
                            0
                            ? "0"
                            : leaveData.type.totalLeaves -
                              remainingLeave.usedLeaves
                          : "0"}
                      </span>
                    </div>
                    <div className="col-2 sub">
                      <span>
                        <b>Unpaid Leaves : </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>
                        {leaveData && leaveData.type
                          ? leaveData.type.totalLeaves -
                              remainingLeave.usedLeaves >
                            0
                            ? "0"
                            : -(
                                leaveData.type.totalLeaves -
                                remainingLeave.usedLeaves
                              )
                          : "0"}{" "}
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
                    <div className="col-2 sub">
                      <span>
                        <b>Total Days : </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>{leaveData && leaveData.dates.length}</span>
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
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#settings1"
                            role="tab"
                          >
                            <span className="d-none d-md-block">
                              PM Remarks
                            </span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-settings h5" />
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
                        <div
                          className="tab-pane p-3"
                          id="settings1"
                          role="tabpanel"
                        >
                          {leaveData && leaveData.pmRemark && (
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
                                convertFromRaw(JSON.parse(leaveData.pmRemark))
                              )}
                            />
                          )}
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
                                  { value: "approved", label: "Approved" },
                                  { value: "rejected", label: "Rejected" },
                                  // { value: "unpaid", label: "Unpaid" },
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

                              LeaveService.updateLeave(leaveID, data);
                              toggleEdit();
                            }}
                          >
                            Submit
                          </Button>
                          <FormGroup row>
                            <Col sm={{ size: 10 }}>
                              <div class="form-check">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  id="exampleCheck1"
                                  value={hideField}
                                  onChange={(selected) => {
                                    setHideField(selected.target.value);
                                    console.log("hidee", selected.target.value);
                                    // props.setFieldValue(selected);
                                    // if (selected === !hideField) {
                                    //   setHideField(true);
                                    // } else {
                                    //   setHideField(false);
                                    // }
                                  }}
                                />
                                <label
                                  class="form-check-label"
                                  for="exampleCheck1"
                                >
                                  Special Check
                                </label>
                              </div>
                            </Col>
                          </FormGroup>
                          <div
                            className={`${
                              hideField
                                ? `display-form-field col`
                                : `hide-form-field`
                            }`}
                          >
                            <FormGroup row>
                              <Col>
                                <Label for="checkbox2" sm={2}>
                                  Sandwich
                                </Label>
                                <Col sm={{ size: 12 }}>
                                  <FormGroup check>
                                    <Label check>
                                      <Input type="checkbox" id="checkbox2" />
                                      Count as Sandwich
                                    </Label>
                                  </FormGroup>
                                </Col>
                              </Col>

                              <Col>
                                <Label for="checkbox2" sm={2}>
                                  Unpaid
                                </Label>
                                <Col sm={{ size: 12 }}>
                                  <FormGroup check>
                                    <Label check>
                                      <Input type="checkbox" id="checkbox2" />
                                      Count as Unpaid
                                    </Label>
                                  </FormGroup>
                                </Col>
                              </Col>
                            </FormGroup>
                            <MDBDataTableV5
                              // scrollX
                              fixedHeader={true}
                              responsive
                              striped
                              bordered
                              searchTop
                              hover
                              // autoWidth
                              data={days}
                              theadColor="#000"
                            />
                          </div>
                        </form>
                        {/* <div
                          className={`${
                            hideField === true
                              ? `hide-form-field`
                              : `display-form-field col `
                          }`}
                        >
                          <FormGroup row>
                            <Col>
                              <Label for="checkbox2" sm={2}>
                                Sandwich
                              </Label>
                              <Col sm={{ size: 12 }}>
                                <FormGroup check>
                                  <Label check>
                                    <Input type="checkbox" id="checkbox2" />
                                    Count as Sandwich
                                  </Label>
                                </FormGroup>
                              </Col>
                            </Col>

                            <Col>
                              <Label for="checkbox2" sm={2}>
                                Unpaid
                              </Label>
                              <Col sm={{ size: 12 }}>
                                <FormGroup check>
                                  <Label check>
                                    <Input type="checkbox" id="checkbox2" />
                                    Count as Unpaid
                                  </Label>
                                </FormGroup>
                              </Col>
                            </Col>
                          </FormGroup>
                          <MDBDataTableV5
                            // scrollX
                            fixedHeader={true}
                            responsive
                            striped
                            bordered
                            searchTop
                            hover
                            // autoWidth
                            data={days}
                            theadColor="#000"
                          />
                        </div> */}
                        {/* <FormGroup row>
                          <Col>
                            <Label for="checkbox2" sm={2}>
                              Sandwich
                            </Label>
                            <Col sm={{ size: 12 }}>
                              <FormGroup check>
                                <Label check>
                                  <Input type="checkbox" id="checkbox2" />
                                  Count as Sandwich
                                </Label>
                              </FormGroup>
                            </Col>
                          </Col>

                          <Col>
                            <Label for="checkbox2" sm={2}>
                              Unpaid
                            </Label>
                            <Col sm={{ size: 12 }}>
                              <FormGroup check>
                                <Label check>
                                  <Input type="checkbox" id="checkbox2" />
                                  Count as Unpaid
                                </Label>
                              </FormGroup>
                            </Col>
                          </Col>
                        </FormGroup>
                        <MDBDataTableV5
                          // scrollX
                          fixedHeader={true}
                          responsive
                          striped
                          bordered
                          searchTop
                          hover
                          // autoWidth
                          data={days}
                          theadColor="#000"
                        /> */}
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

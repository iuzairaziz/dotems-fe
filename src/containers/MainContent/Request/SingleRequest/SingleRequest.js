import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import "./SingleRequest.scss";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, EditorState, convertToRaw } from "draft-js";
import RequestService from "../../../../services/Request";
import moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import userService from "../../../../services/UserService";
import Request from "../../../../services/Request";
import Select from "react-select";
import Configuration from "../../../../config/configuration";
import RoleAuth from "../../../../components/MyComponents/Auth/RoleAuth";

const SingleRequest = (props) => {
  const [requestData, setData] = useState();
  const [description, setDescription] = useState();
  const [statusLeave, setStatusLeave] = useState();
  const [modalEdit, setModalEdit] = useState(false);
  const requestID = props.match.params.id;
  let config = new Configuration();
  const roless = new Configuration().Roles;
  const { PM, AM, ADMIN, HR } = roless;

  let loggedUser = userService.userLoggedInInfo();
  // console.log("logged user", loggedUser);
  const loggedInUser = userService.userLoggedInInfo();

  const toggleEdit = () => setModalEdit(!modalEdit);

  useEffect(() => {
    getData(requestID);
  }, [modalEdit]);

  const getData = (id) => {
    RequestService.requestById(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const detail = [
    { label: "Employee Name", value: requestData && requestData.user.name },
    {
      label: "Request Type",
      value: requestData && requestData.requestType.name,
    },
    {
      label: "Admin Status",
      value: requestData && requestData.adminStatus,
    },
    {
      label: "User Status",
      value: requestData && requestData.userStatus,
    },

    {
      label: "Posting Date",
      value: requestData && moment(requestData.createdAt).format("LL"),
    },
    {
      label: "Admin Action Date",
      value:
        requestData && requestData.adminActionDate
          ? moment(requestData.adminActionDate).format("LL")
          : "None",
    },
  ];

  console.log("Request data", requestData);

  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 mb-2">
              <div className="row mb-4">
                <div className="col-9">
                  <h4>Request Details</h4>{" "}
                </div>
                <RoleAuth roles={[PM, AM, ADMIN, HR]}>
                  <div className="col-3 approval">
                    <Button
                      color="success"
                      className="mt-3 my-primary-button"
                      onClick={() => {
                        toggleEdit();
                      }}
                    >
                      Action
                    </Button>
                  </div>
                </RoleAuth>
              </div>
            </div>
            <hr />
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

            <div className="col-lg-12">
              <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#home1"
                    role="tab"
                  >
                    <span className="d-none d-md-block">User Description</span>
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
                    <span className="d-none d-md-block">Admin Remarks</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-account h5" />
                    </span>
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane active p-3" id="home1" role="tabpanel">
                  {requestData && requestData.description && (
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
                        convertFromRaw(JSON.parse(requestData.description))
                      )}
                    />
                  )}
                </div>
                <div className="tab-pane p-3" id="profile1" role="tabpanel">
                  {requestData && requestData.adminRemark && (
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
                        convertFromRaw(JSON.parse(requestData.adminRemark))
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
                          { value: "Resolved", label: "Resolved" },
                          {
                            value: "Not Resolved",
                            label: "Not Resolved",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  {loggedInUser.userRole === config.Roles.ADMIN ? (
                    <div className="col-12">
                      <h4 className="mt-0 header-title">Description</h4>
                      <Editor
                        name="description"
                        onBlur={props.handleBlur}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editor"
                        onEditorStateChange={(val) => {
                          setDescription(val);
                        }}
                      />
                    </div>
                  ) : null}

                  <Button
                    color="success"
                    className="mt-3 my-primary-button"
                    onClick={() => {
                      let data = {};
                      if (loggedInUser.userRole === config.Roles.ADMIN) {
                        data = {
                          adminStatus: statusLeave.value,
                          adminActionDate: new Date(),
                          adminRemark: JSON.stringify(
                            convertToRaw(description.getCurrentContent())
                          ),
                        };
                      }
                      if (loggedInUser.userRole != config.Roles.ADMIN) {
                        data = {
                          userStatus: statusLeave.value,
                        };
                      }

                      Request.updateRequest(requestID, data);
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
    </AUX>
  );
};

export default SingleRequest;

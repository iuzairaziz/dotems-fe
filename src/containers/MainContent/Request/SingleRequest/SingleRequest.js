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
import configuration from "../../../../config/configuration";


const SingleRequest = (props) => {
  const [requestData, setData] = useState();
  const [description, setDescription] = useState();
  const [statusLeave, setStatusLeave] = useState();
  const [modalEdit, setModalEdit] = useState(false);
  const requestID = props.match.params.id;
  let config = new configuration();

  let loggedUser = userService.userLoggedInInfo();
  console.log("logged user", loggedUser);
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

  console.log("Request data", requestData);

  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card m-b-20">
                <div className="card-body">
                  {/* <h4 className="mt-0 header-title" />
                  <h4>Request Details</h4> */}
                  <div className="row">
                    <div className="col-10">
                      <h4>Request Details</h4>{" "}
                    </div>
                    <div className="col approval">
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
                  </div>
                  <hr />
                  <div className="row main">
                    <div className="col-2">
                      <span>
                        <b>Employee Name:</b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>{requestData && requestData.user.name}</span>
                    </div>
                    <div className="col-2">
                      <span>
                        <b>Request Type: </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>{requestData && requestData.requestType.name}</span>
                    </div>
                    <div className="col-2 sub">
                      <span>
                        <b>Request Status: </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>{requestData && requestData.status}</span>
                    </div>

                    <div className="col-2">
                      <span>
                        <b>Posting Date: </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>
                        {requestData &&
                          moment(requestData.createdAt).format("LL")}
                      </span>
                    </div>

               
                    <div className="col-2">
                      <span>
                        <b>Admin Action Date:</b>
                      </span>
                    </div>
                    <div className="col-2 sub">
                      <span>
                        {requestData && requestData.adminActionDate
                          ? moment(requestData.adminActionDate).format("LL")
                          : "None"}
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
                      </ul>

                      <div className="tab-content">
                        <div
                          className="tab-pane active p-3"
                          id="home1"
                          role="tabpanel"
                        >
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
                                convertFromRaw(
                                  JSON.parse(requestData.description)
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
                                convertFromRaw(
                                  JSON.parse(requestData.adminRemark)
                                )
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
                                  { value: "Changed", label: "Changed" },
                                  { value: "Fixed", label: "Fixed" },
                                ]}
                              />
                          
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
                              onEditorStateChange={(val) => {
                                setDescription(val);
                              }}
                            />
                          
                          </div>
                          <Button
                            color="success"
                            className="mt-3 my-primary-button"
                            onClick={() => {
                              let data = {};
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
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default SingleRequest;

import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../../hoc/Aux_";
import "./SingleDetail.scss";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, EditorState } from "draft-js";
import LeaveService from "../../../../../services/LeaveService";
import moment from "moment";

const SingleDetail = (props) => {
  const [leaveData, setData] = useState();
  const leaveID = props.match.params.id;

  useEffect(() => {
    getData(leaveID);
  }, []);

  const getData = (id) => {
    LeaveService.leaveById(id)
      .then((res) => {
        setData(res.data);
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
                  <h4>Leave Details</h4>
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
                        <b>Leave Status: </b>
                      </span>
                    </div>
                    <div className="col-2">
                      <span>{leaveData && leaveData.status}</span>
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

                    {/* <div className="col-2 sub">
                      <span>Already Approved: </span>
                    </div>
                    <div className="col-2">
                      <span>{leaveData && leaveData.user.name}</span>
                    </div>
                    <div className="col-2">
                      <span>Apply For: </span>
                    </div>
                    <div className="col-2">
                      <span>{leaveData && leaveData.user.name}</span>
                    </div>
                    <div className="col-2">
                      <span>Available: </span>
                    </div> */}
                    {/* <div className="col-2">
                      <span>{leaveData && leaveData.user.name}</span>
                    </div> */}
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
                      </div>
                    </div>
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

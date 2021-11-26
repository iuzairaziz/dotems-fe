import React, { Component, useState, useEffect } from "react";
import AUX from "../../../hoc/Aux_";
import moment from "moment";
import ClientService from "../../../services/ClientService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";
import ClientList from "../Client/ViewClients";

const ClientDetails = (props) => {
  {
    const [ClientData, setClientData] = useState();
    const [ProjectData, setProjectData] = useState({});
    const [dataa, setData] = useState({
      columns: [
        {
          label: "Project Name",
          field: "projectName",
          sort: "asc",
        },
        {
          label: "Platform",
          field: "platform",
          sort: "disabled",
        },
        {
          label: "Technology ",
          field: "technology",
          sort: "disabled",
        },
        {
          label: "Service  ",
          field: "service",
          sort: "disabled",
          // width: 100,
        },
        {
          label: "Nature",
          field: "nature",
          sort: "disabled",
        },
        {
          label: "Status",
          field: "status",
          sort: "disabled",
        },
        {
          label: "Start Date",
          field: "startDate",
          sort: "disabled",
        },
        {
          label: "End Date",
          field: "endDate",
          sort: "disabled",
        },
        {
          label: "Total Est. Hrs",
          field: "EstHrs",
          sort: "disabled",
          // width: 100,
        },
      ],
      rows: [],
    });

    console.log("props", props.match.params.id);
    const userID = props.match.params.id;

    useEffect(() => {
      getData(userID);
    }, []);

    const getData = (id) => {
      ClientService.getClientById(id)
        .then((res) => {
          const { client, projects } = res.data;
          console.log(projects);
          setClientData(client);
          setProjectData(projects);
          let EstTime = 0;
          let data = { ...dataa };
          data.rows = [];
          projects.map((item, index) => {
            data.rows.push({
              projectName: (
                <Link to={`/projectdetails/${item._id}`}>
                  {" "}
                  {item.name ? item.name : "none"}
                  {"  "}
                </Link>
              ),
              platform: item.platform ? item.platform.name : "none",
              technology: item.technology ? item.technology.name : "none",
              status: item.status ? item.status.name : "none",
              startDate: item.cStartDate
                ? moment(item.cStartDate).format("DD/MMM/YYYY")
                : "none",
              endDate: item.cEndDate
                ? moment(item.cEndDate).format("DD/MMM/YYYY")
                : "none",
              EstHrs: item.phase
                ? item.phase.map((item1, index, key) => {
                    if (index === 0) EstTime = 0;
                    EstTime += Number(item1.estTime);

                    if (index === item.phase.length - 1) {
                      return EstTime;
                    }
                  })
                : "N/A",
              nature: item.nature ? item.nature.name : "none",
              service: item.service ? item.service.name : "none",
            });
          });
          setData(data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };

    return (
      <AUX>
        <div className="col-lg-12">
          <div className="card m-b-20">
            <div className="card-body">
              <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link "
                    data-toggle="tab"
                    href="#profile1"
                    role="tab"
                  >
                    <span className="d-none d-md-block">Client List</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-view-list h5" />
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#home1"
                    role="tab"
                  >
                    <span className="d-none d-md-block">View Client</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-plus h5" />
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#messages1"
                    role="tab"
                  >
                    <span className="d-none d-md-block">Settings</span>
                    <span className="d-block d-md-none">
                      <i className="mdi mdi-settings h5" />{" "}
                    </span>
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane p-3" id="profile1" role="tabpanel">
                  <ClientList />
                </div>
                <div
                  className="tab-pane active  p-3"
                  id="home1"
                  role="tabpanel"
                >
                  <div className="page-content-wrapper">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="page-content-wrapper">
                            <div className="container-fluid">
                              <div className="col-lg-12 client-form">
                                <ul className="nav nav-pills" role="tablist">
                                  <li className="nav-item">
                                    <a
                                      className="nav-link active"
                                      data-toggle="tab"
                                      href={`#quick-info`}
                                      role="tab"
                                    >
                                      <span className="d-none d-md-block">
                                        {" "}
                                        <i class="mdi mdi-information pr-1" />
                                        Quick Info
                                      </span>
                                      <span className="d-block d-md-none">
                                        <i className="mdi mdi-information h5" />
                                      </span>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className="nav-link"
                                      data-toggle="tab"
                                      href={`#other-info`}
                                      role="tab"
                                    >
                                      <span className="d-none d-md-block">
                                        <i class="mdi mdi-information-outline pr-1" />
                                        Other Info
                                      </span>
                                      <span className="d-block d-md-none">
                                        <i className="mdi mdi-information-outline h5" />
                                      </span>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className="nav-link"
                                      data-toggle="tab"
                                      href={`#tasks`}
                                      role="tab"
                                    >
                                      <span className="d-none d-md-block">
                                        <i class="mdi mdi-information-outline pr-1" />
                                        Client Projects
                                      </span>
                                      <span className="d-block d-md-none">
                                        <i className="mdi mdi-information-outline h5" />
                                      </span>
                                    </a>
                                  </li>
                                </ul>

                                <div className="tab-content">
                                  <div
                                    className="tab-pane active p-3"
                                    id={`quick-info`}
                                    role="tabpanel"
                                  >
                                    <div className="row">
                                      <div className="col-6">
                                        <div className="form-group">
                                          <label>Client Name</label>
                                          <input
                                            readOnly={true}
                                            name="title"
                                            onBlur={props.handleBlur}
                                            type="text"
                                            className={`form-control`}
                                            value={
                                              ClientData && ClientData.name
                                            }
                                            // onChange={props.handleChange("title")}
                                            placeholder="Enter Name"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-6">
                                        <div className="form-group">
                                          <label>Joining Date</label>
                                          <input
                                            readOnly={true}
                                            name="title"
                                            type="text"
                                            className={`form-control`}
                                            value={moment(
                                              ClientData &&
                                                ClientData.dateOfJoin
                                            ).format("LL")}
                                            placeholder="Enter Name"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-6">
                                        <div className="form-group">
                                          <div className="row">
                                            <div className="col-6">
                                              <label className="control-label">
                                                Country
                                              </label>
                                            </div>
                                          </div>
                                          <input
                                            readOnly={true}
                                            name="title"
                                            type="text"
                                            className={`form-control`}
                                            value={
                                              ClientData && ClientData.country
                                                ? ClientData.country
                                                : "N/A"
                                            }
                                            placeholder="Enter Name"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-6">
                                        <div className="form-group">
                                          <div className="row">
                                            <div className="col">
                                              <label className="control-label">
                                                Platform
                                              </label>
                                            </div>
                                          </div>
                                          <input
                                            readOnly={true}
                                            name="title"
                                            type="text"
                                            className={`form-control`}
                                            value={
                                              ClientData && ClientData.platform
                                                ? ClientData.platform.name
                                                : "N/A"
                                            }
                                            placeholder="Enter Name"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="tab-pane p-3"
                                    id={`other-info`}
                                    role="tabpanel"
                                  >
                                    <div className="row">
                                      <div className="col-6">
                                        <div className="form-group">
                                          <label>Email</label>
                                          <input
                                            readOnly={true}
                                            name="email"
                                            type="text"
                                            className={`form-control`}
                                            value={
                                              ClientData && ClientData.email
                                                ? ClientData.email
                                                : " N/A"
                                            }
                                            placeholder="Enter Email"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-6">
                                        <div className="form-group">
                                          <label>Contact Number</label>
                                          <input
                                            readOnly={true}
                                            name="conNum"
                                            type="text"
                                            className={`form-control`}
                                            value={
                                              ClientData && ClientData.mobileNo
                                                ? ClientData.mobileNo
                                                : "N/A"
                                            }
                                            placeholder="Enter Number"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-6">
                                        <div className="form-group">
                                          <label>Other Contact</label>
                                          <input
                                            readOnly={true}
                                            name="conNum"
                                            type="text"
                                            className={`form-control`}
                                            value={
                                              ClientData &&
                                              ClientData.otherContact
                                                ? ClientData.otherContact
                                                : "N/A"
                                            }
                                            placeholder="Enter Number"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-6">
                                        <div className="form-group">
                                          <label>Social Contact</label>
                                          <input
                                            readOnly={true}
                                            name="conNum"
                                            type="text"
                                            className={`form-control`}
                                            value={
                                              ClientData &&
                                              ClientData.socialContact
                                                ? ClientData.socialContact
                                                : "N/A"
                                            }
                                            placeholder="Enter Number"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-6">
                                        <div className="form-group">
                                          <label>URL</label>
                                          <input
                                            readOnly={true}
                                            name="ul"
                                            type="text"
                                            className={`form-control`}
                                            value={
                                              ClientData && ClientData.url
                                                ? ClientData.url
                                                : "N/A"
                                            }
                                            placeholder="Enter URL"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-6">
                                        <div className="form-group">
                                          <label>Address</label>
                                          <input
                                            readOnly={true}
                                            name="adrs"
                                            type="text"
                                            className={`form-control`}
                                            value={
                                              ClientData && ClientData.address
                                                ? ClientData.address
                                                : "N/A"
                                            }
                                            placeholder="Enter Address"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-6">
                                        <div className="form-group">
                                          <label className="control-label">
                                            Client Type
                                          </label>
                                          <input
                                            readOnly={true}
                                            name="adrs"
                                            type="text"
                                            className={`form-control`}
                                            value={
                                              ClientData &&
                                              ClientData.clientType
                                                ? ClientData.clientType
                                                : "N/A"
                                            }
                                            placeholder="Enter Address"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-6">
                                        <div className="form-group">
                                          <div className="row">
                                            <div className="col">
                                              <label className="control-label">
                                                Client Label
                                              </label>
                                            </div>
                                          </div>
                                          <input
                                            readOnly={true}
                                            name="adrs"
                                            type="text"
                                            className={`form-control`}
                                            value={
                                              ClientData &&
                                              ClientData.clientLabel
                                                ? ClientData.clientLabel.name
                                                : "N/A"
                                            }
                                            placeholder="Enter Address"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-6">
                                        <div className="form-group">
                                          <label className="control-label">
                                            Client Status
                                          </label>
                                          <input
                                            readOnly={true}
                                            name="adrs"
                                            type="text"
                                            className={`form-control`}
                                            value={
                                              ClientData && ClientData.status
                                                ? ClientData.status
                                                : "N/A"
                                            }
                                            placeholder="Enter Address"
                                          />
                                        </div>
                                      </div>
                                      {ClientData && ClientData.companyName ? (
                                        <div className="col-6">
                                          <div className="form-group">
                                            <label>Company Name</label>
                                            <input
                                              readOnly={true}
                                              name="adrs"
                                              type="text"
                                              className={`form-control`}
                                              value={
                                                ClientData &&
                                                ClientData.companyName
                                                  ? ClientData.companyName
                                                  : "N/A"
                                              }
                                              placeholder="Enter Address"
                                            />
                                          </div>
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div
                                    className="tab-pane active p-3"
                                    id={`tasks`}
                                    role="tabpanel"
                                  >
                                    <MDBDataTableV5
                                      responsive
                                      striped
                                      small
                                      onPageChange={(val) => console.log(val)}
                                      bordered={true}
                                      searchTop
                                      searchBottom={false}
                                      pagingTop
                                      barReverse
                                      hover
                                      data={dataa}
                                      theadColor="#000"
                                    />
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

                <div className="tab-pane p-3" id="messages1" role="tabpanel">
                  <div className="card client">
                    <div className="row cardd">
                      <i
                        class="mdi mdi-account-multiple iconSize"
                        style={{ color: "var(--color-secondary1)" }}
                      />
                      <i class="mdi mdi-settings iconSize" />
                    </div>
                    <div className="row cSettings">
                      <h2>Client Settings</h2>
                    </div>
                    <div className="border-b" />
                    <div className="row cardd">
                      <Link to="/add-platform">Platform</Link>
                    </div>
                    <div className="row cardd ">
                      <Link to="/add-clientlabel">Client Label</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
};

export default ClientDetails;

import React, { Component, useState, useEffect } from "react";
import AUX from "../../../hoc/Aux_";
import moment from "moment";
import ClientService from "../../../services/ClientService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";

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

    console.log("data", ClientData);

    const detail = [
      { label: "Name", value: ClientData && ClientData.name },
      {
        label: "Company Name",
        value:
          ClientData && ClientData.companyName ? ClientData.companyName : "N/A",
      },

      {
        label: "Joining Date",
        value: moment(ClientData && ClientData.dateOfJoin).format("LL"),
      },
      {
        label: "Address",
        value: ClientData && ClientData.address ? ClientData.address : "N/A",
      },

      {
        label: "Mobile Number",
        value: ClientData && ClientData.mobileNo ? ClientData.mobileNo : "N/A",
      },
      {
        label: "Other Contact",
        value:
          ClientData && ClientData.otherContact
            ? ClientData.otherContact
            : "N/A",
      },
      {
        label: "Social Contact",
        value:
          ClientData && ClientData.socialContact
            ? ClientData.socialContact
            : "N/A",
      },
      {
        label: "Email",
        value: ClientData && ClientData.email ? ClientData.email : " N/A",
      },
      {
        label: "URL",
        value: ClientData && ClientData.url ? ClientData.url : "N/A",
      },
      {
        label: "Client Type",
        value:
          ClientData && ClientData.clientType ? ClientData.clientType : "N/A",
      },
      {
        label: "Client Status",
        value: ClientData && ClientData.status ? ClientData.status : "N/A",
      },
      {
        label: "Client Label",
        value:
          ClientData && ClientData.clientLabel
            ? ClientData.clientLabel.name
            : "N/A",
      },
      {
        label: "Platform",
        value:
          ClientData && ClientData.platform ? ClientData.platform.name : "N/A",
      },
      {
        label: "Country",
        value: ClientData && ClientData.country ? ClientData.country : "N/A",
      },
    ];

    return (
      <AUX>
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="col-lg-12 client-form">
              <ul className="nav nav-pills" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href={`#home2`}
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
                    href={`#profile2`}
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
              </ul>

              <div className="tab-content">
                <div
                  className="tab-pane active p-3"
                  id={`home2`}
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label>Client Name</label>
                        <input
                          name="title"
                          onBlur={props.handleBlur}
                          type="text"
                          className={`form-control`}
                          value={ClientData && ClientData.name}
                          // onChange={props.handleChange("title")}
                          placeholder="Enter Name"
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.title && props.errors.title}
                        </span>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <label>Joining Date</label>
                        <input
                          name="title"
                          type="text"
                          className={`form-control`}
                          value={moment(
                            ClientData && ClientData.dateOfJoin
                          ).format("LL")}
                          placeholder="Enter Name"
                        />
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-6">
                            <label className="control-label">Country</label>
                          </div>
                        </div>
                        <input
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
                        <span id="err" className="invalid-feedback">
                          {props.touched.country && props.errors.country}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <div className="row">
                          <div className="col">
                            <label className="control-label">Platform</label>
                          </div>
                        </div>
                        <input
                          name="title"
                          type="text"
                          className={`form-control`}
                          value={moment(
                            ClientData && ClientData.dateOfJoin
                          ).format("LL")}
                          placeholder="Enter Name"
                        />

                        <span id="err" className="invalid-feedback">
                          {props.touched.platform && props.errors.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane p-3" id={`profile2`} role="tabpanel">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          name="email"
                          type="text"
                          className={`form-control ${
                            props.touched.email && props.errors.email
                              ? "is-invalid"
                              : props.touched.email && "is-valid"
                          }`}
                          value={
                            ClientData && ClientData.email
                              ? ClientData.email
                              : " N/A"
                          }
                          placeholder="Enter Email"
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.email && props.errors.email}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Contact Number</label>
                        <input
                          name="conNum"
                          type="text"
                          className={`form-control ${
                            props.touched.conNum && props.errors.conNum
                              ? "is-invalid"
                              : props.touched.conNum && "is-valid"
                          }`}
                          value={
                            ClientData && ClientData.mobileNo
                              ? ClientData.mobileNo
                              : "N/A"
                          }
                          placeholder="Enter Number"
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.conNum && props.errors.conNum}
                        </span>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <label>Other Contact</label>
                        <input
                          name="conNum"
                          type="text"
                          className={`form-control ${
                            props.touched.conNum && props.errors.conNum
                              ? "is-invalid"
                              : props.touched.conNum && "is-valid"
                          }`}
                          value={
                            ClientData && ClientData.mobileNo
                              ? ClientData.mobileNo
                              : "N/A"
                          }
                          placeholder="Enter Number"
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.otherContact &&
                            props.errors.otherContact}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Social Contact</label>
                        <input
                          name="conNum"
                          type="text"
                          className={`form-control ${
                            props.touched.conNum && props.errors.conNum
                              ? "is-invalid"
                              : props.touched.conNum && "is-valid"
                          }`}
                          value={
                            ClientData && ClientData.mobileNo
                              ? ClientData.mobileNo
                              : "N/A"
                          }
                          placeholder="Enter Number"
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.socialContact &&
                            props.errors.socialContact}
                        </span>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <label>URL</label>
                        <input
                          name="ul"
                          type="text"
                          className={`form-control ${
                            props.touched.ul && props.errors.ul
                              ? "is-invalid"
                              : props.touched.ul && "is-valid"
                          }`}
                          value={
                            ClientData && ClientData.url
                              ? ClientData.url
                              : "N/A"
                          }
                          placeholder="Enter URL"
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.ul && props.errors.ul}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Address</label>
                        <input
                          name="adrs"
                          type="text"
                          className={`form-control ${
                            props.touched.adrs && props.errors.adrs
                              ? "is-invalid"
                              : props.touched.adrs && "is-valid"
                          }`}
                          value={
                            ClientData && ClientData.address
                              ? ClientData.address
                              : "N/A"
                          }
                          placeholder="Enter Address"
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.adrs && props.errors.adrs}
                        </span>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <label className="control-label">Client Type</label>
                        <input
                          name="adrs"
                          type="text"
                          className={`form-control ${
                            props.touched.adrs && props.errors.adrs
                              ? "is-invalid"
                              : props.touched.adrs && "is-valid"
                          }`}
                          value={
                            ClientData && ClientData.address
                              ? ClientData.address
                              : "N/A"
                          }
                          placeholder="Enter Address"
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.clientType && props.errors.clientType}
                        </span>
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
                          name="adrs"
                          type="text"
                          className={`form-control ${
                            props.touched.adrs && props.errors.adrs
                              ? "is-invalid"
                              : props.touched.adrs && "is-valid"
                          }`}
                          value={
                            ClientData && ClientData.address
                              ? ClientData.address
                              : "N/A"
                          }
                          placeholder="Enter Address"
                        />

                        <span id="err" className="invalid-feedback">
                          {props.touched.clientLabel &&
                            props.errors.clientLabel}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label className="control-label">Client Status</label>
                        <input
                          name="adrs"
                          type="text"
                          className={`form-control ${
                            props.touched.adrs && props.errors.adrs
                              ? "is-invalid"
                              : props.touched.adrs && "is-valid"
                          }`}
                          value={
                            ClientData && ClientData.address
                              ? ClientData.address
                              : "N/A"
                          }
                          placeholder="Enter Address"
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.status && props.errors.status}
                        </span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Company Name</label>
                        <input
                          name="adrs"
                          type="text"
                          className={`form-control ${
                            props.touched.adrs && props.errors.adrs
                              ? "is-invalid"
                              : props.touched.adrs && "is-valid"
                          }`}
                          value={
                            ClientData && ClientData.address
                              ? ClientData.address
                              : "N/A"
                          }
                          placeholder="Enter Address"
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.compName && props.errors.compName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
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
                <div className="row">
                  <div className="col-12">
                    {/* <h4 className="mt-0 header-title">Projects</h4> */}
                    <MDBDataTableV5
                      responsive
                      striped
                      small
                      onPageChange={(val) => console.log(val)}
                      bordered={true}
                      //  materialSearch
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
      </AUX>
    );
  }
};

export default ClientDetails;

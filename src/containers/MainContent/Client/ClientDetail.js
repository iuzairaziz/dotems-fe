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

    return (
      <AUX>
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={ClientData && ClientData.name}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Company Name</label>
                          <input
                            className="form-control"
                            value={ClientData && ClientData.companyName}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Joining Date </label>
                          <input
                            type="text"
                            className="form-control"
                            value={moment(
                              ClientData && ClientData.dateOfJoin
                            ).format("LL")}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            className="form-control"
                            value={ClientData && ClientData.address}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> Mobile Number </label>
                          <input
                            type="text"
                            className="form-control"
                            value={ClientData && ClientData.mobileNo}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            className="form-control"
                            value={ClientData && ClientData.email}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label> URL </label>
                          <input
                            type="text"
                            className="form-control"
                            value={ClientData && ClientData.url}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            className="form-control"
                            value={
                              ClientData &&
                              ClientData.country &&
                              ClientData.country.name
                            }
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card m-b-20">
              <div className="card-body">
                <h4 className="mt-0 header-title">Client Projects</h4>

                <MDBDataTableV5
                  // scrollX
                  fixedHeader={true}
                  responsive
                  striped
                  bordered
                  searchTop
                  hover
                  autoWidth
                  data={dataa}
                  theadColor="#000"
                />
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
};

export default ClientDetails;

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

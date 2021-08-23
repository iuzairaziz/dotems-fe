import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";
import ProjectService from "../../../../services/ProjectService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { Button } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import moment from "moment";
import { convertFromRaw, EditorState } from "draft-js";
import $ from "jquery";
import PaymentService from "../../../../services/PaymentService";

const ProjectDetails = (props) => {
  {
    const [payment, setPayment] = useState();
    const [project, setProject] = useState();

    const [paymentTabledata, setPaymentTableData] = useState({
      columns: [
        {
          label: "Payment Description",
          field: "paymentDescription",
          sort: "disabled",
          width: 125,
        },
        {
          label: "Amount Recieved",
          field: "amountRecieved",
          sort: "disabled",
        },
        {
          label: "Amount Recieve Date",
          field: "arDate",
          sort: "disabled",
        },
        {
          label: "Exchange Rate",
          field: "exchangeRate",
          sort: "disabled",
          // width: 100,
        },
      ],
      rows: [],
    });

    console.log("props", props.location.projectProps);
    const paymentID = props.match.params.id;

    useEffect(() => {
      // getData(paymentID);
      getPaymentTableData(paymentID);
    }, []);

    const getPaymentTableData = (id) => {
      PaymentService.getSinglePayment(id)
        .then((res) => {
          setProject(res.data.project);
          let updatedData = { ...paymentTabledata };
          updatedData.rows = [];
          res.data.paymentDetials.map((item, index) => {
            updatedData.rows.push({
              taskname: item.name ? item.name : "none",
              exchangeRate: item.exchangeRate ? item.exchangeRate : "none",
              arDate: item.PaymentRecievedDate
                ? moment(item.PaymentRecievedDate).format("LL")
                : "none",
              amountRecieved: item.recievedAmount
                ? item.recievedAmount
                : "none",
              paymentDescription: item.PaymentDescription
                ? item.PaymentDescription
                : "none",
            });
          });
          console.log("payment", res.data);
          console.log("paymentss", paymentTabledata);
          setPaymentTableData(updatedData);
        })
        .catch((err) => console.log(err));
    };
    console.log("paymentss", paymentTabledata);

    const detail = [
      { label: "Project Name", value: project && project.name },
      // {
      //   label: "Client Name",
      //   value: project && project.client.name,
      // },

      {
        label: "Order Number",
        value: project && project.orderNum,
      },
      // {
      //   label: "Platform",
      //   value: project && project.platform.name,
      // },
      // { label: "Service Type", value: project && project.service.name },
      // {
      //   label: "Technology",
      //   value: project && project.technology.name,
      // },
      // {
      //   label: "Status",
      //   value: project && project.status.name,
      // },
      // {
      //   label: "Project Nature",
      //   value: project && project.nature.name,
      // },

      // {
      //   label: "Client Start Date",
      //   value: project && moment(project.cStartDate).format("DD/MMM/YYYY"),
      // },
      // {
      //   label: "Cient Deadline",
      //   value: project && moment(project.cEndDate).format("DD/MMM/YYYY"),
      // },
      // {
      //   label: "PM Start Date",
      //   value: project && moment(project.pmStartDate).format("DD/MMM/YYYY"),
      // },
      // {
      //   label: "PM Deadline",
      //   value: project && moment(project.pmEndDate).format("DD/MMM/YYYY"),
      // },

      {
        label: "Cost",
        value: project && project.cost,
      },
      {
        label: "Currency",
        value: project && project.currency.name,
      },
      {
        label: "Platform Deductions",
        value: project && project.Pdeduction,
      },
      {
        label: "Reserve Profit",
        value: project && project.Rprofit,
      },
      {
        label: "Other Deductions",
        value: project && project.otherDeduction,
      },
      // {
      //   label: "Project Manager",
      //   value: project && project.projectManager.name,
      // },
      // {
      //   label: "Team Members",
      //   value:
      //     project && project.assignedUser
      //       ? project.assignedUser.map((item, index) => {
      //           if (index === 0) {
      //             return item.name;
      //           } else if (index >= 0) {
      //             return `, ${item.name} `;
      //           }
      //         })
      //       : "None",
      // },
    ];

    return (
      <AUX>
        <div className="page-content-wrapper projectD">
          <div className="container-fluid">
            <div className="row">
              <div className="row">
                <div className="row align-items-center gapp">
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
              {/* <div className="row">
                <div className="col-12">
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
                    data={paymentTabledata}
                    theadColor="#000"
                  />
                </div>
              </div> */}

              <div className="col-lg-12">
                <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                  {/* <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#home1"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Description</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-home-variant h5" />
                      </span>
                    </a>
                  </li> */}
                  {/* <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#profile1"
                      role="tab"
                    >
                      <span className="d-none d-md-block">Project Tasks</span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-account h5" />
                      </span>
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#prjectPayment"
                      role="tab"
                    >
                      <span className="d-none d-md-block">
                        Project Payments
                      </span>
                      <span className="d-block d-md-none">
                        <i className="mdi mdi-account h5" />
                      </span>
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  {/* <div
                    className="tab-pane active p-3"
                    id="home1"
                    role="tabpanel"
                  >
                    <Editor
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClass"
                      toolbarStyle={{ display: "none" }}
                      readOnly
                      editorStyle={{
                        minHeight: "300px",
                      }}
                      editorState={
                        project &&
                        EditorState.createWithContent(
                          convertFromRaw(JSON.parse(project.description))
                        )
                      }
                    />
                  </div> */}
                  {/* <div className="tab-pane p-3" id="profile1" role="tabpanel">
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
                      data={tabledata}
                      theadColor="#000"
                    />
                  </div> */}
                  <div
                    className="tab-pane active p-3"
                    id="prjectPayment"
                    role="tabpanel"
                  >
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
                      data={paymentTabledata}
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

export default ProjectDetails;

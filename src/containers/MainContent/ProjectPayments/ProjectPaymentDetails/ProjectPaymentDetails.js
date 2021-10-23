import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { MDBDataTableV5 } from "mdbreact";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import moment from "moment";
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
          label: "Other Amounts",
          field: "otherAmount",
        },
        {
          label: "Exchange Rate",
          field: "exchangeRate",
          sort: "disabled",
          // width: 100,
        },
        {
          label: "Amount Recieve Date",
          field: "arDate",
          sort: "disabled",
        },
      ],
      rows: [],
    });

    const paymentID = props.match.params.id;

    useEffect(() => {
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
              exchangeRate: item.exchangeRate ? item.exchangeRate : "none",
              arDate: item.PaymentRecievedDate
                ? moment(item.PaymentRecievedDate).format("LL")
                : "none",
              amountRecieved: item.recievedAmount
                ? item.recievedAmount
                : "none",
              otherAmount: item.Tip ? item.Tip : "none",
              paymentDescription: item.PaymentDescription
                ? item.PaymentDescription
                : "none",
            });
          });
          setPaymentTableData(updatedData);
        })
        .catch((err) => console.log(err));
    };

    const detail = [
      { label: "Project Name", value: project && project.name },
      {
        label: "Order Number",
        value: project && project.orderNum,
      },
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

              <div className="col-lg-12">
                <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
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

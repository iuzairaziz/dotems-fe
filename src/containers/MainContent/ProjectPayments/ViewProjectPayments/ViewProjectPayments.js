import React, { Component, useEffect, useState } from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import AUX from "../../../../hoc/Aux_";
import PaymentService from "../../../../services/PaymentService";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const PaymentList = (props) => {
  const [dataa, setData] = useState({
    columns: [
      {
        label: "Project",
        field: "project",
        // sort: "asc",
        // width: 150,
      },
      {
        label: "Cost",
        field: "cost",
        // sort: "asc",
        // width: 270,
      },
      {
        label: "Amount Recieved",
        field: "rAmount",
        // sort: "asc",
        // width: 200,
      },
      {
        label: "Amount Pending",
        field: "pAmount",
        // sort: "asc",
        // width: 100,
      },
      {
        label: "Exchange Rate (Avg.)",
        field: "eRate",
        // sort: "asc",
        // width: 100,
      },
      {
        label: "Amount Recieved (Rs.)",
        field: "rAmountRs",
        // sort: "asc",
        // width: 100,
      },
      {
        label: "Action",
        field: "action",
        // sort: "asc",
        // width: 100,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    PaymentService.getAllPayment()
      .then((res) => {
        let ra = 0;
        let er = 0;
        let fer = 0;
        let updatedData = { ...dataa };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            project: item.project ? item.project.name : "N/A",
            cost: item.project ? item.project.cost : "N/A",
            rAmount:
              item.paymentDetials &&
              item.paymentDetials.map((item, index) => {
                if (index === 0) {
                  ra = 0;
                }
                ra = item.recievedAmount + ra;
              })
                ? `${ra} ${item.project && item.project.currency.name}`
                : "N/A",
            pAmount:
              item.paymentDetials &&
              item.paymentDetials.map((item, index) => {
                if (index === 0) {
                  ra = 0;
                }
                ra = item.recievedAmount + ra;
              })
                ? item.project.cost - ra
                : "N/A",
            rAmountRs:
              item.paymentDetials &&
              item.paymentDetials.map((item, index) => {
                if (index === 0) {
                  er = 0;
                  fer = 0;
                }
                er = item.exchangeRate + er;
              }) &&
              item.paymentDetials.map((item, index) => {
                if (index === 0) {
                  ra = 0;
                }
                ra = item.recievedAmount + ra;
              })
                ? ra * (er / item.paymentDetials.length)
                : "N/A",
            eRate:
              item.paymentDetials &&
              item.paymentDetials.map((item, index) => {
                if (index === 0) {
                  er = 0;
                  fer = 0;
                }
                er = item.exchangeRate + er;
              })
                ? er / item.paymentDetials.length
                : "N/A",
            action: (
              <div className="row flex-nowrap d-flex justify-content-start">
                <i
                  className="mdi mdi-eye 
                  iconsS my-primary-icon ml-4"
                  onClick={() => {
                    props.history.push({
                      pathname: "/view-project-payments/" + item.project._id,
                    });
                  }}
                />
              </div>
            ),
          });
        });
        console.log("Payment", res.data);

        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <div className="row align-items-center mb-3">
                    <div className="col">
                      <h3 className="m-0 p-0">All Payments</h3>
                    </div>
                    <div className="col">
                      <Link to="/add-project-payments">
                        <Button
                          color="success"
                          className="my-primary-button float-right"
                        >
                          Add Payment
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <MDBDataTableV5
                    responsive
                    striped
                    small
                    onPageChange={(val) => console.log(val)}
                    bordered={true}
                    // materialSearch
                    searchTop
                    searchBottom={false}
                    pagingTop
                    barReverse
                    hover
                    // scrollX
                    fixedHeader={true}
                    // autoWidth
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
};

export default PaymentList;

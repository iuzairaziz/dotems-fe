import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import "./LeaveDetails.scss";
import LeaveService from "../../../../services/LeaveService";
import UserService from "../../../../services/UserService";
import moment from "moment";



const LeaveDetails = (props) => {
  let loggedUser = UserService.userLoggedInInfo();
  console.log("logged user", loggedUser);
  const [leaveData, setLeaveData] = useState([]);

  const [dataa, setData] = useState({
    columns: [
      {
        label: "Type of Leave",
        field: "type",
        sort: "asc",
      },
      {
        label: "Dates",
        field: "dates",
        // sort: "asc",
      },

      

      {
        label: "Total Days",
        field: "tDays",
      },
      {
        label: "Posting Date",
        field: "postingDate",
      },
     
      {
        label: "Action",
        field: "action",
      },
    ],
    rows: [],
  });

  useEffect(() => {
    getData();
    getLeaveData();
  }, []);

  const getLeaveData = () => {
    LeaveService.remainingLeaveById(loggedUser._id).then((res) => {
      const leaves = res.data;
      setLeaveData(leaves);
      console.log("leave data", leaves)
     
    })
  }

  const getData = () => {
    LeaveService.allUserLeaves(loggedUser._id)
      .then((res) => {
        let updatedData = { ...dataa };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            type: item.type ? item.type.name : "N/A",
            postingDate: item.createdAt ? moment(item.createdAt).format("LL") : "N/A",
            dates: item.dates
              ? item.dates.map((item, index) => {
                  return (
                    <div>
                      {moment(item.date).format("LL")}
                      <br />
                    </div>
                  );
                })
              : "none",
              tDays: item.dates ? item.dates.length
              : "none",
            action: (
              <div className="row flex-nowrap justify-content-start">
                <i
                  className="mdi mdi-eye 
                  iconsS my-primary-icon"
                  onClick={() => {
                    props.history.push({
                      pathname: "/single-detail/" + item._id,
                    });
                  }}
                />
              </div>
            ),
          });
        });
        console.log("Leaves", updatedData);
        console.log("Leaves info", dataa);
        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  console.log("leave name", leaveData)

  return (
    <AUX>
      <div className="LeaveDetails">
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card m-b-20">
                  <div className="card-body">
                
                    <h3>Leave Details</h3>
             
                    <div className="row main">
                    {leaveData.map ((item, index) => {
                      return (
                        <div className="col col-md-3">  
                        <h5>{ item.name}</h5>
                        <div className="my-border border-top border-bottom">
                        <div>
                        <span>Total Leave: </span>
                        <span className="sub">{ item.totalLeaves}</span>
                        </div>
                        <div>
                        <span>Used Leaves: </span>
                        <span className="sub2">{item.leaves && item.leaves.usedLeaves ? item.leaves.usedLeaves : "0" }</span>
                        </div>
                        <div>
                        <span>Remaining Leave: </span>
                        <span className="sub1">{item.remaining ? item.remaining <  0 ? "0" : item.remaining : item.totalLeaves}</span>
                        </div>
                        <div>
                        <span>Unpaid Leaves: </span>
                        <span className="sub3">{item.remaining < 0 ? -item.remaining : "0" }</span>
                        </div>
                        </div>
                      </div>
                      )
                    })}
                    
                    </div>
                    
                    <h3 className="main">Leave Table</h3>
                    <div className="row">
                      <div className="col-12">
                        <MDBDataTableV5
                          // scrollX
                          fixedHeader={true}
                          responsive
                          striped
                          bordered
                          searchTop
                          hover
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
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default LeaveDetails;

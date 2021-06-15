import React, { Component, useState, useEffect } from "react";
import AUX from "../../../hoc/Aux_";
import moment from "moment";
import ClientService from "../../../services/ClientService";

const ClientDetails = (props) => {
  {
    const [ClientData, setData] = useState({});

    console.log("props", props.match.params.id);
    const userID = props.match.params.id;

    useEffect(() => {
      getData(userID);
    }, []);

    const getData = (id) => {
      ClientService.getClientById(id)
        .then((res) => {
          setData(res.data);
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
        </div>
      </AUX>
    );
  }
};

export default ClientDetails;

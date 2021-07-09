import React, { Component } from "react";
import AUX from "../../../../../hoc/Aux_";
import "./SingleDetail.scss";

const SingleDetail = () => {
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
                      <span>Employee Name:</span>
                    </div>
                    <div className="col-2">
                      <span>Uzair Aziz</span>
                    </div>
                    <div className="col-2">
                      <span>Leave Type: </span>
                    </div>
                    <div className="col-2">
                      <span>Sick Leave</span>
                    </div>
                    <div className="col-2 sub">
                      <span>Leave Date:</span>
                    </div>
                    <div className="col-2">
                      <span>Uzair Aziz</span>
                    </div>
                    <div className="col-2">
                      <span>Posting Date:</span>
                    </div>
                    <div className="col-2">
                      <span>Uzair Aziz</span>
                    </div>
                    <div className="col-2">
                      <span>Leave Status: </span>
                    </div>
                    <div className="col-2">
                      <span>Uzair Aziz</span>
                    </div>
                    <div className="col-2 sub">
                      <span>Already Approved: </span>
                    </div>
                    <div className="col-2">
                      <span>Uzair Aziz</span>
                    </div>
                    <div className="col-2">
                      <span>Apply For: </span>
                    </div>
                    <div className="col-2">
                      <span>Uzair Aziz</span>
                    </div>
                    <div className="col-2">
                      <span>Available: </span>
                    </div>
                    <div className="col-2">
                      <span>Uzair Aziz</span>
                    </div>
                    <div className="col-2">
                      <span>Admin Action Date:</span>
                    </div>
                    <div className="col-2 sub">
                      <span>Uzair Aziz</span>
                    </div>
                    <hr />
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
                          <p className="font-14 mb-0">
                            Raw denim you probably haven't heard of them jean
                            shorts Austin. Nesciunt tofu stumptown aliqua, retro
                            synth master cleanse. Mustache cliche tempor,
                            williamsburg carles vegan helvetica. Reprehenderit
                            butcher retro keffiyeh dreamcatcher synth. Cosby
                            sweater eu banh mi, qui irure terry richardson ex
                            squid. Aliquip placeat salvia cillum iphone. Seitan
                            aliquip quis cardigan american apparel, butcher
                            voluptate nisi qui.
                          </p>
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="profile1"
                          role="tabpanel"
                        >
                          <p className="font-14 mb-0">
                            Food truck fixie locavore, accusamus mcsweeney's
                            marfa nulla single-origin coffee squid. Exercitation
                            +1 labore velit, blog sartorial PBR leggings next
                            level wes anderson artisan four loko farm-to-table
                            craft beer twee. Qui photo booth letterpress,
                            commodo enim craft beer mlkshk aliquip jean shorts
                            ullamco ad vinyl cillum PBR. Homo nostrud organic,
                            assumenda labore aesthetic magna delectus mollit.
                            Keytar helvetica VHS salvia yr, vero magna velit
                            sapiente labore stumptown. Vegan fanny pack odio
                            cillum wes anderson 8-bit.
                          </p>
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

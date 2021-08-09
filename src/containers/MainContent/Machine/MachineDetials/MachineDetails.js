import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";
import moment from "moment";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MachineService from "../../../../services/MachineService";
import HistoryService from "../../../../services/HistoryService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { Button } from "reactstrap";

const MachineDetails = (props) => {
  {
    // const [data, setData] = useState();
    const [projectData, setProjectData] = useState();
    const [historyDoc, setHistoryDoc] = useState();
    const [editor, setEditor] = useState();

    const [dataa, setData] = useState({
      columns: [
        {
          label: "Date",
          field: "date",
          sort: "asc",
        },
        {
          label: "Machine Name",
          field: "machinename",
          sort: "asc",
        },
        {
          label: "Ownership",
          field: "ownership",
          sort: "disabled",
        },
        {
          label: "Serial No",
          field: "serialno",
          sort: "disabled",
        },
        {
          label: "Status",
          field: "status",
          sort: "disabled",
        },
        {
          label: "Machine No",
          field: "machineNo",
          sort: "disabled",
          // width: 100,
        },
        {
          label: "Processor",
          field: "processor",
          sort: "disabled",
        },
        {
          label: "Storage",
          field: "storage",
          sort: "disabled",
          // width: 150,
        },
        {
          label: "Memory",
          field: "memory",
          sort: "disabled",
          // width: 150,
        },
        {
          label: "Graphics",
          field: "graphics",
          sort: "disabled",
          // width: 150,
        },
        {
          label: "Accessories",
          field: "accessory",
          sort: "disabled",
          // width: 150,
        },
      ],
      rows: [],
    });

    // console.log("props", props.location.machineProps);
    const machineId = props.match.params.id;

    useEffect(() => {
      getData(machineId);
      getHistory(machineId);
    }, []);

    const getData = (id) => {
      MachineService.getSingleMachine(id)
        .then((res) => {
          setProjectData(res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };

    const getHistory = (id) => {
      HistoryService.getSingleHistory(id)
        .then((res) => {
          let data = { ...dataa };
          data.rows = [];
          res.data.map((item) => {
            let history = item.document;
            let historyParsedData = JSON.parse(history);
            console.log("dsdsdsdsadwedwdewd", historyParsedData);
            data.rows.push({
              date: item.createdAt
                ? moment(item.createdAt).format("MMM Do YY")
                : "none",
              machinename: historyParsedData.name
                ? historyParsedData.name
                : "none",
              ownership: historyParsedData.Ownership
                ? historyParsedData.Ownership
                : "none",
              serialno: historyParsedData.serialNo
                ? historyParsedData.serialNo
                : "none",
              status: historyParsedData.Status
                ? historyParsedData.Status
                : "none",
              machineNo: historyParsedData.machineNo
                ? historyParsedData.machineNo
                : "none",
              processor: historyParsedData.Processor
                ? historyParsedData.Processor
                : "none",
              storage: historyParsedData.Storage
                ? historyParsedData.Storage
                : "none",
              memory: historyParsedData.Memory
                ? historyParsedData.Memory
                : "none",
              graphics: historyParsedData.Graphics
                ? historyParsedData.Graphics
                : "none",
              accessory: historyParsedData.Accessory
                ? historyParsedData.Accessory.map((item, index) => {
                    if (index === 0) {
                      return item;
                    } else if (index >= 0) {
                      return `, ${item} `;
                    }
                  })
                : "none",
            });
          });
          setData(data);
          console.log("Historyyyyyyyyy", res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };

    console.log("data", projectData);

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
                          <label> Machine Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={projectData && projectData.name}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Ownsership</label>
                          <input
                            className="form-control"
                            value={projectData && projectData.Ownership}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label>Serial No</label>
                          <input
                            className="form-control"
                            value={projectData && projectData.serialNo}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label> Status </label>
                          <input
                            type="text"
                            className="form-control"
                            value={projectData && projectData.Status}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label>Machine No</label>
                          <input
                            className="form-control"
                            value={projectData && projectData.machineNo}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label> Processor </label>
                          <input
                            type="text"
                            className="form-control"
                            value={projectData && projectData.Processor}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label>Storage</label>
                          <input
                            className="form-control"
                            value={projectData && projectData.Storage}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label> Memory </label>
                          <input
                            type="text"
                            className="form-control"
                            value={projectData && projectData.Memory}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label>Graphics</label>
                          <input
                            className="form-control"
                            value={projectData && projectData.Graphics}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Accessories</label>
                          <input
                            className="form-control"
                            value={
                              projectData &&
                              projectData.Accessory.map((item) => {
                                return item.name;
                              })
                            }
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Notes</label>

                     
                    </div>
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
                            Machine Description
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
                            href="#settings"
                            role="tab"
                          >
                            <span className="d-none d-md-block">
                              Machine History
                            </span>
                            <span className="d-block d-md-none">
                              <i className="mdi mdi-settings h5" />
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
                          <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editor"
                        toolbarStyle={{ display: "none" }}
                        readOnly
                        editorState={
                          projectData &&
                          EditorState.createWithContent(
                            convertFromRaw(JSON.parse(projectData.Notes))
                          )
                        }
                      />
                        </div>
                        <div
                          className="tab-pane p-3"
                          id="settings"
                          role="tabpanel"
                        >        
                <MDBDataTableV5
                 responsive
                 striped
                 small
                 onPageChange={(val) => console.log(val)}
                 bordered={true}
                 materialSearch
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
      </AUX>
    );
  }
};

export default MachineDetails;

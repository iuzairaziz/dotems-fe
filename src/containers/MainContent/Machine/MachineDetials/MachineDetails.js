import React, { Component, useState, useEffect } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MachineService from "../../../../services/MachineService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { Button } from "reactstrap";

const MachineDetails = (props) => {
  {
    // const [data, setData] = useState();
    const [projectData, setProjectData] = useState();
    const [editor, setEditor] = useState();

    const [tabledata, setTableData] = useState({
      columns: [
        {
          label: "Task Name",
          field: "taskname",
          sort: "asc",
        },
        {
          label: "Team Member",
          field: "teamMember",
          sort: "disabled",
          width: 125,
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
          label: "Estimate Hrs",
          field: "EstHrs",
          sort: "disabled",
          // width: 100,
        },
        {
          label: "Actual Hrs",
          field: "ActHrs",
          sort: "disabled",
          // width: 100,
        },
        {
          label: "Work Done",
          field: "wrkdone",
          sort: "disabled",
        },
        {
          label: "Status",
          field: "status",
          sort: "disabled",
          // width: 150,
        },
        {
          label: "Action",
          field: "action",
          sort: "disabled",
          // width: 150,
        },
      ],
      rows: [],
    });

    console.log("props", props.location.machineProps);
    const machineId = props.location.machineProps;
    // console.log("Project Name", project.id)

    useEffect(() => {
      getData(machineId);
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
                            value={projectData && projectData.Accessory}
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Notes</label>

                      <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editor"
                        editorState={
                          projectData &&
                          EditorState.createWithContent(
                            convertFromRaw(JSON.parse(projectData.Notes))
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-12">
            <div className="card m-b-20">
              <div className="card-body">
                <h4 className="mt-0 header-title">Project Tasks</h4>

                <MDBDataTableV5
                  // scrollX
                  fixedHeader={true}
                  responsive
                  striped
                  bordered
                  searchTop
                  hover
                  autoWidth
                  data={tabledata}
                  theadColor="#000"
                />
              </div>
            </div>
          </div> */}
        </div>
      </AUX>
    );
  }
};

export default MachineDetails;

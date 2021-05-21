import React, { Component, useState, useEffect } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import ClientValidation from "../../../validations/client-validations";
import {
  Progress,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ProjectForm from "../Projects/ProjectFrom";
import ProjectService from "../../../services/ProjectService";

const ViewProjectsTask = () => {
  
  const [selectedProject, setSelectedProject] = useState({ name: "" });

  const [dataa, setData] = useState({
    columns: [
      {
        label: "Project Name",
        field: "projectName",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Platform",
        field: "platform",
        sort: "disabled",
        // width: 125,
      },
      {
        label: "Technology ",
        field: "technology",
        sort: "disabled",
        // width: 125,
      },
      {
        label: "Start Date",
        field: "startDate",
        sort: "disabled",
        // width: 100,
      },
      {
        label: "End Date",
        field: "endDate",
        sort: "disabled",
        // width: 100,
      },
      {
        label: "Status",
        field: "status",
        sort: "disabled",
        // width: 100,
      },
      
      {
        label: "Total Estimate Hrs",
        field: "Est. Hrs",
        sort: "disabled",
        // width: 100,
      },
      {
        label: "Total Actual Hrs",
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
        label: "Action",
        field: "action",
        sort: "disabled",
        // width: 150,
      },


    ],
    rows: [],
  });

  useEffect(() => {
    getData();
  }, []);

//   const toggleEdit = () => setModalEdit(!modalEdit);
//   const toggleDelete = () => setModalDelete(!modalDelete);

//   const handleDelete = (id) => {
//     ProjectService.deleteProject(id)
//       .then((res) => {
//         ProjectService.handleMessage("delete");
//         toggleDelete();
//       })
//       .catch((err) => {
//         ProjectService.handleError();
//         toggleDelete();
//       });
//   };
  const getData = () => {
    ProjectService.getAllProject()
      .then((res) => {
        let data = { ...dataa };
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            projectName: item.name ? item.name : "none",
            platform: item.platform ? item.platform.name : "none",   
            technology: item.technology ? item.technology.name : "none",
            // status: (
            //   <span className="badge badge-teal">
            //     {item.status ? item.status : "none"}
            //   </span>
              
            // ),
            status: item.status ? item.status.name : "none",
            
            startDate: item.startDate ? item.startDate : "none",
            endDate: item.endDate ? item.endDate : "none",
            
            action: (
              <div className="row flex-nowrap">
                 <Button
                  color="info"
                  size="sm"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={() => {
                    
                  }}
                >
                  View Details
                </Button>
              </div>
            ),
          });
        });
        setData(data);
        console.log("state data", dataa);
        console.log("my project data", data);
        console.log("res data", res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card m-b-20">
                <div className="card-body">
                  <h4 className="mt-0 header-title">Projects Task Table</h4>

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
        </div>
      </div>
    </AUX>
  );
};

export default ViewProjectsTask;

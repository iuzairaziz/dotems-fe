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

const ProjectReports = () => {
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedProject, setSelectedProject] = useState({ name: "" });

    const [dataa, setData] = useState({
        columns: [
          {
            label: "Project Name",
            field: "projectName",
            sort: "asc",
            width: 150,
          },
          {
            label: "Estimate Hours",
            field: "EstHrs",
            sort: "disabled",
            
          },
          {
            label: "Actual Hours",
            field: "ActHrs",
            sort: "disabled",
            
          },
          {
            label: "Work Done",
            field: "wrkdone",
           sort: "disabled",
           
          },
          {
            label: "Project Cost",
            field: "cost",
            sort: "disabled",
            width: 100,
          },
          {
            label: "Platform Deduction",
            field: "Pdeduction",
            sort: "disabled",
            
          },
          {
            label: "Percent Deduction",
            field: "percentage",
            sort: "disabled",
            
          },
          {
            label: "Reserve Profit",
            field: "Rprofit",
            sort: "disabled",
            
          },

          {
            label: "Project Cost Balance",
            field: "PCB",
            sort: "disabled",
            
          },
          
          {
            label: "Project Income Rs.",
            field: "Pincome",
            sort: "disabled",
            
          },
          
          {
            label: "Resource Expense",
            field: "Rprofit",
            sort: "disabled",
            
          },
          
          {
            label: "Total Profit",
            field: "Tprofit",
            sort: "disabled",
            
          },
         
    
    
        ],
        rows: [],
      });
      useEffect(() => {
        getData();
      }, [modalEdit, modalDelete]);
    
      const toggleEdit = () => setModalEdit(!modalEdit);
      const toggleDelete = () => setModalDelete(!modalDelete);
    
      const handleDelete = (id) => {
        ProjectService.deleteTask(id)
          .then((res) => {
            ProjectService.handleMessage("delete");
            toggleDelete();
          })
          .catch((err) => {
            ProjectService.handleError();
            toggleDelete();
          });
      };

      const getData = () => {
        ProjectService.getAllProject()
          .then((res) => {
            let data = { ...dataa };
            data.rows = [];
            res.data.map((item, index) => {
              data.rows.push({
                projectName: item.name ? item.name : "none",
                // clientName: item.client ? item.client.name : "none",
                // orderNum: item.orderNum ? item.orderNum : "none",
                // platform: item.platform ? item.platform.name : "none",
                // serviceType: item.service ? item.service.name : "none",
                // projectNature: item.nature ? item.nature.name : "none",
                // technology: item.technology ? item.technology.name : "none",
                // projectManager: item.projectManager
                //   ? item.projectManager.name
                //   : "none",
                // teamMember: item.assignedUser ? item.assignedUser.name : "none",
                // status: (
                //   <span className="badge badge-teal">
                //     {item.status ? item.status : "none"}
                //   </span>
                // ),
                // startDate: item.startDate ? item.startDate : "none",
                // endDate: item.endDate ? item.endDate : "none",
                cost: item.cost ? item.cost : "none",
                Rprofit: item.Rprofit ? item.Rprofit : "none",
                Pdeduction: item.Pdeduction ? item.Pdeduction : "none",
                percentage: item.percentage ? item.percentage : "none",
                
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
                    <h4 className="mt-0 header-title">Projects</h4>
  
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
              <Modal isOpen={modalEdit} toggle={toggleEdit}>
                <ModalHeader toggle={toggleEdit}>Edit Project</ModalHeader>
                <ModalBody>
                  <ProjectForm
                    editable={true}
                    project={selectedProject}
                    toggle={toggleEdit}
                  />
                </ModalBody>
              </Modal>
              <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}>Delete Project?</ModalHeader>
                <ModalBody>
                  Are you sure you want to delete the Project? "
                  {selectedProject.projectName}" ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleDelete(selectedProject._id);
                    }}
                  >
                    Yes
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleDelete}>
                    No
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
      </AUX>
      )
}

export default ProjectReports;
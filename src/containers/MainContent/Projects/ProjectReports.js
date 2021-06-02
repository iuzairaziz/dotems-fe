import React, { Component, useState, useEffect } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import ClientValidation from "../../../validations/client-validations";
import DatePicker from "react-datepicker";
import moment from "moment";
import CurrencyService from "../../../services/CurrencyService"
import {
  Progress,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ProjectService from "../../../services/ProjectService";

const ProjectReports = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedProject, setSelectedProject] = useState({ name: "" });
  const [selectedCurrency, SetSelectedCurrency] = useState("");
    
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
          // {
          //   label: "Percent Deduction",
          //   field: "percentage",
          //   sort: "disabled",
            
          // },
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
            field: "Rexpense",
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
        const getExchangeRate = (id) => {
          
          CurrencyService.getCurrencyById(id).then ((res) => {
            return res.data;
            console.log("currency", res.data);
          })
        }


      const getData = () => {
        ProjectService.getAllProject("","","","","")
          .then((res) => {
            let data = { ...dataa };
            data.rows = [];
            res.data.map((item, index) => {
              data.rows.push({
                projectName: item.name ? item.name : "none",
                cost: item.cost ? item.cost : "none",
                Rprofit: item.Rprofit ? (item.Rprofit/100 * item.cost ): "none",
                Pdeduction: item.Pdeduction ? (item.Pdeduction/100 *item.cost ): "none",
                PCB : (item.cost - ((item.Pdeduction/100 *item.cost )+ (item.Rprofit/100 * item.cost ))),
                // Pincome: (item.currency.exchangeRate * (item.cost - ((item.Pdeduction/100 *item.cost )+ (item.Rprofit/100 * item.cost ))))
             Pincome: item.currency ? (item.currency.exchangeRate * (item.cost - ((item.Pdeduction/100 *item.cost )+ (item.Rprofit/100 * item.cost )))): "none",
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
            </div>
          </div>
        </div>
      </AUX>
      )
}

export default ProjectReports;
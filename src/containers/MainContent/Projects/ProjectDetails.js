import React , {Component } from 'react';
import AUX from '../../../hoc/Aux_';
import { Link } from 'react-router-dom';
import Editable from 'react-x-editable';

const ProjectDetails = (props) =>{
 
{
    console.log("props", props.location.projectProps)
    const project = props.location.projectProps;
    console.log("Project Name", project.name)

    return(
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
                <label> Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={project.name}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Client Name</label>
                <input
                  className="form-control"
                  value={project.client.name}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label> Order Number </label>
                <input
                  type="text"
                  className="form-control"
                  value={project.orderNum}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Platform</label>
                <input
                  className="form-control"
                  value={project.platform.name}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label> Service Type  </label>
                <input
                  type="text"
                  className="form-control"
                  value={project.service.name}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Technology</label>
                <input
                  className="form-control"
                  value={project.technology.name}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label> Status   </label>
                <input
                  type="text"
                  className="form-control"
                  value={project.status.name}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Project Nature</label>
                <input
                  className="form-control"
                  value={project.nature.name}
                  readOnly={true}
                />
              </div>
            </div>
          </div>  
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label> Client Start Date    </label>
                <input
                  type="text"
                  className="form-control"
                  value={project.cStartDate}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Client Deadline</label>
                <input
                  className="form-control"
                  value={project.cEndDate}
                  readOnly={true}
                />
              </div>
            </div>
          </div>   
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label> PM Start Date </label>
                <input
                  type="text"
                  className="form-control"
                  value={project.pmStartDate}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>PM Deadline</label>
                <input
                  className="form-control"
                  value={project.pmEndDate}
                  readOnly={true}
                />
              </div>
            </div>
          </div>   
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label> Project Manager </label>
                <input
                  type="text"
                  className="form-control"
                  value={project.projectManager.name}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label> Team Members</label>
                <input
                  className="form-control"
                  value={project.assignedUser.map((item)=>{
                    return item.name
            })}
                  readOnly={true}
                />
              </div>
            </div>
          </div>   
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label> Cost</label>
                <input
                  type="text"
                  className="form-control"
                  value={project.cost}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label> Currency </label>
                <input
                  className="form-control"
                  value={project.currency.name}
                  readOnly={true}
                />
              </div>
            </div>
          </div>                     
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label> Platform Deduction</label>
                <input
                  type="text"
                  className="form-control"
                  value={project.Pdeduction}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label> Reserve Profit </label>
                <input
                  className="form-control"
                  value={project.Rprofit}
                  readOnly={true}
                />
              </div>
            </div>
          </div>                        
        <div className="form-group">
        <label>Description</label>
         <div>
        <textarea  className="form-control" rows="5"></textarea>
       </div>
              </div>  
                </div>
                    </div>
                        </div>
                        </div>
                        <table className="table table-striped mb-0">
                                <thead>
                                <tr>
                                <td style={{fontSize: "14px", fontWeight: "bold"}}>Task Name</td>
                                <td style={{fontSize: "14px", fontWeight: "bold"}}>Team Member</td>
                                <td style={{fontSize: "14px", fontWeight: "bold"}}>Nature</td>
                                <td style={{fontSize: "14px", fontWeight: "bold"}}>Start Date</td>
                                <td style={{fontSize: "14px", fontWeight: "bold"}}>End Date</td>
                                <td style={{fontSize: "14px", fontWeight: "bold"}}>Est. Hours</td>
                                <td style={{fontSize: "14px", fontWeight: "bold"}}>Actual Hours</td>
                                <td style={{fontSize: "14px", fontWeight: "bold"}}>Work Done</td>
                                <td style={{fontSize: "14px", fontWeight: "bold"}}>Status</td>
                                <td style={{fontSize: "14px", fontWeight: "bold"}}>Est. Cost</td>
                                <td style={{fontSize: "14px", fontWeight: "bold"}}>Actual Cost</td>
                                <td style={{fontSize: "14px", fontWeight: "bold"}}>Action</td>    
                                </tr>
                                </thead>
                                <tbody>
                                    {project.assignedUser.map((item, index) => {
                                        return (
                                            <tr>
                                    <td>Simple Text Field</td>
                                    <td>{item.name}</td>
                                    {console.log("team Member Name", project.assignedUser[index].value)}
                                    {console.log("team Member Nameeee", item.name)}
                                    <td>
                                      <Editable
                                        name="username"
                                        dataType="text"
                                        mode="inline"
                                        title="Please enter username"
                                        value="superuser"
                                        />
                                    </td>
                                </tr>
                                        )
                                    })}
                                <tr>
                                    <td>Simple Text Field</td>
                                    <td>
                                      <Editable
                                        name="username"
                                        dataType="text"
                                        mode="inline"
                                        title="Please enter username"
                                        value="superuser"
                                        />
                                    </td>
                                </tr>
                               
                               
                              
                              
                                </tbody>
                            </table>
                    </div>
                </div>
           </AUX>
        );
    }
}

export default ProjectDetails;   
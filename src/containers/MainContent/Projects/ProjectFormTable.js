import React, { useEffect, useState } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,ButtonDropdown,Button  } from 'reactstrap';
import ProjectService from "../../../services/ProjectService"
import NatureService from "../../../services/NatureService";
import Editable from 'react-x-editable';
import userService from "../../../services/UserService";


const ProjectFormTable = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [nature, setNature] = useState([]);
  const [users, setUsers] = useState([]);
  const [newNature, setNewNature] = useState([{}]);
  const [toShow,setToShow] = useState([])



  // const [selectedStatus, setSelectedStatus] = useState({ name: "" });
  // const [selectedProject, setSelectedProject] = useState({ name: "" });
  
 

  useEffect(() => {
    // getProject();
    getNature();
    getUsers();
    toShowData();
  }, [newNature]);

  const getNature = () => {
    NatureService.getAllNature().then((res) => {
      let options = [];
      let initialValues = {}
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          text: item.name,
          value: index,
          
        });
        initialValues[index] =  item.name;
        setNature(options);
        setNewNature(initialValues)
      });
    });
    console.log(newNature)
  };

  const getUsers = () => {
    userService.getUsers().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ value: item.name, label: item.name, id: item._id });
        setUsers(options);
      });
    });
  };

  const toShowData =() => {
    let keys = Object.keys(nature)
    keys.map((item) =>{
      setToShow({value : item , text : newNature[item]})
    })
    console.log("Data To Disply in MultiSelect",toShow);
  }

  
 
  return (
   
    <AUX>
      {console.log("new nature",toShow)}
		    <div className="page-content-wrapper">
            <div className="container-fluid">

                <div className="row">
                    <div className="col-12">
                        <div className="card m-b-20">
                            <div className="card-body">

                               

                                    <table className="table table-striped mb-0">
                                <thead>
                                <tr>
                                    <th style={{width: "25%"}}>Name</th>
                                    <th>Nature</th>
                                    <th>Est. Hours</th>
                                    <th>Est. Cost</th>
                                </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                      <td>Nehal</td>
                                      <td>
                                        <Editable
                                          name="Nature"
                                          dataType="select"
                                          mode="inline"
                                          title="Select Nature"
                                          options={[toShow]}
                                            value="Not Selected"
                                          />
                                      </td>
                                      <td>
                                        <Editable
                                          name="Hours"
                                          dataType="text"
                                          mode="inline"
                                          title="Please enter Hours"
                                          value="2"
                                          />
                                      </td>
                                      <td>
                                        <Editable
                                          name="Cost"
                                          dataType="text"
                                          mode="inline"
                                          title="Please enter Cost"
                                          value="25000"
                                          />
                                      </td>
                                      
                                  </tr>
                                  
                                 
                                  <tr>
                                    <td style={{fontSize: "15px", fontWeight: "bold"}}>Total Estimate Hours/ Cost</td>
                                    <td></td>
                                   <td>6</td>
                                   <td>75000</td>
                                </tr>
                               
                               
                               
                                <tr>
                                    <td style={{fontSize: "15px", fontWeight: "bold"}}>Start Date</td>
                                    <td>
                                      <Editable
                                      
                                        name="username"
                                        dataType="date"
                                        mode="inline"
                                        title="Please enter username"      
                                        value="2018-05-09"
                                      />
                                    </td>
                                    <td style={{fontSize: "15px", fontWeight: "bold"}}>Deadline</td>
                                    <td>
                                      <Editable
                                      
                                        name="username"
                                        dataType="date"
                                        mode="inline"
                                        title="Please enter username"      
                                        value="2018-05-09"
                                      />
                                    </td>
                                </tr>
                               
                              
                                </tbody>
                                <div className="button" style={{marginleft: "55px"}}>
                                <Button outline color="info"><i className="fa fa-plus fa-2x"></i></Button>{' '}
                                </div>
                                
                            </table>
                            </div>
                        </div>
                    </div> 
                </div>     
            </div> 
        </div>
       
           </AUX>
  );
};

export default ProjectFormTable;

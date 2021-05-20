import React, { useEffect, useState } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,ButtonDropdown,Button  } from 'reactstrap';
import ProjectService from "../../../services/ProjectService"
import NatureService from "../../../services/NatureService";


const ProjectFormTable = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [nature, setNature] = useState([]);


  const [selectedStatus, setSelectedStatus] = useState({ name: "" });
  const [selectedProject, setSelectedProject] = useState({ name: "" });
  const [data, setData] = useState({
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Nature",
        field: "projectNature",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Estimated Hours",
        field: "EstHrs",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Estimated Cost",
        field: "EstCst",
        sort: "asc",
        // width: 150,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    getProject();
    getNature();
  }, [modalEdit, modalDelete]);

  const getNature = () => {
    NatureService.getAllNature().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          // value: item._id,
          label: item.name,
          id: item._id,
        });
        setNature(options);
      });
    });
  };

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);

//   const handleDelete = (id) => {
//     StatusService.deleteStatus(id)
//       .then((res) => {
//         StatusService.handleMessage("delete");
//         toggleDelete();
//       })
//       .catch((err) => {
//         StatusService.handleError();
//         toggleDelete();
//       });
//   };

  const getProject = (props) => {
    ProjectService.getAllProject()
      .then((res) => {
        let updatedData = { ...data };
        updatedData.rows = [];
        res.data.map((item, index) => {
          updatedData.rows.push({
            teamMember: item.assignedUser ? item.assignedUser: "none",
            projectNature: (
              <div className="row flex-nowrap">
                  {/* <Button
                  color="info"
                  size="sm"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={() => {
                    {nature.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.label}
                          </option>
                        );
                      })}
                    // setNature(item);
                    // toggleEdit();
                  }}
                >
                  Nature
                </Button> */}
                <div className="dropdown">
                                        <Dropdown isOpen={this.state.drp_button}  toggle={() => this.setState({ drp_button: !this.state.drp_button })}>
                                            <DropdownToggle className="btn btn-secondary" caret>
                                            Nature
                                            </DropdownToggle>
                                            <DropdownMenu>
                                            onClick={() => {
                    {nature.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.label}
                          </option>
                        );
                      })}
                    // setNature(item);
                    // toggleEdit();
                  }}
                                            </DropdownMenu>
                                       </Dropdown>
                                        </div>
              </div>
            ),
          });
        });
        console.log("countries", updatedData);
        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };
  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card m-b-20">
                <div className="card-body">

                  <MDBDataTable
                    // scrollX
                    striped
                    bordered
                    hover
                    // autoWidth
                    data={data}
                  />
                </div>
              </div>
            </div>
            <div>
             
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default ProjectFormTable;

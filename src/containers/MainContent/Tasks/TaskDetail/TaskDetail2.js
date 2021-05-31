import React, { useEffect, useState } from "react";
import TaskService from "../../../../services/TaskService";

const TaskDetail = (props) => {
  const [task, setTask] = useState();
  const [subTasks, setSubTask] = useState();
  const [dataa, setData] = useState({
    columns: [
      {
        label: "Title",
        field: "title",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Project",
        field: "project",
        sort: "asc",
        // width: 270,
      },
      {
        label: "Estimated Hours",
        field: "estimatedHrs",
        sort: "asc",
        // width: 200,
      },
      {
        label: "Project Ratio",
        field: "projectRatio",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Team Lead",
        field: "teamLead",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Parent Task",
        field: "parentTask",
        sort: "asc",
        // width: 150,
      },
      {
        label: "Added By",
        field: "addedBy",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Approved By",
        field: "approvedBy",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Start Time",
        field: "startTime",
        sort: "asc",
        // width: 100,
      },
      {
        label: "End Time",
        field: "endTime",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "disabled",
        width: 450,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    TaskService.getTaskDetailsById(props.match.params.id)
      .then((res) => {
        const { task, subTasks } = res.data;
        setTask(task);
        setSubTask(subTasks);
      })
      .catch((err) => {
        TaskService.handleError();
        console.log("Inside task detail component", err);
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
                  <h4 className="mt-0 header-title">Task Details</h4>
                  <p className="text-muted m-b-30 font-14">
                    Below are the details of this task
                  </p>

                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          id="disabledTextInput"
                          className="form-control"
                          value={task.name}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Project</label>
                        <input
                          type="text"
                          id="disabledTextInput"
                          className="form-control"
                          value={task.project}
                        />
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <label>Estimated Hours</label>
                        <input
                          type="text"
                          id="disabledTextInput"
                          className="form-control"
                          value={task.estHrs}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Project Ratio</label>
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          value={task.projectRatio}
                        />
                        <span id="err">{props.errors.projectRatio}</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          id="textarea"
                          className="form-control"
                          readOnly
                          rows="2"
                          placeholder="Description"
                        >
                          {task.description}
                        </textarea>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Assign Members</label>
                        <div className="row">
                          {task.assignedUsers.map((item, index) => {
                            return <div className="col">{item.name}</div>;
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Team Lead</label>
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          value={task.teamLead}
                        />
                      </div>
                    </div>
                  </div>

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

export default TaskDetail;

import React from "react";
import { Link } from "react-router-dom";
import Aux from "../../../hoc/Aux_";
import "./ProjectSettings.scss";

const ProjectSettings = () => {
  const views = [
    {
      name: "Services",
      addRoute: "add-service",
      viewRoute: "service",
    },
    {
      name: "Country",
      addRoute: "add-country",
      viewRoute: "country",
    },
    {
      name: "Technologies",
      addRoute: "add-technology",
      viewRoute: "technology",
    },
    {
      name: "Nature",
      addRoute: "add-nature",
      viewRoute: "nature",
    },
    {
      name: "Platform",
      addRoute: "add-platform",
      viewRoute: "viewproject",
    },
    {
      name: "Currencies",
      addRoute: "addcurrency",
      viewRoute: "viewcurrency",
    },
    {
      name: "Clients",
      addRoute: "addclient",
      viewRoute: "viewclient",
    },
    {
      name: "Status",
      addRoute: "addstatus",
      viewRoute: "viewstatus",
    },
    {
      name: "Expenses",
      addRoute: "add-expense",
      viewRoute: "view-expense",
    },
  ];

  return (
    <Aux>
      <div className="page-content-wrapper project-settings">
        <div className="container-fluid">
          <div className="row">
            {views.map((item, index) => {
              return (
                <div key={index} className="col-md-6 col-xl-3 setting-card">
                  <Link to={item.viewRoute}>
                    <div className="mini-stat inner-col d-flex flex-column align-items-center">
                      <span className="mini-stat-icon bg-primary m-0">
                        <i className="mdi mdi-table-large" />
                      </span>
                      <div className="mini-stat-info text-right mt-2">
                        {item.name}
                      </div>
                      <Link to={item.addRoute}>
                        <div id="add-new-Buttonm">
                          <i className="mdi mdi-plus-circle" />
                        </div>
                      </Link>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default ProjectSettings;

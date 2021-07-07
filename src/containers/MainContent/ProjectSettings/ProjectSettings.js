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
      icon: "mdi-at",
    },
    {
      name: "Country",
      addRoute: "add-country",
      viewRoute: "country",
      icon: "mdi-flag",
    },
    {
      name: "Technologies",
      addRoute: "add-technology",
      viewRoute: "technology",
      icon: "mdi-android",
    },
    {
      name: "Nature",
      addRoute: "add-nature",
      viewRoute: "nature",
      icon: "mdi-nature",
    },
    {
      name: "Platform",
      addRoute: "add-platform",
      viewRoute: "platform",
      icon: "mdi-github-circle",
    },
    {
      name: "Currencies",
      addRoute: "addcurrency",
      viewRoute: "viewcurrency",
      icon: "mdi-currency-usd",
    },
    {
      name: "Clients",
      addRoute: "addclient",
      viewRoute: "viewclient",
      icon: "mdi-account-multiple",
    },
    {
      name: "Status",
      addRoute: "addstatus",
      viewRoute: "viewstatus",
      icon: "mdi-content-paste",
    },
    {
      name: "Expenses",
      addRoute: "add-expense",
      viewRoute: "view-expense",
      icon: "mdi-cash-multiple",
    },
    {
      name: "Leave Type",
      addRoute: "add-leave-type",
      viewRoute: "view-leave-type",
      icon: "mdi-cash-multiple",
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
                      <span className="mini-stat-icon icon-background m-0">
                        <i className={`mdi ${item.icon}`} />
                      </span>
                      <div className="mini-stat-info text-colour text-right mt-2">
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

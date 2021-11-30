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
      name: "Designation",
      addRoute: "add-designation",
      viewRoute: "designation",
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
      icon: " mdi-calendar-plus",
    },
    {
      name: "Request Type",
      addRoute: "add-request-type",
      viewRoute: "view-request-type",
      icon: "mdi-shape-plus",
    },
    {
      name: "Employee Type",
      addRoute: "add-employee-type",
      viewRoute: "view-employee-type",
      icon: "mdi-shape-plus",
    },
    {
      name: "Department",
      addRoute: "add-department",
      viewRoute: "view-department",
      icon: "mdi-shape-plus",
    },
    {
      name: "Leave",
      addRoute: "leave-portion",
      viewRoute: "view-leave-faraz",
      icon: "mdi-shape-plus",
    },
    {
      name: "Working Hours",
      addRoute: "working-hours-add",
      viewRoute: "view-working-hours",
      icon: "mdi-checkerboard",
    },
    {
      name: "Working Days",
      addRoute: "leave/add-new-working-day",
      viewRoute: "leave/working-days",
      icon: "mdi-shape-plus",
    },
    {
      name: "Working Shift",
      addRoute: "working-shift-add",
      viewRoute: "view-working-shift",
      icon: "mdi-chart-pie",
    },
    {
      name: "Leave Policy",
      addRoute: "add-leave-policy",
      viewRoute: "view-leave-policy",
      icon: "mdi-folder",
    },
    {
      name: "Attendance",
      addRoute: "add-attendance",
      viewRoute: "add-attendance",
      icon: "mdi-comment-account-outline",
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

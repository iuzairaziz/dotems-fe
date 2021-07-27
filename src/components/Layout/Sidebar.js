import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import $ from "jquery";
import "./Sidebar.scss";
import userService from "../../services/UserService";
import Configuration from "../../config/configuration";

class sidebar extends Component {
  state = {
    Tab: "index",
    SubTab: "",
    MoreTab: "",
    dashboard_menu: false,
    task_menu: false,
    timesheet_menu: false,
    project_menu: false,
    user_menu: false,
    project_settings_menu: false,
  };
  roles = new Configuration().Roles;
  stateKeys = Object.keys(this.state);
  baseUrl = this.props.match.url;
  isRole = userService.isUserRole;
  menus = [
    ...(this.isRole([this.roles.PM, this.roles.ADMIN, this.roles.CEO])
      ? [
          {
            name: "user_menu",
            icon: "mdi-account",
            tab: "user",
            subMenus: [
              { routeName: this.baseUrl + "add-user", label: "Add New User" },
              { routeName: this.baseUrl + "viewuser", label: "View Users" },
            ],
          },
        ]
      : []), // if false spread operator will return nothing as array elements
    {
      name: "timesheet_menu",
      icon: "mdi-calendar-clock",
      tab: "timesheet",
      subMenus: [
        { routeName: this.baseUrl + "add-time", label: "Weekly Timesheet" },
      ],
    },
    {
      name: "task_menu",
      icon: "mdi-clipboard-text",
      tab: "task",
      subMenus: [
        ...(this.isRole([this.roles.PM, this.roles.ADMIN, this.roles.CEO])
          ? [
              { routeName: this.baseUrl + "add-task", label: "New Tasks" },
              { routeName: this.baseUrl + "task", label: "View Tasks" },
            ]
          : []),

        { routeName: this.baseUrl + "my-tasks", label: "My Tasks" },
      ],
    },

    ...(this.isRole([this.roles.PM, this.roles.ADMIN, this.roles.CEO])
      ? [
          {
            name: "project_menu",
            icon: "mdi-file-powerpoint-box",
            tab: "project",
            subMenus: [
              { routeName: this.baseUrl + "addproject", label: "New Project" },
              {
                routeName: this.baseUrl + "viewproject",
                label: "View Projects",
              },
              {
                routeName: this.baseUrl + "projectreport",
                label: "Project Report",
              },
            ],
          },
          {
            name: "project_settings_menu",
            icon: "mdi-settings",
            tab: "project-settings",
            subMenus: [
              { routeName: this.baseUrl + "project-settings", label: "Menus" },
            ],
          },
          {
            name: "machine_menu",
            icon: "mdi-laptop",
            tab: "Machine",
            subMenus: [
              {
                routeName: this.baseUrl + "add-machine",
                label: "Add New Machine",
              },
              {
                routeName: this.baseUrl + "view-machine",
                label: "View Machine Details",
              },
            ],
          },
          {
            name: "accessory_menu",
            icon: "mdi-responsive",
            tab: "Accessory",
            subMenus: [
              {
                routeName: this.baseUrl + "add-accessory",
                label: "Add New Accessory",
              },
              {
                routeName: this.baseUrl + "view-accessory",
                label: "View Accessory ",
              },
            ],
          },
          {
            name: "request_menu",
            icon: "mdi-message-draw",
            tab: "Request",
            subMenus: [
              {
                routeName: this.baseUrl + "add-request",
                label: "New Request",
              },
              {
                routeName: this.baseUrl + "view-request",
                label: "View Request",
              },
              {
                routeName: this.baseUrl + "my-requests",
                label: "My Requests",
              },
            ],
          },
          {
            name: "leave",
            icon: "mdi-calendar-multiple-check",
            tab: "Leave",
            subMenus: [
              {
                routeName: this.baseUrl + "leave-form",
                label: "Apply Leave",
              },
              {
                routeName: this.baseUrl + "leave-list",
                label: "Leave List",
              },
              {
                routeName: this.baseUrl + "leave-details",
                label: "My Leaves",
              },
            ],
          },
        ]
      : []),
  ];

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  setActiveTab = (tab, subtab, moretab, toggleTab, e) => {
    this.setState({ Tab: tab, SubTab: subtab, MoreTab: moretab });
  };

  componentDidMount() {
    var now_route = "";
    var pageUrl = window.location.pathname.split(/[?#]/)[0];
    now_route = pageUrl.substr(1).replace(/_/g, " ");
    $("#now_routing").empty();
    if (now_route == "") {
      now_route = "Dashboard1";
    } else {
    }
    $("#now_routing").append(now_route);

    $(".toggle-search").on("click", function() {
      var targetId = $(this).data("target");
      var $searchBar;
      if (targetId) {
        $searchBar = $(targetId);
        $searchBar.toggleClass("open");
      }
    });

    $(".button-menu-mobile").on("click", function(event) {
      event.preventDefault();
      $("body").toggleClass("enlarged");
    });

    $("li.has_sub li").on("click", function(event) {
      $("body").toggleClass("enlarged");
    });
  }
  componentDidUpdate() {
    var now_route = "";
    var pageUrl = window.location.pathname.split(/[?#]/)[0];
    now_route = pageUrl.substr(1).replace("_", " ");
    $("#now_routing").empty();
    if (now_route == "") {
      now_route = "Dashboard1";
    } else {
    }
    $("#now_routing").append(now_route);
  }

  render() {
    return (
      // <div className="sidebar">
      <div className="left side-menu sidebar">
        <div className="topbar-left ">
          <div className="sidebar-options ">
            <Link to="/" className="logo">
              <img src="assets/images/ftr-logo.png" height="36" alt="logo" />
            </Link>
          </div>
        </div>

        <div className="sidebar-inner slimscrollleft ">
          <PerfectScrollbar>
            <div id="sidebar-menu" className="options">
              <ul>
                <li className="menu-title leftbar">Main</li>
                <li
                  className={
                    this.state.dashboard_menu
                      ? "has_sub active-menu nav-active"
                      : "has_sub"
                  }
                >
                  <Link
                    to="#"
                    onClick={() =>
                      this.setState({
                        dashboard_menu: !this.state.dashboard_menu,
                        form_menu: false,
                        country_menu: false,
                      })
                    }
                    className={
                      this.state.Tab === "index"
                        ? "waves-effect active-menu"
                        : "waves-effect"
                    }
                  >
                    <i className="mdi mdi-view-dashboard" />{" "}
                    <span>
                      {" "}
                      Dashboard{" "}
                      <span className="badge badge-pill badge-primary pull-right">
                        20+
                      </span>
                    </span>{" "}
                  </Link>
                  <ul
                    className="list-unstyled"
                    style={{
                      display: this.state.dashboard_menu ? "block" : "none",
                    }}
                  >
                    <li>
                      <Link
                        className={
                          this.state.SubTab === "dashboard1"
                            ? "active-menu"
                            : ""
                        }
                        onClick={this.setActiveTab.bind(
                          this,
                          "index",
                          "dashboard1",
                          ""
                        )}
                        to="/"
                      >
                        Dashboard One
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          this.state.SubTab === "dashboard2"
                            ? "active-menu"
                            : ""
                        }
                        onClick={this.setActiveTab.bind(
                          this,
                          "index",
                          "dashboard2",
                          ""
                        )}
                        to="dashboard2"
                      >
                        Dashboard Two
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="menu-title">Components</li>

                {this.menus.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        this.state[item.name]
                          ? "has_sub active-menu nav-active"
                          : "has_sub"
                      }
                    >
                      <Link
                        to="#"
                        onClick={() => {
                          this.stateKeys.map((toClose) =>
                            item.name != toClose &&
                            toClose != "Tab" &&
                            toClose != "SubTab" &&
                            toClose != "MoreTab"
                              ? this.setState({ [toClose]: false })
                              : this.setState({
                                  [item.name]: !this.state[item.name],
                                })
                          );
                        }}
                        className={
                          this.state.Tab === `${item.tab}`
                            ? "waves-effect active"
                            : "waves-effect"
                        }
                      >
                        <i className={`mdi ${item.icon}`} />
                        <span>
                          {" "}
                          {this.capitalize(item.tab)}{" "}
                          <span className="pull-right">
                            <i className="mdi mdi-chevron-right" />
                          </span>
                        </span>
                      </Link>
                      <ul
                        className="list-unstyled"
                        style={{
                          display: this.state[item.name] ? "block" : "none",
                        }}
                      >
                        {item.subMenus.map((subMenu, index) => {
                          return (
                            <li key={index}>
                              <Link
                                className={
                                  this.state.SubTab === `${subMenu.routeName}`
                                    ? "active-menu"
                                    : ""
                                }
                                onClick={this.setActiveTab.bind(
                                  this,
                                  `${item.tab}`,
                                  `${subMenu.routeName}`,
                                  ""
                                )}
                                to={subMenu.routeName}
                              >
                                {subMenu.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="clearfix" />
          </PerfectScrollbar>
        </div>
      </div>
      // </div>
    );
  }
}

export default withRouter(sidebar);

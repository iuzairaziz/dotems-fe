import React, { Component } from "react";
import Dashboard1 from "../MainContent/Dashboard/Dashboard1";
import Dashboard2 from "../MainContent/Dashboard/Dashboard2";

import { Redirect, Route, Switch } from "react-router-dom";

//nehal defined routes
import AddUser from "../MainContent/User/AddNewUser/AddUser";

import NewTask from "../MainContent/Tasks/NewTask/NewTask";
import TaskList from "../MainContent/Tasks/TaskList/TaskList";
import AddClients from "../MainContent/Client/AddClients";

import ViewClients from "../MainContent/Client/ViewClients";
import ClientsForm from "../MainContent/Client/ClientsForm";
import AddProjects from "../MainContent/Projects/AddProjects";
import ViewProjects from "../MainContent/Projects/ViewProjects";
import AddNature from "../MainContent/Nature/AddNature/AddNature";
import NatureList from "../MainContent/Nature/NatureList/NatureList";
import AddTechnology from "../MainContent/Technology/AddTechnology/AddTechnology";
import TechnologyList from "../MainContent/Technology/TechnologyList/TechnologyList";
import DesignationList from "../MainContent/Designation/DesignationList/DesignationList";
import AddDesignation from "../MainContent/Designation/AddDesignation/AddDesignation";
import ServiceList from "../MainContent/Service/ServiceList/ServiceList";
import AddService from "../MainContent/Service/AddService/AddService";
import AddPlatform from "../MainContent/Platform/AddPlatform/AddPlatform";
import PlatformList from "../MainContent/Platform/PlatformList/PlatformList";
import Login from "../MainContent/Auth/Login/Login";
import Register from "../MainContent/Auth/Register/Register";
import AddTime from "../MainContent/Timesheet/AddTime/AddTime";
import ProjectReports from "../MainContent/Projects/ProjectReports";
import AddCurrency from "../MainContent/Currency/AddCurrency";
import AddStatus from "../MainContent/Status/AddStatus/AddStatus";
import StatusList from "../MainContent/Status/StatusList/StatusList";
import CurrencyList from "../MainContent/Currency/ViewCurrency";
import ExpenseList from "../MainContent/Expense/AddExpense/Expense";
import UpdateUser from "../MainContent/User/AddUserForm/UpdateUserForm";
import ViewUsers from "../MainContent/User/UserList/UserList";
import updateUsers from "../MainContent/User/AddNewUser/UpdateUser";
import ProjectDetails from "../MainContent/Projects/ProjectDetails";
import TaskDetails from "../MainContent/Tasks/TaskDetail/TaskDetails";
import UserDetails from "../MainContent/User/UserList/UserDetails";
import ViewExpense from "../MainContent/Expense/ViewExpense/ViewExpense";
import AddMachine from "../MainContent/Machine/AddMachine/AddMachine";
import ProjectSettings from "../MainContent/ProjectSettings/ProjectSettings";
import MachineList from "../MainContent/Machine/MachineList/MachineList";
import AddAccessory from "../MainContent/Accessories/AddAccessories/AddAccessories";
import AccessoryList from "../MainContent/Accessories/AccessoryList/AccessoryList";
import MachineDetails from "../MainContent/Machine/MachineDetials/MachineDetails";
import ChangePassword from "../MainContent/User/AddNewUser/ChangePasswrod";
import ChangePasswordForm from "../MainContent/User/AddUserForm/ChangePasswordForm";
import ClientDetails from "../MainContent/Client/ClientDetail";
import AddLeaveType from "../MainContent/Leaves/LeaveType/AddLeaveType/AddLeaveType";
import AddRequestType from "../MainContent/RequestType/AddRequestType/AddReuqestType";
import AddEmployeeType from "../MainContent/EmployeeType/AddEmployeeType/AddEmployeeType";
import AddDepartment from "../MainContent/Department/AddDepartment/AddDepartment";
import AddRequest from "../MainContent/Request/AddRequest/AddRequest";
import LeaveTypeList from "../MainContent/Leaves/LeaveType/LeaveTypeList/LeaveTypeList";
import RequestTypeList from "../MainContent/RequestType/RequestList/RequestList";
import EmployeeTypeList from "../MainContent/EmployeeType/EmployeeTypeList/EmployeeTypeList";
import DepartmentList from "../MainContent/Department/DepartmentList/DepartmentList";
import RequestList from "../MainContent/Request/ViewRequest/ViewRequest";
import RequestRecieved from "../MainContent/Request/ViewRequest/ViewReceivedRequest";
import Machine from "../MainContent/Machine/Machine";
import MyTasks from "../MainContent/Tasks/TaskList/MyTaskList";
import Configuration from "../../config/configuration";
import userService from "../../services/UserService";
import RoleAuth from "../../components/MyComponents/Auth/RoleAuth";
import Pages_400 from "../../components/MyComponents/Pages/Pages_400";
import Ui_tabs_accordions from "../MainContent/UiElements/Ui_tabs_accordions";
import LeaveForm from "../MainContent/Leaves/LeaveForm/LeaveForm";
import NewLeave from "../MainContent/Leaves/NewLeave/NewLeave";
import LeaveDetails from "../MainContent/Leaves/LeaveDetails/LeaveDetails";
import LeaveList from "../MainContent/Leaves/LeaveList/LeaveList";
import SingleDetail from "../MainContent/Leaves/LeaveDetails/SingleDetail/SingleDetail";
import SingleRequest from "../MainContent/Request/SingleRequest/SingleRequest";
import MyRequest from "../MainContent/Request/MyRequest/MyRequests";
import MyProjects from "../MainContent/Projects/MyProject";
import AdminDashboard from "../MainContent/Dashboard/AdminDashboard";
import AddProjectPayments from "../MainContent/ProjectPayments/AddProjectPayments/AddProjectPayment";
import ViewProjectPayments from "../MainContent/ProjectPayments/ViewProjectPayments/ViewProjectPayments";
import ViewSingleProjectPayments from "../MainContent/ProjectPayments/ProjectPaymentDetails/ProjectPaymentDetails";
import AttendanceList from "../MainContent/Attendance/ViewAttendance";
import LeaveSettings from "../MainContent/Leaves/LeaveSettings/LeaveSettings";
import TimesheetFormDaily from "../MainContent/Timesheet/TimesheetForm/TimesheetFormDaily";
// import tabledatabale from "../MainContent/Tables/Tables_datatable"
// import tableresposive from "../MainContent/Tables/Tables_responsive"
// import formWizard from "../MainContent/Forms/Form_wizard"
const mainbuilder = (props) => {
  const baseUrl = props.match.url;
  const roles = new Configuration().Roles;

  const { ADMIN, PM, HR, CEO, EMPLOYEE, INTERNEE, PROBATION, AM } = roles;
  const ALL_ROLES = [ADMIN, PM, HR, CEO, EMPLOYEE, INTERNEE, PROBATION, AM];
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/leave-details" component={LeaveDetails} />
        <Route exact path="/single-detail/:id" component={SingleDetail} />
        <Route exact path="/my-projects" component={MyProjects} />
        <Route exact path="/viewprojects/:id" component={ProjectDetails} />
        <Route exact path="/daily" component={TimesheetFormDaily} />
        {/* <Route exact path="/date/table" component={tabledatabale} />
        <Route exact path="/responsive/table" component={tableresposive} />
        <Route exact path="/wizard/form" component={formWizard} /> */}
        {/* <Route exact path="/viewproject" component={ViewProjects} /> */}
        <Route exact path="/updateuser" component={updateUsers} />
        <Route exact path="/changepass" component={ChangePassword} />
        <Route exact path="/changepassword" component={ChangePasswordForm} />
        <Route exact path="/" component={Dashboard1} />
        <RoleAuth roles={ALL_ROLES}>
          <Route exact path="/add-request" component={AddRequest} />
          <Route exact path="/form" component={Ui_tabs_accordions} />
          <Route exact path="/attendance" component={AttendanceList} />
          <Route exact path="/my-tasks" component={MyTasks} />
          <Route exact path="/leave-form" component={NewLeave} />
          <Route
            exact
            path="/request-single-detail/:id"
            component={SingleRequest}
          />
          <Route exact path="/my-requests" component={MyRequest} />
          <Route exact path="/task-details/:id" component={TaskDetails} />
          <Route exact path="/subtask-details" component={TaskDetails} />
          <Route exact path="/tabs" component={Ui_tabs_accordions} />
          <Route exact path="/update-profile" component={UpdateUser} />
          {/* Admin HR PM and Accounts roles   */}
          <RoleAuth roles={[ADMIN, PM, HR, AM]}>
            <Route exact path="/viewuser" component={ViewUsers} />
            <Route
              exact
              path="/view-recieved-request"
              component={RequestRecieved}
            />
            <Route exact path="/userdetails/:id" component={UserDetails} />
          </RoleAuth>
          {/* Only Admin Roles  */}
          <RoleAuth roles={[ADMIN]}>
            <Route exact path="/admin-dashboard" component={AdminDashboard} />
            <Route
              exact
              path="/add-project-payments"
              component={AddProjectPayments}
            />
            <Route
              exact
              path="/view-project-payments"
              component={ViewProjectPayments}
            />
            <Route
              exact
              path="/view-project-payments/:id"
              component={ViewSingleProjectPayments}
            />
            <Route exact path="/leave/settings" component={LeaveSettings} />
          </RoleAuth>
          {/* PM and Admin roles  */}
          <RoleAuth roles={[CEO, PM, ADMIN]}>
            <Route exact path="/add-user" component={AddUser} />
            <Route exact path="/add-leave-type" component={AddLeaveType} />
            <Route exact path="/view-leave-type" component={LeaveTypeList} />
            <Route exact path="/leave-list" component={LeaveList} />
            <Route exact path="/add-task" component={NewTask} />
            <Route exact path="/view-request" component={RequestList} />
            <Route exact path="/view-leave-type" component={LeaveTypeList} />
            <Route
              exact
              path="/view-request-type"
              component={RequestTypeList}
            />
            <Route
              exact
              path="/view-employee-type"
              component={EmployeeTypeList}
            />
            <Route exact path="/view-department" component={DepartmentList} />
            <Route exact path="/platform" component={PlatformList} />
            <Route exact path="/add-platform" component={AddPlatform} />
            <Route exact path="/service" component={ServiceList} />
            <Route exact path="/add-service" component={AddService} />
            <Route exact path="/designation" component={DesignationList} />
            <Route exact path="/add-designation" component={AddDesignation} />
            <Route exact path="/technology" component={TechnologyList} />
            <Route exact path="/add-technology" component={AddTechnology} />
            <Route exact path="/nature" component={NatureList} />
            <Route exact path="/add-nature" component={AddNature} />
            <Route exact path="/add-leave-type" component={AddLeaveType} />
            <Route exact path="/add-request-type" component={AddRequestType} />
            <Route
              exact
              path="/add-employee-type"
              component={AddEmployeeType}
            />
            <Route exact path="/add-department" component={AddDepartment} />
            <Route exact path="/addcurrency" component={AddCurrency} />
            <Route exact path="/addstatus" component={AddStatus} />
            <Route exact path="/project-settings" component={ProjectSettings} />
            <Route exact path="/viewproject" component={ViewProjects} />
            <Route exact path="/addproject" component={AddProjects} />
            <Route exact path="/projectreport" component={ProjectReports} />
            <Route exact path="/add-machine" component={AddMachine} />
            <Route exact path="/add-accessory" component={AddAccessory} />
            <Route exact path="/view-accessory" component={AccessoryList} />
            <Route exact path="/view-machine" component={MachineList} />
            <Route exact path="/add-expense" component={ExpenseList} />
            <Route exact path="/view-expense" component={ViewExpense} />
            <Route exact path="/addclient" component={AddClients} />
            <Route exact path="/clientform" component={ClientsForm} />
            <Route exact path="/viewclient" component={ViewClients} />
            <Route exact path="/client-details/:id" component={ClientDetails} />
            <Route
              exact
              path="/machine-details/:id"
              component={MachineDetails}
            />
            <Route exact path="/viewstatus" component={StatusList} />
            <Route exact path="/viewcurrency" component={CurrencyList} />
          </RoleAuth>
          <Route exact path="/add-time" component={AddTime} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/task" component={TaskList} />
          <Route exact path="/dashboard2" component={Dashboard2} />
          <Route exact path="/not-found" component={Pages_400} />
          {/* <Redirect to="/not-found" component={Pages_400} /> */}
        </RoleAuth>
      </Switch>
    </>
  );
};

export default mainbuilder;

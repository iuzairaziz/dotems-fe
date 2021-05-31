import React, { Component } from "react";
import Dashboard1 from "../MainContent/Dashboard/Dashboard1";
import Dashboard2 from "../MainContent/Dashboard/Dashboard2";

import Calendar from "../MainContent/Calendar/calendar";

import Ecommerce_customers from "../MainContent/Ecommerce/Ecommerce_customers";
import Ecommerce_order_history from "../MainContent/Ecommerce/Ecommerce_order_history";
import Ecommerce_product_edit from "../MainContent/Ecommerce/Ecommerce_product_edit";
import Ecommerce_product_grid from "../MainContent/Ecommerce/Ecommerce_product_grid";
import Ecommerce_product_list from "../MainContent/Ecommerce/Ecommerce_product_list";

import Email_compose from "../MainContent/Email/Email_compose";
import Email_inbox from "../MainContent/Email/Email_inbox";
import Email_read from "../MainContent/Email/Email_read";
import Email_templates_alert from "../MainContent/Email/Email_templates_alert";
import Email_templates_basic from "../MainContent/Email/Email_templates_basic";
import Email_templates_billing from "../MainContent/Email/Email_templates_billing";

import Form_advanced from "../MainContent/Forms/Form_advanced";
import Form_editors from "../MainContent/Forms/Form_editors";
import Form_elements from "../MainContent/Forms/Form_elements";
import Form_mask from "../MainContent/Forms/Form_mask";
import Form_summernote from "../MainContent/Forms/Form_summernote";
import Form_uploads from "../MainContent/Forms/Form_uploads";
import Form_validation from "../MainContent/Forms/Form_validation";
import Form_wizard from "../MainContent/Forms/Form_wizard";
import Form_xeditable from "../MainContent/Forms/Form_xeditable";

import Icons_dripicons from "../MainContent/Icons/Icons_dripicons";
import Icons_fontawesome from "../MainContent/Icons/Icons_fontawesome";
import Icons_ion from "../MainContent/Icons/Icons_ion";
import Icons_material from "../MainContent/Icons/Icons_material";
import Icons_mobirise from "../MainContent/Icons/Icons_mobirise";
import Icons_themify from "../MainContent/Icons/Icons_themify";
import Icons_typicons from "../MainContent/Icons/Icons_typicons";
import Icons_weather from "../MainContent/Icons/Icons_weather";

import Maps_google from "../MainContent/Maps/Maps_google";
import Maps_vector from "../MainContent/Maps/Maps_vector";

import Pages_400 from "../MainContent/Pages/Pages_400";
import Pages_timeline from "../MainContent/Pages/Pages_timeline";
import Pages_500 from "../MainContent/Pages/Pages_500";
import Pages_blank from "../MainContent/Pages/Pages_blank";
import Pages_coming_soon from "../MainContent/Pages/Pages_coming_soon";
import Pages_contact from "../MainContent/Pages/Pages_contact";
import Pages_directory from "../MainContent/Pages/Pages_directory";
import Pages_faq from "../MainContent/Pages/Pages_faq";
import Pages_gallery from "../MainContent/Pages/Pages_gallery";
import Pages_invoice from "../MainContent/Pages/Pages_invoice";
import Pages_lock_screen from "../MainContent/Pages/Pages_lock_screen";
import Pages_lock_screen_2 from "../MainContent/Pages/Pages_lock_screen_2";
import Pages_login from "../MainContent/Pages/Pages_login";
import Pages_login_2 from "../MainContent/Pages/Pages_login_2";
import Pages_maintenance from "../MainContent/Pages/Pages_maintenance";
import Pages_pricing from "../MainContent/Pages/Pages_pricing";
import Pages_recoverpw from "../MainContent/Pages/Pages_recoverpw";
import Pages_recoverpw_2 from "../MainContent/Pages/Pages_recoverpw_2";
import Pages_register from "../MainContent/Pages/Pages_register";
import Pages_register_2 from "../MainContent/Pages/Pages_register_2";

import Tables_basic from "../MainContent/Tables/Tables_basic";
import Tables_datatable from "../MainContent/Tables/Tables_datatable";
import Tables_editable from "../MainContent/Tables/Tables_editable";
import Tables_responsive from "../MainContent/Tables/Tables_responsive";

import Ui_alertify from "../MainContent/UiElements/Ui_alertify";
import Ui_alerts from "../MainContent/UiElements/Ui_alerts";
import Ui_animation from "../MainContent/UiElements/Ui_animation";
import Ui_badge from "../MainContent/UiElements/Ui_badge";
import Ui_buttons from "../MainContent/UiElements/Ui_buttons";
import Ui_cards from "../MainContent/UiElements/Ui_cards";
import Ui_carousel from "../MainContent/UiElements/Ui_carousel";
import Ui_colors from "../MainContent/UiElements/Ui_colors";
import Ui_dropdowns from "../MainContent/UiElements/Ui_dropdowns";
import Ui_grid from "../MainContent/UiElements/Ui_grid";
import Ui_highlight from "../MainContent/UiElements/Ui_highlight";
import Ui_images from "../MainContent/UiElements/Ui_images";
import Ui_lightbox from "../MainContent/UiElements/Ui_lightbox";
import Ui_modals from "../MainContent/UiElements/Ui_modals";
import Ui_navs from "../MainContent/UiElements/Ui_navs";
import Ui_nestable from "../MainContent/UiElements/Ui_nestable";
import Ui_pagination from "../MainContent/UiElements/Ui_pagination";
import Ui_popover_tooltips from "../MainContent/UiElements/Ui_popover_tooltips";
import Ui_progressbars from "../MainContent/UiElements/Ui_progressbars";
import Ui_rangeslider from "../MainContent/UiElements/Ui_rangeslider";
import Ui_rating from "../MainContent/UiElements/Ui_rating";
import Ui_sessiontimeout from "../MainContent/UiElements/Ui_sessiontimeout";
import Ui_sweet_alert from "../MainContent/UiElements/Ui_sweet_alert";
import Ui_tabs_accordions from "../MainContent/UiElements/Ui_tabs_accordions";
import Ui_typography from "../MainContent/UiElements/Ui_typography";
import Ui_video from "../MainContent/UiElements/Ui_video";

import Charts_easy from "../MainContent/Charts/Charts_easy";
import Chartjs from "../MainContent/Charts/Chartjs";
import ApexChart from "../MainContent/Charts/ApexChart";
import SparkLine from "../MainContent/Charts/SparkLine";

import { Route, Switch } from "react-router-dom";

//nehal defined routes
import AddUser from "../MainContent/User/AddNewUser/AddUser";

import NewTask from "../MainContent/Tasks/NewTask/NewTask";
import TaskList from "../MainContent/Tasks/TaskList/TaskList";
import AddClients from "../MainContent/Client/AddClients";

import Widgets from "../MainContent/Widgets/widgets";
import ViewClients from "../MainContent/Client/ViewClients";
import ClientsForm from "../MainContent/Client/ClientsForm";
import AddProjects from "../MainContent/Projects/AddProjects";
import ViewProjects from "../MainContent/Projects/ViewProjects";
import AddNature from "../MainContent/Nature/AddNature/AddNature";
import NatureList from "../MainContent/Nature/NatureList/NatureList";
import AddTechnology from "../MainContent/Technology/AddTechnology/AddTechnology";
import TechnologyList from "../MainContent/Technology/TechnologyList/TechnologyList";
import CountryList from "../MainContent/Country/CountryList/CountryList";
import AddCountry from "../MainContent/Country/AddCountry/AddCountry";
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
import SubTask from "../MainContent/Tasks/TaskList/SubTask";
import SubTaskDetails from "../MainContent/Tasks/TaskList/SubTaskDetails";
import UpdateUser from "../MainContent/User/AddUserForm/UpdateUserForm";
import ViewUsers from "../MainContent/User/UserList/UserList";
import updateUsers from "../MainContent/User/AddNewUser/UpdateUser";
import ProjectDetails from "../MainContent/Projects/ProjectDetails";
import TaskDetails from "../MainContent/Tasks/TaskDetail/TaskDetails";

class mainbuilder extends Component {
  render() {
    return (
      <Switch>
        // Sarosh Routes
        <Route exact path="/add-user" component={AddUser} />
        <Route exact path="/add-expense" component={ExpenseList} />
        <Route exact path="/task-details" component={TaskDetails} />
        <Route exact path="/subtask-details" component={TaskDetails} />
        // uzair routes
        <Route exact path="/addclient" component={AddClients} />
        <Route exact path="/viewclient" component={ViewClients} />
        <Route exact path="/viewproject" component={ViewProjects} />
        <Route exact path="/addproject" component={AddProjects} />
        <Route exact path="/clientform" component={ClientsForm} />
        <Route exact path="/projectreport" component={ProjectReports} />
        <Route exact path="/addcurrency" component={AddCurrency} />
        <Route exact path="/addstatus" component={AddStatus} />
        <Route exact path="/viewstatus" component={StatusList} />
        <Route exact path="/viewcurrency" component={CurrencyList} />
        <Route exact path="/subtask" component={SubTask} />
        <Route exact path="/subtask-details" component={SubTaskDetails} />
        <Route exact path="/update-profile" component={UpdateUser} />
        <Route exact path="/viewuser" component={ViewUsers} />
        <Route exact path="/updateuser" component={updateUsers} />
        <Route exact path="/projectdetails" component={ProjectDetails} />
        <Route exact path="/userdetails" component={UserDetails} />
        //nehal routes
        <Route exact path="/add-time" component={AddTime} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/platform" component={PlatformList} />
        <Route exact path="/add-platform" component={AddPlatform} />
        <Route exact path="/service" component={ServiceList} />
        <Route exact path="/add-service" component={AddService} />
        <Route exact path="/country" component={CountryList} />
        <Route exact path="/add-country" component={AddCountry} />
        <Route exact path="/technology" component={TechnologyList} />
        <Route exact path="/add-technology" component={AddTechnology} />
        <Route exact path="/nature" component={NatureList} />
        <Route exact path="/add-nature" component={AddNature} />
        <Route exact path="/add-task" component={NewTask} />
        {/* <Route exact path="/task/:id" component={TaskList} /> */}
        <Route exact path="/task" component={TaskList} />
        //===================================================================
        <Route path="/calendar" component={Calendar} />
        <Route path="/ecommerce_customers" component={Ecommerce_customers} />
        <Route
          path="/ecommerce_order_history"
          component={Ecommerce_order_history}
        />
        <Route
          path="/ecommerce_product_edit"
          component={Ecommerce_product_edit}
        />
        <Route
          path="/ecommerce_product_grid"
          component={Ecommerce_product_grid}
        />
        <Route
          path="/ecommerce_product_list"
          component={Ecommerce_product_list}
        />
        <Route path="/email_compose" component={Email_compose} />
        <Route path="/email_inbox" component={Email_inbox} />
        <Route path="/email_read" component={Email_read} />
        <Route
          path="/email_templates_alert"
          component={Email_templates_alert}
        />
        <Route
          path="/email_templates_basic"
          component={Email_templates_basic}
        />
        <Route
          path="/email_templates_billing"
          component={Email_templates_billing}
        />
        <Route path="/form_advanced" component={Form_advanced} />
        <Route path="/form_editors" component={Form_editors} />
        <Route path="/form_elements" component={Form_elements} />
        <Route path="/form_mask" component={Form_mask} />
        <Route path="/form_summernote" component={Form_summernote} />
        <Route path="/form_uploads" component={Form_uploads} />
        <Route path="/form_validation" component={Form_validation} />
        <Route path="/form_wizard" component={Form_wizard} />
        <Route path="/form_xeditable" component={Form_xeditable} />
        <Route path="/icons_dripicons" component={Icons_dripicons} />
        <Route path="/icons_fontawesome" component={Icons_fontawesome} />
        <Route path="/icons_ion" component={Icons_ion} />
        <Route path="/icons_material" component={Icons_material} />
        <Route path="/icons_mobirise" component={Icons_mobirise} />
        <Route path="/icons_themify" component={Icons_themify} />
        <Route path="/icons_typicons" component={Icons_typicons} />
        <Route path="/icons_weather" component={Icons_weather} />
        <Route path="/maps_google" component={Maps_google} />
        <Route path="/maps_vector" component={Maps_vector} />
        <Route path="/pages_400" component={Pages_400} />
        <Route path="/pages_timeline" component={Pages_timeline} />
        <Route path="/pages_500" component={Pages_500} />
        <Route path="/pages_blank" component={Pages_blank} />
        <Route path="/pages_coming_soon" component={Pages_coming_soon} />
        <Route path="/pages_contact" component={Pages_contact} />
        <Route path="/pages_directory" component={Pages_directory} />
        <Route path="/pages_faq" component={Pages_faq} />
        <Route path="/pages_gallery" component={Pages_gallery} />
        <Route path="/pages_invoice" component={Pages_invoice} />
        <Route path="/pages_lock_screen" component={Pages_lock_screen} />
        <Route path="/pages_lock_screen_2" component={Pages_lock_screen_2} />
        <Route path="/pages_login" component={Pages_login} />
        <Route path="/pages_login_2" component={Pages_login_2} />
        <Route path="/pages_maintenance" component={Pages_maintenance} />
        <Route path="/pages_pricing" component={Pages_pricing} />
        <Route path="/pages_recoverpw" component={Pages_recoverpw} />
        <Route path="/pages_recoverpw_2" component={Pages_recoverpw_2} />
        <Route path="/pages_register" component={Pages_register} />
        <Route path="/pages_register_2" component={Pages_register_2} />
        <Route path="/tables_basic" component={Tables_basic} />
        <Route path="/tables_datatable" component={Tables_datatable} />
        <Route path="/tables_editable" component={Tables_editable} />
        <Route path="/tables_responsive" component={Tables_responsive} />
        <Route path="/alertify" component={Ui_alertify} />
        <Route path="/alerts" component={Ui_alerts} />
        <Route path="/animation" component={Ui_animation} />
        <Route path="/badge" component={Ui_badge} />
        <Route path="/buttons" component={Ui_buttons} />
        <Route path="/cards" component={Ui_cards} />
        <Route path="/carousel" component={Ui_carousel} />
        <Route path="/colors" component={Ui_colors} />
        <Route path="/dropdowns" component={Ui_dropdowns} />
        <Route path="/grid" component={Ui_grid} />
        <Route path="/highlight" component={Ui_highlight} />
        <Route path="/images" component={Ui_images} />
        <Route path="/lightbox" component={Ui_lightbox} />
        <Route path="/modals" component={Ui_modals} />
        <Route path="/navs" component={Ui_navs} />
        <Route path="/nestable" component={Ui_nestable} />
        <Route path="/pagination" component={Ui_pagination} />
        <Route path="/popover_tooltips" component={Ui_popover_tooltips} />
        <Route path="/progressbars" component={Ui_progressbars} />
        <Route path="/rangeslider" component={Ui_rangeslider} />
        <Route path="/rating" component={Ui_rating} />
        <Route path="/sessiontimeout" component={Ui_sessiontimeout} />
        <Route path="/sweet_alert" component={Ui_sweet_alert} />
        <Route path="/tabs_accordions" component={Ui_tabs_accordions} />
        <Route path="/typography" component={Ui_typography} />
        <Route path="/video" component={Ui_video} />
        <Route path="/widgets" component={Widgets} />
        <Route path="/charts_easy" component={Charts_easy} />
        <Route path="/chartjs" component={Chartjs} />
        <Route path="/apexchart" component={ApexChart} />
        <Route path="/sparkline" component={SparkLine} />
        <Route path="/dashboard2" component={Dashboard2} />
        <Route path="/" component={Dashboard1} />
      </Switch>
    );
  }
}

export default mainbuilder;

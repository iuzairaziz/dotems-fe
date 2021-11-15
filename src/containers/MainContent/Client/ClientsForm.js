import React, { Component, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Formik } from "formik";
import clientValidation from "../../../validations/client-validations";
import Select from "react-select";
import { Dropdown, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ClientService from "../../../services/ClientService";
import PlatformService from "../../../services/PlatformService";
import AddPlatform from "../Platform/PlatformForm/PlatformForm";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ClientLabelService from "../../../services/ClientLabelService";
import AddClientLabel from "../ClientLabel/ClientLabelForm/ClientLabelForm";
import "./ClientForm.scss";

const ClientsForm = (props) => {
  const [default_date, set_default_date] = useState(0);
  const [dataa, setData] = useState();
  const [country, setCountry] = useState("");
  const [platform, setPlatform] = useState([]);
  const [clientLabel, setClientLabel] = useState([]);
  const [platformModal, setPlatformModal] = useState(false);
  const [labelModal, setLabelModal] = useState(false);
  const [hideField, setHideField] = useState(true);
  const [platformPreset, setPlatformPreset] = useState();
  const [labelPreset, setLabelPreset] = useState();
  const history = useHistory();
  const togglePlatformEdit = () => setPlatformModal(!platformModal);
  const toggleLabelEdit = () => setLabelModal(!labelModal);

  const handleDefault = (date) => {
    console.log(date);
    set_default_date(date);
  };

  const getPlatform = () => {
    PlatformService.getAllPlatform().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setPlatform(options);
      const preset = res.data.find((platform) => platform.preset === true);
      // console.log("...", preset);
      setPlatformPreset({ label: preset.name, value: preset._id });
    });
  };

  const getClientList = () => {
    ClientLabelService.getAllClientLabel().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({ label: item.name, value: item._id });
      });
      setClientLabel(options);
      const presetLabel = res.data.find(
        (clientLabel) => clientLabel.preset === true
      );
      console.log("...", presetLabel);
      setLabelPreset({ label: presetLabel.name, value: presetLabel._id });
    });
  };

  useEffect(() => {
    getPlatform();
    getClientList();
  }, [platformModal, labelModal]);

  const client = props.client;
  const editable = props.editable;
  // console.log("from client form ", client);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        title: editable && client.name,
        compName: editable && client.companyName,
        email: editable && client.email,
        adrs: editable && client.address,
        conNum: editable && client.mobileNo,
        otherContact: editable && client.otherContact,
        ul: editable && client.url,
        dateOfJoin: editable && client.dateOfJoin,
        country: editable && client.country,
        socialContact: editable && client.socialContact,
        platform: editable
          ? client.platform && {
              label: client.platform.name,
              value: client.platform._id,
            }
          : platformPreset,
        clientLabel: editable
          ? client.clientLabel && {
              label: client.clientLabel.name,
              value: client.clientLabel._id,
            }
          : labelPreset,
        clientType:
          editable && client.clientType
            ? {
                label: client.clientType,
                value: client.clientType,
              }
            : { label: "First Time", value: "First Time" },
        status: editable
          ? client.status && { label: client.status, value: client.status }
          : { label: "Individual", value: "Individual" },
      }}
      // validationSchema={clientValidation.authSchemaValidation}
      onSubmit={(values, actions) => {
        console.log("countries", values.country);
        editable
          ? ClientService.updateClient(client._id, {
              name: values.title,
              companyName: values.compName,
              email: values.email,
              address: values.adrs,
              mobileNo: values.conNum,
              socialContact: values.socialContact,
              otherContact: values.otherContact,
              dateOfJoin: values.dateOfJoin,
              url: values.ul,
              country: country,
              platform: values.platform.value,
              clientLabel: values.clientLabel.value,
              status: values.status.value,
              clientType: values.clientType.value,
            })
              .then((res) => {
                ClientService.handleMessage("update");
                props.toggle();
              })
              .catch((err) => {
                ClientService.handleCustomMessage(err.response.data);
                props.toggle();
              })
          : ClientService.addClient({
              name: values.title,
              companyName: values.compName,
              email: values.email,
              address: values.adrs,
              socialContact: values.socialContact,
              mobileNo: values.conNum,
              dateOfJoin: values.dateOfJoin,
              url: values.ul,
              country: country,
              platform: values.platform.value,
              otherContact: values.otherContact,
              status: values.status.value,
              clientType: values.clientType.value,
              clientLabel: values.clientLabel.value,
            })
              .then((res) => {
                props.toggle && props.toggle();
                ClientService.handleMessage("add");
                if (props.redirect) {
                  history.push("/viewclient");
                }
              })
              .catch((err) => {
                ClientService.handleCustomMessage(err.response.data);
              });
        console.log("country", values.country);
      }}
    >
      {(props) => (
        <>
          <div className="col-lg-12 client-form">
            {/* <div className="card m-b-20"> */}
            {/* <div className="card-body"> */}
            <ul className="nav nav-pills" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#home2"
                  role="tab"
                >
                  <span className="d-none d-md-block">
                    {" "}
                    <i class="mdi mdi-information pr-1" />
                    Quick Info
                  </span>
                  <span className="d-block d-md-none">
                    <i className="mdi mdi-home-variant h5" />
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#profile2"
                  role="tab"
                >
                  <span className="d-none d-md-block">
                    <i class="mdi mdi-information-outline pr-1" />
                    Other Info
                  </span>
                  <span className="d-block d-md-none">
                    <i className="mdi mdi-account h5" />
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#settings"
                  role="tab"
                >
                  <span className="d-none d-md-block">
                    <i class="mdi mdi-settings pr-1" />
                    Settings
                  </span>
                  <span className="d-block d-md-none">
                    <i className="mdi mdi-settings h5" />
                  </span>
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane active p-3" id="home2" role="tabpanel">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Client Name</label>
                      <input
                        name="title"
                        onBlur={props.handleBlur}
                        type="text"
                        className={`form-control ${
                          props.touched.title && props.errors.title
                            ? "is-invalid"
                            : props.touched.title && "is-valid"
                        }`}
                        value={props.values.title}
                        onChange={props.handleChange("title")}
                        placeholder="Enter Name"
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.title && props.errors.title}
                      </span>
                    </div>
                  </div>

                  <div className="col-6">
                    {" "}
                    <div className="form-group">
                      <label>Date of Joining</label>
                      <div>
                        <DatePicker
                          name="dateOfJoin"
                          onBlur={props.handleBlur}
                          className={`form-control ${
                            props.touched.dateOfJoin && props.errors.dateOfJoin
                              ? "is-invalid"
                              : props.touched.dateOfJoin && "is-valid"
                          }`}
                          selected={props.values.dateOfJoin}
                          placeholder="Select Date"
                          onChange={(date) => {
                            props.setFieldValue("dateOfJoin", date);
                            console.log("datepicker", date);
                          }}
                        />
                      </div>
                    </div>{" "}
                  </div>

                  <div className="col-6">
                    <div className="form-group">
                      <div className="row">
                        <div className="col-6">
                          <label className="control-label">Country</label>
                        </div>
                      </div>
                      <select
                        id="country"
                        name="country"
                        class="form-control"
                        defaultValue={props.values.country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Åland Islands">Åland Islands</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Antigua and Barbuda">
                          Antigua and Barbuda
                        </option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bosnia and Herzegovina">
                          Bosnia and Herzegovina
                        </option>
                        <option value="Botswana">Botswana</option>
                        <option value="Bouvet Island">Bouvet Island</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Territory">
                          British Indian Ocean Territory
                        </option>
                        <option value="Brunei Darussalam">
                          Brunei Darussalam
                        </option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">
                          Central African Republic
                        </option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">
                          Christmas Island
                        </option>
                        <option value="Cocos (Keeling) Islands">
                          Cocos (Keeling) Islands
                        </option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Congo, The Democratic Republic of The">
                          Congo, The Democratic Republic of The
                        </option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cote D'ivoire">Cote D'ivoire</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">
                          Dominican Republic
                        </option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">
                          Equatorial Guinea
                        </option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands (Malvinas)">
                          Falkland Islands (Malvinas)
                        </option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">
                          French Polynesia
                        </option>
                        <option value="French Southern Territories">
                          French Southern Territories
                        </option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guernsey">Guernsey</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea-bissau">Guinea-bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Heard Island and Mcdonald Islands">
                          Heard Island and Mcdonald Islands
                        </option>
                        <option value="Holy See (Vatican City State)">
                          Holy See (Vatican City State)
                        </option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran, Islamic Republic of">
                          Iran, Islamic Republic of
                        </option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Isle of Man">Isle of Man</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jersey">Jersey</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Korea, Democratic People's Republic of">
                          Korea, Democratic People's Republic of
                        </option>
                        <option value="Korea, Republic of">
                          Korea, Republic of
                        </option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Lao People's Democratic Republic">
                          Lao People's Democratic Republic
                        </option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libyan Arab Jamahiriya">
                          Libyan Arab Jamahiriya
                        </option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macao">Macao</option>
                        <option value="Macedonia, The Former Yugoslav Republic of">
                          Macedonia, The Former Yugoslav Republic of
                        </option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">
                          Marshall Islands
                        </option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia, Federated States of">
                          Micronesia, Federated States of
                        </option>
                        <option value="Moldova, Republic of">
                          Moldova, Republic of
                        </option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Netherlands Antilles">
                          Netherlands Antilles
                        </option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Northern Mariana Islands">
                          Northern Mariana Islands
                        </option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Palestinian Territory, Occupied">
                          Palestinian Territory, Occupied
                        </option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">
                          Papua New Guinea
                        </option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Pitcairn">Pitcairn</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russian Federation">
                          Russian Federation
                        </option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Helena">Saint Helena</option>
                        <option value="Saint Kitts and Nevis">
                          Saint Kitts and Nevis
                        </option>
                        <option value="Saint Lucia">Saint Lucia</option>
                        <option value="Saint Pierre and Miquelon">
                          Saint Pierre and Miquelon
                        </option>
                        <option value="Saint Vincent and The Grenadines">
                          Saint Vincent and The Grenadines
                        </option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome and Principe">
                          Sao Tome and Principe
                        </option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="South Georgia and The South Sandwich Islands">
                          South Georgia and The South Sandwich Islands
                        </option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Svalbard and Jan Mayen">
                          Svalbard and Jan Mayen
                        </option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syrian Arab Republic">
                          Syrian Arab Republic
                        </option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania, United Republic of">
                          Tanzania, United Republic of
                        </option>
                        <option value="Thailand">Thailand</option>
                        <option value="Timor-leste">Timor-leste</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad and Tobago">
                          Trinidad and Tobago
                        </option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks and Caicos Islands">
                          Turks and Caicos Islands
                        </option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">
                          United Arab Emirates
                        </option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="United States Minor Outlying Islands">
                          United States Minor Outlying Islands
                        </option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Viet Nam">Viet Nam</option>
                        <option value="Virgin Islands, British">
                          Virgin Islands, British
                        </option>
                        <option value="Virgin Islands, U.S.">
                          Virgin Islands, U.S.
                        </option>
                        <option value="Wallis and Futuna">
                          Wallis and Futuna
                        </option>
                        <option value="Western Sahara">Western Sahara</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>
                      <span id="err" className="invalid-feedback">
                        {props.touched.country && props.errors.country}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <div className="row">
                        <div className="col">
                          <label className="control-label">Platform</label>
                        </div>
                        <div className="col-6">
                          <div
                            className="d-flex justify-content-end"
                            id="add-new-Buttonm "
                            onClick={() => {
                              togglePlatformEdit();
                            }}
                          >
                            <i className="mdi mdi-plus icon-add" />
                          </div>
                        </div>
                      </div>
                      <Select
                        className={`my-select ${
                          props.touched.platform && props.errors.platform
                            ? "is-invalid"
                            : props.touched.platform && "is-valid"
                        }`}
                        name="platform"
                        onFocus={() => props.setFieldTouched("platform")}
                        value={props.values.platform}
                        onChange={(val) => props.setFieldValue("platform", val)}
                        options={platform}
                      />

                      <span id="err" className="invalid-feedback">
                        {props.touched.platform && props.errors.platform}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane p-3" id="profile2" role="tabpanel">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        name="email"
                        onBlur={props.handleBlur}
                        type="text"
                        className={`form-control ${
                          props.touched.email && props.errors.email
                            ? "is-invalid"
                            : props.touched.email && "is-valid"
                        }`}
                        value={props.values.email}
                        onChange={props.handleChange("email")}
                        placeholder="Enter Email"
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.email && props.errors.email}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input
                        name="conNum"
                        onBlur={props.handleBlur}
                        type="text"
                        className={`form-control ${
                          props.touched.conNum && props.errors.conNum
                            ? "is-invalid"
                            : props.touched.conNum && "is-valid"
                        }`}
                        value={props.values.conNum}
                        onChange={props.handleChange("conNum")}
                        placeholder="Enter Number"
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.conNum && props.errors.conNum}
                      </span>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-group">
                      <label>Other Contact</label>
                      <input
                        name="otherContact"
                        onBlur={props.handleBlur}
                        type="text"
                        className={`form-control ${
                          props.touched.otherContact &&
                          props.errors.otherContact
                            ? "is-invalid"
                            : props.touched.otherContact && "is-valid"
                        }`}
                        value={props.values.otherContact}
                        onChange={props.handleChange("otherContact")}
                        placeholder="Enter Number"
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.otherContact &&
                          props.errors.otherContact}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Social Contact</label>
                      <input
                        name="socialContact"
                        onBlur={props.handleBlur}
                        type="text"
                        className={`form-control ${
                          props.touched.socialContact &&
                          props.errors.socialContact
                            ? "is-invalid"
                            : props.touched.socialContact && "is-valid"
                        }`}
                        value={props.values.socialContact}
                        onChange={props.handleChange("socialContact")}
                        placeholder="Enter Number"
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.socialContact &&
                          props.errors.socialContact}
                      </span>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-group">
                      <label>URL</label>
                      <input
                        name="ul"
                        onBlur={props.handleBlur}
                        type="text"
                        defaultValue="http://"
                        className={`form-control ${
                          props.touched.ul && props.errors.ul
                            ? "is-invalid"
                            : props.touched.ul && "is-valid"
                        }`}
                        value={props.values.ul}
                        onChange={props.handleChange("ul")}
                        placeholder="Enter URL"
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.ul && props.errors.ul}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        name="adrs"
                        onBlur={props.handleBlur}
                        type="text"
                        className={`form-control ${
                          props.touched.adrs && props.errors.adrs
                            ? "is-invalid"
                            : props.touched.adrs && "is-valid"
                        }`}
                        value={props.values.adrs}
                        onChange={props.handleChange("adrs")}
                        placeholder="Enter Address"
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.adrs && props.errors.adrs}
                      </span>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-group">
                      <label className="control-label">Client Type</label>
                      <Select
                        name="clientType"
                        onBlur={props.handleBlur}
                        value={props.values.clientType}
                        className={`my-select${
                          props.touched.clientType && props.errors.clientType
                            ? "is-invalid"
                            : props.touched.clientType && "is-valid"
                        }`}
                        onChange={(selected) => {
                          props.setFieldValue("clientType", selected);
                        }}
                        options={[
                          { value: "First Time", label: "First Time" },
                          { value: "Returning", label: "Returning" },
                        ]}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.clientType && props.errors.clientType}
                      </span>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-group">
                      <div className="row">
                        <div className="col">
                          <label className="control-label">Client Label</label>
                        </div>
                        <div className="col-6">
                          <div
                            className="d-flex justify-content-end"
                            id="add-new-Buttonm "
                            onClick={() => {
                              toggleLabelEdit();
                            }}
                          >
                            <i className="mdi mdi-plus icon-add" />
                          </div>
                        </div>
                      </div>
                      <Select
                        className={`my-select ${
                          props.touched.clientLabel && props.errors.clientLabel
                            ? "is-invalid"
                            : props.touched.clientLabel && "is-valid"
                        }`}
                        name="clientLabel"
                        onFocus={() => props.setFieldTouched("clientLabel")}
                        value={props.values.clientLabel}
                        onChange={(val) =>
                          props.setFieldValue("clientLabel", val)
                        }
                        options={clientLabel}
                      />

                      <span id="err" className="invalid-feedback">
                        {props.touched.clientLabel && props.errors.clientLabel}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label className="control-label">Client Status</label>
                      <Select
                        name="status"
                        onBlur={props.handleBlur}
                        value={props.values.status}
                        className={`my-select${
                          props.touched.status && props.errors.status
                            ? "is-invalid"
                            : props.touched.status && "is-valid"
                        }`}
                        onChange={(selected) => {
                          props.setFieldValue("status", selected);
                          if (selected.value == "Individual") {
                            setHideField(true);
                          } else {
                            setHideField(false);
                          }
                        }}
                        options={[
                          { value: "Individual", label: "Individual" },
                          { value: "Company", label: "Company" },
                        ]}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.status && props.errors.status}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${
                      hideField === true
                        ? `hide-form-field`
                        : `display-form-field col-6 `
                    }`}
                  >
                    <div className="col-12">
                      <div className="form-group">
                        <label>Company Name</label>
                        <input
                          name="compName"
                          onBlur={props.handleBlur}
                          type="text"
                          className={`form-control ${
                            props.touched.compName && props.errors.compName
                              ? "is-invalid"
                              : props.touched.compName && "is-valid"
                          }`}
                          value={props.values.compName}
                          onChange={props.handleChange("compName")}
                          placeholder="Enter Name"
                        />
                        <span id="err" className="invalid-feedback">
                          {props.touched.compName && props.errors.compName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane p-3" id="settings" role="tabpanel">
                <div className="row cardd">
                  <i class="mdi mdi-account-multiple iconSize" />
                  <i class="mdi mdi-settings iconSize" />
                </div>
                <div className="row border-b">
                  <h2>Client Settings</h2>
                </div>
                <div className="row cardd">
                  <Link to="/add-platform">Platform</Link>
                </div>
                <div className="row cardd">
                  <Link to="/add-platform">Client Label</Link>
                </div>
              </div>
            </div>
            {/* </div>
            </div> */}
          </div>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={platformModal}
            toggle={togglePlatformEdit}
          >
            <ModalHeader toggle={togglePlatformEdit}>Add Platform</ModalHeader>
            <ModalBody>
              <AddPlatform toggle={togglePlatformEdit} />
            </ModalBody>
          </Modal>
          <Modal
            style={{ maxWidth: "70%" }}
            isOpen={labelModal}
            toggle={toggleLabelEdit}
          >
            <ModalHeader toggle={toggleLabelEdit}>Add Client Label</ModalHeader>
            <ModalBody>
              <AddClientLabel toggle={toggleLabelEdit} />
            </ModalBody>
          </Modal>
          <div className="row">
            {/* <div className="col">
              <div className="form-group">
                <label>Client Name</label>
                <input
                  name="title"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.title && props.errors.title
                      ? "is-invalid"
                      : props.touched.title && "is-valid"
                  }`}
                  value={props.values.title}
                  onChange={props.handleChange("title")}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.title && props.errors.title}
                </span>
              </div>
            </div> */}
            {/* <div className="col">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  name="compName"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.compName && props.errors.compName
                      ? "is-invalid"
                      : props.touched.compName && "is-valid"
                  }`}
                  value={props.values.compName}
                  onChange={props.handleChange("compName")}
                  placeholder="Enter Name"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.compName && props.errors.compName}
                </span>
              </div>
            </div> */}
          </div>
          <div className="row">
            {/* <div className="col">
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.email && props.errors.email
                      ? "is-invalid"
                      : props.touched.email && "is-valid"
                  }`}
                  value={props.values.email}
                  onChange={props.handleChange("email")}
                  placeholder="Enter Email"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.email && props.errors.email}
                </span>
              </div>
            </div> */}
            {/* <div className="col">
              <div className="form-group">
                <label>Address</label>
                <input
                  name="adrs"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.adrs && props.errors.adrs
                      ? "is-invalid"
                      : props.touched.adrs && "is-valid"
                  }`}
                  value={props.values.adrs}
                  onChange={props.handleChange("adrs")}
                  placeholder="Enter Address"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.adrs && props.errors.adrs}
                </span>
              </div>
            </div> */}
          </div>
          <div className="row">
            {/* <div className="col">
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  name="conNum"
                  onBlur={props.handleBlur}
                  type="text"
                  className={`form-control ${
                    props.touched.conNum && props.errors.conNum
                      ? "is-invalid"
                      : props.touched.conNum && "is-valid"
                  }`}
                  value={props.values.conNum}
                  onChange={props.handleChange("conNum")}
                  placeholder="Enter Number"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.conNum && props.errors.conNum}
                </span>
              </div>
            </div> */}
            {/* <div className="col">
              {" "}
              <div className="form-group">
                <label>Date of Joining</label>
                <div>
                  <DatePicker
                    name="dateOfJoin"
                    onBlur={props.handleBlur}
                    className={`form-control ${
                      props.touched.dateOfJoin && props.errors.dateOfJoin
                        ? "is-invalid"
                        : props.touched.dateOfJoin && "is-valid"
                    }`}
                    selected={props.values.dateOfJoin}
                    placeholder="Select Date"
                    onChange={(date) => {
                      props.setFieldValue("dateOfJoin", date);
                      console.log("datepicker", date);
                    }}
                  />
                </div>
              </div>{" "}
            </div> */}
          </div>
          <div className="row">
            {/* <div className="col">
              <div className="form-group">
                <label>URL</label>
                <input
                  name="ul"
                  onBlur={props.handleBlur}
                  type="text"
                  defaultValue="http://"
                  className={`form-control ${
                    props.touched.ul && props.errors.ul
                      ? "is-invalid"
                      : props.touched.ul && "is-valid"
                  }`}
                  value={props.values.ul}
                  onChange={props.handleChange("ul")}
                  placeholder="Enter URL"
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.ul && props.errors.ul}
                </span>
              </div>
            </div> */}
            {/* <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label className="control-label">Country</label>
                  </div>
                </div>
                <select
                  id="country"
                  name="country"
                  class="form-control"
                  defaultValue={props.values.country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Åland Islands">Åland Islands</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="American Samoa">American Samoa</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguilla</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Antigua and Barbuda">
                    Antigua and Barbuda
                  </option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bermuda">Bermuda</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia and Herzegovina">
                    Bosnia and Herzegovina
                  </option>
                  <option value="Botswana">Botswana</option>
                  <option value="Bouvet Island">Bouvet Island</option>
                  <option value="Brazil">Brazil</option>
                  <option value="British Indian Ocean Territory">
                    British Indian Ocean Territory
                  </option>
                  <option value="Brunei Darussalam">Brunei Darussalam</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="Cayman Islands">Cayman Islands</option>
                  <option value="Central African Republic">
                    Central African Republic
                  </option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Christmas Island">Christmas Island</option>
                  <option value="Cocos (Keeling) Islands">
                    Cocos (Keeling) Islands
                  </option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo">Congo</option>
                  <option value="Congo, The Democratic Republic of The">
                    Congo, The Democratic Republic of The
                  </option>
                  <option value="Cook Islands">Cook Islands</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cote D'ivoire">Cote D'ivoire</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Falkland Islands (Malvinas)">
                    Falkland Islands (Malvinas)
                  </option>
                  <option value="Faroe Islands">Faroe Islands</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="French Guiana">French Guiana</option>
                  <option value="French Polynesia">French Polynesia</option>
                  <option value="French Southern Territories">
                    French Southern Territories
                  </option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Greece">Greece</option>
                  <option value="Greenland">Greenland</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guadeloupe">Guadeloupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guernsey">Guernsey</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-bissau">Guinea-bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Heard Island and Mcdonald Islands">
                    Heard Island and Mcdonald Islands
                  </option>
                  <option value="Holy See (Vatican City State)">
                    Holy See (Vatican City State)
                  </option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran, Islamic Republic of">
                    Iran, Islamic Republic of
                  </option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Isle of Man">Isle of Man</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jersey">Jersey</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Korea, Democratic People's Republic of">
                    Korea, Democratic People's Republic of
                  </option>
                  <option value="Korea, Republic of">Korea, Republic of</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Lao People's Democratic Republic">
                    Lao People's Democratic Republic
                  </option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libyan Arab Jamahiriya">
                    Libyan Arab Jamahiriya
                  </option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macao">Macao</option>
                  <option value="Macedonia, The Former Yugoslav Republic of">
                    Macedonia, The Former Yugoslav Republic of
                  </option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Martinique">Martinique</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Micronesia, Federated States of">
                    Micronesia, Federated States of
                  </option>
                  <option value="Moldova, Republic of">
                    Moldova, Republic of
                  </option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Netherlands Antilles">
                    Netherlands Antilles
                  </option>
                  <option value="New Caledonia">New Caledonia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norfolk Island">Norfolk Island</option>
                  <option value="Northern Mariana Islands">
                    Northern Mariana Islands
                  </option>
                  <option value="Norway">Norway</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Palestinian Territory, Occupied">
                    Palestinian Territory, Occupied
                  </option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Pitcairn">Pitcairn</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Reunion">Reunion</option>
                  <option value="Romania">Romania</option>
                  <option value="Russian Federation">Russian Federation</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Helena">Saint Helena</option>
                  <option value="Saint Kitts and Nevis">
                    Saint Kitts and Nevis
                  </option>
                  <option value="Saint Lucia">Saint Lucia</option>
                  <option value="Saint Pierre and Miquelon">
                    Saint Pierre and Miquelon
                  </option>
                  <option value="Saint Vincent and The Grenadines">
                    Saint Vincent and The Grenadines
                  </option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome and Principe">
                    Sao Tome and Principe
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Georgia and The South Sandwich Islands">
                    South Georgia and The South Sandwich Islands
                  </option>
                  <option value="Spain">Spain</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Svalbard and Jan Mayen">
                    Svalbard and Jan Mayen
                  </option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syrian Arab Republic">
                    Syrian Arab Republic
                  </option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Tanzania, United Republic of">
                    Tanzania, United Republic of
                  </option>
                  <option value="Thailand">Thailand</option>
                  <option value="Timor-leste">Timor-leste</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad and Tobago">
                    Trinidad and Tobago
                  </option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Turks and Caicos Islands">
                    Turks and Caicos Islands
                  </option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="United States Minor Outlying Islands">
                    United States Minor Outlying Islands
                  </option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Viet Nam">Viet Nam</option>
                  <option value="Virgin Islands, British">
                    Virgin Islands, British
                  </option>
                  <option value="Virgin Islands, U.S.">
                    Virgin Islands, U.S.
                  </option>
                  <option value="Wallis and Futuna">Wallis and Futuna</option>
                  <option value="Western Sahara">Western Sahara</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
                <span id="err" className="invalid-feedback">
                  {props.touched.country && props.errors.country}
                </span>
              </div>
            </div> */}
          </div>

          <div className="row">
            <div className="col">
              <Button
                color="success"
                className="mt-3 my-primary-button"
                onClick={props.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
          {/* <Modal
            style={{ maxWidth: "70%" }}
            isOpen={countryModal}
            toggle={toggleCountryEdit}
          >
            <ModalHeader toggle={toggleCountryEdit}>New Country</ModalHeader>
            <ModalBody>
              <AddDesignationForm toggle={toggleCountryEdit} />
            </ModalBody>
          </Modal> */}
        </>
      )}
    </Formik>
  );
};
export default ClientsForm;

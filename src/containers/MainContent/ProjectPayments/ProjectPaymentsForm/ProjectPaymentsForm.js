import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import Select from "react-select";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useHistory } from "react-router-dom";
import ProjectService from "../../../../services/ProjectService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import paymentValidation from "../../../../validations/payment-validations";
import PaymentService from "../../../../services/PaymentService";
import { MDBDataTableV5 } from "mdbreact";
import moment from "moment";

const ProjectPaymentForm = (props) => {
  const [project, setProject] = useState([]);
  const [projectCost, setProjectCost] = useState();
  const [paymentID, setPaymentID] = useState();
  // const [requestTypeModal, setRequestTypeModal] = useState(false);
  // const [description, setDescription] = useState(EditorState.createEmpty());

  const history = useHistory();
  const editable = props.editable;
  const payment = props.payment;
  const projectId = props.projectpaymentid;

  const [paymentTabledata, setPaymentTableData] = useState({
    columns: [
      {
        label: "Payment Description",
        field: "paymentDescription",
        sort: "disabled",
        width: 125,
      },
      {
        label: "Amount Recieved",
        field: "amountRecieved",
        sort: "disabled",
      },

      {
        label: "Exchange Rate",
        field: "exchangeRate",
        sort: "disabled",
        // width: 100,
      },
      {
        label: "Amount Recieve Date",
        field: "arDate",
        sort: "disabled",
      },
    ],
    rows: [],
  });

  useEffect(() => {
    getProjects();
    // projectPaymentID();
    if (projectCost && projectCost.paymentDetials) {
      getPaymentTableData();
    }
  }, [projectCost]);

  // const projectPaymentID = () => {
  //   projectCost &&
  //     projectCost.paymentDetials &&
  //     projectCost.paymentDetials.map((item, index) => {
  //       setPaymentID(item._id);
  //       // console.log("paymentID", item._id);
  //     });
  // };

  // console.log("PaymentIDD", paymentID);

  const getProjects = () => {
    ProjectService.getAllProject().then((res) => {
      let options = [];
      res.data.map((item, index) => {
        options.push({
          label: item.name,
          value: item._id,
          cost: item.cost,
          paymentDetials: item.paymentDetials,
        });
      });
      setProject(options);
      // console.log("xxx", project);
    });
  };

  const getPaymentTableData = (id) => {
    // PaymentService.getSinglePayment(id)
    //   .then((res) => {
    //     setProject(res.data.project);
    let updatedData = { ...paymentTabledata };
    updatedData.rows = [];
    // res.data.
    if (projectCost && projectCost.paymentDetials.length > 0) {
      projectCost &&
        projectCost.paymentDetials &&
        projectCost.paymentDetials[0].paymentDetials &&
        projectCost.paymentDetials[0].paymentDetials.map((item, index) => {
          updatedData.rows.push({
            exchangeRate: item.exchangeRate ? item.exchangeRate : "none",
            arDate: item.PaymentRecievedDate
              ? moment(item.PaymentRecievedDate).format("LL")
              : "none",
            amountRecieved: item.recievedAmount ? item.recievedAmount : "none",
            paymentDescription: item.PaymentDescription
              ? item.PaymentDescription
              : "none",
          });
        });
    }

    // console.log("payment", res.data);
    // console.log("paymentss", paymentTabledata);
    setPaymentTableData(updatedData);
    // })
    // .catch((err) => console.log(err));
  };

  return (
    <Formik
      initialValues={{
        recievedAmount: editable && payment.recievedAmount,
        exchangeRate: editable && payment.exchangeRate,
        PaymentDescription: editable && payment.PaymentDescription,
        project: editable
          ? project && {
              label: project.project.name,
              value: project.project._id,
            }
          : projectId,
        PaymentRecievedDate: editable && project.PaymentRecievedDate,
      }}
      validationSchema={paymentValidation.newPaymentValidation}
      onSubmit={(values, actions) => {
        console.log(actions);
        console.log("Valuesssssssssss", values);
        let array = [];
        props.editable
          ? PaymentService.updatePayment({
              recievedAmount: values.recievedAmount,
              exchangeRate: values.exchangeRate,
              PaymentDescription: values.PaymentDescription,
              PaymentRecievedDate: values.PaymentRecievedDate,
              project: values.project.value,
            })
              .then((res) => {
                props.toggle();
                PaymentService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                PaymentService.handleCustomMessage(err.response.data);
              })
          : PaymentService.addPayment({
              paymentDetials: {
                recievedAmount: values.recievedAmount,
                exchangeRate: values.exchangeRate,
                PaymentDescription: values.PaymentDescription,
                PaymentRecievedDate: values.PaymentRecievedDate,
              },
              project: values.project.value,
            })
              .then((res) => {
                PaymentService.handleMessage("add");
                history.push("/view-project-payments");
              })
              .catch((err) => {
                PaymentService.handleCustomMessage(err.response.data);
              });
      }}
    >
      {(props) => {
        return (
          <>
            <div className="row">
              <div className="col">
                <label className="control-label">Project</label>
                <Select
                  className={`my-select${
                    props.touched.project && props.errors.project
                      ? "is-invalid"
                      : props.touched.project && "is-valid"
                  }`}
                  name="project"
                  onBlur={props.handleBlur}
                  className="select-override zIndex"
                  value={props.values.project}
                  onChange={(val) => {
                    props.setFieldValue("project", val);
                    setProjectCost(val);

                    // console.log("value", val);
                  }}
                  options={project}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.project && props.errors.project}
                </span>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Payment Description</label>
                  <input
                    name="PaymentDescription"
                    onBlur={props.handleBlur}
                    type="text"
                    className={`form-control ${
                      props.touched.PaymentDescription &&
                      props.errors.PaymentDescription
                        ? "is-invalid"
                        : props.touched.PaymentDescription && "is-valid"
                    }`}
                    value={props.values.PaymentDescription}
                    onChange={props.handleChange("PaymentDescription")}
                    placeholder="Enter Description"
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.PaymentDescription &&
                      props.errors.PaymentDescription}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              {/* <div className="row"> */}
              <div className="col">
                <div className="form-group">
                  <label>Amount Recieve Date</label>
                  <div>
                    <DatePicker
                      name="PaymentRecievedDate"
                      onBlur={props.handleBlur}
                      className={`form-control ${
                        props.touched.PaymentRecievedDate &&
                        props.errors.PaymentRecievedDate
                          ? "is-invalid"
                          : props.touched.PaymentRecievedDate && "is-valid"
                      }`}
                      selected={props.values.PaymentRecievedDate}
                      onChange={(date) => {
                        props.setFieldValue("PaymentRecievedDate", date);
                        console.log("datepicker", date);
                      }}
                    />
                    <span id="err" className="invalid-feedback">
                      {props.touched.PaymentRecievedDate &&
                        props.errors.PaymentRecievedDate}
                    </span>
                  </div>
                </div>
              </div>
              {/* </div> */}
              <div className="col">
                <div className="form-group">
                  <label>Amount Recieved</label>
                  <input
                    name="recievedAmount"
                    onBlur={props.handleBlur}
                    type="text"
                    className={`form-control ${
                      props.touched.recievedAmount &&
                      props.errors.recievedAmount
                        ? "is-invalid"
                        : props.touched.recievedAmount && "is-valid"
                    }`}
                    value={props.values.recievedAmount}
                    onChange={props.handleChange("recievedAmount")}
                    placeholder="Enter Amount"
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.recievedAmount &&
                      props.errors.recievedAmount}
                  </span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Exchange Rate</label>
                  <input
                    name="exchangeRate"
                    onBlur={props.handleBlur}
                    type="text"
                    className={`form-control ${
                      props.touched.exchangeRate && props.errors.exchangeRate
                        ? "is-invalid"
                        : props.touched.exchangeRate && "is-valid"
                    }`}
                    value={props.values.exchangeRate}
                    onChange={props.handleChange("exchangeRate")}
                    placeholder="Enter Exchange Rate"
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.exchangeRate && props.errors.exchangeRate}
                  </span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Project Cost</label>
                  <input
                    name="exchangeRate"
                    // onBlur={props.handleBlur}
                    type="text"
                    disabled={true}
                    className={`form-control`}
                    value={projectCost && projectCost.cost}
                    // onChange={props.handleChange("exchangeRate")}
                    // placeholder="Enter Exchange Rate"
                  />
                </div>
              </div>
            </div>
            <div className="primary-button">
              <Button
                className="mt-3 my-primary-button"
                onClick={props.handleSubmit}
              >
                Submit
              </Button>
            </div>

            <MDBDataTableV5
              responsive
              striped
              small
              // onPageChange={(val) => console.log(val)}
              bordered={true}
              //  materialSearch
              searchTop
              searchBottom={false}
              pagingTop
              barReverse
              hover
              data={paymentTabledata}
              theadColor="#000"
            />
          </>
        );
      }}
    </Formik>
  );
};

export default ProjectPaymentForm;

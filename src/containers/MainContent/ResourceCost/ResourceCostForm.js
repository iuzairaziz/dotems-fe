import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import shortValidations from "../../../validations/short-validations";
import { useHistory, useParams } from "react-router-dom";
import WorkingDayService from "../../../services/WorkingDayService";
import ResourceCostService from "../../../services/ResourceCostService";

const ResourceCostForm = (props) => {
  const history = useHistory();
  const { id } = useParams();
  console.log("Working day id", id);
  const [data, setData] = useState(null);
  const [time, setTime] = useState("");
  console.log(time);
  console.log(typeof time);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, []);
  const getData = () => {
    ResourceCostService.getResourceCostById(id)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  console.log("Working Hour", data);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: props.editable
          ? props.resourceCost.name
          : data
          ? data.name
          : null,
        cost: props.editable
          ? props.resourceCost.cost
          : data
          ? data.cost
          : null,
      }}
      validationSchema={shortValidations.resourceCostValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? ResourceCostService.updateResourceCost(props.resourceCost._id, {
              name: values.title,
              cost: values.cost,
            })
              .then((res) => {
                props.toggle();
                ResourceCostService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                ResourceCostService.handleCustomMessage(err.response.data);
              })
          : ResourceCostService.addResourceCost({
              name: values.title,
              cost: values.cost,
            })
              .then((res) => {
                props.toggle && props.toggle();
                ResourceCostService.handleMessage("add");
                if (props.redirect) {
                  history.push("/view-resource-cost");
                  actions.setFieldValue("title", "");
                }
              })
              .catch((err) => {
                ResourceCostService.handleCustomMessage(err.response.data);
              });
      }}
    >
      {(props) => {
        return (
          <>
            {("props", console.log(props))}
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        name="title"
                        type="text"
                        className={`form-control ${
                          props.touched.title && props.errors.title
                            ? "is-invalid"
                            : props.touched.title && "is-valid"
                        }`}
                        disabled={id}
                        value={props.values.title}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="Enter Name"
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.title && props.errors.title}
                      </span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label>Cost</label>
                      <input
                        name="cost"
                        type="number"
                        className={`form-control ${
                          props.touched.cost && props.errors.cost
                            ? "is-invalid"
                            : props.touched.cost && "is-valid"
                        }`}
                        disabled={id}
                        value={props.values.cost}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="Enter Cost"
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.cost && props.errors.cost}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!id && (
              <div className="row">
                <div className="col">
                  <Button
                    className="mt-3 my-primary-button"
                    onClick={props.handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default ResourceCostForm;

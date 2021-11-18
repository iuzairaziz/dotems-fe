import React from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import shortValidations from "../../../../../../validations/short-validations";
import NatureService from "../../../../../../services/NatureService";
import { useHistory } from "react-router-dom";
import WorkingDayService from "../../../../../../services/WorkingDayService";

const WorkingDayForm = (props) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        title: props.editable && props.workingDay.name,
        monday: props.editable ? props.workingDay.monday : true,
        tuesday: props.editable ? props.workingDay.tuesday : true,
        wednesday: props.editable ? props.workingDay.wednesday : true,
        thursday: props.editable ? props.workingDay.thursday : true,
        friday: props.editable ? props.workingDay.friday : true,
        saturday: props.editable ? props.workingDay.saturday : false,
        sunday: props.editable ? props.workingDay.sunday : false,
      }}
      validationSchema={shortValidations.workingDayValidation}
      onSubmit={(values, actions) => {
        props.editable
          ? WorkingDayService.updateWorkingDay(props.workingDay._id, {
              name: values.title,
              monday: values.monday,
              tuesday: values.tuesday,
              wednesday: values.wednesday,
              thursday: values.thursday,
              friday: values.friday,
              saturday: values.saturday,
              sunday: values.sunday,
            })
              .then((res) => {
                props.toggle();
                WorkingDayService.handleMessage("update");
              })
              .catch((err) => {
                props.toggle();
                WorkingDayService.handleCustomMessage(err.response.data);
              })
          : WorkingDayService.addWorkingDay({
              name: values.title,
              monday: values.monday,
              tuesday: values.tuesday,
              wednesday: values.wednesday,
              thursday: values.thursday,
              friday: values.friday,
              saturday: values.saturday,
              sunday: values.sunday,
            })
              .then((res) => {
                props.toggle && props.toggle();
                WorkingDayService.handleMessage("add");
                if (props.redirect) {
                  history.push("/nature");
                  actions.setFieldValue("title", "");
                }
              })
              .catch((err) => {
                WorkingDayService.handleCustomMessage(err.response.data);
              });
      }}
    >
      {(props) => {
        return (
          <>
            <div className="row">
              <div className="col-md-4">
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
                <div class="form-check">
                  <div className="row">
                    <div className="col">
                      <label class="form-check-label" for="flexCheckDefault">
                        Monday
                      </label>
                    </div>
                    <div className="col">
                      <input
                        className={`form-check-input ${
                          props.touched.title && props.errors.title
                            ? "is-invalid"
                            : props.touched.title && "is-valid"
                        }`}
                        checked={props.values.monday}
                        onChange={props.handleChange("monday")}
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-check">
                  <div className="row">
                    <div className="col">
                      <label class="form-check-label" for="flexCheckDefault">
                        Tuesday
                      </label>
                    </div>
                    <div className="col">
                      <input
                        className={`form-check-input ${
                          props.touched.title && props.errors.title
                            ? "is-invalid"
                            : props.touched.title && "is-valid"
                        }`}
                        checked={props.values.tuesday}
                        onChange={props.handleChange("tuesday")}
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-check">
                  <div className="row">
                    <div className="col">
                      <label class="form-check-label" for="flexCheckDefault">
                        Wednesday
                      </label>
                    </div>
                    <div className="col">
                      <input
                        className={`form-check-input ${
                          props.touched.title && props.errors.title
                            ? "is-invalid"
                            : props.touched.title && "is-valid"
                        }`}
                        checked={props.values.wednesday}
                        onChange={props.handleChange("wednesday")}
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-check">
                  <div className="row">
                    <div className="col">
                      <label class="form-check-label" for="flexCheckDefault">
                        Thursday
                      </label>
                    </div>
                    <div className="col">
                      <input
                        className={`form-check-input ${
                          props.touched.title && props.errors.title
                            ? "is-invalid"
                            : props.touched.title && "is-valid"
                        }`}
                        checked={props.values.thursday}
                        onChange={props.handleChange("thursday")}
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-check">
                  <div className="row">
                    <div className="col">
                      <label class="form-check-label" for="flexCheckDefault">
                        Friday
                      </label>
                    </div>
                    <div className="col">
                      <input
                        className={`form-check-input ${
                          props.touched.title && props.errors.title
                            ? "is-invalid"
                            : props.touched.title && "is-valid"
                        }`}
                        checked={props.values.friday}
                        onChange={props.handleChange("friday")}
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-check">
                  <div className="row">
                    <div className="col">
                      <label class="form-check-label" for="flexCheckDefault">
                        Saturday
                      </label>
                    </div>
                    <div className="col">
                      <input
                        className={`form-check-input ${
                          props.touched.title && props.errors.title
                            ? "is-invalid"
                            : props.touched.title && "is-valid"
                        }`}
                        checked={props.values.saturday}
                        onChange={props.handleChange("saturday")}
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-check">
                  <div className="row">
                    <div className="col">
                      <label class="form-check-label" for="flexCheckDefault">
                        Sunday
                      </label>
                    </div>
                    <div className="col">
                      <input
                        name="sunday"
                        className={`form-check-input ${
                          props.touched.title && props.errors.title
                            ? "is-invalid"
                            : props.touched.title && "is-valid"
                        }`}
                        checked={props.values.sunday}
                        onChange={props.handleChange("sunday")}
                        onBlur={props.handleBlur}
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
          </>
        );
      }}
    </Formik>
  );
};

export default WorkingDayForm;

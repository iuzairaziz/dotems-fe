import React from "react";
import "./Dynamic.scss";
import DatePicker from "react-datepicker";

const OutSourceCreate = (props) => {
  return props.phasesDetails.map((val, idx) => {
    let phasename = `phasename-${idx}`,
      outSourceCost = `outSourceName-${idx}`,
      outSourceName = `outSourceName-${idx}`,
      outSourceDeadline = `outSourceDeadline-${idx}`;

    return (
      <div className="form-row" key={val.index}>
        <div className={`${props.editable ? "col-6" : "col-6"}`}>
          <label>Out-Source Name</label>
          <input
            // disabled={props.phaseArray === true ? true : false}
            type="text"
            className="form-control required"
            placeholder="Out Source Name"
            name="outSourceName"
            data-id={idx}
            id={outSourceName}
            defaultValue={val.outSourceName}
          />
        </div>
        <div className={`${props.editable ? "col-6" : "col-6"}`}>
          <label>Phase Name</label>
          <input
            // disabled={props.phaseArray === true ? true : false}
            type="text"
            className="form-control required"
            placeholder="Name"
            name="phasename"
            data-id={idx}
            id={phasename}
            defaultValue={val.phasename}
          />
        </div>
        <div className={`${props.editable > 1 ? "col-5" : "col-5"}`}>
          <label>Cost</label>
          <input
            // disabled={props.phaseArray === true ? true : false}
            type="number"
            className="form-control required"
            placeholder="Enter Cost"
            name="outSourceCost"
            id={outSourceCost}
            data-id={idx}
            defaultValue={val.outSourceCost}
          />
        </div>
        <div className={`${props.editable ? "col-5" : "col-5"}`}>
          <label>Deadline</label>
          <DatePicker
            name="outSourceDeadline"
            className="form-control required"
            placeholder="Name"
            name="outSourceDeadline"
            data-id={idx}
            id={outSourceDeadline}
            defaultValue={val.outSourceDeadline}
            //   onFocus={() =>
            //     props.setFieldTouched("pmStartDate")
            //   }
            //   className={`form-control ${
            //     props.touched.pmStartDate &&
            //     props.errors.pmStartDate
            //       ? "is-invalid"
            //       : props.touched.pmStartDate && "is-valid"
            //   }`}
            // selected={values.outSourceDeadline}
            //   onChange={(date1) => {
            //     props.setFieldValue("pmStartDate", date1);
            //   }}
          />
        </div>

        <div className="d-flex justify-content-end col-1 p-6">
          {idx === 0 ? (
            props.phaseArray ? (
              ""
            ) : (
              <button
                onClick={() => props.add()}
                type="button"
                className="btn-sm btn-primary text-center buttonn"
              >
                <i className="fa fa-plus-circle" aria-hidden="true" />
              </button>
            )
          ) : props.phaseArray ? (
            ""
          ) : (
            <button
              className="btn-sm btn-danger buttonn"
              onClick={() => {
                props.delete(val);
              }}
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    );
  });
};
export default OutSourceCreate;
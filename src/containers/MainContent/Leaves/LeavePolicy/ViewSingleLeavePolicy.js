import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import LeaveType from "../../../../services/LeaveService";
import Select from "react-select";
import { Button } from "reactstrap";
import LeavePolicyServices from "../../../../services/LeavePolicyServices";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const ViewSingleLeavePolicy = () => {
  const { name } = useParams();

  console.log(name);
  const [title, setTitle] = useState(name);
  const [data, setData] = useState([]);
  const [dataa, setDataa] = useState({
    columns: [
      {
        label: "Type",
        field: "type",
        sort: "asc",
      },
      {
        label: "Effective Date",
        field: "effectiveDate",
        sort: "asc",
      },
      {
        label: "Total Leave",
        field: "TotalLeave",
        sort: "asc",
      },
      {
        label: "Max Per Mo Leave",
        field: "maxPerMonthLeave",
        sort: "asc",
      },
      {
        label: "DisAlowNegbal",
        field: "DisAllowNeqBal",
        sort: "asc",
      },
      {
        label: "sandwich",
        field: "sandwich",
        sort: "asc",
      },
      {
        label: "notice period",
        field: "noticePeriod",
        sort: "asc",
      },
      {
        label: "sandwich",
        field: "sandwich2",
        sort: "asc",
      },
    ],
    rows: [],
  });
  useEffect(() => {
    getSingleData();
  }, []);
  const [formData, setFormData] = useState([]);
  const getSingleData = () => {
    console.log(name);
    LeavePolicyServices.getLeavePolicyById(name)
      .then((res) => {
        let updatedData = { ...dataa };
        updatedData.rows = [];

        res.data.map((item, index) => {
          updatedData.rows.push({
            type: item.type.name ? item.type.name : "N/A",
            effectiveDate: (
              <div className="form-group">
                <input
                  disabled
                  name={`effectiveDate`}
                  className={"form-control"}
                  value={item.effectiveDate ? item.effectiveDate : "N/A"}
                  // onChange={(e) =>
                  //   handleChange(e.target.value, `effectiveDate`, item)
                  // }
                  type="date"
                  placeholder="Enter Name"
                />
              </div>
            ),
            TotalLeave: (
              <div className="form-group">
                <input
                  disabled
                  name="totalLeaves"
                  type="number"
                  className={"form-control"}
                  value={item.totalLeaves ? item.totalLeaves : "N/A"}
                  // onChange={(e) =>
                  //   handleChange(e.target.value, `totalLeaves`, item)
                  // }
                  placeholder="Enter Total Leaves"
                />
              </div>
            ),
            maxPerMonthLeave: (
              <div className="form-group">
                <input
                  disabled
                  name="maxPerMonthLeave"
                  type="number"
                  className={"form-control"}
                  value={item.maxPerMonthLeave ? item.maxPerMonthLeave : "N/A"}
                  // onChange={(e) =>
                  //   handleChange(e.target.value, `maxPerMonthLeave`, item)
                  // }
                  placeholder="Enter Max Per Month Leave"
                />
              </div>
            ),
            DisAllowNeqBal: (
              <div className="form-group">
                <input
                  disabled
                  name="DisAllowNeqBal"
                  checked={item.disAllowNegativeBalance}
                  className={"form-control"}
                  // onChange={(e) =>
                  //   handleChange(e.target.checked, `DisAllowNeqBal`, item)
                  // }
                  type="checkbox"
                  placeholder="Enter Name"
                />
              </div>
            ),
            noticePeriod: (
              <div className="form-group">
                <input
                  disabled
                  name="noticePeriod"
                  value={item.noticePeriod ? item.noticePeriod : "N/A"}
                  // className={"form-control"}
                  // onChange={(e) =>
                  //   handleChange(e.target.value, `noticePeriod`, item)
                  // }
                  type="number"
                  placeholder="Enter Name"
                />
              </div>
            ),
            sandwich: (
              <div className="form-group">
                <input
                  disabled
                  checked={item.sandwich}
                  name="sandwich"
                  className={"form-control"}
                  // onChange={(e) =>
                  //   handleChange(e.target.checked, `sandwich`, item)
                  // }
                  type="checkbox"
                  placeholder="Enter Name"
                />
              </div>
            ),
            sandwich2: (
              <input
                disabled
                name="sandwichType"
                className="form-control"
                value={item.sandwichType ? item.sandwichType : "N/A"}
                // onBlur={props.handleBlur}
                //   onChange={(e) => handleChange(e.value, `sandwichType`, item)}
                // options={[
                //   {
                //     value: "before",
                //     label: "Before",
                //   },
                //   {
                //     value: "after",
                //     label: "After",
                //   },
                //   {
                //     value: "between",
                //     label: "Between",
                //   },
                // ]}
              />
            ),
          });
        });
        setData(res.data);
        setDataa(updatedData);
        console.log("data", res.data);
      })
      .catch((err) => console.log(err));
  };
  //   const handleChange = (e, name, item) => {
  //     console.log("form data", formData);
  //     var val = e;

  //     let preVlaue = formData.findIndex((i) => {
  //       if (i.type) {
  //         return i.type === item._id;
  //       } else return false;
  //     });
  //     if (preVlaue > -1) {
  //       let local = [...formData];
  //       local[preVlaue][name] = val;
  //       setFormData((oldValue) => local);
  //     } else {
  //       let local = [];
  //       local.push({ type: item._id, [name]: val });
  //       setFormData((oldValue) => [...oldValue, ...local]);
  //     }

  // let local = { ...dataa };
  // console.log("locAL", dataa);
  // local.rows[index].type = "gujkhgy";
  // // setDataa(dataa);
  // console.log("data", dataa);
  //   };
  //   const [leaveType, setLeaveType] = useState([]);
  //   useEffect(() => {
  //     renderTable();
  //   }, [leaveType]);

  //   const renderTable = () => {
  //     if (leaveType) {
  //     }
  //   };

  //   console.log(formData);
  //   const getData = () => {
  //     LeaveType.getAllLeaveType()
  //       .then((res) => {
  //         console.log(res);
  //         setLeaveType(res.data);
  //         // console.log("clients", updatedData);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  const handleSubmit = () => {
    if (title === "") {
      toast("The title is");
    } else {
      const newData = formData
        .filter((i) => i.checked === true)
        .map((item, index) => {
          return {
            name: title,
            type: item.type,
            effectiveDate: item.effectiveDate,
            totalLeaves: item.totalLeaves,
            maxPerMonthLeave: item.maxPerMonthLeave,
            disAllowNegativeBalance: item.DisAllowNeqBal,
            sandwich: item.sandwich,
            noticePeriod: item.noticePeriod,
            sandwichType: item.sandwichType,
          };
        });

      LeavePolicyServices.addLeavePolicy(newData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      console.log(newData);
    }
  };

  return (
    <>
      <div className="row  align-items-center">
        <div className="col-md-4">
          <div className="form-group">
            <label>Title</label>
            {data.length > 0 && (
              <input
                name="title"
                // onBlur={props.handleBlur}
                type="text"
                className={"form-control"}
                disabled
                value={data[0].leavePolicy.name}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
              />
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {data && (
            <MDBDataTableV5
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={dataa}
            />
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default ViewSingleLeavePolicy;

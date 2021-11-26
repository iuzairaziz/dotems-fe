import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import Select from "react-select";
import { Button } from "reactstrap";
import LeavePolicyServices from "../../../../services/LeavePolicyServices";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const EditLeavePolicy = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [leavePolicies, setLeavePolicies] = useState([]);
  const [dataa, setDataa] = useState({
    columns: [
      {
        label: "Enable",
        field: "checked",

        sort: "asc",
      },
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
        field: "disAllowNegativeBalance",
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
    getData();
  }, []);
  const [formData, setFormData] = useState([]);

  const handleChange = (e, name, item) => {
    console.log("form data", formData);
    var val = e;

    let preVlaue = formData.findIndex((i) => {
      if (i.type) {
        return i.type === item._id;
      } else return false;
    });
    if (preVlaue > -1) {
      let local = [...formData];
      local[preVlaue][name] = val;
      setFormData((oldValue) => local);
    } else {
      let local = [];
      local.push({ type: item._id, [name]: val });
      setFormData((oldValue) => [...oldValue, ...local]);
    }
  };
  // const [leaveType, setLeaveType] = useState([]);
  useEffect(() => {
    renderTable();
  }, [leavePolicies, formData]);

  const renderTable = () => {
    if (leavePolicies) {
      let updatedData = { ...dataa };
      updatedData.rows = [];
      leavePolicies.map((item, index) => {
        console.log(
          formData.find((p) => p.type === item._id) &&
            formData.find((p) => p.type === item._id).checked
        );
        updatedData.rows.push({
          checked: (
            <div className="form-group">
              <input
                name="checked"
                className={"form-control"}
                checked={
                  formData.find((p) => p.type === item._id) &&
                  formData.find((p) => p.type === item._id).checked
                }
                // value={
                //   // formData.find((p) => p.type === item._id) &&
                //   // formData.find((p) => p.type === item._id).checked
                //   true
                // }
                onChange={(e) =>
                  handleChange(e.target.checked, `checked`, item)
                }
                type="checkbox"
                placeholder="Enter Name"
              />
            </div>
          ),
          type: item.name ? item.name : "N/A",
          effectiveDate: (
            <div className="form-group">
              <input
                id={"effectiveDate" + index}
                name={`effectiveDate` + index}
                className={"form-control"}
                value={
                  formData.find((p) => p.type === item._id) &&
                  formData.find((p) => p.type === item._id).effectiveDate
                }
                onChange={(e) =>
                  handleChange(e.target.value, `effectiveDate`, item)
                }
                type="date"
                placeholder="Enter Name"
              />
            </div>
          ),
          TotalLeave: (
            <div className="form-group">
              <input
                name="totalLeaves"
                type="number"
                className={"form-control"}
                value={
                  formData.find((p) => p.type === item._id) &&
                  formData.find((p) => p.type === item._id).totalLeaves
                }
                onChange={(e) =>
                  handleChange(e.target.value, `totalLeaves`, item)
                }
                placeholder="Enter Total Leaves"
              />
            </div>
          ),
          maxPerMonthLeave: (
            <div className="form-group">
              <input
                name="maxPerMonthLeave"
                type="number"
                className={"form-control"}
                value={
                  formData.find((p) => p.type === item._id) &&
                  formData.find((p) => p.type === item._id).maxPerMonthLeave
                }
                onChange={(e) =>
                  handleChange(e.target.value, `maxPerMonthLeave`, item)
                }
                placeholder="Enter Max Per Month Leave"
              />
            </div>
          ),
          disAllowNegativeBalance: (
            <div className="form-group">
              <input
                name="disAllowNegativeBalance"
                className={"form-control"}
                // checked={
                //   formData.find((p) => p.type === item._id) &&
                //   formData.find((p) => p.type === item._id)
                //     .disAllowNegativeBalance
                // }
                value={
                  formData.find((p) => p.type === item._id) &&
                  formData.find((p) => p.type === item._id)
                    .disAllowNegativeBalance
                }
                onChange={(e) =>
                  handleChange(
                    e.target.checked,
                    `disAllowNegativeBalance`,
                    item
                  )
                }
                type="checkbox"
                placeholder="Enter Name"
              />
            </div>
          ),
          noticePeriod: (
            <div className="form-group">
              <input
                name="noticePeriod"
                value={
                  formData.find((p) => p.type === item._id)
                    ? formData.find((p) => p.type === item._id).noticePeriod
                    : item.policy.length > 0
                    ? item.policy[0].noticePeriod
                    : ""
                }
                className={"form-control"}
                onChange={(e) =>
                  handleChange(e.target.value, `noticePeriod`, item)
                }
                type="number"
                placeholder="Enter Name"
              />
            </div>
          ),
          sandwich: (
            <div className="form-group">
              <input
                name="sanwich"
                className={"form-control"}
                // checked={
                //   formData.find((p) => p.type === item._id) &&
                //   formData.find((p) => p.type === item._id).sandwich
                // }
                value={
                  formData.find((p) => p.type === item._id) &&
                  formData.find((p) => p.type === item._id).sandwich
                }
                onChange={(e) =>
                  handleChange(e.target.checked, `sandwich`, item)
                }
                type="checkbox"
                placeholder="Enter Name"
              />
            </div>
          ),

          sandwich2: (
            <Select
              name="sandwichType"
              className="my-select"
              // onBlur={props.handleBlur}
              value={
                formData.find((p) => p.type === item._id) &&
                formData.find((p) => p.type === item._id).sandwichType && {
                  value: formData.find((p) => p.type === item._id).sandwichType,
                  label: formData.find((p) => p.type === item._id).sandwichType,
                }

                // item.policy.length > 0
                //   ? item.policy[0].sandwichType
                //   : formData.find((p) => p.type === item._id).sandwichType &&
                //     formData.find((p) => p.type === item._id).sandwichType.label
              }
              onChange={(e) => handleChange(e.value, `sandwichType`, item)}
              options={[
                {
                  value: "before",
                  label: "Before",
                },
                {
                  value: "after",
                  label: "After",
                },
                {
                  value: "between",
                  label: "Between",
                },
              ]}
            />
          ),
        });
      });
      setDataa(updatedData);
    }
  };

  console.log(formData);

  const getData = () => {
    LeavePolicyServices.getLeavePolicies(id)
      .then((res) => {
        console.log("policy", res.data);
        // res.data.filter((item) => item.policy.length > 0);
        res.data.filter(
          (item) =>
            item.policy.length > 0 &&
            formData.push({
              checked: true,
              leavePolicy: id,
              type: item.policy[0].type,
              effectiveDate: item.policy[0].effectiveDate,
              totalLeaves: parseInt(item.policy[0].totalLeaves),
              maxPerMonthLeave: parseInt(item.policy[0].maxPerMonthLeave),
              disAllowNegativeBalance: item.policy[0].disAllowNegativeBalance,
              sandwich: item.policy[0].sandwich,
              noticePeriod: parseInt(item.policy[0].noticePeriod),
              sandwichType: item.policy[0].sandwichType,
            })
        );
        setLeavePolicies(res.data);
      })
      .catch((err) => console.log(err));
    LeavePolicyServices.getLeavePolicyNameById(id)
      .then((res) => setTitle(res.data.name))
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    if (title === "") {
      toast("The title is Empty");
    } else {
      LeavePolicyServices.updateLeavePolicyName(id, { name: title })
        .then((res) => {
          LeavePolicyServices.handleMessage("update");
          var checkedData = formData
            .filter((item, index) => item.checked === true)
            .map((item, index) => {
              return {
                leavePolicy: id,
                type: item.type,
                effectiveDate: item.effectiveDate,
                totalLeaves: parseInt(item.totalLeaves),
                maxPerMonthLeave: parseInt(item.maxPerMonthLeave),
                disAllowNegativeBalance: item.disAllowNegativeBalance,
                sandwich: item.sandwich,
                noticePeriod: parseInt(item.noticePeriod),
                sandwichType: item.sandwichType,
              };
            });

          console.log(checkedData);
          LeavePolicyServices.deleteLeavePolicyDetails(id)
            .then(
              (res) => LeavePolicyServices.handleMessage("delete"),
              LeavePolicyServices.updateLeavePolicyDetail(checkedData)
                .then((res) => LeavePolicyServices.handleMessage("add"))
                .catch((err) => LeavePolicyServices.handleError())
            )
            .catch((err) => LeavePolicyServices.handleError());
        })
        .catch((err) => LeavePolicyServices.handleError());
    }
  };

  return (
    <>
      <div className="row justify-content-md-center align-items-center">
        <div className="col-md-4">
          <div className="form-group">
            <label>Title</label>
            <input
              name="title"
              // onBlur={props.handleBlur}
              type="text"
              className={"form-control"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
            />
          </div>
        </div>
        <div className="col" />
        <div className="col-md-2">
          <Button className="mt-3 my-primary-button" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {leavePolicies && (
            <MDBDataTableV5
              hover
              entriesOptions={[10, 20, 25]}
              entries={10}
              pagesAmount={4}
              data={dataa}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default EditLeavePolicy;

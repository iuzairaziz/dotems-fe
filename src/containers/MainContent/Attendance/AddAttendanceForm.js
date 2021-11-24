import React, { useEffect, useState } from "react";
import AttendanceService from "../../../services/AttendanceService";
import moment from "moment";
import UserService from "../../../services/UserService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";

const AttendanceForm = (props) => {
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [switch2, setSwitch2] = useState(false);
  const [switch1, setSwitch1] = useState(false);
  const [data, setData] = useState({
    columns: [
      {
        label: "Time In",
        field: "timeIn",
      },
      {
        label: "Time Out",
        field: "timeOut",
      },
      {
        label: "Total Time",
        field: "totalTime",
      },
    ],
    rows: [],
  });

  const [TotalHours, setTotalHours] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(position.coords.latitude);
      console.log(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    setDate(moment().format("D-M-YYYY"));
    setTime(moment().format("H:mm"));
    console.log(time, date);
  }, []);
  let loggedInUser = UserService.userLoggedInInfo();
  useEffect(() => {
    getData(loggedInUser._id);
  }, [handleTimeIn, handleTimeOut]);

  const handleTimeIn = () => {
    setSwitch2(!switch2);
    setSwitch1(false);
    AttendanceService.addTimeInAttendance({
      name: loggedInUser._id,
      timeIn: time,
      date: date,
      latitude: latitude,
      longitude: longitude,
    })
      .then((res) => {
        props.toggle && props.toggle();
        AttendanceService.handleMessage("add");
      })
      .catch((err) => {
        AttendanceService.handleCustomMessage(err.response.data);
      });
  };
  const handleTimeOut = () => {
    setSwitch1(!switch1);
    setSwitch2(false);
    AttendanceService.addTimeOutAttendance({
      name: user._id,
      timeOut: time,
    })
      .then((res) => {
        props.toggle && props.toggle();
        AttendanceService.handleMessage("add");
        console.log(res);
        let timeIn = moment(res.data.timeIn, "H:mm");
        let timeOut = moment(res.data.timeOut, "H:mm");
        setTotalHours(timeOut.diff(timeIn, "hours"));
        // var duration = moment.duration(timeOut.diff(timeIn));
        // var hours = parseInt(duration.asHours());
        // console.log("Hours", hours);
      })
      .catch((err) => {
        AttendanceService.handleCustomMessage(err.response.data);
      });
  };

  function diff(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0) hours = hours + 24;

    return (
      (hours <= 9 ? "0" : "") +
      hours +
      ":" +
      (minutes <= 9 ? "0" : "") +
      minutes
    );
  }

  const getData = (id) => {
    AttendanceService.getAttendanceById(id)
      .then((res) => {
        console.log(res);
        let updatedData = { ...data };
        updatedData.rows = [];
        res.data.map((item, index) => {
          let totalTime = diff(item.timeIn, item.timeOut);
          updatedData.rows.push({
            timeIn: item.timeIn ? item.timeIn : "N/A",
            timeOut: item.timeOut ? item.timeOut : "N/A",
            totalTime: totalTime ? totalTime : "N/A",
          });
        });
        console.log("clients", updatedData);

        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="row">
        <div className="col=md-4">
          <div className="form-group">
            <h6>Time In</h6>
          </div>
        </div>
        <div className="col-md-4">
          {" "}
          <input
            type="checkbox"
            id="switch5"
            switch="primary"
            disabled={switch2}
            checked={switch2 ? "checked" : ""}
            onChange={handleTimeIn}
          />
          <label htmlFor="switch5" data-on-label="Yes" data-off-label="No" />{" "}
        </div>
      </div>

      <div className="row">
        <div className="col=md-4">
          <div className="form-group">
            <h6>Time Out</h6>
          </div>
        </div>
        <input
          type="checkbox"
          id="switch6"
          switch="primary"
          disabled={switch1}
          checked={switch1 ? "checked" : ""}
          onChange={handleTimeOut}
        />
        <label htmlFor="switch6" data-on-label="Yes" data-off-label="No" />
      </div>
      <div className="row">
        <div className="col">
          {/* <div className="form-group">
            <label>Name</label>
            <input
              name="title"
              type="text"
              className="form-control"
              value={loggedInUser._id}
              placeholder="Enter Name"
            />
          </div> */}
        </div>
        <div className="col">
          <div className="form-group">
            <label>Time</label>
            <input
              name="timeIn"
              type="time"
              className="form-control"
              value={time}
              // onChange={props.handleChange}
              // onBlur={props.handleBlur}
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label>Total Hours</label>
            <input
              name="timeIn"
              type="text"
              className="form-control"
              value={TotalHours}
              placeholder="Total Hours"
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <MDBDataTableV5
            responsive
            striped
            small
            onPageChange={(val) => console.log(val)}
            bordered={true}
            //  materialSearch
            searchTop
            searchBottom={false}
            pagingTop
            barReverse
            hover
            // scrollX
            data={data}
            theadColor="#000"
          />
        </div>
      </div>
    </>
  );
};

export default AttendanceForm;

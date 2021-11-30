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
  const [totalTime, setTotalTime] = useState("");
  const [attendances, setAttendances] = useState([]);
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
      {
        label: "Date",
        field: "date",
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
  }, []);

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
        getData(loggedInUser._id);
        AttendanceService.handleMessage("add");
      })
      .catch((err) => {
        AttendanceService.handleCustomMessage(err.response.data);
      });
    getData();
  };
  const handleTimeOut = () => {
    setSwitch1(!switch1);
    setSwitch2(false);
    AttendanceService.addTimeOutAttendance({
      name: loggedInUser._id,
      timeOut: time,
    })
      .then((res) => {
        props.toggle && props.toggle();
        AttendanceService.handleMessage("add");
        console.log(res);
        let timeIn = moment(res.data.timeIn, "H:mm");
        let timeOut = moment(res.data.timeOut, "H:mm");
        setTotalHours(timeOut.diff(timeIn, "hours"));
        getData(loggedInUser._id);
        // var duration = moment.duration(timeOut.diff(timeIn));
        // var hours = parseInt(duration.asHours());
        // console.log("Hours", hours);
      })
      .catch((err) => {
        AttendanceService.handleCustomMessage(err.response.data);
      });
    getData();
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

  const getTotalHours = (att) => {
    let todayAttendance = att.filter(
      (item) => item.date === moment().format("D-M-YYYY") && item.timeOut
    );
    console.log("todayAttendance", todayAttendance);

    function hoursStringToDecimal(hoursString) {
      const [hoursPart, minutesPart] = hoursString.split(":");
      return Number(hoursPart) + Number(minutesPart) / 60;
    }

    function decimalHoursToString(hoursDecimal) {
      const numHours = Math.floor(hoursDecimal);
      const numMinutes = Math.round((hoursDecimal - numHours) * 60);
      return `${numHours < 10 ? "0" : ""}${numHours}:${
        numMinutes < 10 ? "0" : ""
      }${numMinutes}`;
    }
    let sumHoras = 0;
    todayAttendance.forEach((element) => {
      let endTime = element.timeOut ? element.timeOut : "N:N";
      let totalTime = diff(element.timeIn, endTime);
      sumHoras += hoursStringToDecimal(totalTime);
    });
    let total = decimalHoursToString(sumHoras);
    setTotalTime(total);
    console.log("Sum ALL TIme", total);
  };

  const getData = (id) => {
    AttendanceService.getAttendanceById(id)
      .then((res) => {
        console.log(res);
        setAttendances(res.data);
        getTotalHours(res.data);
        let updatedData = { ...data };
        updatedData.rows = [];
        res.data.reverse().map((item, index) => {
          let endTime = item.timeOut ? item.timeOut : "N:A";
          let totalTime = diff(item.timeIn, endTime);
          totalTime === "NaN:NaN" && setSwitch2(true);
          updatedData.rows.push({
            timeIn: item.timeIn ? (
              <h6>{moment(item.timeIn, ["HH:mm"]).format("h:m:A")}</h6>
            ) : (
              "N/A"
            ),
            timeOut: item.timeOut ? (
              <h6> {moment(item.timeOut, ["HH:mm"]).format("h:m:A")}</h6>
            ) : (
              ""
            ),
            totalTime: totalTime === "NaN:NaN" ? "" : <h6>{totalTime}</h6>,
            date: item.date ? <h6> {item.date} </h6> : "N/A",
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
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="form-group">
            <label>Today Total Hours</label>
            <input
              name="title"
              // onBlur={props.handleBlur}
              type="text"
              className={"form-control"}
              defaultValue={totalTime}
              // onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
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
            // onPageChange={(val) => console.log(val)}
            bordered={true}
            //  materialSearch
            // searchTop
            entriesOptions={[10, 20, 25]}
            entries={10}
            pagesAmount={4}
            // searchBottom={false}
            // pagingTop
            // barReverse
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

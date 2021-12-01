import React, { useEffect, useState } from "react";
import AttendanceService from "../../../services/AttendanceService";
import moment from "moment";

const PresentEmployes = () => {
  const [data, setData] = useState([]);

  const handleFunction = () => {
    console.log(data);
    const present = [];
    const absent = [];
    const leave = [];
    for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].present.length; k++) {
        if (data[i].present.length > 0) {
          present.push(data[i]);
        }
      }
      for (let j = 0; j < data[i].leave.length; j++) {
        for (let l = 0; l < data[i].leave[j].leave_detail.length; l++) {
          if (data[i].leave[j].leave_detail.length > 0) {
            leave.push(data[i]);
          }
        }
      }
    }

    console.log("absent", absent);
    console.log("present", present);
    console.log("leave", leave);
  };
  useEffect(() => {
    let todayDate = moment().format("D-M-YYYY");

    console.log("date", typeof date);
    AttendanceService.getPresentEmployes({ date: todayDate })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* {prese} */}
      <button onClick={handleFunction}>Click Me</button>
    </div>
  );
};

export default PresentEmployes;

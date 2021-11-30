import React from "react";
import { Link } from "react-router-dom";

const NewLeaveSettings = (props) => {
  return (
    <div className="row justify-content-center">
      <div className="col col-md-6">
        <div className="card m-b-20">
          <div className="card-body">
            <h4 className="text-center">Time off Settings</h4>
            <hr />
            <div className="text-center">
              <Link to="/leave/preferences">
                <p>Preference</p>
              </Link>
              <Link to="/leave/working-days">
                <p>Working days</p>
              </Link>
              <Link to="/view-working-hours">
                <p>Working Hours</p>
              </Link>
              <Link to="/view-working-shift">
                <p>Working Shift</p>
              </Link>
              <Link to="/view-leave-type">
                <p>Leave Types</p>
              </Link>
              <Link to="/view-leave-policy">
                <p>Leave Policy</p>
              </Link>

              <Link>
                <p>Approvals</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLeaveSettings;

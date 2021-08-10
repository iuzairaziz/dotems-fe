import React from 'react';

const ViewDetails = () => {
    return ( 
        <div className="details">
            <div className="page-content-wrapper">
                <div className="container-fluid">
                    {/* <div className="row"> 
                    <div className="row align-items-center">
            {detail.map((item, indx) => {
              return (
                <>
                  <div
                    className={`labell ${
                      item.label === "Team Members"
                        ? "col-3 col-md-2"
                        : "col-3 col-md-2"
                    } mb-3 d-flex align-items-center align-self-center`}
                  >
                    <div>{item.label}</div>
                  </div>
                  <div
                    className={`valuee ${
                      item.label === "Team Members"
                        ? "col-9 col-md-6"
                        : "col-3 col-md-2"
                    } col-3 col-md-2 mb-3 align-self-center"`}
                  >
                    {item.value}
                  </div>
                </>
              );
            })}
          </div>
                    </div> */}
                </div>
            </div>
        </div>
     );
}
 
export default ViewDetails;
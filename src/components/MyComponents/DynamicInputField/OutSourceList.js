import React from "react";
import PhaseCreate from "./PhaseCreate";
import OutSourceCreate from "./OutSourceCreate";

class OutSourceList extends React.Component {
  handleChange = (e) => {
    if (
      [
        "phasename",
        "outSourceCost",
        "outSourceName",
        "outSourceDeadline",
      ].includes(e.target.name)
    ) {
      let phasesDetails = [...this.props.phasesDetails];
      phasesDetails[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.props.setPhaseDetials((prevState) => [
        ...prevState,
        { [e.target.name]: e.target.value },
      ]);
    }
  };
  addNewRow = (e) => {
    this.props.setPhaseDetials((prevState) => [
      ...prevState,
      {
        index: Math.random(),
        phasename: "",
        outSourceCost: "",
        outSourceName: "",
        outSourceDeadline: "",
      },
    ]);
  };

  deteteRow = (index) => {
    this.props.setPhaseDetials(
      this.props.phasesDetails.filter((s, sindex) => index !== sindex)
    );
  };

  clickOnDelete(record) {
    this.props.setPhaseDetials((prevState) =>
      this.props.phasesDetails.filter((r) => r !== record)
    );
  }

  render() {
    let { phasesDetails } = this.props;
    return (
      <div className="content">
        {/* {console.log("Project Phases",this.props.projectPhase)} */}
        {/* {console.log("phasesDetails", phasesDetails)} */}
        <form onSubmit={(e) => e.preventDefault()} onChange={this.handleChange}>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-12">
              <h4 className="text-center"> Out-Source Information</h4>
              <div style={{ marginTop: 20 }}>
                <OutSourceCreate
                  add={this.addNewRow}
                  delete={this.clickOnDelete.bind(this)}
                  phasesDetails={this.props.phasesDetails}
                  editable={this.props.editable}
                  phaseArray={this.props.phaseArray}
                  setPhaseArray={this.props.setPhaseDetials}
                />
              </div>
            </div>
            {/* <div className="col-sm-1" /> */}
          </div>
        </form>
      </div>
    );
  }
}
export default OutSourceList;

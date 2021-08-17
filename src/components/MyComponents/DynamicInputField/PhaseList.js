import React from "react";
import PhaseCreate from './PhaseCreate';

class PhaseList extends React.Component {
  
  handleChange = (e) => {
    if (
      ["phasename", "estHrs"].includes(
        e.target.name
      )
    ) {
      let phasesDetails = [...this.props.phasesDetails];
      phasesDetails[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.props.setPhaseDetials((prevState)=> ( [ ...prevState,{[e.target.name]: e.target.value }]));
    }
  };
  addNewRow = (e) => {

   this.props.setPhaseDetials((prevState) => ( 
      [
        ...prevState,
        {
          index: Math.random(),
          phasename: "",
          estHrs: "",
          
        }
      ]
    ));
  };

  deteteRow = (index) => {
    this.props.setPhaseDetials(
      this.props.phasesDetails.filter(
        (s, sindex) => index !== sindex
      )
    );
  };

  clickOnDelete(record) {
    this.props.setPhaseDetials((prevState)=>
      this.props.phasesDetails.filter((r) => r !== record)
    );
  }

  render() {
    let { phasesDetails } = this.props;
    return (
      <div className="content">
      {/* {console.log("Project Phases",this.props.projectPhase)} */}
      {console.log("phasesDetails",phasesDetails)}
        <form  onSubmit={(e)=>e.preventDefault()} onChange={this.handleChange}>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-sm-1"/>
            <div className="col-sm-10">
              <h4 className="text-center"> Enter Phases</h4>
                <div style={{ marginTop: 20 }}>
                  <PhaseCreate
                    add={this.addNewRow}
                    delete={this.clickOnDelete.bind(this)}
                    phasesDetails={phasesDetails}
                  />
                </div>
            </div>
              <div className="col-sm-1"/>
          </div>
        </form>
      </div>
    );
  }
}
export default PhaseList;

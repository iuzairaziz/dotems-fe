import React, { Component } from "react";
import AddMachine from "./AddMachine/AddMachine";
import { Route, Switch } from "react-router-dom";

class Machine extends Component {
  componentDidMount() {
    console.log("props", this.props.match);
  }
  render() {
    return (
      <>
        <h1>machine</h1>
        <Switch>
          <Route path={`${this.props.match.url}/add`} component={AddMachine} />
        </Switch>
      </>
    );
  }
}

export default Machine;

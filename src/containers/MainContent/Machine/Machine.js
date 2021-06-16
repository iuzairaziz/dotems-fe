import React, { Component } from "react";
import AddMachine from "./AddMachine/AddMachine";
import { Route, Switch } from "react-router-dom";

class Machine extends Component {
  render() {
    return (
      <>
        <h1>machine</h1>
        <Switch>
          <Route path="machine/add" component={AddMachine} />
        </Switch>
      </>
    );
  }
}

export default Machine;

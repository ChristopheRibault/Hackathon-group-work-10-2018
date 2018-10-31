import React, { Component } from "react";

import { Line } from "rc-progress";
import "./ProgressBar.css";

class ProgressBar extends Component {
 



  render() {
    return (
      <div className="ProgressBar">
        <div>Avatar</div>
        <Line
          trailColor="rgba(219, 219, 219, 0.3)"
          className="ProgressCPU"
          percent={this.props.CPUpurcentage}
          strokeColor={this.props.colorCPU}
          strokeLinecap="butt"
          strokeWidth="3"
        />

        <Line
          trailColor="rgba(219, 219, 219, 0.3)"
          className="ProgressPlayer"
          percent={this.props.playerPurcentage}
          strokeColor={this.props.colorPlayer}
          strokeLinecap="butt"
          strokeWidth="3"
        />
        <div>Avatar</div>
      </div>
    );
  }
}

export default ProgressBar;

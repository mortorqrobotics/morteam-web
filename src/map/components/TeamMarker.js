import React from "react";
import Radium from "radium";

import { setTeam } from "~/map/actions";
import { connect } from "react-redux";

@Radium
export default class TeamMarker extends React.Component {

    handleClick = () => {
        console.log("a");
        this.props.dispatch(setTeam(this.props.teamNum));
    }

    static propTypes = {
        lat: React.PropTypes.number,
        lng: React.PropTypes.number,
        teamNum: React.PropTypes.String,
    }

    render() {
        return (
          <div
              lat={this.props.lat}
              lng={this.props.lng}
          >
              {this.props.teamNum}
          </div>
        )
    }
}

export default connect()(TeamMarker)

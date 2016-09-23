import React from "react";
import Radium from "radium";

import { LeftbarContainer } from "~/shared/components/leftbar";
import styles from "~/map/styles";

import { connect } from "react-redux";

@Radium
class Leftbar extends React.Component {

    getTeamDisplay = () => {
        if (this.props.selectedTeam) {
            return "Team " + this.props.selectedTeam;
        }
        return "Click on a team";
    }

    render() {
        return (
            <LeftbarContainer>
                <li style={styles.teamNum}>
                    {this.getTeamDisplay()}
                </li>
            </LeftbarContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedTeam: state.selectedTeam,
    }
}

export default connect(mapStateToProps)(Leftbar)

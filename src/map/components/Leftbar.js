import React from "react";
import Radium from "radium";

import { LeftbarContainer } from "~/shared/components/leftbar";
import styles from "~/map/styles";

import { connect } from "react-redux";

@Radium
class Leftbar extends React.Component {

    getTeamDisplay = () => {
        if (this.props.selectedTeam) {
            return "Team " + this.props.selectedTeam.num;
        }
        return "Click on a team";
    }

    render() {
		if(this.props.selectedTeam) {
			return (
				<LeftbarContainer>
					<li style={styles.teamNum}>
						{this.getTeamDisplay()}
					</li>
					<li>
						{this.props.selectedTeam.data.nickname}
					</li>
					<li>
						{this.props.selectedTeam.data.region}, {this.props.selectedTeam.data.country_name}
					</li>
					<li>   
						<a href={this.props.selectedTeam.data.website}>{this.props.selectedTeam.data.website}</a>
					</li>
				</LeftbarContainer>	
			)
		}
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

import React from "react";
import Radium from "radium";

import { LeftbarContainer } from "~/shared/components/leftbar";
import styles from "~/map/styles";
import { leftbarProps } from "~/util/leftbar";

import { connect } from "react-redux";

@Radium
class Leftbar extends React.Component {

	state = {
		isLeftbarOpen: true,   
	}

    getTeamDisplay = () => {
        if (this.props.selectedTeam) {
            return "Team " + this.props.selectedTeam.num;
        }
        return "Click on a team";
    }

    render() {
		if(this.props.selectedTeam) {
			return (
				<LeftbarContainer { ...leftbarProps(this, "isLeftbarOpen") }>
					<li style={styles.teamNum}>
						{this.getTeamDisplay()}
					</li>
					<li style={styles.teamNick}>
						{this.props.selectedTeam.data.nickname}
					</li>
					<li style={styles.teamCountry}>
						{this.props.selectedTeam.data.region}, {this.props.selectedTeam.data.country_name}
					</li>
					<li style={styles.website}>
						<a href={this.props.selectedTeam.data.website}>Official Team Website</a>
					</li>
					<li style={styles.website}>
                        <a href={"https://www.thebluealliance.com/team/"+this.props.selectedTeam.num}>Blue Alliance Page</a>
					</li>
				</LeftbarContainer>	
			)
		}
        return (
            <LeftbarContainer { ...leftbarProps(this, "isLeftbarOpen") }>
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

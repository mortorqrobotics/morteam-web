import React from "react";
import Radium from "radium";

import { LeftbarContainer } from "~/shared/components/leftbar";
import styles from "~/map/styles";
import { leftbarProps } from "~/util/leftbar";

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
        return (
            <LeftbarContainer { ...leftbarProps(this) }>
                <li style={styles.teamNum}>
                    {this.getTeamDisplay()}
                </li>

                {this.props.selectedTeam && (
                    <div>
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
                            <a href={"https://www.thebluealliance.com/team/" + this.props.selectedTeam.num}>
                                Blue Alliance Page
                            </a>
                        </li>
                        <li style={styles.website}>
                            <a href={"/teams/number/" + this.props.selectedTeam.num}>
                                MorTeam page
                            </a>
                        </li>
                    </div>
                )}
            </LeftbarContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedTeam: state.selectedTeam,
        isLeftbarOpen: state.isLeftbarOpen,
    }
}

export default connect(mapStateToProps)(Leftbar)

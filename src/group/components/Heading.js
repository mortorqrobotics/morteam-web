import React from "react";
import Radium from "radium";

import styles from "~/group/styles";
import LeaveGroupButton from "~/group/components/LeaveGroupButton";
import InviteMemberButton from "~/group/components/InviteMemberButton";
import JoinButton from "~/group/components/JoinButton";
import { getGroupName } from "~/util/groups";
import { connect } from "react-redux";
import { currentUser } from "~/util";

@Radium
class Heading extends React.Component {

    renderConditionalButtons = () => {
        if (this.props.group.__t == "NormalGroup") {
            if (this.props.users.some(user => user._id === currentUser._id)) {
                return (
                    <div>
                        {currentUser.isAdmin() && (
                            <InviteMemberButton/>
                        )}
                        <LeaveGroupButton />
                    </div>
                )
            } else {
                return (
                    <JoinButton />
                )
            }
        }
    }

    render() {
        console.log(this.props.group);
        return (
            <div>
                <h1 style={styles.groupName}>
                    {getGroupName(this.props.group)}
                </h1>
                <div style={styles.buttonContainer}>
                    {this.renderConditionalButtons()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        group: state.group,
        users: state.users,
    }
}

export default connect(mapStateToProps)(Heading);

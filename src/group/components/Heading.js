import React from "react";
import Radium from "radium";

import styles from "~/group/styles/index";
import LeaveGroupButton from "~/group/components/LeaveGroupButton";
import InviteMemberButton from "~/group/components/InviteMemberButton";
import JoinButton from "~/group/components/JoinButton";
import { connect } from "react-redux";
import { currentUser } from "~/util";

@Radium
class Heading extends React.Component {

    renderConditionalButtons = () => {
        if (this.props.users.some(user => user._id === currentUser._id)) {
            return (
                <div>
                    <LeaveGroupButton />
                    {currentUser.isAdmin() && (
                        <InviteMemberButton/>
                    )}
                </div>
            )
        } else {
            return (
                <JoinButton />
            )
        }
    }

    render() {
        return (
            <div>
                <h1 style={styles.groupName}>
                    {this.props.group.name}
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

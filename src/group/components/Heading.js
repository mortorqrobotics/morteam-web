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
        if (currentUser.groups.indexOf(this.props.group._id) !== -1) {
            return (
                <div>
                    <div style={styles.leaveButtonWrapper}>
                        <LeaveGroupButton />
                    </div>

                    {currentUser.isAdmin() && (
                        <div style={styles.memberWrapper}>
                            <InviteMemberButton/>
                        </div>
                    )}
                </div>
            )
        } else {
            return (
                <div style={styles.memberWrapper}>
                    <JoinButton />
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <h1 style={styles.groupName}>
                    {this.props.group.name}
                </h1>
                {this.renderConditionalButtons()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        group: state.group
    }
}

export default connect(mapStateToProps)(Heading);

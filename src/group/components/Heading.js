import React from "react";
import Radium from "radium";

import styles from "~/group/styles";
import LeaveGroupButton from "~/group/components/LeaveGroupButton";
import InviteMemberButton from "~/group/components/InviteMemberButton";
import JoinButton from "~/group/components/JoinButton";
import ConfirmModal from "~/shared/components/ConfirmModal";
import { modalProps } from "~/util/modal";
import Button from "~/shared/components/forms/Button";
import { getGroupName } from "~/util/groups";
import { currentUser } from "~/util";

import { deleteGroup } from "~/group/actions";
import { connect } from "react-redux";

@Radium
class Heading extends React.Component {

    state = {
        isModalOpen: false,
    }

    renderConditionalButtons = () => {
        if (this.props.group.__t == "NormalGroup") {
            if (this.props.users.some(user => user._id === currentUser._id)) {
                return (
                    <div>
                        {currentUser.isAdmin() && (
                            <div>
                                <InviteMemberButton/>
                                <LeaveGroupButton />
                                <Button
                                    value="Delete"
                                    style={{ marginBottom: "50px" }}
                                    onClick={() => this.setState({ isModalOpen: true })}
                                />
                                        <ConfirmModal
                                            grayConfirm
                                            text={`Are you sure you would like to delete ${getGroupName(this.props.group)}?`}
                                            action={() => deleteGroup()}
                                            { ...modalProps(this, "isModalOpen") }
                                        />
                                            </div>
                        )}
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

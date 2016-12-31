import React from "react";
import Radium from "radium";

import styles from "~/group/styles";
import Button from "~/shared/components/forms/Button";
import ConfirmModal from "~/shared/components/ConfirmModal";
import { currentUser, pageOptions } from "~/util";
import { modalProps } from "~/util/modal";
import { connect } from "react-redux";
import { leaveGroup } from "~/group/actions";

@Radium
class LeaveGroupButton extends React.Component {

    state = {
        isModalOpen: false,
    }

    render() {
        return (
            <div>
                <Button
                    style={styles.buttons.leaveButton}
                    value="Leave"
                    onClick={() => this.setState({ isModalOpen: true })}
                />
                <ConfirmModal
                    text="Are you sure you would like to leave the group?"
                    action={() => this.props.dispatch(leaveGroup())}
                    {...modalProps(this, "isModalOpen")}
                />
            </div>
        )
    }
}

export default connect()(LeaveGroupButton);

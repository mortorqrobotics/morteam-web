import React from "react";
import Radium from "radium";

import styles from "~/shared/styles/buttons";
import Button from "~/shared/components/forms/Button";
import { currentUser } from "~/util";
import { connect } from "react-redux";
import { deleteUser } from "~/team/actions";

@Radium
class LeaveTeamButton extends React.Component {

    handleClick = async () => {
        if (window.confirm("Are you sure?")) {
            await this.props.dispatch(deleteUser(currentUser));
        }
    }

    render() {
        return (
            <Button
                style={styles.leaveButton}
                value="Leave"
                onClick={this.handleClick}
            />
        )
    }
}

export default connect()(LeaveTeamButton);
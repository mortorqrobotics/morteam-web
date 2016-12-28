import React from "react";
import Radium from "radium";

import styles from "~/shared/styles/buttons";
import Button from "~/shared/components/forms/Button";
import { currentUser } from "~/util";
import { connect } from "react-redux";
import { deleteUser } from "~/team/actions";

@Radium
class LeaveTeamButton extends React.Component {
    state = {
        isConfirmOpen: false,
    }
    
    renderConfirm = () => {
        if (!this.state.isConfirmOpen) {
            return(
                <Button
                    style={styles.leaveButton}
                    value="Leave"
                    onClick={() => this.setState({isConfirmOpen: true,})}
                />
            )
        } else {
            return (
                  <div>
                    <Button
                        style={styles.inviteButton}
                        value="Confirm and Leave"
                        onClick={() => this.props.dispatch(deleteUser(currentUser))}
                    />
                    <br/>
                    <Button
                        style={styles.leaveButton}
                        value="Cancel"
                        onClick={() => this.setState({isConfirmOpen: false,})}
                    />
                </div>
            
            )
        }
    }

    render() {
        return(
            <div>
                {this.renderConfirm()}
            </div>
        )
    }
}

export default connect()(LeaveTeamButton);
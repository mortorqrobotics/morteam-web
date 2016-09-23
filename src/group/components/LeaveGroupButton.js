import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import styles from "~/group/styles/index";
import Button from "~/shared/components/forms/Button";

@Radium
export default class LeaveGroupButton extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object,
        options: React.PropTypes.object,
    }

    handleClick = async () => {
        // TODO: get rid of confirm and alert!
        if (window.confirm("Are you sure you want to leave the group?")) {
            await ajax.request("delete",
                `/groups/normal/id/${this.context.options.groupId}/users/id/${this.context.user._id}`
            );
            window.location.reload(); // ahhhhhh redux is necessary
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

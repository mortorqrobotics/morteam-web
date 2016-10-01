import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import styles from "~/group/styles/index";
import Button from "~/shared/components/forms/Button";
import { currentUser, pageOptions } from "~/util";

@Radium
export default class LeaveGroupButton extends React.Component {

    handleClick = async () => {
        await ajax.request("delete",
            `/groups/normal/id/${pageOptions.groupId}/users/id/${currentUser._id}`
        );
        window.location.reload(); // ahhhhhh redux is necessary
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

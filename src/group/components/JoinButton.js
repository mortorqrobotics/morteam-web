import React from "react";
import Radium from "radium";

import styles from "~/group/styles/index";
import Button from "~/shared/components/forms/Button";

@Radium
export default class LeaveGroupButton extends React.Component {

    render() {
        return (
            <Button 
                style={styles.joinGroupButton} 
                value="Join Group" 
            />
        )
    }
}

import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import styles from "~/group/styles/index";
import Button from "~/shared/components/forms/Button";
import { pageOptions } from "~/util";

@Radium
export default class JoinButton extends React.Component {

    handleClick = async () => {
        await ajax.request("post",
            `/groups/normal/id/${pageOptions.groupId}/join`
        );
        // use redux instead
        window.location.reload();
    }
    
    render() {
        return (
            <Button 
                style={styles.inviteButton} 
                value="Join" 
                onClick={this.handleClick}
            />
        )
    }
}

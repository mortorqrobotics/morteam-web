import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import styles from "~/group/styles/index";
import Button from "~/shared/components/forms/Button";

@Radium
export default class JoinButton extends React.Component {

    static contextTypes = {
        options: React.PropTypes.object,
    }

    handleClick = async () => {
        await ajax.request("post",
            `/groups/normal/id/${this.context.options.groupId}/join`
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

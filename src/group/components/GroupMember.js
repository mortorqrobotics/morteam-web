import React from "react";
import Radium from "radium";

import styles from "~/group/styles/index";
import { fullName } from "~/util";

@Radium
export default class GroupMember extends React.Component {

    static propTypes = {
        user: React.PropTypes.object,
    }

    handleClick = () => {
      window.location.assign("/profiles/id/" + this.props.user._id);
    }

    render() {
        return (
            <div style={styles.groupMember} onClick={this.handleClick}>
                <img
                    class="profPic"
                    style={styles.profPic} 
                    src={this.props.user.profpicpath}
                />
                <span>{fullName(this.props.user)}</span>
            </div>
        )
    }

}

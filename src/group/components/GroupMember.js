import React from "react";
import Radium from "radium";

import { fullName } from "~/util";

@Radium
export default class GroupMember extends React.Component {

    static propTypes = {
        user: React.PropTypes.object,
    }

    handleClick = () => {
      window.assignLocation("/profiles/users/" + this.props.user._id);
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <img src={this.props.user.profpicpath}/>
                {fullName(this.props.user)}
            </div>
        )
    }

}

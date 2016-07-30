import React from "react";
import Radium from "radium";

import MemberItem from "./MemberItem";
import ajax from "~/util/ajax";

let styles = {
    div: {
        height: "130px",
        overflowY: "auto",
    }
}

@Radium
export default class MemberSelect extends React.Component {

    static propTypes = {
        users: React.PropTypes.array,
        groups: React.PropTypes.array,
        selectedUsers: React.PropTypes.array,
        selectedGroups: React.PropTypes.array,
        onUserClick: React.PropTypes.func,
        onGroupClick: React.PropTypes.func,
    }

    isGroupSelected = (group) => {
        return this.props.selectedGroups.indexOf(group) != -1;
    }

    isUserSelected = (user) => {
        return this.props.selectedUsers.indexOf(user) != -1;
    }

    render() {
        return (
            <div style={styles.div}>
                {this.props.groups.map(group => (
                    <MemberItem
                        key={group._id}
                        text={group.name}
                        id={group._id}
                        onClick={this.props.onGroupClick}
                        isSelected={this.isGroupSelected(group._id)}
                    />
                ))}
                {this.props.users.map(user => (
                    <MemberItem
                        key={user._id}
                        text={user.firstname + " " + user.lastname}
                        id={user._id}
                        onClick={this.props.onUserClick}
                        isSelected={this.isUserSelected(user._id)}
                    />
                ))}
            </div>
        )
    }
}

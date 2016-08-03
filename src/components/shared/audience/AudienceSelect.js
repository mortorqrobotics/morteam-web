import React from "react";
import Radium from "radium";

import update from "react/lib/update";
import AudienceItem from "./AudienceItem";
import { getGroupName } from "~/util/groups";

let styles = {
    div: {
        height: "130px",
        overflowY: "auto",
    },
}

@Radium
export default class AudienceSelect extends React.Component {

    static propTypes = {
        users: React.PropTypes.array,
        groups: React.PropTypes.array,
        selectedUsers: React.PropTypes.array,
        selectedGroups: React.PropTypes.array,
        onUpdate: React.PropTypes.func,
    }

    isGroupSelected = (groupId) => {
        return this.props.selectedGroups.indexOf(groupId) !== -1;
    }

    isUserSelected = (userId) => {
        return this.props.selectedUsers.indexOf(userId) !== -1;
    }

    onUserClick = (userId) => {
        let newUsers;
        if (this.isUserSelected(userId)) {
            newUsers = update(this.props.selectedUsers, {
                $splice: [
                    [this.props.selectedUsers.indexOf(userId), 1]
                ]
            });
        } else {
            newUsers = this.props.selectedUsers.concat([userId]);
        }
        this.props.onUpdate({
            groups: this.props.selectedGroups,
            users: newUsers,
        });
    }

    // because screw DRY
    onGroupClick = (groupId) => {
        let newGroups;
        if (this.isGroupSelected(groupId)) {
            newGroups = update(this.props.selectedGroups, {
                $splice: [
                    [this.props.selectedGroups.indexOf(groupId), 1]
                ]
            });
        } else {
            newGroups = this.props.selectedGroups.concat([groupId]);
        }
        this.props.onUpdate({
            groups: newGroups,
            users: this.props.selectedUsers,
        });
    }

    render() {
        return (
            <div style={styles.div}>
                {this.props.groups.map(group => (
                    <AudienceItem
                        key={group._id}
                        text={getGroupName(group)}
                        id={group._id}
                        onClick={this.onGroupClick}
                        isSelected={this.isGroupSelected(group._id)}
                        isGroup={true}
                    />
                ))}
                {this.props.users.map(user => (
                    <AudienceItem
                        key={user._id}
                        text={user.firstname + " " + user.lastname}
                        id={user._id}
                        onClick={this.onUserClick}
                        isSelected={this.isUserSelected(user._id)}
                        isGroup={false}
                    />
                ))}
            </div>
        )
    }
}

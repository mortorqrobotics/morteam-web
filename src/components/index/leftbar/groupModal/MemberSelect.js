import React from "react";
import Radium from "radium";

import MemberItem from "./MemberItem";
import ajax from "~/util/ajax";

@Radium
export default class MemberSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            groups: []
        }
    }

    static propTypes = {
        selectedUsers: React.PropTypes.array,
        selectedGroups: React.PropTypes.array,
        onUserClick: React.PropTypes.func,
        onGroupClick: React.PropTypes.func,
    }

    componentDidMount = async() => {
        try {
            let userResponse = await ajax.request("get", "/teams/current/users");
            let groupResponse = await ajax.request("get", "/groups");
            this.setState({
                users: userResponse.data,
                groups: groupResponse.data
            });
        } catch (err) {
            console.log(err);
        }
    }

    isGroupSelected = (group) => {
        return this.props.selectedGroups.indexOf(group) != -1;
    }

    isUserSelected = (user) => {
        return this.props.selectedUsers.indexOf(user) != -1;
    }

    //TODO: scrollbar
    render() {
        return (
            <div>
                {this.state.groups.map(group => (
                    <MemberItem
                        key={group._id}
                        text={group.name}
                        id={group._id}
                        onClick={this.props.onGroupClick}
                        isSelected={this.isGroupSelected(group._id)}
                    />
                ))}
                {this.state.users.map(user => (
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

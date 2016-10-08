import React from "react";
import Radium from "radium";
import ajax from "~/util/ajax";

import Root, { pageInit } from "~/shared/components/Root";
import UserList from "~/group/components/UserList";
import LeaveGroupButton from "./LeaveGroupButton";
import InviteMemberButton from "./InviteMemberButton";
import JoinButton from "./JoinButton";
import styles from "~/group/styles/index";
import Navbar from "~/shared/components/navbar/Navbar";
import { currentUser, pageOptions } from "~/util";

@Radium
export default class Group extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            group: null,
            loaded: false,
        }
    }

    componentDidMount = async () => {
        try {
            let [ { data: users, }, { data: group, } ] = await Promise.all([
                ajax.request("get", "/groups/normal/id/" + pageOptions.groupId + "/users"),
                ajax.request("get", "/groups/id/" + pageOptions.groupId),
            ]);
            this.setState({
                users: users,
                group: group,
                loaded: true,
            })
        } catch (err) {
            console.log(err);
        }
    }

    isCurrentUserInGroup = () => {
        if (!this.state.group) {
            return false;
        }
        return currentUser.groups.indexOf(this.state.group._id) !== -1;
    }

    handleDeleted = async (userId) => {
        await ajax.request("delete",
            `/groups/normal/id/${this.state.group._id}/users/id/${userId}`
        );
        this.setState({
            users: this.state.users.filter(user => (
                user._id != userId
            )),
        });
    }

    renderConditionalButtons = () => {
        if (this.isCurrentUserInGroup()) {
            return (
                <div>
                    <LeaveGroupButton />
                    {currentUser.isAdmin() && (
                        <InviteMemberButton
                            groupUsers={this.state.users}
                            onAdded={users => {
                                this.setState({
                                    users: this.state.users.concat(users),
                                });
                            }}
                        />
                    )}
                </div>
            )
        } else {
            return (
                <JoinButton />
            )
        }
    }

    render() {
        return (
            <Root pageName="group">
                <Navbar />
                {this.state.loaded && (
                    <div>
                        <h1 style={styles.groupName}>
                            {this.state.group.name}
                        </h1>
                        <div style={styles.buttonContainer}>
                            {this.renderConditionalButtons()}
                        </div>
                        <UserList users={this.state.users} onDeleted={this.handleDeleted} />
                    </div>
                )}
            </Root>
        )
    }

}

pageInit(Group);

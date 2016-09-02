import React from "react";
import Radium from "radium";
import ajax from "~/util/ajax";

import Root, { pageInit } from "~/shared/components/Root";
import GroupHeading from "./GroupHeading";
// import GroupMember from "./GroupMember";
import UserList from "~/group/components/UserList";
import LeaveGroupButton from "./LeaveGroupButton";
import InviteMemberButton from "./InviteMemberButton";
import styles from "~/group/styles/index";
import Navbar from "~/shared/components/navbar/Navbar";

@Radium
export default class Group extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            users: null,
            group: null,
            loaded: false,
        }
    }

    componentDidMount = async () => {
        try {
            let [ { data: users, }, { data: group, } ] = await Promise.all([
                ajax.request("get", "/teams/current/users"),
                ajax.request("get", "/groups/id/" + window.__options.groupId),
            ])
            this.setState({
                users: users,
                group: group,
                loaded: true,
            })
        } catch (err) {
            console.log(err);
        }
    }
    
    handleDeleted = async () => {
        // try {
        //    ajax.request("delete", "/groups/users")
        // }
        alert("UNFINISHED");
    }

    render() {
        return(
            <Root pageName="group">
                <Navbar />
                {this.state.loaded && (
                  <div>
                    <GroupHeading
                      group={this.state.group}
                    />
                    <div style={styles.leaveButtonWrapper}>
                      <LeaveGroupButton />
                    </div>
                    <div style={styles.memberWrapper}>
                      <InviteMemberButton />
                      <UserList users={this.state.users} onDeleted={this.handleDeleted} />
                    </div>
                  </div>
                  )}
            </Root>
        )
    }

}

pageInit(Group);

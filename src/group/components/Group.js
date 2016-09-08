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
    
    isCurrentUserInGroup = () => {
        if (!this.state.group) {
            return false;
        }
        // console.log(this.context.user.groups, this.state.group._id)
        return window.__userInfo.groups.indexOf(this.state.group._id) !== -1;
    }
    
    handleDeleted = async () => {
        // try {
        //    ajax.request("delete", "/groups/users")
        // }
        alert("UNFINISHED");
    }
    
    
    
    renderConditionalButtons = () => {
        if (this.isCurrentUserInGroup()) {
            
            return (
                <div>
                    <div style={styles.leaveButtonWrapper}>
                        <LeaveGroupButton />
                    </div>
                
                    <div style={styles.memberWrapper}>
                        <InviteMemberButton />
                    </div>
                </div>
            )
            
        }
        else {
            
            return (
                <div style={styles.joinWrapper}>
                    <JoinButton />
                </div>
            )
            
        }
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
                    {this.renderConditionalButtons()}
                    <UserList users={this.state.users} onDeleted={this.handleDeleted} />
                  </div>
                  )}
            </Root>
        )
    }

}

pageInit(Group);

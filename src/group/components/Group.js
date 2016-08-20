import React from "react";
import Radium from "radium";
import ajax from "~/util/ajax";

import Root, { pageInit } from "~/shared/components/Root";
import GroupHeading from "./GroupHeading";
import GroupMember from "./GroupMember";
import LeaveGroupButton from "./LeaveGroupButton";
import InviteMemberButton from "./InviteMemberButton";
import styles from "~/group/styles/styles";
import Navbar from "~/shared/components/navbar/Navbar";

@Radium
export default class Group extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    componentDidMount = async() => {
        try {
            let [userRes, userGroupRes, publicGroupRes] = await Promise.all([
                ajax.request("get", ""),
                ajax.request("get", "")
            ]);
        } catch (err) {
            console.log(err);
        }
    }
    
    render() {
        return(
            <Root pageName="group">
                <Navbar />
                <GroupHeading />
                <LeaveGroupButton />
                <InviteMemberButton />
                <div>
                </div>
            </Root>
        )
    }
    
}

pageInit(Group);

import React from "react";
import Radium from "radium";
import ajax from "~/util/ajax";

import Root, { pageInit } from "~/shared/components/Root";
import GroupHeading from "./GroupHeading";
import GroupMember from "./GroupMember";
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
    }
  }

    componentDidMount = async() => {
        try {
            let [ { data: users, }, { data: group, } ] = await Promise.all([
              ajax.request("get", "/teams/current/users"),
              ajax.request("get", "/groups"),
            ])
            this.setState({
              users: users,
              group: group,
            })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return(
            <Root pageName="group">
                <Navbar />
                <GroupHeading
                  group={group}
                />
                <LeaveGroupButton />
                <InviteMemberButton />
                <div>
                  {this.state.users.map(user => (
                    <GroupMember
                      user={user}
                      key={user._id}
                    />
                  ))}
                </div>
            </Root>
        )
    }

}

pageInit(Group);

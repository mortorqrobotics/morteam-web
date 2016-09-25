import React from "react";
import Radium from "radium";

import LeftbarButton from "./LeftbarButton";
import GroupList from "./GroupList";
import MakeGroupModal from "./groupModal/MakeGroupModal";
import Link from "~/shared/components/Link";
import ajax from "~/util/ajax";
import { modalProps } from "~/util/modal";

import styles from "~/home/styles/leftbar";

@Radium
export default class Leftbar extends React.Component {

    state = {
        userGroups: [],
        publicGroups: [],
        isModalOpen: false,
    }

    static contextTypes = {
        user: React.PropTypes.object,
    }

    componentDidMount = async() => {
        try {
            let [userGroupsRes, publicGroupsRes] = await Promise.all([
                ajax.request("get", "/groups/normal"),
                ajax.request("get", "/groups/other")
            ]);
            this.setState({
                userGroups: userGroupsRes.data,
                publicGroups: publicGroupsRes.data
            });
        } catch (err) {
            console.log(err);
        }
    }

    renderMakeGroupButton = () => {
        if (this.context.user.isAdmin()) {
            return (
                <div>

                    <LeftbarButton
                        text="Make a Group"
                        glyph="plus"
                        onClick={() => this.setState({ isModalOpen: true })}
                    />
                    <hr />

                    <MakeGroupModal
                        { ...modalProps(this, "isModalOpen") }
                        addGroup={this.addGroup}
                    />

                </div>
            )
        }
    }

    addGroup = (group) => {
        let change = {
            userGroups: this.state.userGroups.concat([group]),
        }
        this.setState(change);
    }

    render() {
        return (
            <div style={styles.leftbar.div}>

                <LeftbarButton
                    text="View Profile"
                    onClick={() => window.location.assign("/profiles/id/" + this.context.user._id)}
                />
                <LeftbarButton
                    text="Log Out"
                    onClick={async() => (
                        await ajax.request("post", "/logout"),
                        window.location.assign("/login")
                    )}
                />
                <LeftbarButton
                    text="Team"
                    onClick={() => window.location.assign("teams/current")}
                />
                <hr />

                <h5 style={styles.leftbar.h5}>Your Groups</h5>
                <GroupList
                    groups={this.state.userGroups}
                />
                <hr />

                <h5 style={styles.leftbar.h5}>Public Groups</h5>
                <GroupList
                    groups={this.state.publicGroups}
                />
                <hr />

                {this.renderMakeGroupButton()}

                <span style={styles.leftbar.span}>© 2015 MorTeam</span>
                <br />
                <span style={styles.leftbar.span}>
                    <Link
                        location="/terms.html"
                        text="Privacy and Terms"
                        style={styles.leftbar.link}
                    />
                </span>

            </div>
        )
    }
}

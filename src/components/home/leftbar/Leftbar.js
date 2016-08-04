import React from "react";
import Radium from "radium";

import ProfileButton from "./ProfileButton";
import LogoutButton from "./LogoutButton";
import TeamButton from "./TeamButton";
import MakeGroupButton from "./MakeGroupButton";
import GroupList from "./GroupList";
import MakeGroupModal from "./groupModal/MakeGroupModal";
import Link from "~/components/shared/Link";
import ajax from "~/util/ajax";

var styles = {
    div: {
        verticalAlign: "top",
        marginTop: "15px",
        marginLeft: "15px",
        padding: "10px",
        width: "200px",
        display: "inline-block",
        background: "white",
        boxShadow: "1.5px 3px 8px -2px #a9a9a9",
    },
    span: {
        color: "gray",
        display: "inline-block",
        marginBottom: "6px",
    },
    link: {
        color: "gray",
        textDecoration: "none",
        ":hover": {
            textDecoration: "underline",
        }
    },
    h5: {
        marginBottom: "15px",
    }
}

@Radium
export default class Leftbar extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            userGroups: [],
            publicGroups: [],
            modalIsOpen: false,
        }
    }

    static contextTypes = {
        user: React.PropTypes.object,
    }

    componentDidMount = async() => {
        try {
            let [userGroupsRes, publicGroupsRes] = await Promise.all([
                ajax.request("get", "/groups/normal"),
                ajax.request("get", "/groups/public")
            ]);
            this.setState({
                userGroups: userGroupsRes.data,
                publicGroups: publicGroupsRes.data
            });
        } catch (err) {
            console.log(err);
        }
    }

    displayMakeGroupButton = () => {
        if (this.context.user.isAdmin()) {
            return (
                <div>

                    <MakeGroupButton
                        onClick={this.openModal}
                    />
                    <hr />

                    <MakeGroupModal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.openModal}
                        onRequestClose={this.closeModal}
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
        if (group.isPublic) {
            change.publicGroups = this.state.publicGroups.concat([group]);
        }
        this.setState(change);
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    }

    render() {
        return (
            <div style={styles.div}>

                <ProfileButton />
                <LogoutButton />
                <TeamButton />
                <hr />

                <h5 style={styles.h5}>Your Groups</h5>
                <GroupList
                    groups={this.state.userGroups}
                />
                <hr />

                <h5 style={styles.h5}>Public Groups</h5>
                <GroupList
                    groups={this.state.publicGroups}
                />
                <hr />

                {this.displayMakeGroupButton()}

                <span style={styles.span}>© 2015 MorTeam</span>
                <br />
                <span style={styles.span}>
                    <Link
                        location="/terms"
                        text="Privacy and Terms"
                        style={styles.link}
                    />
                </span>

            </div>
        )
    }
}

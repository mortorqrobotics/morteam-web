import React from "react";
import Radium from "radium";

import ProfileButton from "./ProfileButton";
import LogoutButton from "./LogoutButton";
import TeamButton from "./TeamButton";
import UserGroups from "./UserGroups";
import PublicGroups from "./PublicGroups";
import Link from "../../shared/Link"

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
    }
}

@Radium
export default class Leftbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={styles.div}>
                <ProfileButton />
                <LogoutButton />
                <TeamButton />
                <hr />
                <UserGroups />
                <hr />
                <PublicGroups /> //TODO: implement public/private-ness to groups
                <hr />
                <span style={styles.span}>© 2015 MorTeam</span>
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

import React from "react";
import Radium from "radium";

import LeftbarButton from "./LeftbarButton";
import GroupList from "./GroupList";
import MakeGroupModal from "./MakeGroupModal";
import Link from "~/shared/components/Link";
import { modalProps } from "~/util/modal";
import { currentUser } from "~/util";
import styles from "~/home/styles/leftbar";
import { connect } from "react-redux";

@Radium
class Leftbar extends React.Component {

    state = {
        isModalOpen: false,
    }

    renderMakeGroupButton = () => {
        if (currentUser.isAdmin()) {
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
                    />

                </div>
            )
        }
    }

    render() {
        return (
            <div style={styles.leftbar.div}>

                <LeftbarButton
                    text="View Profile"
                    onClick={() => window.location.assign("/profiles/id/" + currentUser._id)}
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
                    groups={this.props.userGroups}
                />
                <hr />

                <h5 style={styles.leftbar.h5}>Other Groups</h5>
                <GroupList
                    groups={this.props.otherGroups}
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

const mapStateToProps = (state) => {
    return {
        userGroups: state.groups.user,
        otherGroups: state.groups.other,
    }
}

export default connect(mapStateToProps)(Leftbar);

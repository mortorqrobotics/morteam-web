import React from "react";
import Radium from "radium";

import Button from "~/shared/components/forms/Button";
import ConfirmModal from "~/shared/components/ConfirmModal";
import styles from "~/team/styles";
import { modalProps } from "~/util/modal";
import { currentUser } from "~/util";
import { connect } from "react-redux";

@Radium
export default class Heading extends React.Component {

    state = {
        isModalOpen: false,
    }

    render() {
        const team = currentUser.team;
        return (
            <div>
                <span style={styles.teamInfo.span}>
                    <h1 style={styles.teamInfo.h1}>
                        {team.name}
                        <br />
                    </h1>
                    <h2>Team {team.number}</h2>
                    <h2>Team Code: {team.id}</h2>
                </span>
                <br />

                <Button
                    value="Leave Team"
                    style={{ marginBottom: "50px" }}
                    onClick={() => this.setState({ isModalOpen: true })}
                />
                <ConfirmModal
                    grayConfirm
                    text={"Warning: Removing yourself from a team is not"
                        + " easily reversible. Do not do this unless you"
                        + " really mean to."
                    }
                    action={() => {
                        store.dispatch(deleteUser(currentUser._id));
                        window.location.assign("/void");
                    }}
                    {...modalProps(this, "isModalOpen")}
                />
            </div>
        )
    }
}


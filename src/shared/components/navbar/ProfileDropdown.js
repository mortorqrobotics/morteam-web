import React from "react";
import Radium from "radium";

import styles from "~/shared/styles/navbar";
import ProfileDropdownModal from "./ProfileDropdownModal";
import { currentUser } from "~/util";

@Radium
export default class ProfileDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        }
    }

    openModal = () => {
        this.setState({
            isModalOpen: true
        })
    }

    render() {
        return (
            <div style={styles.profileDropdown.div}>
                <img
                    style={styles.profileDropdown.profPic}
                    src={currentUser.profpicpath + "-60"}
                    onClick={this.openModal}
                />
                <span
                    style={styles.profileDropdown.span}
                    onClick={this.openModal}
                >
                    {currentUser.firstname}
                </span>

                <ProfileDropdownModal
                    isOpen={this.state.isModalOpen}
                    onAfterOpen={() => this.setState({ isModalOpen: true })}
                    onRequestClose={() => this.setState({ isModalOpen: false })}
                />
            </div>
        )
    }
}

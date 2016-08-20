import React from "react";
import Radium from "radium";

import styles from "~/shared/styles/navbar";
import DropdownModal from "./DropdownModal";

@Radium
export default class ProfileDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        }
    }

    static contextTypes = {
        user: React.PropTypes.object,
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
                    src={this.context.user.profpicpath + "-60"}
                    onClick={this.openModal}
                />
                <span
                    style={styles.profileDropdown.span}
                    onClick={this.openModal}
                >
                    {this.context.user.firstname}
                </span>

                <DropdownModal
                    isOpen={this.state.isModalOpen}
                    onAfterOpen={() => this.setState({ isModalOpen: true })}
                    onRequestClose={() => this.setState({ isModalOpen: false })}
                />
            </div>
        )
    }
}

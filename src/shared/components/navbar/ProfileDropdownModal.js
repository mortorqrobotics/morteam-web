import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import DimModal from "~/shared/components/DimModal";
import styles from "~/shared/styles/navbar";
import { currentUser } from "~/util";

@Radium
export default class ProfileDropdownModal extends React.Component {

    static propTypes = {
        isOpen: React.PropTypes.bool,
        onAfterOpen: React.PropTypes.func,
        onRequestClose: React.PropTypes.func,
    }

    viewProfile = () => {
        window.location.assign("/profiles/id/" + currentUser._id);
    }

    logout = async() => {
        try {
            await ajax.request("POST", "/logout");
            window.location.assign("/login");
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <DimModal
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.props.onRequestClose}
                style={styles.profileDropdown.modal.container}
            >
                <ul>
                    <li
                        key={1}
                        style={styles.profileDropdown.modal.li}
                        onClick={this.viewProfile}
                    >
                        View Profile and Settings
                    </li>
                    <li
                        key={2}
                        style={styles.profileDropdown.modal.li}
                        onClick={this.logout}
                    >
                        Logout
                    </li>
                </ul>
            </DimModal>
        )
    }
}

import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import DimModal from "~/shared/components/DimModal";
import Link from "~/shared/components/Link";
import styles from "~/shared/styles/navbar";
import { currentUser } from "~/util";

@Radium
export default class ProfileDropdownModal extends React.Component {

    static propTypes = {
        isOpen: React.PropTypes.bool,
        onAfterOpen: React.PropTypes.func,
        onRequestClose: React.PropTypes.func,
    }

    logout = async() => {
        try {
            await ajax.request("POST", "/logout");
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
                    <Link
                        location={"/profiles/id/" + currentUser._id}
                        style={styles.link}
                    >
                        <li
                            key={1}
                            style={styles.profileDropdown.modal.li}
                            onClick={this.viewProfile}
                        >
                            View Profile and Settings
                        </li>
                    </Link>
                    <Link
                        location="/login"
                        style={styles.link}
                    >
                        <li
                            key={2}
                            style={styles.profileDropdown.modal.li}
                            onClick={this.logout}
                        >
                            Logout
                        </li>
                    </Link>
                </ul>
            </DimModal>
        )
    }
}

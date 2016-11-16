import React from "react";
import Radium from "radium";

import styles from "~/group/styles";
import Button from "~/shared/components/forms/Button";
import AddMemberModal from "~/group/components/AddMemberModal";
import { modalProps } from "~/util/modal";
import { connect } from "react-redux";

@Radium
class InviteMemberButton extends React.Component {

    state = {
        isModalOpen: false,
    }

    render() {
        return (
            <div>
                <Button
                    style={styles.inviteButton}
                    value="Add Members"
                    onClick={() => this.setState({ isModalOpen: true, })}
                />

                <AddMemberModal
                    { ...modalProps(this, "isModalOpen") }
                />
            </div>
        )
    }
}

export default connect()(InviteMemberButton);

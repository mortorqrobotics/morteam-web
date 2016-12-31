import React from "react";
import Radium from "radium";

import UserList from "~/shared/components/UserList";
import { deleteUser } from "~/group/actions";
import { modalProps } from "~/util/modal";
import { connect } from "react-redux";

@Radium
class Middle extends React.Component {

    state = {
        isModalOpen: false,
    }

    render() {
        return (
            <UserList
                users={this.props.users}
                handleDeleteUser={(userId) => this.props.dispatch(deleteUser(userId))}
                confirmModal={{
                    ...modalProps(this, "isModalOpen"),
                    text: "Are you sure you would like to remove that user from this group?",
                    grayConfirm: false,
                }}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

export default connect(mapStateToProps)(Middle);

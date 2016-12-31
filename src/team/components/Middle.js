import React from "react";
import Radium from "radium";

import UserList from "~/shared/components/UserList";
import { deleteUser } from "~/team/actions";
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
                    text: "Warning: Removing someone from a team is not"
                        + " easily reversible. Do not do this unless you"
                        + " really mean to.",
                    grayConfirm: true,
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

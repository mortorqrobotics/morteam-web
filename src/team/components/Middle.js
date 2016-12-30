import React from "react";
import Radium from "radium";

import UserList from "~/shared/components/UserList";
import { deleteUser } from "~/team/actions";
import { connect } from "react-redux";

@Radium
class Middle extends React.Component {

    render() {
        return (
            <UserList
                users={this.props.users}
                handleDeleteUser={(userId) => this.props.dispatch(deleteUser(userId))}
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

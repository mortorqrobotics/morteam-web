import React from "react";
import Radium from "radium";

import UserList from "~/shared/components/UserList";
import { deleteUser } from "~/group/actions";
import { connect } from "react-redux";

@Radium
class Middle extends React.Component {

    render() {
        return (
            <UserList
                users={this.props.users}
                deleteModal={{
                    handleDeleteUser: (userId) => this.props.dispatch(deleteUser(userId)),
                    text: "Are you sure you would like to remove that user from this group?",
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

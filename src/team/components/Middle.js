import React from "react";
import Radium from "radium";

import UserList from "~/shared/components/UserList";
import { connect } from "react-redux";

@Radium
class Middle extends React.Component {

    render() {
        return (
            <UserList
                users={this.props.users}
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

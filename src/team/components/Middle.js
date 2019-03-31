import React from "react";
import Radium from "radium";

import UserList from "~/shared/components/UserList";
import styles from "~/team/styles";
import { deleteUser } from "~/team/actions";
import { connect } from "react-redux";

const text = "Warning: Removing someone from a team is not"
    + " easily reversible. Do not do this unless you"
    + " really mean to.";

@Radium
class Middle extends React.Component {

    render() {
        return (
            <div>
                <UserList
                    users={this.props.currentMembers}
                    deleteModal={{
                        handleDeleteUser: (userId) => this.props.dispatch(deleteUser(userId)),
                        text,
                        grayConfirm: true,
                    }}
                />
                <h2 style={styles.h2}>Alumni</h2>
                <hr style={styles.hr} />
                <UserList
                    users={this.props.alumni}
                    deleteModal={{
                        handleDeleteUser: (userId) => this.props.dispatch(deleteUser(userId)),
                        text,
                        grayConfirm: false,
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentMembers: state.users.filter(u => u.position !== "alumnus"),
        alumni: state.users.filter(u => u.position === "alumnus"),
    }
}

export default connect(mapStateToProps)(Middle);

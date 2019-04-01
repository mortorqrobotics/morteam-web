import React from "react";
import Radium from "radium";

import UserList from "~/shared/components/UserList";
import styles from "~/team/styles";
import { positions, getPlural } from "~/util/positions";
import { capitalize } from "~/util";

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
                {positions.map(position => (
                    <div key={position}>
                        <h2 style={styles.h2}>{capitalize(getPlural(position))}</h2>
                        <hr style={styles.hr} />
                        <UserList
                            users={this.props[getPlural(position)]}
                            deleteModal={{
                                handleDeleteUser: (userId) => this.props.dispatch(deleteUser(userId)),
                                text,
                                grayConfirm: true,
                            }}
                        />
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return Object.assign(...positions.map(position => ({
        [getPlural(position)]: state.users.filter(user => user.position === position)
    })));
}

export default connect(mapStateToProps)(Middle);

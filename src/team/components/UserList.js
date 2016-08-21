import React from "react";
import Radium from "radium";

import Grid from "react-bootstrap/lib/Grid";
import UserLabel from "./UserLabel";
import styles from "~/team/styles";
import { connect } from "react-redux";

@Radium
export default class UserList extends React.Component {

    render() {
        return (
            <Grid fluid={true}>
                <div style={styles.memberList}>
                    {this.props.users.map(user => (
                        <UserLabel
                            user={user}
                            key={user._id}
                        />
                    ))}
                </div>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

export default connect(mapStateToProps)(UserList);

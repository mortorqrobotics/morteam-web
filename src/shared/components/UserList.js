import React from "react";
import Radium from "radium";

import Grid from "react-bootstrap/lib/Grid";
import Col from "react-bootstrap/lib/Col";
import ProfilePicture from "~/shared/components/ProfilePicture";
import { fullName } from "~/util";
import styles from "~/shared/styles/userList";

const UserLabel = Radium((props) => {
    let { user } = props;
    return (
        <Col sm={6} md={4} lg={3}>
            <span
                style={styles.userDisplay.span}
                onClick={() => window.location.assign("/profiles/id/" + user._id)}
            >
                <ProfilePicture
                    user={props.user}
                    picSize="small"
                    frameSize={30}
                    hasIndicator
                />
                <span style={styles.userDisplay.name}>
                    {fullName(props.user)}
                </span>
            </span>
        </Col>
    )
})

const UserList = Radium((props) => {
    let { users } = props;
    return (
        <Grid fluid={true}>
            <div style={styles.center}>
                <div style={styles.memberList}>
                    {props.users.map(user => (
                        <UserLabel
                            user={user}
                            key={user._id}
                        />
                    ))}
                </div>
            </div>
        </Grid>
    )
})

export default UserList;


import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Grid from "react-bootstrap/lib/Grid";
import Col from "react-bootstrap/lib/Col";
import ProfilePicture from "~/shared/components/ProfilePicture";
import ConfirmModal from "~/shared/components/ConfirmModal";
import { fullName, currentUser } from "~/util";
import styles from "~/shared/styles/userList";

const RadiumGlyphicon = Radium(Glyphicon);

const UserLabel = Radium((props) => {
    let { user, handleDeleteUser, confirmModal } = props;
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
                {currentUser.isAdmin() && (
                    <RadiumGlyphicon
                        glyph="trash"
                        style={styles.userDisplay.glyph}
                        onClick={(event) => {
                            event.stopPropagation();
                            props.confirmModal.onAfterOpen();
                        }}
                    />
                )}
            </span>
            <ConfirmModal
                action={() => props.handleDeleteUser(user._id)}
                text={props.confirmModal.text}
                grayConfirm={props.confirmModal.grayConfirm}
                isOpen={props.confirmModal.isOpen}
                onAfterOpen={props.confirmModal.onAfterOpen}
                onRequestClose={props.confirmModal.onRequestClose}
            />
        </Col>
    )
})

const UserList = Radium((props) => {
    let { users, handleDeleteUser, confirmModal } = props;
    return (
        <Grid fluid={true}>
            <div style={styles.center}>
                <div style={styles.memberList}>
                    {props.users.map(user => (
                        <UserLabel
                            user={user}
                            key={user._id}
                            handleDeleteUser={(userId) => props.handleDeleteUser(userId)}
                            confirmModal={props.confirmModal}
                        />
                    ))}
                </div>
            </div>
        </Grid>
    )
})

export default UserList;


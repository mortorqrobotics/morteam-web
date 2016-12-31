import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Grid from "react-bootstrap/lib/Grid";
import Col from "react-bootstrap/lib/Col";
import ProfilePicture from "~/shared/components/ProfilePicture";
import ConfirmModal from "~/shared/components/ConfirmModal";
import { fullName, currentUser } from "~/util";
import { modalProps } from "~/util/modal";
import styles from "~/shared/styles/userList";

const RadiumGlyphicon = Radium(Glyphicon);

@Radium
class UserLabel extends React.Component {
    state = { isModalOpen: false };
    render() {
        return (
            <Col sm={6} md={4} lg={3}>
                <span
                    style={styles.userDisplay.span}
                    onClick={() => window.location.assign("/profiles/id/" + user._id)}
                >
                    <ProfilePicture
                        user={this.props.user}
                        picSize="small"
                        frameSize={30}
                        hasIndicator
                    />
                    <span style={styles.userDisplay.name}>
                        {fullName(this.props.user)}
                    </span>
                    {currentUser.isAdmin() && (
                        <RadiumGlyphicon
                            glyph="trash"
                            style={styles.userDisplay.glyph}
                            onClick={(event) => {
                                event.stopPropagation();
                                this.setState({ isModalOpen: true })
                            }}
                        />
                    )}
                </span>
                <ConfirmModal
                    action={() => this.props.deleteModal.handleDeleteUser(this.props.user._id)}
                    { ...this.props.deleteModal }
                    { ...modalProps(this, "isModalOpen") }
                />
            </Col>
        )
    }
}

const UserList = Radium((props) => {
    const { users, deleteModal } = props;
    return (
        <Grid fluid={true}>
            <div style={styles.center}>
                <div style={styles.memberList}>
                    {props.users.map(user => (
                        <UserLabel
                            user={user}
                            key={user._id}
                            deleteModal={props.deleteModal}
                        />
                    ))}
                </div>
            </div>
        </Grid>
    )
})

export default UserList;


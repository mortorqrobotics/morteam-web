import React from "react";
import Radium from "radium";

import Col from "react-bootstrap/lib/Col";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { fullName } from "~/util";
import styles from "~/team/styles";
import ajax from "~/util/ajax";
import { connect } from "react-redux";
import { deleteUser } from "~/team/actions";

const RadiumGlyphicon = Radium(Glyphicon);

@Radium
class UserLabel extends React.Component {

    static propTypes = {
        user: React.PropTypes.object,
    }

    static contextTypes = {
        user: React.PropTypes.object,
    }

    handleUserClick = () => {
        window.location.assign("/profiles/id/" + this.props.user._id);
    }

    handleDeleteUser = async (event) => {
        event.stopPropagation();
        if (window.confirm("Are you sure?")) {
            await this.props.dispatch(deleteUser(this.props.user));
        }
    }

    renderDeleteButton = () => {
        if (this.context.user.isAdmin()) {
            return (
                <RadiumGlyphicon
                    glyph="trash"
                    style={styles.userDisplay.glyph}
                    onClick={this.handleDeleteUser}
                />
            )
        }
    }

    render() {
        return (
            <Col sm={6} md={4} lg={3}>
                <span style={styles.userDisplay.span} onClick={this.handleUserClick}>
                    <img
                        src={this.props.user.profpicpath}
                        style={styles.userDisplay.profPic}
                    />
                    <span style={styles.userDisplay.name}>
                        {fullName(this.props.user)}
                    </span>
                    {this.renderDeleteButton()}
                </span>
            </Col>
        )
    }
}

export default connect()(UserLabel);

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
export default class UserLabel extends React.Component {

    static propTypes = {
        user: React.PropTypes.object,
        onDeleted: React.PropTypes.func,
    }

    static contextTypes = {
        user: React.PropTypes.object,
    }

    handleUserClick = () => {
        window.location.assign("/profiles/id/" + this.props.user._id);
    }

    renderDeleteButton = () => {
        if (this.context.user.isAdmin()) {
            return (
                <RadiumGlyphicon
                    glyph="trash"
                    style={styles.userDisplay.glyph}
                    onClick={this.props.onDeleted}
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
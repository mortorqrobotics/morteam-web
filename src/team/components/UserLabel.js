import React from "react";
import Radium from "radium";

import Col from "react-bootstrap/lib/Col";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { fullName } from "~/util";
import styles from "~/team/styles";
import ajax from "~/util/ajax";

const RadiumGlyphicon = Radium(Glyphicon);

@Radium
export default class UserLabel extends React.Component {

    static propTypes = {
        user: React.PropTypes.object,
    }

    handleUserClick = () => {
        window.location.assign("/profiles/id/" + this.props.user._id);
    }

    handleDeleteUser = async (event) => {
        event.stopPropagation();
        if (window.confirm("Are you sure?")) {
            try {
                let { data } = await ajax.request("delete", "/teams/current/users/id/" + this.props.user._id);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
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
                    <RadiumGlyphicon
                        glyph="trash"
                        style={styles.userDisplay.glyph}
                        onClick={this.handleDeleteUser}
                    />
                </span>
            </Col>
        )
    }
}

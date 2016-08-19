import React from "react";
import Radium from "radium";

import Col from "react-bootstrap/lib/Col";
import { fullName } from "~/util";
import styles from "~/team/styles";

@Radium
export default class UserLabel extends React.Component {
    
    static propTypes = {
        user: React.PropTypes.object,
    }
    
    handleClick = () => {
        window.location.assign("/profiles/id/" + this.props.user._id);
    }
    
    render() {
        console.log(this.props.user)
        return (
            <Col sm={6} md={4} lg={3}>
                <span style={styles.userDisplay.span} onClick={this.handleClick}>
                    <img 
                        src={this.props.user.profpicpath} 
                        style={styles.userDisplay.profPic} 
                    />
                    <span style={styles.userDisplay.name}>
                        {fullName(this.props.user)}
                    </span>
                </span>
            </Col>
        )
    }
}

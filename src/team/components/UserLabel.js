import React from "react";
import Radium from "radium";

import styles from "./styles";

@Radium
export default class UserLabel extends React.Component {
    
    static propTypes = {
        name: React.PropTypes.string,
        profpicpath: React.PropTypes.string,
        userid: React.PropTypes.string,
    }
    
    handleClick = () => {
        window.location.assign("/profiles/id/" + this.props.userid);
    }
    
    render() {
        return (
            <Col sm={6} md={4} lg={3}>
                <span style={styles.userDisplay} onClick={this.handleClick()}>
                    <img 
                        src={this.props.profpicpath} 
                        style={styles.userInfo.profPic} 
                    />
                    <span style={styles.userInfo.name}>
                        {this.props.name}
                    </span>
                </span>
            </Col>
        )
    }
}

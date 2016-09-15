import React from "react";
import Radium from "radium";

import styles from "~/user/styles/leftbar";

@Radium
export default class Position extends React.Component {
    
    static props = {
        position: React.PropTypes.string,
    }
    
    render() {
        return (
           <span style={styles.button}>
                {this.props.position}
           </span>
        )
    }
    
}
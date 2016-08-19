import React from "react";
import Radium from "radium";

import styles from "./styles/styles";

@Radium
export default class GroupHeadings extends React.Component {
    
    static propTypes = {
        name: React.PropTypes.string,
        type: React.PropTypes.string
    }
    
    render() {
        return (
            <div style={styles.group_name}>
                {this.propTypes.name}
            </div>
            <div style={styles.group_type}>
                {this.propTypes.type}
            </div>
        )
    }
    
}
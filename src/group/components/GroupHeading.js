import React from "react";
import Radium from "radium";

import styles from "~/group/styles/styles";

@Radium
export default class GroupHeadings extends React.Component {
    
    static propTypes = {
        name: React.PropTypes.string,
        type: React.PropTypes.string
    }

    render() {
        return (
            <div>
                <h1 style={styles.groupName}>
                    {this.props.name}
                </h1>
                <h4>{this.props.type}</h4>
            </div>
        )
    }

}

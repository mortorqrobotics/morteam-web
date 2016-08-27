import React from "react";
import Radium from "radium";

import styles from "~/drive/styles";

@Radium
export default class File extends React.Component {

    static propTypes = {
        file: React.PropTypes.object,
    }

    render() {
        return (
            <div style={styles.frame}>
                {this.props.file.name}
            </div>
        )
    }

}

import React from "react";
import Radium from "radium";

import styles from "~/drive/styles";

@Radium
export default class File extends React.Component {

    static propTypes = {
        file: React.PropTypes.object,
    }

    handleDownload = () => {
        window.location.assign("/api/files/id/" + this.props.file._id);
    }

    render() {
        return (
            <div style={styles.frame} onClick={this.handleDownload}>
                {this.props.file.name}
            </div>
        )
    }

}

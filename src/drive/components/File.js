import React from "react";
import Radium from "radium";

import styles from "~/drive/styles";
import { connect } from "react-redux";
import { getFile } from "~/drive/actions";

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

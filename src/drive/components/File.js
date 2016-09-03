import React from "react";
import Radium from "radium";

import styles from "~/drive/styles";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { getSize } from "~/util/size";

@Radium
export default class File extends React.Component {

    static propTypes = {
        file: React.PropTypes.object,
    }

    static contextTypes = {
        user: React.PropTypes.object,
    }


    renderDelete = () => {
        if (this.context.user._id === this.props.file.creator
            || this.context.user.isAdmin()) {
            return (
                <Glyphicon glyph="trash" style={styles.description.trash} />
            );
        }
    }

    getColor = () => {
        switch (this.props.file.type) {
            case "image":
                return "#b9b9b9"
            case "word":
                return "#268dd7"
            case "pdf":
                return "#FF5930"
            case "audio":
                return "#ff6666"
            case "keynote":
                return "#c62400"
            case "spreadsheet":
                return "#33B533"
            default:
                return "#ffc547"
        }
    }

    handleDownload = () => {
        window.location.assign("/api/files/id/" + this.props.file._id);
    }

    render() {
        return (
            <div
                style={[styles.frame, { backgroundColor: this.getColor() }]}
                onClick={this.handleDownload}
            >
                <span style={styles.fileTitle}>
                    <span style={styles.description.name}>
                        {this.props.file.name}
                    </span>
                    <span style={styles.description.size}>
                        {getSize(this.props.file)}
                    </span>
                    {this.renderDelete()}
                </span>
            </div>
        )
    }

}

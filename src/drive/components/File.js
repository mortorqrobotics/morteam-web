import React from "react";
import Radium from "radium";

import styles from "~/drive/styles";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { getSize, getColor, getHoverColor, getPreviewSrc } from "~/util/file";

import { connect } from "react-redux";
import { deleteFile } from "~/drive/actions";

@Radium
export default class File extends React.Component {

    static propTypes = {
        file: React.PropTypes.object,
    }

    static contextTypes = {
        user: React.PropTypes.object,
    }

    getStyle = () => {
        return {
            backgroundColor: getColor(this.props.file),
            ":hover": {
                backgroundColor: getHoverColor(this.props.file),
            }
        }
    }

    handleDeleteFile = (event) => {
        event.stopPropagation();
        if (window.confirm("Are you sure?")) { // TODO: get rid of this
            this.props.dispatch(deleteFile(this.props.file));
        }
    }

    renderDelete = () => {
        if (this.context.user._id === this.props.file.creator
            || this.context.user.isAdmin()) {
            return (
                <Glyphicon
                    glyph="trash"
                    style={styles.description.trash}
                    onClick={this.handleDeleteFile}
                />
            );
        }
    }

    handleDownload = () => {
        window.location.assign("/api/files/id/" + this.props.file._id);
    }

    render() {
        return (
            <div
                style={[styles.frame, this.getStyle()]}
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

                <img
                    src={getPreviewSrc(this.props.file)}
                    style={styles.preview}
                />

            </div>
        )
    }

}

export default connect()(File);

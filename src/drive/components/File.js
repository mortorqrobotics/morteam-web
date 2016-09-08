import React from "react";
import Radium from "radium";

import styles from "~/drive/styles";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { getSize, getColor, getHoverColor, getPreviewSrc } from "~/util/file";
import Button from "~/shared/components/forms/Button";

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

    state = {
        isDeleteMenuOpen: false,
    }

    getStyle = () => {
        return {
            backgroundColor: getColor(this.props.file),
            ":hover": {
                backgroundColor: getHoverColor(this.props.file),
            }
        }
    }

    handleDeleteMenuOpen = (event) => {
        event.stopPropagation();
        this.setState({
            isDeleteMenuOpen: true
        });
    }
    
    handleDeleteMenuClose = (event) => {
        event.stopPropagation();
        this.setState({
            isDeleteMenuOpen: false
        });
    }

    handleDeleteFile = (event) => {
        event.stopPropagation();
        this.props.dispatch(deleteFile(this.props.file));
    }

    handleDownload = () => {
        window.location.assign("/api/files/id/" + this.props.file._id);
    }

    renderDeleteButton = () => {
        if (this.context.user._id === this.props.file.creator
            || this.context.user.isAdmin()) {
            return (
                <Glyphicon
                    glyph="trash"
                    style={styles.description.trash}
                    onClick={this.handleDeleteMenuOpen}
                />
            );
        }
    }

    handleFileRender = () => {
        if (!this.state.isDeleteMenuOpen) {
            return (
                <div>
                    <span style={styles.fileTitle}>
                        <span style={styles.description.name}>
                            {this.props.file.name}
                        </span>
                        <span style={styles.description.size}>
                            {getSize(this.props.file)}
                        </span>
                        {this.renderDeleteButton()}
                    </span>

                    <img
                        src={getPreviewSrc(this.props.file)}
                        style={styles.preview}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <p style={styles.deleteMenu.p}>Are you sure</p>
                    <Button
                        value="yes"
                        style={styles.deleteMenu.button}
                        onClick={this.handleDeleteFile}
                    />
                    <Button
                        value="no"
                        style={styles.deleteMenu.button}
                        onClick={this.handleDeleteMenuClose}
                    />
                </div>
            )
        }
    }

    render() {
        return (
            <div
                style={[styles.frame, this.getStyle()]}
                onClick={this.handleDownload}
            >
                {this.handleFileRender()}
            </div>
        )
    }

}

export default connect()(File);

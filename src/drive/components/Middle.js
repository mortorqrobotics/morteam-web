import React from "react";
import Radium from "radium";

import styles from "~/drive/styles";
import Grid from "react-bootstrap/lib/Grid";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import File from "~/drive/components/File";
import AddFileModal from "~/drive/components/AddFileModal";
import Masonry from "react-masonry-component";

import { modalProps } from "~/util/modal";
import { connect } from "react-redux";

const RadiumGrid = Radium(Grid);

@Radium
class Middle extends React.Component {

    state = {
        isModalOpen: false,
    }

    render() {
        return (
            <div>
                <RadiumGrid
                    fluid={true}
                    style={ this.props.isLeftbarOpen ? styles.docList.leftbarOpen : styles.docList.leftbarClosed }
                >

                    {this.props.selectedFolder && (
                        <Masonry>
                            <div
                                style={[styles.frame, styles.addFile]}
                                onClick={() => this.setState({ isModalOpen: true })}
                            >
                                <Glyphicon glyph="plus" style={styles.glyph} />
                            </div>

                            {this.props.files.map(file => (
                                <File file={file} key={file._id} />
                            ))}
                        </Masonry>
                    )}

                </RadiumGrid>

                <AddFileModal
                    { ...modalProps(this, "isModalOpen") }
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.files,
        selectedFolder: state.selectedFolder,
        isLeftbarOpen: state.isLeftbarOpen,
    }
}

export default connect(mapStateToProps)(Middle);

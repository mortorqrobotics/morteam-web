import React from "react";
import Radium from "radium";

import styles from "~/drive/styles";
import Grid from "react-bootstrap/lib/Grid";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import File from "~/drive/components/File";
import AddFileModal from "~/drive/components/AddFileModal";
import { modalProps } from "~/util/modal";
import { connect } from "react-redux";

@Radium
export default class Middle extends React.Component {
    
    state = {
        isModalOpen: false,
    }

    render() {
        return (
            <div>
                <Grid fluid={true} style={styles.docList}>
                    
                    <div 
                        style={[styles.frame, styles.addFile]} 
                        onClick={() => this.setState({ isModalOpen: true })}
                    >
                        <Glyphicon glyph="plus" style={styles.glyph} /> 
                    </div>
                    
                    {this.props.files.map(file => (
                        <File key={file._id} />
                    ))}
                    
                </Grid>
                
                <AddFileModal
                    { ...modalProps(this, "isModalOpen") }
                    folder={this.props.selectedFolder}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.files,
        selectedFolder: state.selectedFolder,
    }
}

export default connect(mapStateToProps)(Middle);

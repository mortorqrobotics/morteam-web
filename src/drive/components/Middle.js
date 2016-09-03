import React from "react";
import Radium from "radium";

import styles from "~/drive/styles";
import Grid from "react-bootstrap/lib/Grid";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import File from "~/drive/components/File";
import AddFileModal from "~/drive/components/AddFileModal";
//import Isotope from "isotope-layout/js/isotope";

import { modalProps } from "~/util/modal";
import { connect } from "react-redux";

@Radium
export default class Middle extends React.Component {

    state = {
        isModalOpen: false,
    }
    
    componentDidMount = () => {
        $(this.refs.list).isotope();
    }

    render() {
        return (
            <div>
                <Grid fluid={true} style={styles.docList}>
                
                    <div  ref="list">
                        <div
                            style={[styles.frame, styles.addFile]}
                            onClick={() => this.setState({ isModalOpen: true })}
                        >
                            <Glyphicon glyph="plus" style={styles.glyph} />
                        </div>
    
                        {this.props.files.map(file => (
                            <File file={file} key={file._id} />
                        ))}
                    </div>

                </Grid>

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
    }
}

export default connect(mapStateToProps)(Middle);

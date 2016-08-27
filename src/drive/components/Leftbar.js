import React from "react";
import Radium from "radium";

import { withCss } from "~/util/component";
import { range } from "~/util";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { LeftbarContainer, LeftbarItem, LeftbarButton } from "~/shared/components/leftbar";
import { modalProps } from "~/util/modal";
import AddModal from "~/drive/components/AddModal";
import SortDropdown from "~/drive/components/SortDropdown";
import styles from "~/drive/styles";
import ajax from "~/util/ajax";
import { connect } from "react-redux";

@Radium
class Leftbar extends React.Component {
    
    state = {
        selectedFolder: {},
        isModalOpen: false,
    }
    
    handleFolderChange = (folder) => {
        this.setState({
            selectedFolder: folder
        });
    }
    
    render() {
        return (
            <LeftbarContainer>

                <LeftbarItem>
                    <SortDropdown />
                </LeftbarItem>
                
                <LeftbarButton
                    onClick={() => this.setState({ isModalOpen: true })}
                >
                    <Glyphicon glyph="plus" style={styles.glyph} />
                    New Drive Group
                </LeftbarButton>

                {this.props.folders.map(folder => (
                    <LeftbarButton
                        isSelected={folder === this.state.selectedFolder}
                        key={folder._id}
                        onClick={() => this.handleFolderChange(folder)}
                    >
                        <Glyphicon glyph="folder-open" style={styles.glyph} />
                        {folder.name}
                    </LeftbarButton>
                ))}

                <AddModal
                    { ...modalProps(this, "isModalOpen") }
                />

            </LeftbarContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        folders: state.folders,
    }
}

export default connect(mapStateToProps)(Leftbar);

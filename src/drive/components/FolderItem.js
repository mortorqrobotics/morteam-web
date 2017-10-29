import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import OptionsModal from "~/shared/components/OptionsModal";
import { modalProps } from "~/util/modal";
import { LeftbarButton } from "~/shared/components/leftbar";
import { deleteFolder, setFolder, setFolderName } from "~/drive/actions";
import { currentUser } from "~/util";
import styles from "~/drive/styles";
import { connect } from "react-redux";

const RadiumGlyphicon = Radium(Glyphicon);

@Radium
class FolderItem extends React.Component {

    static propTypes = {
        folder: React.PropTypes.object,
    }

    state = {
        isOptionsModalOpen: false,
    }

    handleOpenOptions = (event) => {
        event.stopPropagation();
        this.setState({
            isOptionsModalOpen: true,
        });
    }

    render() {
        return (
            <LeftbarButton
                isSelected={this.props.folder === this.props.selectedFolder}
                onClick={() => this.props.dispatch(setFolder(this.props.folder))}
            >
                <RadiumGlyphicon glyph="folder-open" style={styles.left.glyph} />
                {this.props.folder.name}

                {!this.props.folder.defaultFolder && (
                    <RadiumGlyphicon
                        glyph="cog"
                        style={styles.description.cog}
                        onClick={this.handleOpenOptions}
                    />
                )}
                {!this.props.folder.defaultFolder && (
                    <OptionsModal
                        obj={this.props.folder}
                        hasNameEdit={this.props.folder.creator === currentUser._id
                            || currentUser.isAdmin()
                        }
                        hasAudienceList={true}
                        hasDelete={this.props.folder.creator === currentUser._id
                            || currentUser.isAdmin()
                        }
                        onDelete={() => this.props.dispatch(deleteFolder(this.props.folder._id))}
                        onNameChange={(name) => this.props.dispatch(setFolderName({
                            folderId: this.props.folder._id,
                            name,
                        }))}
                        { ...modalProps(this, "isOptionsModalOpen")}
                    />
                )}
            </LeftbarButton>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedFolder: state.selectedFolder,
    }
}

export default connect(mapStateToProps)(FolderItem);

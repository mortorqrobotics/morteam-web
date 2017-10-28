import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import OptionsModal from "~/shared/components/OptionsModal";
import { modalProps } from "~/util/modal";
import { LeftbarButton } from "~/shared/components/leftbar";
import { deleteFolder, setFolder } from "~/drive/actions";
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

    handleDeleteFolder = (event) => {
        event.stopPropagation();
        this.props.dispatch(deleteFolder(this.props.folder));
    }

    render() {
        return (
            <LeftbarButton
                isSelected={this.props.folder === this.props.selectedFolder}
                onClick={() => this.props.dispatch(setFolder(this.props.folder))}
            >
                <RadiumGlyphicon glyph="folder-open" style={styles.left.glyph} />
                {this.props.folder.name}

                <RadiumGlyphicon
                    glyph="cog"
                    style={styles.description.cog}
                    onClick={this.handleOpenOptions}
                />

                <OptionsModal
                    obj={this.props.folder}
                    hasNameEdit={true}
                    hasAudienceList={true}
                    hasDelete={this.props.folder.creator === currentUser._id
                        || currentUser.isAdmin()
                    }
                    onDelete={() => this.props.dispatch(deleteFolder(this.props.folder))}
                    { ...modalProps(this, "isOptionsModalOpen")}
                />
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

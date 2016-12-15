import React from "react";
import Radium from "radium";

import { withCss } from "~/util/component";
import { range } from "~/util";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { LeftbarContainer, LeftbarItem, LeftbarButton } from "~/shared/components/leftbar";
import { leftbarProps } from "~/util/leftbar";
import { modalProps } from "~/util/modal";
import AddFolderModal from "~/drive/components/AddFolderModal";
import SortDropdown from "~/drive/components/SortDropdown";
import styles from "~/drive/styles";
import ajax from "~/util/ajax";
import { setFolder } from "~/drive/actions";
import { connect } from "react-redux";

@Radium
class Leftbar extends React.Component {

    state = {
        isModalOpen: false,
        isLeftbarOpen: true,
    }

    handleFolderChange = async (folder) => {
        await this.props.dispatch(setFolder(folder));
    }

    sortedFolders = () => {
        const folders = this.props.folders;
        if (folders.length === 0) {
            return [];
        }
        const special = [
            folders.find(folder => folder.name === "Team Files"),
            folders.find(folder => folder.name === "Personal Files"),
        ];
        return special.concat(folders.filter(f => special.indexOf(f) === -1));
    }

    render() {
        return (
            <LeftbarContainer { ...leftbarProps(this, "isLeftbarOpen") }>

                <LeftbarItem>
                    <SortDropdown />
                </LeftbarItem>

                <LeftbarButton
                    onClick={() => this.setState({ isModalOpen: true })}
                >
                    <Glyphicon glyph="plus" style={styles.left.glyph} />
                    New Folder
                </LeftbarButton>

                {this.sortedFolders().map(folder => (
                    <LeftbarButton
                        isSelected={folder === this.props.selectedFolder}
                        key={folder._id}
                        onClick={() => this.handleFolderChange(folder)}
                    >
                        <Glyphicon glyph="folder-open" style={styles.left.glyph} />
                        {folder.name}
                    </LeftbarButton>
                ))}

                <AddFolderModal
                    { ...modalProps(this, "isModalOpen") }
                />

            </LeftbarContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        folders: state.folders,
        selectedFolder: state.selectedFolder,
    }
}

export default connect(mapStateToProps)(Leftbar);

import React from "react";
import Radium from "radium";

import { withCss } from "~/util/component";
import { range } from "~/util";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { LeftbarContainer, LeftbarItem, LeftbarButton, MultiTeamTabs } from "~/shared/components/leftbar";
import { leftbarProps } from "~/util/leftbar";
import { modalProps } from "~/util/modal";
import AddFolderModal from "~/drive/components/AddFolderModal";
import SortDropdown from "~/drive/components/SortDropdown";
import styles from "~/drive/styles";
import ajax from "~/util/ajax";
import { setFolder, setTab } from "~/drive/actions";
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

    render() {
        return (
            <LeftbarContainer { ...leftbarProps(this, "isLeftbarOpen") }>
                <MultiTeamTabs
                    actions={{
                        intra: () => this.props.dispatch(setTab("intra")),
                        inter: () => this.props.dispatch(setTab("inter")),
                    }}
                    currentTab={this.props.currentTab}
                />
                <LeftbarItem>
                    <SortDropdown />
                </LeftbarItem>

                <LeftbarButton
                    onClick={() => this.setState({ isModalOpen: true })}
                >
                    <Glyphicon glyph="plus" style={styles.left.glyph} />
                    New Folder
                </LeftbarButton>

                {this.props.folders.map(folder => (
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
        currentTab: state.currentTab,
    }
}

export default connect(mapStateToProps)(Leftbar);

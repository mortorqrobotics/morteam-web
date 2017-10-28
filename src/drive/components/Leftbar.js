import React from "react";
import Radium from "radium";

import { withCss } from "~/util/component";
import { range, currentUser } from "~/util";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { LeftbarContainer, LeftbarItem, LeftbarButton, MultiTeamTabs } from "~/shared/components/leftbar";
import { leftbarProps } from "~/util/leftbar";
import { modalProps } from "~/util/modal";
import AddFolderModal from "~/drive/components/AddFolderModal";
import SortDropdown from "~/drive/components/SortDropdown";
import FolderItem from "~/drive/components/FolderItem";
import styles from "~/drive/styles";
import ajax from "~/util/ajax";
import { setTab } from "~/drive/actions";
import { connect } from "react-redux";

@Radium
class Leftbar extends React.Component {

    state = {
        isModalOpen: false,
    }

    handleFolderChange = async (folder) => {
        await this.props.dispatch(setFolder(folder));
    }

    render() {
        return (
            <LeftbarContainer { ...leftbarProps(this) }>
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
                    style={(this.props.currentTab === "intra" || currentUser.isAdmin()) ? {} : {display: "none"}}
                >
                    <Glyphicon glyph="plus" style={styles.left.glyph} />
                    New Folder
                </LeftbarButton>

                {this.props.folders.map(folder => (
                    <FolderItem
                        folder={folder}
                    />
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
        isLeftbarOpen: state.isLeftbarOpen,
    }
}

export default connect(mapStateToProps)(Leftbar);

import React from "react";
import Radium from "radium";

import { withCss } from "~/util/component";
import { range } from "~/util";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { LeftbarContainer, LeftbarItem, LeftbarButton } from "~/shared/components/leftbar";
import ajax from "~/util/ajax";
import { connect } from "react-redux";

@Radium
class Leftbar extends React.Component {
    
    state = {
        selectedFolder: {},
        modalIsOpen: false,
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
                    
                </LeftbarItem>
                
                <LeftbarButton onClick>
                    <Glyphicon glyph="plus" />
                    New Drive Group
                </LeftbarButton>

                {this.props.folders.map(folder => (
                    <LeftbarButton
                        isSelected={folder === this.state.selectedFolder}
                        key={folder._id}
                        onClick={() => this.handleFolderChange(folder)}
                    >
                        <Glyphicon glyph="folder" />
                    </LeftbarButton>
                ))}

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

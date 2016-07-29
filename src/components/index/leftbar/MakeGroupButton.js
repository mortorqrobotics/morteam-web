import React from "react";
import Radium from "radium";

import LeftbarButton from "./LeftbarButton";
import MakeGroupModal from "./groupModal/MakeGroupModal";

@Radium
export default class MakeGroupButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        }
    }

    static contextTypes = {
        user: React.PropTypes.object,
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    }

    render() {
        return (
            <div>
                <LeftbarButton text="Make a Group" onClick={this.openModal} />
                <MakeGroupModal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.openModal}
                    onRequestClose={this.closeModal}
                />
            </div>
        )
    }
}

import React from "react";
import Radium from "radium";
import Modal from "react-modal";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import styles from "~/shared/styles/navbar";
import NavbarDropdownItem from "./NavbarDropdownItem";

@Radium
export default class NavbarDropdown extends React.Component {

    constructor(props) {
        super(props);
    this.state = {
        isModalOpen: true, 
        }
    }
    openModal = () => {
        this.setState({
            isModalOpen: true, 
        });
    }
    render() {
        return (
            <div>
                <Glyphicon glyph="menu" />
                <Modal
                    isOpen={this.state.isModalOpen}
                    onAfterOpen={() => this.setState({ isModalOpen: true })}
                    onRequestClose={() => this.setState({ isModalOpen: false })}
                >
                    <div>
                        <NavbarDropdownItem path="/" text="Home"/>
                        <NavbarDropdownItem path="/chat" text="Chat" />
                        <NavbarDropdownItem path="/drive" text="Drive"/>
                        <NavbarDropdownItem path="/cal" text="Calendar"/>
                        <NavbarDropdownItem path="/networks" text="Networks"/>
                    </div>
                </Modal>
            </div>
        )
    }
}

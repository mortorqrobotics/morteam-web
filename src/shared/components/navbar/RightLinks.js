import React from "react";
import Radium from "radium";

import styles from "~/shared/styles/navbar";
import ProfileDropdownModal from "./ProfileDropdownModal";
import { currentUser } from "~/util";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

const Item = ({path, text}) =>{
    return(
        <p
            style={styles.navbarDropdown.item}
            onClick={() => window.location.assign(path)}
        > 
            {text}
        </p>
    )
}

@Radium
export default class ProfileDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            isDropdownOpen: false, 
        }
    }

    openModal = () => {
        this.setState({
            isModalOpen: true
        })
    }
    
    toggleDropdown = () => {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen,
        });
    }
    
    renderDropdown = () => {
        if(this.state.isDropdownOpen) {
            return (
                <div style={styles.navbarDropdown.div}>
                    <Item path="/" text="Home" />
                    <Item path="/chat" text="Chat" />
                    <Item path="/drive" text="Drive" />
                    <Item path="/cal" text="Calendar" />
                    <Item path="/map" text="Map" />
                </div>
            ) 
        }
    }
    

    render() {
        return (
        <div>
            <div style={styles.profileDropdown.div}>
                <li style={styles.navbarDropdown.li} onClick={this.toggleDropdown}>
                    <Glyphicon glyph="menu-hamburger" />
                </li>
                <img
                    style={styles.profileDropdown.profPic}
                    src={currentUser.profpicpath + "-60"}
                    onClick={this.openModal}
                />
                <span
                    style={styles.profileDropdown.span}
                    onClick={this.openModal}
                >
                    {currentUser.firstname}
                </span>

                <ProfileDropdownModal
                    isOpen={this.state.isModalOpen}
                    onAfterOpen={() => this.setState({ isModalOpen: true })}
                    onRequestClose={() => this.setState({ isModalOpen: false })}
                />
            </div>
                {this.renderDropdown()}
            </div>
        )
    }
}

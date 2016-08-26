import React from "react";
import Radium from "radium";
import Modal from "react-modal";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import styles from "~/shared/styles/navbar";
import NavbarDropdownItem from "./NavbarDropdownItem";

@Radium
export default class NavbarDropdown extends React.Component {

    
    state = {
        isDropdownOpen: false, 
    }
    
    toggleDropdown = () => {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen, 
        });
    }
    renderDropdown = () => {
        if(this.state.isDropdownOpen){
            return(
                <div>
                    <NavbarDropdownItem path="/" text="Home"/>
                    <NavbarDropdownItem path="/chat" text="Chat" />
                    <NavbarDropdownItem path="/drive" text="Drive"/>
                    <NavbarDropdownItem path="/cal" text="Calendar"/>
                    <NavbarDropdownItem path="/networks" text="Networks"/>
                </div>
            )
        }
    }
    render() {
        return (
            <div style={styles.navbarDropdown.container}>
                <Glyphicon 
                    glyph="menu" 
                    onClick= {this.toggleDropDown} 
                    style={styles.navbarDropdown.Glyphicon}
                />
                {this.renderDropdown}
            </div>
        )
    }
}

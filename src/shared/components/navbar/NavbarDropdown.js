import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import styles from "~/shared/styles/navbar";

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
export default class NavbarDropdown extends React.Component {
    
    state = {
        isDropdownOpen: false, 
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
            <div style={styles.navbarDropdown.container}>
                {this.renderDropdown()}
            </div>
        )
    }
}

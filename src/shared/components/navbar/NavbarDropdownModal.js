import React from "react";
import Radium from "radium";

import styles from "~/shared/styles/navbar";
import NavbarDropdownItem from "NavbarDropdownItem";

@Radium
export default class NavbarDropdownModal extends React.Component {

    render() {
        return (
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

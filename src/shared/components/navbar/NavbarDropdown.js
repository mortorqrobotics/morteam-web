import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import styles from "~/shared/styles/navbar";

@Radium
export default class NavbarDropdown extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Glyphicon glyph="menu"/>
            </div>
        )
    }
}

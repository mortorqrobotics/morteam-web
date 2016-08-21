import React from "react";
import Radium from "radium";

import styles from "~/shared/styles/navbar";

@Radium
export default class NavbarDropdownItem extends React.Component {
    static propTypes = {
        path: React.PropTypes.string,
        text: React.PropTypes.string,
    }
    
    onClick = () =>{
        window.location.assign(this.props.path);
    }
    render() {
        return (
            <p path={this.props.paths}>
                {this.props.text}
            </p>
        )
    }
}

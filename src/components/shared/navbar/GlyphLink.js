import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";

let styles = {
    li: {
        textAlign: "center",
        display: "inline-block",
        width: "35px",
        fontSize: "20px",
        height: "100%",
        paddingTop: "7px",
        position: "relative",
        marginLeft: "-5px",
        ":hover": {
            backgroundColor: "#FFB524",
            cursor: "pointer",
        },
        "@media screen and (max-width: 820px)": {
            display: "none",
        }
    },
    glyph: {
        position: "relative",
        top: "1px",
        display: "inline-block",
        fontFamily: "'Glyphicons Halflings'",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "1",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
    }
}
    //TODO: fix styling

@Radium
export default class SearchBox extends React.Component {

    static propTypes = {
        path: React.PropTypes.string,
        glyph: React.PropTypes.string,
    }

    onClick = () => {
        window.location.assign(this.props.path);
    }

    render() {
        return (
            <li style={styles.li} onClick={this.onClick}>
                <Glyphicon style={styles.glyph} glyph={this.props.glyph} />
            </li>
        )
    }
}

import React from "react";
import Radium from "radium";

import NavbarTitle from "./NavbarTitle";
import SearchBox from "./SearchBox";
import GlyphLink from "./GlyphLink";

let styles = {
    ul: {
        height: "100%",
        padding: "0",
    },
}

@Radium
export default class NavbarList extends React.Component {

    render() {
        return (
            <ul style={styles.ul}>
                <NavbarTitle />
                <SearchBox />
                <GlyphLink path="/chat" glyph="comment"/>
                <GlyphLink path="/drive" glyph="hdd"/>
                <GlyphLink path="/cal" glyph="calendar"/>
                <GlyphLink path="/networks" glyph="globe"/>
                <GlyphLink path="http://www.scout.morteam.com" glyph="pencil"/>
            </ul>
        )
    }
}

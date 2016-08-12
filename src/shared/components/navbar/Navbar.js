import React from "react";
import Radium from "radium";

import NavbarTitle from "./NavbarTitle";
import SearchBox from "./SearchBox";
import GlyphLink from "./GlyphLink";
import ProfileDropdown from "./ProfileDropdown";
import styles from "~/shared/styles/navbar";

@Radium
export default class Navbar extends React.Component {

    render() {
        return (
            <div style={styles.container}>
                <ul style={styles.ul}>
                    <NavbarTitle />
                    <SearchBox />
                    <GlyphLink path="/chat" glyph="comment"/>
                    <GlyphLink path="/drive" glyph="hdd"/>
                    <GlyphLink path="/cal" glyph="calendar"/>
                    <GlyphLink path="/networks" glyph="globe"/>
                    <GlyphLink path="http://www.scout.morteam.com" glyph="pencil"/>
                    <ProfileDropdown />
                </ul>
            </div>
        )
    }
}

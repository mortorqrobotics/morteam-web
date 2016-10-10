import React from "react";
import Radium from "radium";

import NavbarTitle from "./NavbarTitle";
import SearchBox from "./SearchBox";
import GlyphLink from "./GlyphLink";
import ProfileDropdown from "./ProfileDropdown";
import NavbarDropdown from "./NavbarDropdown";
import styles from "~/shared/styles/navbar";

@Radium
export default class Navbar extends React.Component {

    render() {
        return (
            <div style={styles.container}>
                <ul style={styles.ul}>
                    <NavbarTitle />
                    <SearchBox />
                    <GlyphLink path="/chat" glyph="comment" name="chat"/>
                    <GlyphLink path="/drive" glyph="hdd" name="drive"/>
                    <GlyphLink path="/cal" glyph="calendar" name="calendar"/>
                    <GlyphLink path="/map" glyph="globe" name="map"/>
                    <GlyphLink path="http://www.scout.morteam.com" glyph="pencil"/>
                    <NavbarDropdown />
                    <ProfileDropdown />
                </ul>
            </div>
        )
    }
}

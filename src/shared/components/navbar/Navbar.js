import React from "react";
import Radium from "radium";

import SearchBox from "./SearchBox";
import GlyphLink from "./GlyphLink";
import RightLinks from "./RightLinks";
import styles from "~/shared/styles/navbar";

@Radium
export default class Navbar extends React.Component {
    
    render() {
        return (
            <div style={styles.container}>
                <ul style={styles.ul}>
                    <li 
                        style={styles.title} 
                        onClick={() => window.location.assign("/")}
                    >
                        MorTeam
                    </li>
                    <SearchBox />
                    <GlyphLink path="/chat" glyph="comment" name="chat"/>
                    <GlyphLink path="/drive" glyph="hdd" name="drive"/>
                    <GlyphLink path="/cal" glyph="calendar" name="calendar"/>
                    <GlyphLink path="/map" glyph="globe" name="map"/>
                    <GlyphLink path="http://www.scout.morteam.com" glyph="pencil"/>
                    <RightLinks />
                </ul>
            </div>
        )
    }
}

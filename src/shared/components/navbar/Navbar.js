import React from "react";
import Radium from "radium";

import SearchBox from "./SearchBox";
import GlyphLink from "./GlyphLink";
import RightLinks from "./RightLinks";
import Link from "~/shared/components/Link";
import styles from "~/shared/styles/navbar";
import { connect } from "react-redux";

const DropdownItem = Radium(({path, text}) => {
    return (
        <Link
            location={path}
            style={styles.link}
        >
            <p style={styles.navbarDropdown.item}>
                {text}
            </p>
        </Link>
    )
})

const getSubdomain = (sub) => `//${sub}.${window.location.host}`;

@Radium
class Navbar extends React.Component {

    render() {
        return (
            <div>
                <div style={styles.container}>
                    <ul style={styles.ul}>
                        <Link
                            style={[styles.link, styles.title]}
                            text="MorTeam"
                            location="/"
                        />
                        <SearchBox />
                        <GlyphLink path="/chat" glyph="comment" name="chat"/>
                        <GlyphLink path="/drive" glyph="hdd" name="drive"/>
                        <GlyphLink path="/cal" glyph="calendar" name="calendar"/>
                        <GlyphLink path="/map" glyph="globe" name="map"/>
                        <GlyphLink path={getSubdomain("scout")} glyph="pencil"/>
                        <GlyphLink path={getSubdomain("parts")} glyph="wrench"/>
                        <RightLinks />
                    </ul>
                </div>
                <div style={this.props.isDropdownOpen ? styles.navbarDropdown.div : {display: "none"}}>
                    <DropdownItem path="/" text="Home" />
                    <DropdownItem path="/chat" text="Chat" />
                    <DropdownItem path="/drive" text="Drive" />
                    <DropdownItem path="/cal" text="Calendar" />
                    <DropdownItem path="/map" text="Map" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDropdownOpen: state.isDropdownOpen,
    }
}

export default connect(mapStateToProps)(Navbar);


import React from "react";
import Radium from "radium";

import SearchBox from "./SearchBox";
import GlyphLink from "./GlyphLink";
import RightLinks from "./RightLinks";
import styles from "~/shared/styles/navbar";
import { connect } from "react-redux";

const DropdownItem = ({path, text}) =>{
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
class Navbar extends React.Component {
    
    render() {
        return (
            <div>
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


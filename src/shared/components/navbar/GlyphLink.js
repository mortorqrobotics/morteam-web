import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Link from "~/shared/components/Link";
import styles from "~/shared/styles/navbar";

@Radium
export default class SearchBox extends React.Component {

    static propTypes = {
        path: React.PropTypes.string,
        glyph: React.PropTypes.string,
        name: React.PropTypes.string,
    }

    static contextTypes = {
        pageName: React.PropTypes.string,
    }

    onClick = () => {
        window.location.assign(this.props.path);
    }

    render() {
        return (
            <Link
                location={this.props.path}
                style={[
                    styles.link,
                    styles.glyphLink.li,
                    this.props.name === this.context.pageName ?
                        styles.glyphLink.selected : styles.glyphLink.unselected
                ]}
                >
                     <Glyphicon glyph={this.props.glyph} />
            </Link>
        )
    }
}

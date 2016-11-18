import React from "react";
import Radium from "radium";

import styles from "~/shared/styles/audience";

@Radium
export default class AudienceItem extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func,
        isSelected: React.PropTypes.bool,
        item: React.PropTypes.object,
        text: React.PropTypes.string,
        isGroup: React.PropTypes.bool,
    }

    constructor(props) {
        super(props);

        this.state = {
            isSelected: false
        }
    }

    getStyle() {
        if (this.props.isSelected) {
            return styles.audienceItem.selected;
        }
        return this.props.isGroup ? styles.audienceItem.group : styles.audienceItem.user;
    }

    render() {
        return (
            <p
                style={[styles.audienceItem.button, this.getStyle()]}
                onClick={() => this.props.onClick(this.props.item)}
            >
                {this.props.text}
            </p>
        )
    }
}

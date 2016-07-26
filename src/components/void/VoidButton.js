import React from "react";
import Radium from "radium";

import Button from "~/components/shared/forms/Button";

@Radium
export default class VoidButton extends React.Component {

    static propTypes = {
        text: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func,
    }

    render() {
        return (
            <Button
                text={this.props.text}
                onClick={this.props.onClick}
            />
        )
    }
}

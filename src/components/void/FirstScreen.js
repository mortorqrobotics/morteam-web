import React from "react";
import Radium from "radium";

import VoidButton from "./VoidButton";

@Radium
export default class FirstScreen extends React.Component {

    static propTypes = {
        onJoin: React.PropTypes.func.isRequired,
        onCreate: React.PropTypes.func.isRequired,
    }

    render() {
        return (
            <div>
                <VoidButton
                    text="Join a Team"
                    onClick={this.props.onJoin}
                />
                <VoidButton
                    text="Create a Team"
                    onClick={this.props.onCreate}
                />
            </div>
        )
    }

}

import React from "react";
import Radium from "radium";

export default class FirstScreen extends React.Component {

    static propTypes = {
        onJoin: React.PropTypes.func.isRequired,
        onCreate: React.PropTypes.func.isRequired,
    }

    render() {
        return (
            <div>test</div>
        )
    }

}

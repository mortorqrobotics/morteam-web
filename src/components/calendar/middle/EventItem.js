import React from "react";
import Radium from "radium";

import styles from "~/styles/calendar/middle";

@Radium
export default class EventItem extends React.Component {

    static propTypes = {
        event: React.PropTypes.object,
    }

    render() {
        return (
            <li>
                <span>
                    {this.props.event.name}
                </span>
                <br />
                <div>
                    {this.props.event.description}
                </div>
            </li>
        )
    }
}

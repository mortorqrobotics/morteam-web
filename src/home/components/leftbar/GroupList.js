import React from "react";
import Radium from "radium";

import LeftbarButton from "./LeftbarButton";

@Radium
export default class GroupList extends React.Component {

    static propTypes = {
        groups: React.PropTypes.array
    }

    render() {
        return (
            <div>
                {this.props.groups.map(group => (
                    <LeftbarButton
                        text={group.name}
                        glyph="screenshot"
                        onClick={() => window.location.assign("/groups/id/" + group._id)}
                        key={group._id}
                    />
                ))}
            </div>
        )
    }
}

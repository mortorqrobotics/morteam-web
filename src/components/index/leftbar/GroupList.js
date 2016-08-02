import React from "react";
import Radium from "radium";

import GroupItem from "./GroupItem";

@Radium
export default class GroupList extends React.Component {

    static propTypes = {
        groups: React.PropTypes.array
    }

    render() {
        return (
            <div>
                {this.props.groups.map(group => (
                    <GroupItem
                        key={group._id}
                        id={group._id}
                        name={group.name}
                    />
                ))}
            </div>
        )
    }
}

import React from "react";
import Radium from "radium";

import GroupItem from "./GroupItem";

@Radium
export default class GroupList extends React.Component {

    static propTypes = {
        updateGroups: React.PropTypes.func,
        groups: React.PropTypes.array
    }

    componentDidMount = () => {
        this.props.updateGroups();
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

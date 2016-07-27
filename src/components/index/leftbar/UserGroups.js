import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import GroupItem from "./GroupItem";

@Radium
export default class UserGroups extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            groups: []
        };
    }

    componentDidMount = async() => {
        try {
            let { data } = await ajax.request("get", "/groups");
            this.setState({
                groups: data
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <h5>Your Groups</h5>
                {this.state.groups.map(group => (
                    <GroupItem
                        key={group._id}
                        id={group._id}
                        name="group name" //TODO: give groups names
                    />
                ))}
            </div>
        )
    }
}

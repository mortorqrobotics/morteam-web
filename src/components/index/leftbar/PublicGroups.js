import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import GroupItem from "./GroupItem";

@Radium
export default class PublicGroups extends React.Component {

    //TODO: very similiar to UserGroups; should they be combined into one parent componenent to avoid repeated code?

    constructor(props) {
        super(props)

        this.state = {
            groups: []
        };
    }

    componentDidMount = async() => {
        try {
            let { data } = await ajax.request("get", "/groups/public"); //TODO: implement this
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
                <h5>Public Groups</h5>
                {this.state.groups.map(group => (
                    <GroupItem
                        key={group._id}
                        id={group._id}
                        name="group name"
                    />
                ))}
            </div>
        )
    }
}

import React from "react";
import Radium from "radium";

import update from "react/lib/update";
import ajax from "~/util/ajax";
import TextBox from "~/shared/components/forms/TextBox";
import AudienceItem from "./AudienceItem";
import { getGroupName } from "~/util/groups";

let styles = {
    div: {
        height: "130px",
        overflowY: "auto",
    },
    textBox: {
        width: "100%",
        marginTop: "5px",
        marginBottom: "10px",
        border: "none",
        padding: "8px 4px",
        fontSize: "15px",
        boxShadow: "1.5px 3px 8px -2px #a9a9a9",
        borderRadius: "1px",
        ":focus": {
            outline: "none",
        },
    },
}

@Radium
export default class AudienceSelect extends React.Component {

    static propTypes = {
        selected: React.PropTypes.shape({
            users: React.PropTypes.array,
            groups: React.PropTypes.array,
        }),
        onChange: React.PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            allGroups: [],
            allUsers: [],
            shownGroups: [],
            shownUsers: [],
            query: "",
        }
    }

    componentDidMount = async() => {
        try {
            let [{ data: users }, { data: groups }] = await Promise.all([
                ajax.request("get", "/teams/current/users"),
                ajax.request("get", "/groups")
            ]);
            this.setState({
                allUsers: users,
                allGroups: groups,
            });
        } catch (err) {
            console.log(err);
        }
    }

    isGroupSelected = (groupId) => {
        return this.props.selected.groups.indexOf(groupId) !== -1;
    }

    isUserSelected = (userId) => {
        return this.props.selected.users.indexOf(userId) !== -1;
    }

    onUserClick = (userId) => {
        let newUsers;
        if (this.isUserSelected(userId)) {
            newUsers = update(this.props.selected.users, {
                $splice: [
                    [this.props.selected.users.indexOf(userId), 1]
                ]
            });
        } else {
            newUsers = this.props.selected.users.concat([userId]);
        }
        this.props.onChange({
            groups: this.props.selected.groups,
            users: newUsers,
        });
    }

    // because screw DRY
    onGroupClick = (groupId) => {
        let newGroups;
        if (this.isGroupSelected(groupId)) {
            newGroups = update(this.props.selected.groups, {
                $splice: [
                    [this.props.selected.groups.indexOf(groupId), 1]
                ]
            });
        } else {
            newGroups = this.props.selected.groups.concat([groupId]);
        }
        this.props.onChange({
            groups: newGroups,
            users: this.props.selected.users,
        });
    }

    getShownItems = () => {
        if (this.state.query == "") {
            return {
                shownGroups: this.state.allGroups,
                shownUsers: this.state.allUsers,
            }
        } else {
            const regex = new RegExp(this.state.query.trim().replace(/\s+/g, "|"), "ig");
            return {
                shownUsers: this.state.allUsers.filter(user => (
                    regex.test(user.firstname) || regex.test(user.lastname)
                )),
                shownGroups: this.state.allGroups.filter(group => (
                    regex.test(getGroupName(group))
                ))
            }
        }
    }

    render() {
        const { shownGroups, shownUsers } = this.getShownItems();
        return (
            <div>
                <TextBox
                    placeholder="Search Names..."
                    onChange={event => this.setState({ query: event.target.value })}
                    value={this.state.query}
                    style={styles.textBox}
                />
                <br />
                <div style={styles.div}>
                    {shownGroups.map(group => (
                        <AudienceItem
                            key={group._id}
                            text={getGroupName(group)}
                            id={group._id}
                            onClick={this.onGroupClick}
                            isSelected={this.isGroupSelected(group._id)}
                            isGroup={true}
                        />
                    ))}
                    {shownUsers.map(user => (
                        <AudienceItem
                            key={user._id}
                            text={user.firstname + " " + user.lastname}
                            id={user._id}
                            onClick={this.onUserClick}
                            isSelected={this.isUserSelected(user._id)}
                            isGroup={false}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

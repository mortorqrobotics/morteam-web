import React from "react";
import Radium from "radium";

import update from "react/lib/update";
import ajax from "~/util/ajax";
import TextBox from "~/shared/components/forms/TextBox";
import AudienceItem from "./AudienceItem";
import { getGroupName } from "~/util/groups";
import { fullName, userSearch, currentUser } from "~/util";

import styles from "~/shared/styles/audience";

@Radium
export default class AudienceSelect extends React.Component {

    static propTypes = {
        selected: React.PropTypes.shape({
            users: React.PropTypes.array,
            groups: React.PropTypes.array,
        }),
        onChange: React.PropTypes.func,
        noIncludeGroups: React.PropTypes.bool,
        excludedUsers: React.PropTypes.array,
        excludedGroups: React.PropTypes.array,
        isMultiTeam: React.PropTypes.bool,
    }

    constructor(props) {
        super(props);

        this.state = {
            allUsers: [],
            allGroups: [],
            shownGroups: [],
            shownUsers: [],
            teams: [],
            query: "",
        }
    }

    componentDidMount = async() => {
        try {
            let [{ data: users }, { data: groups }, {data: teams}] = await Promise.all([
                ajax.request("get", "/teams/current/users"),
                ajax.request("get", "/groups"),
                ajax.request("get", "/groups/allTeam")
            ]);

            this.setState({
                allUsers: this.props.excludedUsers ? users.filter(u => (
                    !this.props.excludedUsers.some(eu => (
                        eu._id == u._id
                    ))
                )) : users,
                allGroups: this.props.excludedGroups ? groups.filter(g => (
                    !this.props.excludedGroups.some(eg => (
                        eg._id == g._id
                    ))
                )) : groups,
                teams,
            });

        } catch (err) {
            console.log(err);
        }
    }

    isGroupSelected = (group) => {
        return this.props.selected.groups.some(g => g._id == group._id);
    }

    isUserSelected = (user) => {
        return this.props.selected.users.some(u => u._id == user._id);
    }

    onUserClick = (user) => {
        let newUsers;
        if (this.isUserSelected(user)) {
            newUsers = update(this.props.selected.users, {
                $splice: [
                    [this.props.selected.users.indexOf(user), 1]
                ],
            });
        } else {
            newUsers = this.props.selected.users.concat([user]);
        }
        this.props.onChange({
            groups: this.props.selected.groups,
            users: newUsers,
        });
    }

    // because screw DRY
    onGroupClick = (group) => {
        let newGroups;
        if (this.isGroupSelected(group)) {
            newGroups = update(this.props.selected.groups, {
                $splice: [
                    [this.props.selected.groups.indexOf(group), 1]
                ]
            });
        } else {
            newGroups = this.props.selected.groups.concat([group]);
        }
        this.props.onChange({
            groups: newGroups,
            users: this.props.selected.users,
        });
    }

    getShownItems = () => {

        let allGroups = this.props.isMultiTeam ? this.state.teams : this.state.allGroups;

        if (this.props.isMultiTeam) {
            allGroups = allGroups.sort((first, second) => first.team.number - second.team.number );
        }

        if (this.state.query == "") {
            return {
                shownGroups: allGroups,
                shownUsers: this.props.isMultiTeam ? [] : this.state.allUsers,
            }
        } else {
            const regex = new RegExp(this.state.query.trim().replace(/\s+/g, "|"), "i");

            return {
                shownUsers: this.props.isMultiTeam ? [] : this.state.allUsers.filter(userSearch(this.state.query)),
                shownGroups: allGroups.filter(group => (
                    regex.test(this.props.isMultiTeam ? group.team.number.toString() : getGroupName(group))
                ))
            }
        }
    }

    render() {
        const { shownGroups, shownUsers } = this.getShownItems();
        return (
            <div>
                <TextBox
                    placeholder={this.props.isMultiTeam ? "Search Teams..." : "Search Names..."}
                    onChange={event => this.setState({ query: event.target.value })}
                    value={this.state.query}
                    style={styles.audienceSelect.textBox}
                />
                <br />
                <div style={styles.audienceSelect.div}>
                    {!this.props.noIncludeGroups &&
                        shownGroups.map(group => (
                            <AudienceItem
                                key={group._id}
                                text={this.props.isMultiTeam ? "Team " + group.team.number.toString() : getGroupName(group)}
                                item={group}
                                onClick={this.onGroupClick}
                                isSelected={this.isGroupSelected(group)}
                                isGroup={true}
                            />
                        ))
                    }
                    {shownUsers.map(user => (
                        <AudienceItem
                            key={user._id}
                            text={fullName(user)}
                            item={user}
                            onClick={this.onUserClick}
                            isSelected={this.isUserSelected(user)}
                            isGroup={false}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

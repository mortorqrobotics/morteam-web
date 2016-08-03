import React from "react";
import Radium from "radium";

import DimModal from "~/components/shared/DimModal";
import CreateGroupButton from "./CreateGroupButton";
import ModalTextBox from "./ModalTextBox";
import GroupTypeOption from "./GroupTypeOption";
import MemberSelect from "~/components/shared/audience/AudienceSelect";
import ajax, { cancellableRequestFactory } from "~/util/ajax";
import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";
import { getGroupName } from "~/util/groups";

let styles = {
    modal: {
        position: "fixed",
        display: "block",
        left: "50%",
        top: "50%",
        right: "auto",
        bottom: "auto",
        marginLeft: "-175px",
        marginTop: "-207px",
        borderRadius: "3px",
        fontFamily: "'exo 2', sans-serif",
        fontWeight: "200",
        boxShadow: "0 3px 15px rgba(0, 0, 0, .4), 0 0 5px rgba(0, 0, 0, .4)",
        background: "#E9E9E9",
        padding: "0px",
        border: "none",
    },
    title: {
        padding: "10px 15px",
        backgroundColor: "#ffc547",
        color: "black",
    },
    content: {
        padding: "12px 15px",
        width: "350px",
        height: "373px",
        color: "#333",
    }
}

@Radium
export default class MakeGroupModal extends React.Component {

    static propTypes = {
        isOpen: React.PropTypes.bool,
        onAfterOpen: React.PropTypes.func,
        onRequestClose: React.PropTypes.func,
        updateGroups: React.PropTypes.func
    }

    static contextTypes = {
        user: React.PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.state = {
            groupName: "",
            users: [],
            groups: [],
            shownUsers: [],
            shownGroups: [],
            selectedUsers: [this.context.user._id],
            selectedGroups: [],
            isPublic: true,
            query: "",
        }
    }

    componentDidMount = async() => {
        try {
            let [userResponse, groupResponse] = await Promise.all([
                ajax.request("get", "/teams/current/users"),
                ajax.request("get", "/groups")
            ]);
            this.setState({
                users: userResponse.data,
                groups: groupResponse.data
            });
        } catch (err) {
            console.log(err);
        }
        this.showAllGroupsAndUsers();
    }

    createGroup = async() => {
        try {
            let { data } = await ajax.request("post", "/groups", {
                users: this.state.selectedUsers,
                groups: this.state.selectedGroups,
                name: this.state.groupName,
                isPublic: this.state.isPublic
            });
            console.log(data);
            this.setState({
                groupName: "",
                selectedUsers: [this.context.user._id],
                selectedGroups: [],
                isPublic: true,
                query: "",
            });
            this.showAllGroupsAndUsers();
            this.props.updateGroups();
            this.props.onRequestClose();
        } catch (err) {
            console.log(err);
        }
    }

    showAllGroupsAndUsers = () => {
        this.setState({
            shownUsers: this.state.users,
            shownGroups: this.state.groups
        })
    }

    selectTypePublic = () => {
        this.setState({
            isPublic: true
        });
    }

    selectTypePrivate = () => {
        this.setState({
            isPublic: false
        });
    }

    handleQueryChange = async(e) => {
        let query = e.target.value;
        this.setState({
            query: query
        });
        if (query == "") {
            this.showAllGroupsAndUsers();
        } else {
            let regex = new RegExp(query.trim().replace(/\s+/g, "|"), "ig");
            this.setState({
                shownUsers: this.state.users.filter(function(user) {
                    return regex.test(user.firstname) || regex.test(user.lastname);
                }),
                shownGroups: this.state.groups.filter(function(group) {
                    return regex.test(getGroupName(group));
                })
            });
        }
    }

    onSelectedUpdate = (selected) => {
        this.setState({
            selectedGroups: selected.groups,
            selectedUsers: selected.users,
        });
    }

    render() {
        return (
            <DimModal
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.props.onRequestClose}
                style={styles.modal}
            >
                <div style={styles.title}>New Group</div>
                <div style={styles.content}>

                    <ModalTextBox
                        placeholder="Group Name"
                        onChange={this.getChangeHandler("groupName")}
                        value={this.state.groupName}
                    />
                    <br />

                    <GroupTypeOption
                        text="Public"
                        onClick={this.selectTypePublic}
                        isSelected={this.state.isPublic}
                    />
                    <GroupTypeOption
                        text="Private"
                        onClick={this.selectTypePrivate}
                        isSelected={!this.state.isPublic}
                    />
                    <br />

                    <p>Please select some inital members</p>
                    <ModalTextBox
                        placeholder="Search Names..."
                        onChange={this.handleQueryChange}
                        value={this.state.query}
                    />
                    <br />

                    <MemberSelect
                        users={this.state.shownUsers}
                        groups={this.state.shownGroups}
                        selectedUsers={this.state.selectedUsers}
                        selectedGroups={this.state.selectedGroups}
                        onUpdate={this.onSelectedUpdate}
                    />
                    <br />

                    <CreateGroupButton onClick={this.createGroup} />

                </div>
            </DimModal>
        )
    }
}

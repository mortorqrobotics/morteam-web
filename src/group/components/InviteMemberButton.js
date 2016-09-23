import React from "react";
import Radium from "radium";

import styles from "~/group/styles/index";
import Button from "~/shared/components/forms/Button";
import ajax from "~/util/ajax";
import { ModalButton } from "~/shared/components/modal";
import StandardModal from "~/shared/components/StandardModal";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";

@Radium
export default class LeaveGroupButton extends React.Component {

    static propTypes = {
        groupUsers: React.PropTypes.array,
        onAdded: React.PropTypes.func,
    }

    static contextTypes = {
        options: React.PropTypes.object,
    }

    state = {
        isModalOpen: false,
        users: [],
        allUsers: [],
    }

    componentDidMount = async () => {
        const { data } = await ajax.request("get", "/teams/current/users");
        this.setState({ allUsers: data, });
    }

    addUsers = async () => {
        const users = this.state.allUsers.filter(u => this.state.users.indexOf(u._id) != -1);
        await ajax.request("POST", "/groups/normal/id/" + this.context.options.groupId + "/users", {
            users: this.state.users,
        });
        this.setState({ isModalOpen: false, });
        this.props.onAdded(users);
    }

    render() {
        return (
            <div>
                <Button 
                    style={styles.inviteButton} 
                    value="Add Members" 
                    onClick={() => this.setState({ isModalOpen: true, })}
                />
                <StandardModal
                    title="Add Members"
                    isOpen={this.state.isModalOpen}
                    onAfterOpen={() => this.setState({ isModalOpen: true, })}
                    onRequestClose={() => this.setState({ isModalOpen: false, })}
                >

                    <AudienceSelect
                        userList={this.state.allUsers.filter(u => (
                            !this.props.groupUsers.some(gu => (
                                gu._id == u._id
                            ))
                        ))}
                        selected={{ groups: [], users: this.state.users, }}
                        onChange={({ users }) => this.setState({ users })}
                    />

                    <ModalButton
                        text="Add"
                        onClick={this.addUsers}
                    />

                </StandardModal>
            </div>
        )
    }
}

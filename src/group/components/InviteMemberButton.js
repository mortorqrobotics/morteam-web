import React from "react";
import Radium from "radium";

import styles from "~/group/styles/index";
import Button from "~/shared/components/forms/Button";
import ajax from "~/util/ajax";
import { ModalButton } from "~/shared/components/modal";
import StandardModal from "~/shared/components/StandardModal";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import { pageOptions } from "~/util";
import { connect } from "react-redux";
import { addUsers } from "~/group/actions";

@Radium
class InviteMemberButton extends React.Component {

    static propTypes = {
        groupUsers: React.PropTypes.array,
        onAdded: React.PropTypes.func,
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

    addUsers = () => {
        this.props.dispatch(addUsers(this.state.users));
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

export default connect()(InviteMemberButton);

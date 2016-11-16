import React from "react";
import Radium from "radium";

import styles from "~/group/styles";
import ajax from "~/util/ajax";
import { ModalButton } from "~/shared/components/modal";
import StandardModal from "~/shared/components/StandardModal";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { connect } from "react-redux";
import { addUsers } from "~/group/actions";

@Radium
class AddMemberModal extends React.Component {

    static propTypes = {
        ...modalPropTypes,
    }

    initialState = {
        users: [],
    }

    state = {
        allUsers: [],
        ...this.initialState,
    }

    componentDidMount = async () => {
        const { data } = await ajax.request("get", "/teams/current/users");
        this.setState({ allUsers: data, });
    }

    onSubmit = () => {
        this.props.dispatch(addUsers(this.state.users));
        this.setState(this.initialState);
        this.props.onRequestClose();
    }

    render() {
        return (
            <div>
                <StandardModal
                    title="Add Members"
                    { ...modalPropsForward(this) }
                >

                    <AudienceSelect
                        userList={this.state.allUsers.filter(u => (
                            !this.props.users.some(gu => (
                                gu._id == u._id
                            ))
                        ))}
                        selected={{ groups: [], users: this.state.users, }}
                        onChange={({ users }) => this.setState({ users })}
                    />

                    <ModalButton
                        text="Add"
                        onClick={this.onSubmit}
                    />

                </StandardModal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(AddMemberModal);

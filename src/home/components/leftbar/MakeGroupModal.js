import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import { ModalButton, ModalTextBox } from "~/shared/components/modal";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { makeChangeHandlerFactory, currentUser } from "~/util";
import { getGroupName } from "~/util/groups";

import { connect } from "react-redux";
import { addGroup } from "~/home/actions";
@Radium
class MakeGroupModal extends React.Component {

    static propTypes = {
        ...modalPropTypes,
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    initialState = {
        groupName: "",
        users: [currentUser],
    };
    
    state = {
       ...this.initialState,
    }

    handleSubmit = () => {
        this.props.dispatch(addGroup({
            users: this.state.users.map(u => u._id),
            name: this.state.groupName,
        }));
        this.setState(this.initialState);
        this.props.onRequestClose();
    }

    render() {
        return (
            <StandardModal
                title="New Group"
                { ...modalPropsForward(this) }
            >

                <ModalTextBox
                    placeholder="Group Name"
                    onChange={this.getChangeHandler("groupName")}
                    value={this.state.groupName}
                    maxLength={21}
                />
                <br />

                <p>Please select some inital members</p>

                <AudienceSelect
                    noIncludeGroups
                    selected={{ users: this.state.users }}
                    onChange={({ users }) => this.setState({ users })}
                />
                <br />

                <ModalButton
                    text="Make Group"
                    onClick={this.handleSubmit}
                />

            </StandardModal>
        )
    }
}

export default connect()(MakeGroupModal);

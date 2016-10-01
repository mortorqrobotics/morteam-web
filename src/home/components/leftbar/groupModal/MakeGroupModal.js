import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import CreateGroupButton from "./CreateGroupButton";
import ModalTextBox from "./ModalTextBox";
import GroupTypeOption from "./GroupTypeOption";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import ajax, { cancellableRequestFactory } from "~/util/ajax";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { makeChangeHandlerFactory, currentUser } from "~/util";
import { getGroupName } from "~/util/groups";

@Radium
export default class MakeGroupModal extends React.Component {

    static propTypes = {
        ...modalPropTypes,
        addGroup: React.PropTypes.func
    }

    constructor(props) {
        super(props);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.initialState = {
            groupName: "",
            users: [currentUser._id],
        };
        this.state = this.initialState;
    }

    createGroup = async () => {
        try {
            let { data } = await ajax.request("post", "/groups/normal", {
                users: this.state.users,
                name: this.state.groupName,
            });
            this.setState(this.initialState);
            this.props.addGroup(data);
            this.props.onRequestClose();
        } catch (err) {
            console.log(err);
        }
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
                />
                <br />

                <p>Please select some inital members</p>

                <AudienceSelect
                    noIncludeGroups
                    selected={{ users: this.state.users }}
                    onChange={({ users }) => this.setState({ users })}
                />
                <br />

                <CreateGroupButton onClick={this.createGroup} />

            </StandardModal>
        )
    }
}

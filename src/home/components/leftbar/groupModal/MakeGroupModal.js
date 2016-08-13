import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import CreateGroupButton from "./CreateGroupButton";
import ModalTextBox from "./ModalTextBox";
import GroupTypeOption from "./GroupTypeOption";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import ajax, { cancellableRequestFactory } from "~/util/ajax";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { makeChangeHandlerFactory } from "~/util";
import { getGroupName } from "~/util/groups";

@Radium
export default class MakeGroupModal extends React.Component {

    static propTypes = {
        ...modalPropTypes,
        addGroup: React.PropTypes.func
    }

    static contextTypes = {
        user: React.PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.state = {
            groupName: "",
            audience: {
                users: [], // this.content.user._id
                groups: [],
            },
            isPublic: true,
        }
    }

    createGroup = async() => {
        try {
            let { data } = await ajax.request("post", "/groups", {
                users: this.state.audience.users,
                groups: this.state.audience.groups,
                name: this.state.groupName,
                isPublic: this.state.isPublic,
            });
            console.log(data);
            this.setState({
                groupName: "",
                selectedUsers: [this.context.user._id],
                selectedGroups: [],
                isPublic: true,
                query: "",
            });
            this.props.addGroup(data);
            this.props.onRequestClose();
        } catch (err) {
            console.log(err);
        }
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

                <AudienceSelect
                    selected={this.state.audience}
                    onChange={audience => this.setState({ audience: audience })}
                />
                <br />

                <CreateGroupButton onClick={this.createGroup} />

            </StandardModal>
        )
    }
}

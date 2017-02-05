import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import AdminCheckBox from "~/shared/components/AdminCheckBox";
import { ModalButton, ModalTextBox } from "~/shared/components/modal";
import { makeChangeHandlerFactory, otherUser, currentUser } from "~/util";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { request } from "~/util/ajax";
import { connect } from "react-redux";
import { addChat } from "~/chat/actions";

@Radium
class ComposeModal extends React.Component {

    static propTypes = {
        ...modalPropTypes,
    }

    initialState = {
        audience: {
            users: [],
            groups: [],
        },
        name: "",
        isEditingName: false,
        checked: false,
    }
    state = this.initialState;

    getChangeHandler = makeChangeHandlerFactory(this);

    handleSubmit = async() => {
        let users = this.state.audience.users.map(u => u._id);
        let groups = this.state.audience.groups.map(g => g._id);
        users = users.filter(userId => userId != currentUser._id);
        if (groups.length === 0
            && users.length === 1
        ) {
            this.props.dispatch(addChat({
                isTwoPeople: true,
                otherUser: users[0],
            }));
            this.setState(this.initialState);
            this.props.onRequestClose();
        } else if (this.state.isEditingName) {
            if (this.props.currentTab === "inter" && this.state.checked) {
                groups = JSON.stringify(this.state.audience.groups.map(group => group.team._id));
                let { data } = await request("GET", "/groups/position/" + groups);
                groups = data.map(group => group._id);
            }
            this.props.dispatch(addChat({
                isTwoPeople: false,
                audience: { users, groups, isMultiTeam: this.props.currentTab === "inter" },
                name: this.state.name,
            }));
            this.setState(this.initialState);
            this.props.onRequestClose();
        } else {
            this.setState({
                isEditingName: true,
            })
        }
    }

    render() {
        return (
            <StandardModal
                title="Compose"
                { ...modalPropsForward(this) }
            >
                {(() => {
                    if (!this.state.isEditingName) {
                        return (
                            <AudienceSelect
                                selected={this.state.audience}
                                onChange={audience => this.setState({ audience })}
                                isMultiTeam={this.props.currentTab==="inter"}
                            />
                        )
                    } else {
                        return (
                            <ModalTextBox
                                placeholder="Choose Name For Group Chat"
                                value={this.state.name}
                                onChange={this.getChangeHandler("name")}
                            />
                        )
                    }
                })()}
                <AdminCheckBox
                    onChange={this.getChangeHandler("checked", "checked")}
                    condition={this.props.currentTab === "inter"}
                    checked={this.state.checked}
                />
                <ModalButton
                    text="Done"
                    onClick={this.handleSubmit}
                />
            </StandardModal>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        currentTab: state.currentTab,
    }
}

export default connect(mapStateToProps)(ComposeModal);

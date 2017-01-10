import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import { ModalButton, ModalTextBox } from "~/shared/components/modal";
import { makeChangeHandlerFactory, otherUser, currentUser } from "~/util";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
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
    }
    state = this.initialState;

    getChangeHandler = makeChangeHandlerFactory(this);

    handleSubmit = () => {
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
            this.props.dispatch(addChat({
                isTwoPeople: false,
                audience: { users, groups },
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
                <ModalButton
                    text="Done"
                    onClick={this.handleSubmit}
                />
            </StandardModal>
        )
    }

}

export default connect()(ComposeModal);

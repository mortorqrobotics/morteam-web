import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import { ModalButton, ModalTextBox } from "~/shared/components/modal";
import { makeChangeHandlerFactory, otherUser } from "~/util";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { connect } from "react-redux";
import { addChat } from "~/chat/actions";

@Radium
class ComposeModal extends React.Component {

    static propTypes = {
        ...modalPropTypes,
    }

    static contextTypes = {
        user: React.PropTypes.object,
    }

    state = {
        audience: {
            users: [],
            groups: [],
        },
        name: "",
        isEditingName: false,
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    handleSubmit = () => {
        const isTwoPeople = this.state.audience.groups.length === 0
            && this.state.audience.users.length === 2;
        if (isTwoPeople) {
            this.props.dispatch(addChat({
                type: "private",
                otherUser: otherUser(this.state.audience.users, this.context.user._id),
            }));
            this.props.onRequestClose();
        } else if (this.state.isEditingName) {
            this.props.dispatch(addChat({
                type: "public",
                name: this.state.name,
                audience: this.state.audience,
            }));
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

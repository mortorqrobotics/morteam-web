import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { ModalTextBox, ModalSubmitButton } from "~/shared/components/modal";
import Form from "~/shared/components/forms/Form";
import { makeChangeHandlerFactory, fullName } from "~/util";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { getGroupName } from "~/util/groups";
import { connect } from "react-redux";
import { setChatName } from "~/chat/actions";
import styles from "~/chat/styles/optionsModal";

@Radium
class OptionsModal extends React.Component {
    
    static propTypes = {
        ...modalPropTypes,
        chat: React.PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.state = {
            name: this.props.chat.name,
        }
    }

    handleSubmit = () => {
        this.props.dispatch(setChatName({
            chatId: this.props.chat._id,
            name: this.state.name,
        })).then(this.props.onRequestClose)
    }

    render() {
        return (
            <StandardModal
                title="Options"
                { ...modalPropsForward(this) }
            >
                <Form onSubmit={this.handleSubmit}>
                    <ModalTextBox
                        placeholder="Chat Name"
                        value={this.state.name}
                        onChange={this.getChangeHandler("name")}
                    />
                    <ul style={styles.ul}>
                        {this.props.chat.audience.groups.map(group => (
                            <li key={group._id} style={styles.li}>
                                <img
                                    style={styles.img}
                                    src="/images/group.png"
                                />
                                <span style={styles.span}>
                                    {getGroupName(group)}
                                </span>
                            </li>
                        ))}
                        {this.props.chat.audience.users.map(user => (
                            <li key={user._id} style={styles.li}>
                                <img
                                    style={styles.img}
                                    src={user.profpicpath}
                                />
                                <span style={styles.span}>
                                    {fullName(user)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <ModalSubmitButton
                        text="Done"
                    />
                </Form>
            </StandardModal>
        )
    }

}

export default connect()(OptionsModal);

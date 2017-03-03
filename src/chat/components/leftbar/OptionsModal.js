import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { ModalTextBox, ModalSubmitButton } from "~/shared/components/modal";
import Form from "~/shared/components/forms/Form";
import ProfilePicture from "~/shared/components/ProfilePicture";
import Button from "~/shared/components/forms/Button";
import ErrorMsg from "~/shared/components/forms/ErrorMsg";
import { makeChangeHandlerFactory, fullName, currentUser } from "~/util";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { getGroupName } from "~/util/groups";
import { connect } from "react-redux";
import { setChatName } from "~/chat/actions";
import { deleteChat } from "~/chat/actions";
import styles from "~/chat/styles/optionsModal";

@Radium
class OptionsModal extends React.Component {

    static propTypes = {
        ...modalPropTypes,
        chat: React.PropTypes.object,
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    initialState = {
        name: this.props.chat.name,
        isDeleteConfirmOpen: false,
        errorMsg: "",
    }

    state = {
        ...this.initialState,
    }

    handleSubmit = () => {
        if (this.state.name.length < 20) {
            this.setState({
                errorMsg: this.initialState.errorMsg
            });
            this.props.dispatch(setChatName({
                chatId: this.props.chat._id,
                name: this.state.name,
            }));
            this.props.onRequestClose();
        } else {
            this.setState({
                errorMsg: "Chat name has to be 19 characters or fewer",
            });
        }
    }

    handleGroupChatRender = () => {
        if(!this.props.chat.isTwoPeople){
            return(
                <Form onSubmit={this.handleSubmit}>
                    <ModalTextBox
                        placeholder="Chat Name"
                        value={this.state.name}
                        onChange={this.getChangeHandler("name")}
                    />
                    <ErrorMsg message={this.state.errorMsg} />
                    <ul style={styles.ul}>
                        {this.props.chat.audience.groups.map(group => (
                            <li key={group._id} style={styles.li}>
                                <img
                                    style={styles.img}
                                    src="/images/group.png"
                                />
                                <span
                                    style={styles.span}
                                    onClick={this.props.currentTab === "intra"
                                        ? () => window.location.assign("/groups/id/" + group._id)
                                        : () => window.location.assign("/teams/number/" + group.team.number )
                                    }
                                    key={group._id}
                                >
                                    {this.props.currentTab === "inter"
                                        ? getGroupName(group) + " of "  + group.team.number
                                        : getGroupName(group)
                                    }
                                </span>
                            </li>
                        ))}
                        {this.props.chat.audience.users.map(user => (
                            <li key={user._id} style={styles.li}>
                                <ProfilePicture
                                    user={user}
                                    picSize="small"
                                    frameSize={30}
                                    hasIndicator
                                />
                                <span
                                    style={styles.span}
                                    onClick={() => window.location.assign("/profiles/id/" + user._id)}
                                    key={user._id}
                                >
                                    {fullName(user)}
                                </span>
                            </li>
                        ))}
                        </ul>
                    <ModalSubmitButton
                        text="Done"
                    />
                </Form>
            )
        }
    }

    handleDeleteRender = () => {
        if (this.props.chat.isTwoPeople
            || this.props.chat.creator === currentUser._id
            || currentUser.isAdmin()
        ) {
            if (!this.state.isDeleteConfirmOpen) {
               return (
                    <Button
                        style={styles.deleteButton}
                        value="Delete"
                        onClick={() => this.setState({isDeleteConfirmOpen: true,})}
                    />
                )
            } else {
                return (
                    <div>
                        <p style={styles.p}>Are you sure?</p>
                        <Button
                            style={styles.confirmButton}
                            value="Yes"
                            onClick= {() => this.props.dispatch(deleteChat(this.props.chat._id))}
                        />
                        <Button
                            style={styles.confirmButton}
                            value="No"
                            onClick={() => this.setState({isDeleteConfirmOpen: false,})}
                        />
                    </div>
                )
            }
        }
    }

    render() {
        return(
            <StandardModal
                title="Options"
                { ...modalPropsForward(this) }
                onRequestClose={() => {
                    this.setState(this.initialState);
                    this.props.onRequestClose();
                }}
            >
                {this.handleGroupChatRender()}
                {this.handleDeleteRender()}
            </StandardModal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentTab: state.currentTab,
    }
}

export default connect(mapStateToProps)(OptionsModal);

import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { ModalTextBox, ModalSubmitButton } from "~/shared/components/modal";
import Form from "~/shared/components/forms/Form";
import ProfilePicture from "~/shared/components/ProfilePicture";
import Button from "~/shared/components/forms/Button";
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

    constructor(props) {
        super(props);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.state = {
            name: this.props.chat.name,
            isDeleteConfirmOpen: false, 
        }
    }

    handleSubmit = () => {
        this.props.dispatch(setChatName({
            chatId: this.props.chat._id,
            name: this.state.name,
        }));
        this.props.onRequestClose();
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
                                <ProfilePicture
                                    user={user}
                                    picSize="small"
                                    frameSize={30}
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
            )
        }
    }
    
    handleDeleteRender = () => {
        if(this.props.chat.isTwoPeople 
            || this.props.chat.creator === currentUser._id 
            || currentUser.isAdmin()){
            if(!this.state.isDeleteConfirmOpen){
               return(
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
            >
                {this.handleGroupChatRender()}
                {this.handleDeleteRender()}
            </StandardModal>
        )
    }
}

export default connect()(OptionsModal);

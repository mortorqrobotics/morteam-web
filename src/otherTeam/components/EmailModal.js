import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { ModalButton, ModalTextArea } from "~/shared/components/modal";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { pageOptions, currentUser } from "~/util";
import { request } from "~/util/ajax";

@Radium
export default class EmailModal extends React.Component {
    static propTypes = {
        ...modalPropTypes
    }

    initialState = {
        content: "We are team " + currentUser.team.number + ", and we would like to communicate with you!"
    }

    state = this.initialState;


    handleChange = (event) => {
        this.setState({
            content: event.target.value,
        });
    }

    handleSubmit = async() => {
        const {data: chatId} = await request ("POST", "/teams/id/" + pageOptions.team._id + "/contact", {
            content: this.state.content,
        });
        this.props.onRequestClose();
        this.setState(this.initialState);
        window.location.assign("/chat?id=" + chatId);
    }

    render() {
        return (
            <StandardModal
                title={"Contact with Team " + pageOptions.teamNumber}
                { ...modalPropsForward(this) }
            >
                <p>
                    Edit the body text of the email.
                </p>
                <p>
                    The email will contain a link to a new chat between the admins of your and their team.
                </p>
                <ModalTextArea
                    value={this.state.content}
                    placeholder="email body"
                    rows={5}
                    onChange={this.handleChange}
                />
                <ModalButton text="Send email" onClick={this.handleSubmit}/>
            </StandardModal>
        )
    }
}

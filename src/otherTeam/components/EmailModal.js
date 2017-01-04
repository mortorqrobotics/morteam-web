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
        content: "Team " + currentUser.team.number + " would like to communicate with you at the following link!"
    }
    
    state = this.initialState;
    
    
    handleChange = (event) => {
        this.setState({
            content: event.target.value,
        });
    }
    
    handleSubmit = async() => {
        await request ("POST", "/teams/id/" + pageOptions.team._id + "/contact", {
            content: this.state.content,
        });
        this.props.onRequestClose();
        this.setState(this.initialState);
    }
    
    render() {
        return (
            <StandardModal 
                title={"Contact with Team " + pageOptions.teamNumber}
                { ...modalPropsForward(this) }
            >
                <ModalTextArea
                    value={this.state.content} 
                    placeholder="email body" 
                    rows={5} 
                    onChange={this.handleChange}
                />
                <ModalButton text="Contact" onClick={this.handleSubmit}/>
            </StandardModal>
        )
    }
}



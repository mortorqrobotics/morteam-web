import React, { PropTypes } from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { makeChangeHandlerFactory, getAudienceIds } from "~/util";
import {
    ModalTextBox,
    ModalTextArea,
    ModalButton,
} from "~/shared/components/modal";
import CheckBox from "~/shared/components/forms/CheckBox";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { connect } from "react-redux";
import { addEvent } from "~/calendar/actions";

@Radium
class AddModal extends React.Component {

    static propTypes = {
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        day: PropTypes.number.isRequired,
        ...modalPropTypes,
    }

    initialState = {
        name: "",
        description: "",
        audience: {
            users: [],
            groups: [],
        },
    }

    state = {
        ...this.initialState,
        sendEmail: true,
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    onSubmit = async () => {
        await this.props.dispatch(addEvent({
            sendEmail: this.state.sendEmail,
            name: this.state.name,
            date: new Date(this.props.year, this.props.month, this.props.day),
            description: this.state.description,
            audience: getAudienceIds(this.state.audience),
        }))
        this.setState(this.initialState);
        this.props.onRequestClose();
    }

    render() {
        return (
            <StandardModal
                title="New Event"
                { ...modalPropsForward(this) }
            >
                <ModalTextBox
                    placeholder="Title"
                    value={this.state.name}
                    onChange={this.getChangeHandler("name")}
                />
                <ModalTextArea
                    placeholder="Description (Optional)"
                    value={this.state.description}
                    onChange={this.getChangeHandler("description")}
                />
                <br />
                Please select the attendees.
                <br />
                <div>
                    <CheckBox
                        checked={this.state.sendEmail}
                        onChange={this.getChangeHandler("sendEmail", "checked")}
                    />
                    Send Email?
                </div>
                <AudienceSelect
                    selected={this.state.audience}
                    onChange={audience => this.setState({ audience })}
                />
                <ModalButton
                    text="Done"
                    onClick={this.onSubmit}
                />
            </StandardModal>
        )
    }
}

export default connect()(AddModal);

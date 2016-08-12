import React, { PropTypes } from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { makeChangeHandlerFactory } from "~/util";
import TextBox from "~/shared/components/forms/TextBox";
import CheckBox from "~/shared/components/forms/CheckBox";
import Button from "~/shared/components/forms/Button";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import { connect } from "react-redux";
import { addEvent } from "~/calendar/actions";
import styles from "~/calendar/styles/addModal";

@Radium
class AddModal extends React.Component {

    static propTypes = {
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        day: PropTypes.number.isRequired,
        isOpen: PropTypes.bool.isRequired,
        onAfterOpen: PropTypes.func.isRequired,
        onRequestClose: PropTypes.func.isRequired,
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
        hasAttendance: true,
        sendEmail: true,
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    onSubmit = async() => {
        await this.props.dispatch(addEvent({
            hasAttendance: this.state.hasAttendance,
            sendEmail: this.state.sendEmail,
            name: this.state.name,
            date: new Date(this.props.year, this.props.month, this.props.day),
            description: this.state.description,
            audience: this.state.audience,
        }))
        this.setState(this.initialState);
        this.props.onRequestClose();
    }

    render() {
        return (
            <StandardModal
                title="New Event"
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.props.onRequestClose}
                style={styles.container}
            >
                <TextBox
                    style={styles.textBox}
                    placeholder="Title"
                    value={this.state.name}
                    onChange={this.getChangeHandler("name")}
                />
                <textarea
                    style={styles.textArea}
                    placeholder="Description (Optional)"
                    value={this.state.description}
                    onChange={this.getChangeHandler("description")}
                />
                <br />
                Please select the attendees.
                <br />
                <div>
                    <CheckBox
                        checked={this.state.hasAttendance}
                        onChange={this.getChangeHandler("hasAttendance", "checked")}
                    />
                    Take Attendance?
                </div>
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
                <Button
                    style={styles.button}
                    text="Done"
                    onClick={this.onSubmit}
                />
            </StandardModal>
        )
    }
}

export default connect()(AddModal);

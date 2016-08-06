import React from "react";
import Radium from "radium";

import StandardModal from "~/components/shared/StandardModal";
import {
    modalPropTypes,
    makeChangeHandlerFactory,
    REDIR_TIME,
    range,
    daysInMonth,
} from "~/util";
import styles from "~/styles/user/modal";
import Form from "~/components/shared/forms/Form";
import TextBox from "~/components/shared/forms/TextBox";
import SubmitButton from "~/components/shared/forms/SubmitButton";
import Button from "~/components/shared/forms/Button";
import ErrorMsg from "~/components/shared/forms/ErrorMsg";
import Dropdown from "~/components/shared/forms/Dropdown";
import ajax from "~/util/ajax";
import { withCss } from "~/util/component";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]
const currentYear = new Date().getFullYear();

@Radium
export default class AssignTask extends React.Component {

    static propTypes = {
        ...modalPropTypes,
    }

    static contextTypes = {
        options: React.PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.initialState = {
            name: "",
            description: "",
            errorMsg: "",
        }

        // keep the same date if making multiple tasks
        const now = new Date();
        this.state = {
            ...this.initialState,
            month: now.getMonth(),
            day: now.getDate(),
            year: now.getFullYear(),
        }
    }

    onSubmit = async() => {
        try {
            let { data } = await ajax.request("POST",
                "/users/id/" + this.context.options.userId + "/tasks", {
                    name: this.state.name,
                    dueDate: new Date(
                        this.state.year,
                        this.state.month,
                        this.state.day
                    ),
                    description: this.state.description,
                })
            this.setState({
                errorMsg: "Success"
            })
            setTimeout(() => this.props.onRequestClose(), REDIR_TIME);
        } catch ({ data }) {
            this.setState({
                errorMsg: data
            })
        }
    }

    render() {
        return (
            <StandardModal
                title="Assign Task"
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.props.onRequestClose}
            >
                <Form onSubmit={this.onSubmit}>
                    <TextBox
                        style={styles.textBox}
                        placeholder="Title"
                        value={this.state.name}
                        onChange={this.getChangeHandler("name")}
                    />
                    <textarea
                        style={styles.taskDescription}
                        placeholder="Short Description (Optional)"
                        value={this.state.description}
                        onChange={this.getChangeHandler("description")}
                    />
                    Due:&nbsp;
                    <Dropdown
                        style={styles.dropdown}
                        selected={this.state.month}
                        onChange={month => this.setState({ month: parseInt(month) })}
                        options={range(0, 12)}
                        display={month => months[month]}
                    />
                    <Dropdown
                        style={styles.dropdown}
                        selected={this.state.day}
                        onChange={day => this.setState({ day: parseInt(day) })}
                        options={range(1, 1 + daysInMonth(this.state.year, this.state.month))}
                        display={day => day}
                    />
                    <Dropdown
                        style={styles.dropdown}
                        selected={this.state.year}
                        onChange={year => this.setState({ year: parseInt(year) })}
                        options={range(currentYear, currentYear + 4)}
                        display={year => year}
                    />
                    <SubmitButton
                        style={styles.button}
                        text="Save"
                    />
                    {this.state.errorMsg && (
                        <ErrorMsg
                            style={styles.errorMsg}
                            message={this.state.errorMsg}
                        />
                    )}
                </Form>
            </StandardModal>
        )
    }

}

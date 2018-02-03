import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { makeChangeHandlerFactory, REDIR_TIME, range, pageOptions } from "~/util";
import { allMonths, daysInAbsMonth } from "~/util/date";
import styles from "~/user/styles/modal";
import Form from "~/shared/components/forms/Form";
import {
    ModalTextBox,
    ModalTextArea,
    ModalSubmitButton,
    ModalErrorMsg,
} from "~/shared/components/modal";
import Dropdown from "~/shared/components/forms/Dropdown";
import ajax from "~/util/ajax";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { connect } from "react-redux";
import { addTask } from "~/user/actions";

const now = new Date();

@Radium
class AssignTask extends React.Component {

    static propTypes = {
        ...modalPropTypes,
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    initialState = {
        name: "",
        description: "",
        errorMsg: "",
        month: now.getMonth(),
        day: now.getDate(),
        year: now.getFullYear(),
   }

    state = this.initialState;

    onSubmit = async() => {
        try {
            await this.props.dispatch(addTask(pageOptions.userId, {
                name: this.state.name,
                dueDate: new Date(
                    this.state.year,
                    this.state.month,
                    this.state.day
                ),
                description: this.state.description,
            }))
            this.setState({
                errorMsg: "Success"
            })
            setTimeout(() => {
                this.props.onRequestClose();
                this.setState(this.initialState);
            }, REDIR_TIME);
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
                { ...modalPropsForward(this) }
            >
                <Form onSubmit={this.onSubmit}>
                    <ModalTextBox
                        placeholder="Title"
                        value={this.state.name}
                        onChange={this.getChangeHandler("name")}
                    />
                    <ModalTextArea
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
                        display={month => allMonths[month]}
                    />
                    <Dropdown
                        style={styles.dropdown}
                        selected={this.state.day}
                        onChange={day => this.setState({ day: parseInt(day) })}
                        options={range(1, 1 + daysInAbsMonth({
                            year: this.state.year,
                            month: this.state.month,
                        }))}
                    />
                    <Dropdown
                        style={styles.dropdown}
                        selected={this.state.year}
                        onChange={year => this.setState({ year: parseInt(year) })}
                        options={range(now.getFullYear(), now.getFullYear() + 4)}
                    />
                    <ModalSubmitButton text="Save" />
                    {this.state.errorMsg && (
                        <ModalErrorMsg message={this.state.errorMsg} />
                    )}
                </Form>
            </StandardModal>
        )
    }

}
export default connect()(AssignTask);

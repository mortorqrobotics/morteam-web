import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";
import styles from "~/user/styles/modal";
import Form from "~/shared/components/forms/Form";
import {
    ModalTextBox,
    ModalSubmitButton,
    ModalErrorMsg,
} from "~/shared/components/modal";
import ajax from "~/util/ajax";
import { modalPropTypes, modalPropsForward } from "~/util/modal";

@Radium
export default class ChangePassword extends React.Component {

    static propTypes = {
        ...modalPropTypes,
    }

    constructor(props) {
        super(props);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.initialState = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            errorMsg: "",
        }
        this.state = {
            ...this.initialState,
        }
    }

    onSubmit = async() => {
        if (this.state.newPassword != this.state.confirmPassword) {
            this.setState({
                errorMsg: "Passwords do not match"
            })
        } else {
            try {
                await ajax.request("PUT", "/password", {
                    oldPassword: this.state.oldPassword,
                    newPassword: this.state.newPassword,
                })
                this.setState({
                    errorMsg: "Success",
                })
                setTimeout(() => {
                    this.setState({
                        ...this.initialState
                    })
                    this.props.onRequestClose();
                }, REDIR_TIME);
            } catch ({ data }) {
                this.setState({
                    errorMsg: data
                })
            }
        }
    }

    render() {
        return (
            <StandardModal
                title="Change Password"
                { ...modalPropsForward(this) }
            >
                <Form onSubmit={this.onSubmit}>
                    <ModalTextBox
                        placeholder="Old Password"
                        value={this.state.oldPassword}
                        onChange={this.getChangeHandler("oldPassword")}
                        type="password"
                    />
                    <ModalTextBox
                        placeholder="New Password"
                        value={this.state.newPassword}
                        onChange={this.getChangeHandler("newPassword")}
                        type="password"
                    />
                    <ModalTextBox
                        placeholder="Confirm New Password"
                        value={this.state.confirmPassword}
                        onChange={this.getChangeHandler("confirmPassword")}
                        type="password"
                    />
                    <ModalSubmitButton
                        style={styles.button}
                        text="Save"
                    />
                    {this.state.errorMsg && (
                        <ModalErrorMsg
                            style={styles.errorMsg}
                            message={this.state.errorMsg}
                        />
                    )}
                </Form>
            </StandardModal>
        )
    }

}

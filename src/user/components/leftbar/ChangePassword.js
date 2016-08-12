import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { modalPropTypes, makeChangeHandlerFactory, REDIR_TIME } from "~/util";
import styles from "~/user/styles/modal";
import Form from "~/shared/components/forms/Form";
import TextBox from "~/shared/components/forms/TextBox";
import SubmitButton from "~/shared/components/forms/SubmitButton";
import Button from "~/shared/components/forms/Button";
import ErrorMsg from "~/shared/components/forms/ErrorMsg";
import ajax from "~/util/ajax";
import { withCss } from "~/util/component";

const TextItem = withCss(TextBox, styles.textBox);

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
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.props.onRequestClose}
            >
                <Form onSubmit={this.onSubmit}>
                    <TextItem
                        placeholder="Old Password"
                        value={this.state.oldPassword}
                        onChange={this.getChangeHandler("oldPassword")}
                    />
                    <TextItem
                        placeholder="New Password"
                        value={this.state.newPassword}
                        onChange={this.getChangeHandler("newPassword")}
                    />
                    <TextItem
                        placeholder="Confirm New Password"
                        value={this.state.confirmPassword}
                        onChange={this.getChangeHandler("confirmPassword")}
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

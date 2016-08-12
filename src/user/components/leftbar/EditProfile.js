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
export default class EditProfile extends React.Component {

    static propTypes = {
        ...modalPropTypes,
    }

    static contextTypes = {
        user: React.PropTypes.object,
    }

    constructor(props, context) {
        super(props, context);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.state = {
            firstname: this.context.user.firstname,
            lastname: this.context.user.lastname,
            email: this.context.user.email,
            phone: this.context.user.phone,
            parentEmail: this.context.user.parentEmail || "",
            errorMsg: "",
        }
    }

    onSubmit = async() => {
        try {
            let { data } = await ajax.request("PUT", "/profile", {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                phone: this.state.phone,
                parentEmail: this.state.parentEmail,
            })
            this.setState({
                errorMsg: "Success"
            })
            setTimeout(() => window.location.reload(), REDIR_TIME);
            // TODO: use redux to not have to reload here
        } catch ({ data }) {
            this.setState({
                errorMsg: data
            })
        }
    }

    render() {
        return (
            <StandardModal
                title="Edit Profile"
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.props.onRequestClose}
            >
                <Form onSubmit={this.onSubmit}>
                    <TextItem
                        placeholder="First Name"
                        value={this.state.firstname}
                        onChange={this.getChangeHandler("firstname")}
                    />
                    <TextItem
                        placeholder="Last name"
                        value={this.state.lastname}
                        onChange={this.getChangeHandler("lastname")}
                    />
                    <TextItem
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.getChangeHandler("email")}
                    />
                    <TextItem
                        placeholder="Phone Number"
                        value={this.state.phone}
                        onChange={this.getChangeHandler("phone")}
                    />
                    {/* TODO: what if a member inputs a parent email,
                        becomes a mentor later, then wants to remove
                        the parent email? */}
                    {this.context.user.position != "mentor" && (
                        <TextItem
                            placeholder="Parent Email"
                            value={this.state.parentEmail}
                            onChange={this.getChangeHandler("parentEmail")}
                        />
                    )}
                    <Button
                        style={styles.button}
                        text="Change Profile Picture"
                        onClick={() => alert("TODO: actually make this work")}
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

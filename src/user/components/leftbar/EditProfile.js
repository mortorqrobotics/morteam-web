import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";
import styles from "~/user/styles/modal";
import Form from "~/shared/components/forms/Form";
import FileUpload from "~/shared/components/forms/FileUpload";
import {
    ModalTextBox,
    ModalButton,
    ModalSubmitButton,
    ModalErrorMsg,
} from "~/shared/components/modal";
import ajax from "~/util/ajax";
import { modalPropTypes, modalPropsForward } from "~/util/modal";

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
            file: null,
            errorMsg: "",
        }
    }

    onSubmit = async() => {
        try {
            let obj = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                phone: this.state.phone,
                parentEmail: this.state.parentEmail,
            }
            if (this.state.file) {
                obj.new_prof_pic = this.state.file;
                const formData = new FormData();
                for (const key of Object.keys(obj)) {
                    formData.append(key, obj[key]);
                }
                obj = formData;
            }
            let { data } = await ajax.request("PUT", "/profile", obj);
            this.setState({
                errorMsg: "Success",
            })
            setTimeout(() => window.location.reload(), REDIR_TIME);
            // TODO: use redux to not have to reload here
        } catch ({ data }) {
            this.setState({
                errorMsg: data,
            })
        }
    }

    render() {
        return (
            <StandardModal
                title="Edit Profile"
                { ...modalPropsForward(this) }
            >
                <Form onSubmit={this.onSubmit}>
                    <ModalTextBox
                        placeholder="First Name"
                        value={this.state.firstname}
                        onChange={this.getChangeHandler("firstname")}
                    />
                    <ModalTextBox
                        placeholder="Last name"
                        value={this.state.lastname}
                        onChange={this.getChangeHandler("lastname")}
                    />
                    <ModalTextBox
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.getChangeHandler("email")}
                    />
                    <ModalTextBox
                        placeholder="Phone Number"
                        value={this.state.phone}
                        onChange={this.getChangeHandler("phone")}
                    />
                    {/* TODO: what if a member inputs a parent email,
                        becomes a mentor later, then wants to remove
                        the parent email?
                    */}
                    {this.context.user.position != "mentor" && (
                        <ModalTextBox
                            placeholder="Parent Email"
                            value={this.state.parentEmail}
                            onChange={this.getChangeHandler("parentEmail")}
                        />
                    )}
                    <ModalButton
                        text="Change Profile Picture"
                        onClick={() => $("#fileUpload").trigger("click")}
                    />
                    <FileUpload
                        id="fileUpload"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(event) => this.setState({ file: event.target.files[0] })}
                    />
                    <ModalSubmitButton text="Save" />
                    {this.state.errorMsg && (
                        <ModalErrorMsg
                            message={this.state.errorMsg}
                        />
                    )}
                </Form>
            </StandardModal>
        )
    }

}

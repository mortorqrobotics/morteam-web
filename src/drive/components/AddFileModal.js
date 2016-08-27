import React, { PropTypes } from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import FileUpload from "~/shared/components/forms/FileUpload";
import { makeChangeHandlerFactory } from "~/util";
import {
    ModalTextBox,
    ModalTextArea,
    ModalButton,
} from "~/shared/components/modal";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { connect } from "react-redux";
import { addFile } from "~/drive/actions";

@Radium
class AddFileModal extends React.Component {

    static propTypes = {
        ...modalPropTypes,
    }

    initialState = {
        name: "",
        file: {},
    }

    state = {
        ...this.initialState,
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    handleChange = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    onSubmit = async () => {
        try {
            let formData = new FormData();
            formData.append("uploadedFile", this.state.file);
            formData.append("fileName", this.state.name);
            formData.append("currentFolderId", this.props.selectedFolder._id);
            await this.props.dispatch(addFile(formData))
        } catch (err) {
            console.log(err);
        }
        this.setState(this.initialState);
        this.props.onRequestClose();
    }

    render() {
        return (
            <StandardModal
                title="Upload a File"
                { ...modalPropsForward(this) }
            >
                <FileUpload accept="*" onChange={this.handleChange} />

                <ModalTextBox
                    placeholder="File Name"
                    value={this.state.name}
                    onChange={this.getChangeHandler("name")}
                />
                <br />
                 <ModalButton
                    text="Upload"
                    onClick={this.onSubmit}
                />

            </StandardModal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedFolder: state.selectedFolder,
    }
}

export default connect(mapStateToProps)(AddFileModal);

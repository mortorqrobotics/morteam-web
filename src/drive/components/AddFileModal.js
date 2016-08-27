import React, { PropTypes } from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
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
        folder: React.PropTypes.object,
        ...modalPropTypes,
    }

    initialState = {
        name: "",
    }

    state = {
        ...this.initialState,
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    onSubmit = async() => {
        await this.props.dispatch(addFile({
            name: this.state.name,
            folder: this.props.folder,
        }))
        this.setState(this.initialState);
        this.props.onRequestClose();
    }

    render() {
        return (
            <StandardModal
                title="Upload a File"
                { ...modalPropsForward(this) }
            >
                <input type="file" accept="*" />
                
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

export default connect()(AddFileModal);

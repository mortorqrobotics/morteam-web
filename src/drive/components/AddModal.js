import React, { PropTypes } from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { makeChangeHandlerFactory } from "~/util";
import {
    ModalTextBox,
    ModalTextArea,
    ModalButton,
} from "~/shared/components/modal";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { connect } from "react-redux";
import { addFolder } from "~/calendar/actions";

@Radium
class AddModal extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
    }

    initialState = {
        name: "",
        audience: {
            users: [],
            groups: [],
        },
    }

    state = {
        ...this.initialState,
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    onSubmit = async() => {
        await this.props.dispatch(addFolder({
            name: this.state.name,
            audience: this.state.audience,
        }))
        this.setState(this.initialState);
        this.props.onRequestClose();
    }

    render() {
        return (
            <StandardModal
                title="New Group"
                { ...modalPropsForward(this) }
            >
                <ModalTextBox
                    placeholder="Group Name"
                    value={this.state.name}
                    onChange={this.getChangeHandler("name")}
                />
                <br />
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

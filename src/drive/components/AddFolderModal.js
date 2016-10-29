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
import { addFolder } from "~/drive/actions";

@Radium
class AddFolderModal extends React.Component {

    static propTypes = {
        ...modalPropTypes,
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

    onSubmit = async () => {
        await this.props.dispatch(addFolder({
            name: this.state.name,
            audience: {
                users: this.state.audience.users.map(u => u._id),
                groups: this.state.audience.groups.map(g => g._id)
            },
            type: "teamFolder",
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

export default connect()(AddFolderModal);

import React, { PropTypes } from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import AdminCheckBox from "~/shared/components/AdminCheckBox";
import { makeChangeHandlerFactory, getAudienceIds } from "~/util";
import {
    ModalTextBox,
    ModalTextArea,
    ModalButton,
} from "~/shared/components/modal";
import { request } from "~/util/ajax";
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
        checked: true,
    }

    state = {
        ...this.initialState,
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    onSubmit = async () => {
        let audienceIds = getAudienceIds(this.state.audience);
        if (this.props.currentTab === "inter" && this.state.checked) {
            let groups = JSON.stringify(this.state.audience.groups.map(group => group.team._id));
            let { data } = await request("GET", "/groups/position/" + groups);
            audienceIds.groups = data.map(group => group._id);
        }
        audienceIds.isMultiTeam = this.props.currentTab === "inter";
        await this.props.dispatch(addFolder({
            name: this.state.name,
            audience: audienceIds,
            type: "teamFolder",
        }));
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
                    isMultiTeam={this.props.currentTab === "inter"}
                />
                <AdminCheckBox
                    onChange={this.getChangeHandler("checked", "checked")}
                    condition={this.props.currentTab === "inter"}
                    checked={this.state.checked}
                />
                 <ModalButton
                    text="Done"
                    onClick={this.onSubmit}
                />

            </StandardModal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentTab: state.currentTab,
    }
}

export default connect(mapStateToProps)(AddFolderModal);

import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import StandardModal from "~/shared/components/StandardModal";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import Button from "~/shared/components/forms/Button";
import AdminCheckBox from "~/shared/components/AdminCheckBox";
import { ModalButton } from "~/shared/components/modal";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { makeChangeHandlerFactory } from "~/util";
import { resetAudience, setAudience } from "~/home/actions";
import { connect } from "react-redux";
import styles from "~/home/styles/editor";

class AudienceModal extends React.Component {

    static propTypes = {
        selected: React.PropTypes.object,
        onChange: React.PropTypes.func,
        ...modalPropTypes,
    }

    state = {
        isMultiTeam: false,
        checked: true,
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    setMultiTeam = (condition) => {
        if (this.state.isMultiTeam !== condition) {
            this.setState({
                isMultiTeam: condition,
            });
            this.props.dispatch(resetAudience(condition));
        }
    }

    submit = async() => {
        if (this.state.checked && this.state.isMultiTeam) {
            let groups = JSON.stringify(this.props.audience.groups.map(group => group.team._id));
            let { data } = await ajax.request("GET", "/groups/position/" + groups);
            this.props.dispatch(setAudience({ users: [], groups: data }));
        }
        this.props.onRequestClose();
    }

    render() {
        return (
            <StandardModal
                title="Select Audience"
                { ...modalPropsForward(this) }
            >
                <Button
                    text="your team"
                    onClick={() => this.setMultiTeam(false)}
                    style={[styles.modalTab, this.state.isMultiTeam ? {} : styles.selectedModalTab]}
                />
                <Button
                    text="other teams"
                    onClick={() => this.setMultiTeam(true)}
                    style={[styles.modalTab, {marginLeft: "5px"}, this.state.isMultiTeam ? styles.selectedModalTab : {}]}
                />
                <AudienceSelect
                    selected={this.props.selected}
                    onChange={this.props.onChange}
                    isMultiTeam={this.state.isMultiTeam}
                />
                <AdminCheckBox
                    condition={this.state.isMultiTeam}
                    checked={this.state.checked}
                    onChange={this.getChangeHandler("checked", "checked")}
                />
                <ModalButton
                    text="Done"
                    onClick={this.submit}
                />
            </StandardModal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        audience: state.audience,
    }
}


export default connect(mapStateToProps)(AudienceModal);

import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import {
    ModalTextBox,
    ModalTextArea,
    ModalButton,
} from "~/shared/components/modal";
import ajax from "~/util/ajax";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import { connect } from "react-redux";

@Radium
export default class AttendanceModal extends React.Component {

    static propTypes = {
        ...modalPropTypes,
        event: React.PropTypes.object.isRequired,
    }

    state = {
        title: "Attendance",
        userList: [],
        isExcusing: false,
        excusedUsers: [],
    }

    componentDidMount = async () => {
        let { data } = await ajax.request("GET",
            "/events/id/" + this.props.event._id + "/userList"
        );
        this.setState({ userList: data });
    }

    reset = () => {
        this.setState({
            title: "Attendance",
            isExcusing: false,
            excusedUsers: [],
        });
    }

    renderExcuser = () => {
        return (
            <div>
                <AudienceSelect
                    userList={this.state.userList}
                    selected={{ groups: [], users: this.state.excusedUsers, }}
                    onChange={({ users }) => this.setState({ excusedUsers: users, })}
                />
                <ModalButton
                    text="Done"
                    onClick={async () => {
                        await ajax.request("PUT",
                            "/events/id/" + this.props.event._id + "/excuseAbsences",
                            { userIds: this.state.excusedUsers, }
                        );
                        this.props.onRequestClose();
                    }}
                />
            </div>
        )
    }

    render() {
        return (
            <StandardModal
                title={this.state.title + " for " + this.props.event.name}
                { ...modalPropsForward(this) }
                onRequestClose={() => {
                    this.reset();
                    this.props.onRequestClose();
                }}
            >
                <ModalButton
                    text="Excuse Absences"
                    onClick={() => this.setState({
                        isExcusing: true,
                        title: "Excuse Absences",
                    })}
                />
                {this.state.isExcusing || (
                    <ModalButton
                        text="Take Attendance"
                        onClick={() => this.setState({
                            title: "Take Attendance",
                        })}
                    />
                )}
                {this.state.isExcusing && this.renderExcuser()}
            </StandardModal>
        )
    }

}

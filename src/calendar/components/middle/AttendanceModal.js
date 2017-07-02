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
import TakeAttendance from "./TakeAttendance";
import { connect } from "react-redux";
import { startAttendance } from "~/calendar/actions";

@Radium
class AttendanceModal extends React.Component {

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
        const [{ data: userList }, { data: attendance }] = await Promise.all([
            ajax.request("GET",
                "/events/id/" + this.props.event._id + "/userList"
            ),
            ajax.request("GET",
                `/events/id/${this.props.event._id}/attendance`
            ),
        ]);
        this.setState({
            userList: userList.filter(u =>
                !attendance.some(({ user, status }) =>
                    u._id === user._id && status === "excused"
                )
            ),
        });
    }

    reset = () => {
        this.setState({
            title: "Attendance",
            isExcusing: false,
            userList: this.state.userList.filter(u =>
                !this.state.excusedUsers.some(user =>
                    u._id === user._id
                )
            ),
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
                        // TODO: use redux
                        await ajax.request("PUT",
                            "/events/id/" + this.props.event._id + "/excuseAbsences",
                            { userIds: this.state.excusedUsers.map(u => u._id), }
                        );
                        this.reset();
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

                {this.props.event.hasTakenAttendance || (
                    <ModalButton
                        text="Excuse Absences"
                        onClick={() => this.setState({
                            isExcusing: true,
                            title: "Excuse Absences",
                        })}
                    />
                )}

                {this.state.isExcusing || this.props.event.hasTakenAttendance || (
                    <ModalButton
                        text="Take Attendance"
                        onClick={() => {
                            this.props.dispatch(startAttendance(this.props.event._id));
                            console.log(this.props.event);
                        }}
                    />
                )}

                {this.state.isExcusing && this.renderExcuser()}

                {this.props.event.hasTakenAttendance && (
                    <TakeAttendance
                        event={this.props.event}
                        onDone={this.props.onRequestClose}
                    />
                )}

            </StandardModal>
        )
    }

}

export default connect()(AttendanceModal);

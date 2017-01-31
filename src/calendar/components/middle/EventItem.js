import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import styles from "~/calendar/styles/middle";
import { modalProps } from "~/util/modal";
import AttendanceModal from "./AttendanceModal";
import ConfirmModal from "~/shared/components/ConfirmModal";
import { currentUser } from "~/util";
import { connect } from "react-redux";
import { deleteEvent } from "~/calendar/actions";

const RadiumGlyphicon = Radium(Glyphicon);

@Radium
class EventItem extends React.Component {

    static propTypes = {
        event: React.PropTypes.object,
    }

    state = {
        isAttendanceModalOpen: false,
        isDeleteModalOpen: false,
    }

    renderAdminButtons = () => {
        if (currentUser.isAdmin()) {
            return (
                <div style={{display: "inline-block"}}>
                    <RadiumGlyphicon
                        glyph="list-alt"
                        style={styles.recordGlyph}
                        onClick={() => this.setState({ isAttendanceModalOpen: true })}
                    />
                    <RadiumGlyphicon
                        glyph="trash"
                        style={styles.recordGlyph}
                        onClick={() => this.setState({ isDeleteModalOpen: true })}
                    />
                    <AttendanceModal
                        { ...modalProps(this, "isAttendanceModalOpen") }
                        event={this.props.event}
                    />
                    <ConfirmModal
                        { ...modalProps(this, "isDeleteModalOpen") }
                        text="Are you sure you would like to delete this event?"
                        action={() => this.props.dispatch(deleteEvent(this.props.event))}
                    />
                </div>
            )
        }
    }

    render() {
        return (
            <li style={styles.eventItem}>
                <span style={{fontWeight:"300",fontSize:"16px",}}>
                    {this.props.event.name}
                </span>
                {this.renderAdminButtons()}
                <br />
                <div style={{paddingLeft:"25px",wordWrap:"break-word",fontWeight:"200",fontSize:"16px",}}>
                    {this.props.event.description}
                </div>
            </li>
        )
    }
}

export default connect()(EventItem);

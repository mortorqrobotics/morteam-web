import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import styles from "~/calendar/styles/middle";
import { modalProps } from "~/util/modal";
import AttendanceModal from "./AttendanceModal";
import { currentUser } from "~/util";

const RadiumGlyphicon = Radium(Glyphicon);

@Radium
export default class EventItem extends React.Component {

    static propTypes = {
        event: React.PropTypes.object,
    }

    state = {
        isModalOpen: false,
    }

    renderRecordAttendance = () => {
        if (currentUser.isAdmin()) {
            return (
                <RadiumGlyphicon
                    glyph="list-alt"
                    style={styles.recordGlyph}
                    onClick={() => this.setState({ isModalOpen: true, })}
                />
            )
        }
    }

    render() {
        return (
            <li style={styles.eventItem}>
                <span style={{fontWeight:"300",fontSize:"16px",}}>
                    {this.props.event.name}
                </span>
                {this.renderRecordAttendance()}
                <br />
                <div style={{paddingLeft:"25px",wordWrap:"break-word",fontWeight:"200",fontSize:"16px",}}>
                    {this.props.event.description}
                </div>
                <AttendanceModal
                    { ...modalProps(this, "isModalOpen") }
                    event={this.props.event}
                />
            </li>
        )
    }
}

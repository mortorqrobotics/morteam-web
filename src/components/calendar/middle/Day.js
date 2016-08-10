import React, { PropTypes } from "react";
import Radium from "radium";

import styles from "~/styles/calendar/middle";
import EventItem from "./EventItem";
import { dayName } from "~/util/date";

@Radium
export default class Day extends React.Component {

    static propTypes = {
        day: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
        events: PropTypes.array.isRequired,
    }

    state = {
        isModalOpen: false,
    }

    render() {
        return (
            <div style={styles.day}>
                <div style={styles.dayNum}>
                    {this.props.day}
                </div>
                <div style={styles.dayContent}>
                    <h4 style={styles.dayName}>
                        {dayName({
                            year: this.props.year,
                            month: this.props.month,
                            day: this.props.day,
                        })}
                        <ul style={styles.eventList}>
                            {this.props.events.map(event => (
                                <EventItem
                                    key={event._id}
                                    event={event}
                                />
                            ))}
                        </ul>
                    </h4>
                </div>
            </div>
        )
    }

}

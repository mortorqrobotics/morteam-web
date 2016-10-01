import React, { PropTypes } from "react";
import Radium from "radium";

import styles from "~/calendar/styles/middle";
import EventItem from "./EventItem";
import Button from "~/shared/components/forms/Button";
import { dayName, allMonths } from "~/util/date";
import { modalProps } from "~/util/modal";
import { currentUser } from "~/util";
import AddModal from "./AddModal";

@Radium
export default class Day extends React.Component {

    static propTypes = {
        day: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
        events: PropTypes.array.isRequired,
    }

    state = {
        isAddModalOpen: false,
    }

    renderAddButton = () => {
        if (currentUser.isAdmin()) {
            return (
                <Button
                    style={styles.addButton}
                    text="+"
                    onClick={() => this.setState({ isAddModalOpen: true })}
                />
            )
        }
    }

    render() {
        return (
            <div
                style={styles.day}
                id={`day-div-${this.props.year}-${this.props.month}-${this.props.day}`}
                className="day"
            >
                <div style={styles.dayNum}>
                    {this.props.day}
                </div>
                {this.renderAddButton()}
                <div style={styles.dayContent}>
                    <h4 style={styles.dayName}>
                        {dayName({
                            year: this.props.year,
                            month: this.props.month,
                            day: this.props.day,
                        })}
                    </h4>
                    <ul style={styles.eventList}>
                        {this.props.events.map(event => (
                            <EventItem
                                key={event._id}
                                event={event}
                            />
                        ))}
                    </ul>
                </div>
                <AddModal
                    day={this.props.day}
                    month={this.props.month}
                    year={this.props.year}
                    { ...modalProps(this, "isAddModalOpen") }
                />
            </div>
        )
    }

}

import React, { PropTypes } from "react";
import Radium from "radium";

import styles from "~/styles/calendar/middle";
import EventItem from "./EventItem";
import Button from "~/components/shared/forms/Button";
import { dayName } from "~/util/date";
import AddModal from "./AddModal";

@Radium
export default class Day extends React.Component {

    static propTypes = {
        day: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
        events: PropTypes.array.isRequired,
    }

    static contextTypes = {
        user: PropTypes.object,
    }

    state = {
        isModalOpen: false,
    }

    renderAddButton = () => {
        if (this.context.user.isAdmin()) {
            return (
                <Button
                    style={styles.addButton}
                    text="+"
                    onClick={() => this.setState({ isModalOpen: true })}
                />
            )
        }
    }

    render() {
        return (
            <div
                style={styles.day}
                id={`day-div-${this.props.year}-${this.props.month}-${this.props.day}`}
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
                <AddModal
                    day={this.props.day}
                    month={this.props.month}
                    year={this.props.year}
                    isOpen={this.state.isModalOpen}
                    onAfterOpen={() => this.setState({ isModalOpen: true })}
                    onRequestClose={() => this.setState({ isModalOpen: false })}
                />
            </div>
        )
    }

}

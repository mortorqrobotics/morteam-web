import React from "react";
import Radium from "radium";

import RightItem from "./RightItem";
import { connect } from "react-redux";
import { range, last, flatMap } from "~/util";
import { nextAbsMonth, currentAbsMonth, showDate } from "~/util/date";
import styles from "~/calendar/styles/right";

const now = new Date();
const nowAbsMonth = currentAbsMonth();

function UpcomingEvents(props) {
    return (
        <RightItem
            title="Upcoming Events"
        >
            {props.events.map(event => (
                <li key={event._id} style={styles.li}>
                    {event.name} ({showDate(event.date)})
                    <br />
                    <div style={styles.indented}>
                        {event.description}
                    </div>
                </li>
            ))}
        </RightItem>
    )
}

const numMonthsLookAhead = 3; // including current month
const numEvents = 4;

function mapStateToProps(state) {
    const absMonths = range(1, numMonthsLookAhead)
        .reduce(arr => arr.concat(nextAbsMonth(last(arr))), [nowAbsMonth])
    const events = flatMap(absMonths, ({ year, month}) => (
            (state.events[year] || {})[month] || {}
        ))
        .filter(event => Number(event.date) > Number(now))
        .sort((a, b) => Number(a.date) - Number(b.date)) // put new events in right order
        .slice(0, numEvents)
    return {
        events,
    }
}

export default connect(mapStateToProps)(Radium(UpcomingEvents));

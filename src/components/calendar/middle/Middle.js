import React from "react";
import Radium from "radium";

import { connect } from "react-redux";
import { flatMap, range } from "~/util";
import { daysInAbsMonth } from "~/util/date";
import Day from "./Day";
import styles from "~/styles/calendar/middle";

let lastAbsMonth = null;

@Radium
class Middle extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate = () => {
        if (!lastAbsMonth
            || lastAbsMonth.month !== this.props.absMonth.month
            || lastAbsMonth.year !== this.props.absMonth.year
        ) {
            this.scrollToElem(this.props.absMonth);
        }
        lastAbsMonth = this.props.absMonth;
    }

    // http://stackoverflow.com/a/4884928/1838811
    scrollToElem = ({ year, month }) => {
        // http://stackoverflow.com/a/28748160/1838811
        window.requestAnimationFrame(() => {
            // scroll to the first day of a month
            const $elem = $(`#day-div-${year}-${month}-1`);
            const offset = $elem.offset();
            $("html, body").animate({
                scrollTop: offset.top - 50,
            });
        });
    }

    render() {
        return (
            <div style={styles.container}>
                {flatMap(Object.keys(this.props.events), year => (
                    flatMap(Object.keys(this.props.events[year]), month => (
                        flatMap(range(1, 1 + daysInAbsMonth({ month, year })), day => (
                            <Day
                                day={day}
                                month={parseInt(month)}
                                year={parseInt(year)}
                                events={this.props.events[year][month].filter(event => (
                                    event.date.getDate() == day
                                ))}
                            />
                        ))
                    ))
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        absMonth: state.absMonth,
        events: state.events,
    }
}

export default connect(mapStateToProps)(Middle);

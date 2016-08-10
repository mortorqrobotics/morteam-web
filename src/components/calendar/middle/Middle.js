import React from "react";
import Radium from "radium";

import { connect } from "react-redux";
import { flatMap, range } from "~/util";
import { daysInAbsMonth } from "~/util/date";
import Day from "./Day";

@Radium
class Middle extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ marginTop: "55px" }}>
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

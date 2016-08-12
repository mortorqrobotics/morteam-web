import React from "react";
import Radium from "radium";

import { withCss } from "~/util/component";
import { range } from "~/util";
import { allMonths } from "~/util/date";
import styles from "~/shared/styles/leftbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import YearDropdown from "./YearDropdown";
import { connect } from "react-redux";
import { setAbsMonth } from "~/calendar/actions";

@Radium
class Leftbar extends React.Component {

    getStyle = (month) => {
        if (month === this.props.selectedMonth) {
            return styles.selected;
        }
    }

    handleMonthChange = (month) => {
        this.props.dispatch(setAbsMonth({
            year: this.props.selectedYear,
            month,
        }));
    }

    handleYearChange = (year) => {
        this.props.dispatch(setAbsMonth({
            year,
            month: this.props.selectedMonth,
        }));
    }

    render() {
        return (
            <div style={styles.div}>
                <ul style={styles.ul}>

                    <li style={styles.li}>
                        <YearDropdown
                            selectedYear={this.props.selectedYear}
                            onYearChange={this.handleYearChange}
                        />
                    </li>

                    {range(0, 12).map(month => (
                        <li
                            style={[styles.li, styles.button, this.getStyle(month)]}
                            key={month}
                            onClick={() => this.handleMonthChange(month)}
                        >
                            <Glyphicon glyph="calendar" style={styles.glyph}/>
                            {allMonths[month]}
                        </li>
                    ))}

                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedMonth: state.absMonth.month,
        selectedYear: state.absMonth.year,
    }
}

export default connect(mapStateToProps)(Leftbar);

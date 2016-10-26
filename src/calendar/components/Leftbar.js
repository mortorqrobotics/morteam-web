import React from "react";
import Radium from "radium";

import { withCss } from "~/util/component";
import { range } from "~/util";
import { allMonths } from "~/util/date";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import YearDropdown from "./YearDropdown";
import { connect } from "react-redux";
import { setAbsMonth } from "~/calendar/actions";
import { LeftbarContainer, LeftbarItem, LeftbarButton } from "~/shared/components/leftbar";
import { leftbarProps } from "~/util/leftbar";

@Radium
class Leftbar extends React.Component {

    state = {
        isLeftbarOpen: true,
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
            <LeftbarContainer { ...leftbarProps(this, "isLeftbarOpen") }>

                <LeftbarItem>
                    <YearDropdown
                        selectedYear={this.props.selectedYear}
                        onYearChange={this.handleYearChange}
                    />
                </LeftbarItem>

                {range(0, 12).map(month => (
                    <LeftbarButton
                        isSelected={month === this.props.selectedMonth}
                        key={month}
                        onClick={() => this.handleMonthChange(month)}
                    >
                        <Glyphicon glyph="calendar" style={{ marginRight: "5px" }} />
                        {allMonths[month]}
                    </LeftbarButton>
                ))}

            </LeftbarContainer>
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

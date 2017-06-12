import React from "react";
import Radium from "radium";

import Dropdown from "~/shared/components/forms/Dropdown";
import Button from "~/shared/components/forms/Button";
import styles from "~/user/styles/middle";
import { range, pageOptions, fullName, currentUser} from "~/util";
import ajax from "~/util/ajax";
import { allMonths, daysInAbsMonth } from "~/util/date";
import { parseDate } from "~/util/date";

import { connect } from "react-redux";
import { excuseAbsence, fetchAttendance } from "~/user/actions";

const now = new Date();

@Radium
class Attendance extends React.Component {

    state = {
        toMonth: now.getMonth(),
        toDay: now.getDate(),
        toYear: now.getFullYear(),
    }

    componentDidMount = async () => {
        const { data } = await ajax.request("GET", `/users/id/${pageOptions.userId}`);
        const date = new Date(data.created_at);
        this.setState({
            fromMonth: date.getMonth(),
            fromDay: date.getDate(),
            fromYear: date.getFullYear(),
        });
    }

    updateAttendance = () => {
        this.props.dispatch(fetchAttendance(pageOptions.userId,
            new Date(
                this.state.fromYear,
                this.state.fromMonth,
                this.state.fromDay
            ),
            new Date(
                this.state.toYear,
                this.state.toMonth,
                this.state.toDay,
            )
        ))
    }

    getPresencePercentage = () => {
        const present = this.props.present;
        const absent = this.props.absences.length;
        const result = 100 * present / (present + absent) || 0;
        return Number.isInteger(result) ? result.toString() : result.toFixed(1);
    }

    render() {
        return (
            <div style={styles.container}>
                <span style={styles.title}>
                    Attendance
                </span>
                <br />

                <span style={styles.attendanceDataPoint}>
                    From:
                </span>
                <Dropdown
                    style={styles.attendanceDropdown}
                    selected={this.state.fromMonth}
                    onChange={fromMonth => this.setState({ fromMonth })}
                    options={range(0, 12)}
                    display={month => allMonths[month]}
                />
                <Dropdown
                    style={styles.attendanceDropdown}
                    selected={this.state.fromDay}
                    onChange={fromDay => this.setState({ fromDay })}
                    options={range(1, 30)}
                />
                <Dropdown
                    style={styles.attendanceDropdown}
                    selected={this.state.fromYear}
                    onChange={fromYear => this.setState({ fromYear })}
                    options={range(2015, now.getFullYear() + 1)}
                    // 2015 is when morteam was created so this is ok... ish
                />
                <br />

                <span style={styles.attendanceDataPoint}>
                    To:
                </span>
                <Dropdown
                    style={styles.attendanceDropdown}
                    selected={this.state.toMonth}
                    onChange={toMonth => this.setState({ toMonth })}
                    options={range(0, 12)}
                    display={month => allMonths[month]}
                />
                <Dropdown
                    style={styles.attendanceDropdown}
                    selected={this.state.toDay}
                    onChange={toDay => this.setState({ toDay })}
                    options={range(1, 30)}
                />
                <Dropdown
                    style={styles.attendanceDropdown}
                    selected={this.state.toYear}
                    onChange={toYear => this.setState({ toYear })}
                    options={range(2015, now.getFullYear() + 1)}
                />

                <Button
                    style={styles.refreshAttendance}
                    text="Refresh Attendance"
                    onClick={() => this.updateAttendance()}
                />
                <br />


                <span style={styles.attendanceDataPoint}>
                    Unexcused absences: {this.props.absences.length}
                </span>
                <br />

                <span style={styles.attendanceDataPoint}>
                    Presence percentage: {this.getPresencePercentage()}%
                </span>

                {this.props.absences.length > 0 ?
                    <div>
                        <span>
                            {this.props.absences.map(absence => (
                                <div key={absence._id}>
                                    <span style={styles.absenceDate}>
                                        {parseDate(absence.date)}: {absence.name}, {absence.description}
                                    </span>
                                    {currentUser.isAdmin() ?
                                        <Button
                                            style={styles.refreshAttendance}
                                            text="Excuse Absence"
                                            onClick={() => this.props.dispatch(excuseAbsence(absence._id))}
                                        />
                                        :
                                        void(0)
                                    }
                                    <br />
                                </div>
                            ))}

                        </span>
                    </div>
                    :
                    void(0)
                }

            </div>
        )
    }

}

const mapStateToProps = ({ attendance }) => {
    return {
        absences: attendance.absences,
        present: attendance.present,
    }
}

export default connect(mapStateToProps)(Attendance);

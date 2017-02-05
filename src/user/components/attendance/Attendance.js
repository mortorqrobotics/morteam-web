import React from "react";
import Radium from "radium";

import Dropdown from "~/shared/components/forms/Dropdown";
import Button from "~/shared/components/forms/Button";
import styles from "~/user/styles/middle";
import { range, pageOptions } from "~/util";
import ajax from "~/util/ajax";
import { allMonths, daysInAbsMonth } from "~/util/date";
import { parseDate } from "~/util/date";

const now = new Date();

@Radium
export default class Attendance extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            toMonth: now.getMonth(),
            toDay: now.getDate(),
            toYear: now.getFullYear(),
            absences: [], // all unexcused
            present: 0,
        }
        this.state.fromMonth = this.state.toMonth;
        this.state.fromDay = this.state.toDay;
        this.state.fromYear = this.state.toYear;
    }

    componentDidMount = async () => {
        const { data } = await ajax.request("GET", `/users/id/${pageOptions.userId}`);
        const date = new Date(data.created_at);
        this.setState({
            fromMonth: date.getMonth(),
            fromDay: date.getDate(),
            fromYear: date.getFullYear(),
        });
        await this.updateAttendance(true);
    }

    updateAttendance = async (isFirst) => {
        const { data: { absences, present } } = await ajax.request("GET",
            `/users/id/${pageOptions.userId}/absences`, isFirst ? ({
                startDate: new Date(
                    this.state.fromYear,
                    this.state.fromMonth,
                    this.state.fromDay
                ),
                endDate: new Date(
                    this.state.toYear,
                    this.state.toMonth,
                    this.state.toDay
                ),
            }) : undefined
        );
        this.setState({ absences, present });
    }

    getPresencePercentage = () => {
        const present = this.state.present;
        const absent = this.state.absences.length;
        const result = 100 * present / (present + absent) || 0;
        return Number.isInteger(result) ? result.toString() : result.toFixed(1);
    }

    getUnexcusedAbsenses = () => {
        console.log(this.state.absences);
        let showDate = "";
        for (let i = 0; i < this.state.absences.length; i++) {
             showDate = showDate + parseDate(this.state.absences[i].date);
        }
        return showDate;

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
                    selected={this.state.fromYear}
                    onChange={toYear => this.setState({ toYear })}
                    options={range(2015, now.getFullYear() + 1)}
                />

                <Button
                    style={styles.refreshAttendance}
                    text="Refresh Attendance"
                    onClick={() => this.updateAttendance(false)}
                />
                <br />


                <span style={styles.attendanceDataPoint}>
                    Unexcused absences: {this.state.absences.length}
                </span>
                <br />

                {this.state.absences.length > 0 ?
                    <div>
                        <span style={styles.absenceDate}>
                            Dates: {this.getUnexcusedAbsenses()}
                        </span>
                        <br />
                    </div>
                    :
                    void(0)
                }

                <span style={styles.attendanceDataPoint}>
                    Presence percentage: {this.getPresencePercentage()}%
                </span>


            </div>
        )
    }

}

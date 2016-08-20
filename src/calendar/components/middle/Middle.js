import React from "react";
import Radium from "radium";

import { connect } from "react-redux";
import { setAbsMonth } from "~/calendar/actions";
import { flatMap, range } from "~/util";
import { daysInAbsMonth, prevAbsMonth, nextAbsMonth } from "~/util/date";
import Day from "./Day";
import styles from "~/calendar/styles/middle";

let lastAbsMonth = null;
let isScrolling = false;

@Radium
class Middle extends React.Component {

    lastAbsMonth = null;
    isScrolling = false;

    componentDidUpdate = () => {
        if (!lastAbsMonth
            || lastAbsMonth.month !== this.props.absMonth.month
            || lastAbsMonth.year !== this.props.absMonth.year
        ) {
            this.scrollToElem(this.props.absMonth);
            // TODO: scroll to current day on page load
        }
        lastAbsMonth = this.props.absMonth;
    }

    componentDidMount = () => {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount = () => {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = (event) => {
        if (isScrolling) {
            return;
        }
        const scrollPos = event.srcElement.body.scrollTop;
        const pageHeight = $(window).height(); // TODO: this is eh
        const midPage = scrollPos + pageHeight / 2;
        const dayElems = Array.from($(".day"));
        const above = dayElems.filter(elem => elem.offsetTop < midPage);
        const midElem = above[above.length - 1];
        const midId = midElem.id;
        const [_, year, month, day] = midId.match(/(\d+)-(\d+)-(\d+)/);
        if (year != this.props.absMonth.year || month != this.props.absMonth.month) {
            const newAbsMonth = {
                month: parseInt(month),
                year: parseInt(year),
            };
            lastAbsMonth = newAbsMonth;
            const offset = midElem.offsetTop;
            isScrolling = true;
            this.props.dispatch(setAbsMonth(newAbsMonth)).then(() => {
                const oldOffset = midElem.offsetTop;
                window.requestAnimationFrame(() => {
                    const $newElem = $("#" + midId);
                    // (scrollPos - offset) should remain the same, so this
                    document.body.scrollTop = scrollPos - oldOffset + $newElem.offset().top;
                    setTimeout(() => isScrolling = false, 10);
                });
            });
        }
    }

    // http://stackoverflow.com/a/4884928/1838811
    scrollToElem = ({ year, month }) => {
        if (isScrolling) {
            return;
        }
        isScrolling = true;
        // http://stackoverflow.com/a/28748160/1838811
        window.requestAnimationFrame(() => {
            // scroll to the first day of a month
            const $elem = $(`#day-div-${year}-${month}-1`);
            const offset = $elem.offset();
            $("html, body").animate({
                scrollTop: offset.top - 50,
            }, () => {
                isScrolling = false;
            });
        });
    }

    render() {
        if (Object.keys(this.props.events).length === 0) {
            // did not work without this idk
            return null;
        }
        return (
            <div style={styles.container}>
                {flatMap([
                    prevAbsMonth(this.props.absMonth),
                    this.props.absMonth,
                    nextAbsMonth(this.props.absMonth),
                ], ({ month, year }) => (
                    flatMap(range(1, 1 + daysInAbsMonth({ month, year })), day => (
                        <Day
                            day={day}
                            month={month}
                            year={year}
                            events={this.props.events[year][month].filter(event => (
                                event.date.getDate() == day
                            ))}
                        />
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

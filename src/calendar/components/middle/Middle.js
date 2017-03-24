import React from "react";
import Radium from "radium";

import { connect } from "react-redux";
import { setAbsMonth } from "~/calendar/actions";
import { range } from "~/util";
import { daysInAbsMonth, prevAbsMonth, nextAbsMonth } from "~/util/date";
import Day from "./Day";
import styles from "~/calendar/styles/middle";

@Radium
class Middle extends React.Component {

    componentDidMount = () => {
        this.isScrolling = false;
        this.lastAbsMonth = null;
        this.lastMidElemId = null;
        this.lastOffsetTop = null;
        $("#allContent").css("height", "100%");
        $("#allContent").children().css("height", "100%");
        $("#allContent").children().children().css("height", "100%");
        //the scrolling does not work unless all preceeding divs have a set height
    }

    componentWillUpdate = () => {
        $(this.refs.container).off("scroll");
        if (this.lastMidElemId) {
            this.lastOffsetTop = $("#" + this.lastMidElemId).offset().top;
        }
    }

    componentDidUpdate = () => {
        const container = $(this.refs.container);
        if (!this.lastAbsMonth
            || this.lastAbsMonth.month !== this.props.absMonth.month
            || this.lastAbsMonth.year !== this.props.absMonth.year
        ) {
            this.scrollToElem(this.props.absMonth);
            this.lastAbsMonth = this.props.absMonth;
        }
        container.scroll(this.handleScroll);

        if (this.lastMidElemId) {
            const newMidElem = $("#" + this.lastMidElemId);
            const newScrollTop = container.scrollTop() - this.lastOffsetTop + newMidElem.offset().top;
            container.scrollTop(newScrollTop);
            this.lastMidElemId = null;
            this.lastOffsetTop = null;
        }
    }

    handleScroll = () => {
        if (this.isScrolling || this.lastMidElemId) {
            return;
        }
        const container = $(this.refs.container);
        const scrollTop = container.scrollTop();
        const pageHeight = $(document).height();
        const dayElems = Array.from($(".day")); // .map($)
        const midPage = scrollTop + pageHeight / 2;
        const above = dayElems.filter(elem => elem.offsetTop < midPage);
        const midElem = above[above.length - 1];
        const [_, year, month, day] = midElem.id.match(/(\d+)-(\d+)-(\d+)/);
        if (year != this.props.absMonth.year || month != this.props.absMonth.month) {
            const newAbsMonth = {
                month: parseInt(month),
                year: parseInt(year),
            };
            this.lastAbsMonth = newAbsMonth;
            this.lastMidElemId = midElem.id;
            this.props.dispatch(setAbsMonth(newAbsMonth));
        }
    }

    // http://stackoverflow.com/a/4884928/1838811
    scrollToElem = ({ year, month }) => {
        if (this.isScrolling) {
            return;
        }
        this.isScrolling = true;

        const day = this.lastAbsMonth ? 1 : new Date().getDate(7);

        // http://stackoverflow.com/a/28748160/1838811
        window.requestAnimationFrame(() => {
            const container = $(this.refs.container);

            // scroll to the first day of a month
            const elem = $(`#day-div-${year}-${month}-${day}`);

            // make sure there always appears to be some scrolling
            container.scrollTop(container.scrollTop() - 50);

            container.animate({
                scrollTop: container.scrollTop() + elem.offset().top - 85,
            }, () => {
                this.isScrolling = false;
            });
        });
    }

    render() {
        if (Object.keys(this.props.events).length === 0) {
            return null;
        }
        return (
            <div ref="container" style={styles.container}>
                {[
                    prevAbsMonth(this.props.absMonth),
                    this.props.absMonth,
                    nextAbsMonth(this.props.absMonth),
                ].map(({ month, year }) => (
                    range(1, 1 + daysInAbsMonth({ month, year })).map(day => (
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

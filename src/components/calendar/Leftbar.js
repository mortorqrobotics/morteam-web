import React from "react";
import Radium from "radium";

import { withCss } from "~/util/component";
import { allMonths } from "~/util/date";
import styles from "~/styles/leftbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import YearDropdown from "./YearDropdown";

const currentMonth = new Date().getMonth();

@Radium
export default class Leftbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedMonth: allMonths[currentMonth],
        };
    }

    getStyle = (month) => {
        if (month === this.state.selectedMonth) {
            return styles.selected;
        }
    }

    onClick = (month) => {
        this.setState({
            selectedMonth: month
        });
    }

    render() {
        return (
            <div style={styles.div}>
                <ul style={styles.ul}>

                    <li style={styles.li}>
                        <YearDropdown />
                    </li>

                    {allMonths.map(month => (
                        <li
                            style={[styles.li, styles.button, this.getStyle(month)]}
                            key={month}
                            onClick={() => this.onClick(month)}
                        >
                            <Glyphicon glyph="calendar" style={styles.glyph}/>
                            {month}
                        </li>
                    ))}

                </ul>
            </div>
        )
    }
}

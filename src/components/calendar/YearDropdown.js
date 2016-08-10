import React from "react";
import Radium from "radium";

import { withCss } from "~/util/component";
import styles from "~/styles/calendar";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 6 }, (x, i) => i + currentYear - 1);
// currentYear - 1 to currentYear + 4

@Radium
export default class YearDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedYear: currentYear,
            isDropdownOpen: false
        };
    }

    getStyle = (year) => {
        if (year === this.state.selectedYear) {
            return styles.dropdown.selected;
        }
    }

    onButtonClick = () => {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        });
    }

    onItemClick = (year) => {
        this.setState({
            selectedYear: year
        });
    }

    displayMenu = () => {
        if (this.state.isDropdownOpen) {
            return (
                <ul style={styles.dropdown.ul}>
                    {years.map(year => (
                        <li
                            onClick={() => this.onItemClick(year)}
                            style={[styles.dropdown.item, this.getStyle(year)]}
                            key={year}
                        >
                            {year}
                        </li>
                    ))}
                </ul>
            )
        }
    }

    render() {
        return (
            <div>
                <div style={styles.dropdown.button} onClick={this.onButtonClick}>
                    {this.state.selectedYear}
                    <span style={styles.dropdown.caret} />
                </div>
                {this.displayMenu()}
            </div>
        )
    }
}

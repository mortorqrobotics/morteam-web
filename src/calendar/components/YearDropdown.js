import React from "react";
import Radium from "radium";

import { range } from "~/util";
import styles from "~/calendar/styles/yearDrop";

const currentYear = new Date().getFullYear();
const years = range(currentYear - 1, currentYear + 5);

@Radium
export default class YearDropdown extends React.Component {

    static propTypes = {
        selectedYear: React.PropTypes.number,
        onYearChange: React.PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            isDropdownOpen: false
        };
    }

    getButtonStyle = () => {
        if (this.state.isDropdownOpen) {
            return styles.dropdown.buttonShadow;
        }
    }

    getItemStyle = (year) => {
        if (year === this.props.selectedYear) {
            return styles.dropdown.selected;
        }
    }

    onButtonClick = () => {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        });
    }

    displayMenu = () => {
        if (this.state.isDropdownOpen) {
            return (
                <ul style={styles.ul}>
                    {years.map(year => (
                        <li
                            onClick={() => this.props.onYearChange(year)}
                            style={[styles.item, this.getItemStyle(year)]}
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
                <div
                    style={[styles.button, this.getButtonStyle()]}
                    onClick={this.onButtonClick}
                >
                    {this.props.selectedYear}
                    <span style={styles.caret} />
                </div>
                {this.displayMenu()}
            </div>
        )
    }
}

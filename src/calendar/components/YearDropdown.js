import React from "react";
import Radium from "radium";

import { Dropdown } from "~/shared/components/leftbar";
import { range } from "~/util";

const currentYear = new Date().getFullYear();
const years = range(currentYear - 1, currentYear + 5);

@Radium
export default class YearDropdown extends React.Component {

    static propTypes = {
        selectedYear: React.PropTypes.number,
        onYearChange: React.PropTypes.func,
    }

    state = {
        isDropdownOpen: false,
    }

    handleButtonClick = () => {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        });
    }

    render() {
        return (
            <Dropdown
                isOpen={this.state.isDropdownOpen}
                options={years}
                selectedOption={this.props.selectedYear}
                text={this.props.selectedYear}
                onClick={this.handleButtonClick}
                onOptionClick={this.props.onYearChange}
            />
        )
    }
}

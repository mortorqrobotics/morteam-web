import React from "react";
import Radium from "radium";

import { Dropdown } from "~/shared/components/leftbar";

const sorts = ["Date", "Name", "Size", "Type"];

@Radium
export default class SortDropdown extends React.Component {

    state = {
        isDropdownOpen: false,
        chosenSort: "Date",
    }

    handleButtonClick = () => {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        });
    }
    
    handleOptionClick = (sort) => {
        this.setState({
            chosenSort: sort,
        });
    }

    render() {
        return (
            <Dropdown
                isOpen={this.state.isDropdownOpen}
                options={sorts}
                selectedOption={this.state.chosenSort}
                text="Sort By"
                onClick={this.handleButtonClick}
                onOptionClick={this.handleOptionClick}
            />
        )
    }
}

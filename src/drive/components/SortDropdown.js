import React from "react";
import Radium from "radium";

import { Dropdown } from "~/shared/components/leftbar";
import { connect } from "react-redux";
import { sortFilesBy } from "~/drive/actions";

const sortTypes = ["Date", "Name", "Size", "Type"];

@Radium
class SortDropdown extends React.Component {

    state = {
        isDropdownOpen: false,
        chosenSortType: "Date",
    }

    handleButtonClick = () => {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen,
        });
    }

    handleOptionClick = (sortType) => {
        this.setState({
            chosenSortType: sortType,
        });
        this.props.dispatch(sortFilesBy(sortType));
    }

    render() {
        return (
            <Dropdown
                isOpen={this.state.isDropdownOpen}
                options={sortTypes}
                selectedOption={this.state.chosenSortType}
                text="Sort By"
                onClick={this.handleButtonClick}
                onOptionClick={this.handleOptionClick}
            />
        )
    }
}

export default connect()(SortDropdown);

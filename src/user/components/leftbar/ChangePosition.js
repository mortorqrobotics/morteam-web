import React from "react";
import Radium from "radium";
import ajax from "~/util/ajax";

import { Dropdown } from "~/shared/components/leftbar";

const positions = ["Member", "Leader", "Mentor", "Alumnus"];

@Radium
export default class ChangePosition extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            isOpen: false,
            selectedOption: "Position",
        }
    }
    
    handleButtonClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    
    render() {
        return (
            <Dropdown
                isOpen={this.state.isOpen}
                options={positions}
                selectedOption={this.state.selectedOption}
                text="Position"
                onClick={this.handleButtonClick}
                onOptionClick={this.handleOptionClick}
            />
        )
    }
    
}
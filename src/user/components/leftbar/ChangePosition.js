import React from "react";
import Radium from "radium";
import ajax from "~/util/ajax";

import { Dropdown } from "~/shared/components/leftbar";

const positions = ["Member", "Leader", "Mentor", "Alumnus"];

@Radium
export default class ChangePosition extends React.Component {
    
     static contextTypes = {
        options: React.PropTypes.object,
    }
    
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
    
    handleOptionClick = async(position) => {
        this.setState({
            selectedOption: position,
        })
        try {
            await ajax.request("put", "/users/id/" + this.context.options.userId + "/position/" + this.state.selectedOption);
        } catch(err) {
            console.log(err);
        }
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
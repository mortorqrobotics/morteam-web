import React from "react";
import Radium from "radium";
import ajax from "~/util/ajax";

import { Dropdown } from "~/shared/components/leftbar";
import styles from "~/user/styles/leftbar";
import { capitalize } from "~/util";

const positions = ["Member", "Leader", "Mentor", "Alumnus"];

@Radium
export default class ChangePosition extends React.Component {

    static propTypes = {
        initialPosition: React.PropTypes.string,
    }

    static contextTypes = {
       options: React.PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            selected: capitalize(this.props.initialPosition),
        }
    }

    handleButtonClick = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    handleOptionClick = async (position) => {
        try {
            console.log(await ajax.request("put",
                `/users/id/${this.context.options.userId}/position`, {
                    newPosition: position.toLowerCase(),
                }
            ));
            this.setState({
                selected: position,
            });
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div style={styles.item}>
                <Dropdown
                    style={styles.dropdown}
                    listStyle={styles.dropdownList}
                    isOpen={this.state.isOpen}
                    options={positions}
                    selectedOption={this.state.selected}
                    text={this.state.selected}
                    onClick={this.handleButtonClick}
                    onOptionClick={this.handleOptionClick}
                />
            </div>
        )
    }

}

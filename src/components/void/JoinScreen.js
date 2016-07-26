import React from "react";
import Radium from "radium";

import { makeChangeHandlerFactory } from "~/util";
//import Form from "~/components/shared/forms/Form";
import VoidButton from "./VoidButton";
import VoidTextBox from "./VoidTextBox";
// TODO: use a submit button

@Radium
export default class JoinScreen extends React.Component {

    constructor(props) {
        super(props);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.state = {
            teamCode: "",
        }
    }

    join = async() => {
        alert(this.state.teamCode + "\nsomething should happen here");
    }

    render() {
        return (
            <div>
                <VoidTextBox
                    value={this.state.teamCode}
                    onChange={this.getChangeHandler("teamCode")}
                    placeholder="Team Code"
                />
                <VoidButton
                    text="Join"
                    onClick={this.join}
                />
            </div>
        )
    }

}

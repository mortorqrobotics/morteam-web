import React from "react";
import Radium from "radium";

import { makeChangeHandlerFactory } from "~/util";
import VoidButton from "./VoidButton";
import VoidTextBox from "./VoidTextBox";

@Radium
export default class CreateScreen extends React.Component {

    constructor(props) {
        super(props);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.state = {
            number: "", // actual number here?
            name: "",
            code: "",
        }
    }

    create = async() => {
        alert(JSON.stringify(this.state) + "\nput stuff here");
    }

    render() {
        return (
            <div>
                <VoidTextBox
                    placeholder="Team Number"
                    value={this.state.number}
                    onChange={this.getChangeHandler("number")}
                />
                <VoidTextBox
                    placeholder="Team Name"
                    value={this.state.name}
                    onChange={this.getChangeHandler("name")}
                />
                <VoidTextBox
                    placeholder="Choose Team ID"
                    value={this.state.code}
                    onChange={this.getChangeHandler("code")}
                />
                <VoidButton
                    text="Done"
                    onClick={this.create}
                />
            </div>
        )
    }

}

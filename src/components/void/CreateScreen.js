import React from "react";
import Radium from "radium";

import { makeChangeHandlerFactory } from "~/util";
import ajax from "~/util/ajax";
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
            id: "",
        }
    }

    create = async() => {
        try {
            let result = await ajax.request("post", "/teams", {
                number: this.state.number,
                name: this.state.name,
                id: this.state.id,
            });
            console.log(result);
        } catch (err) {
            console.log(err);
        }
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
                    value={this.state.id}
                    onChange={this.getChangeHandler("id")}
                />
                <VoidButton
                    text="Done"
                    onClick={this.create}
                />
            </div>
        )
    }

}

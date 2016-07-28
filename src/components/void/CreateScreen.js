import React from "react";
import Radium from "radium";

import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";
import ajax from "~/util/ajax";
import ErrorMsg from "~/components/shared/forms/ErrorMsg";

import { VoidRow, VoidButton, VoidTextBox } from "./shared";

@Radium
export default class CreateScreen extends React.Component {

    constructor(props) {
        super(props);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.state = {
            number: "", // actual number here?
            name: "",
            id: "",
            errorMsg: "",
        }
    }

    create = async() => {
        try {
            await ajax.request("post", "/teams", {
                number: this.state.number,
                name: this.state.name,
                id: this.state.id,
            });
            this.setState({
                errorMsg: "Success"
            });
            setTimeout(() => window.location.assign("/"), REDIR_TIME);
        } catch ({ data }) {
            this.setState({
                errorMsg: data
            });
        }
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <VoidRow>
                    <VoidTextBox
                        placeholder="Team Number"
                        value={this.state.number}
                        onChange={this.getChangeHandler("number")}
                    />
                </VoidRow>
                <VoidRow>
                    <VoidTextBox
                        placeholder="Team Name"
                        value={this.state.name}
                        onChange={this.getChangeHandler("name")}
                    />
                </VoidRow>
                <VoidRow>
                    <VoidTextBox
                        placeholder="Choose Team ID"
                        value={this.state.id}
                        onChange={this.getChangeHandler("id")}
                    />
                </VoidRow>
                <VoidRow>
                    <VoidButton
                        text="Done"
                        onClick={this.create}
                    />
                </VoidRow>
                <VoidRow>
                    <ErrorMsg message={this.state.errorMsg} />
                </VoidRow>
            </div>
        )
    }

}

import React from "react";
import Radium from "radium";

import { makeChangeHandlerFactory } from "~/util";
import ajax from "~/util/ajax";
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
        try {
            let result = await ajax.request("POST",
                "/teams/code/" + this.state.teamCode + "/join"
            ); // TODO: urlencode the team code
            console.log(result);
        } catch (err) {
            console.log(err);
        }
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

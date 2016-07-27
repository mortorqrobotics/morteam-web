import React from "react";
import Radium from "radium";

import { makeChangeHandlerFactory } from "~/util";
import ajax from "~/util/ajax";
//import Form from "~/components/shared/forms/Form";
import ErrorMsg from "~/components/shared/forms/ErrorMsg";
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
            errorMsg: "",
        }
    }

    join = async() => {
        try {
            await ajax.request("POST",
                "/teams/code/" + this.state.teamCode + "/join"
            ); // TODO: urlencode the team code
            this.setState({
                errorMsg: "Success"
            });
            setTimeout(() => window.location.assign("/"), 1000);
        } catch ({ data }) {
            this.setState({
                errorMsg: data
            });
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
                <ErrorMsg message={this.state.errorMsg} />
            </div>
        )
    }

}

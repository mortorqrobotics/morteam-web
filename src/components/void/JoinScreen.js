import React from "react";
import Radium from "radium";

import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";
import ajax from "~/util/ajax";
//import Form from "~/components/shared/forms/Form";
import ErrorMsg from "~/components/shared/forms/ErrorMsg";
// TODO: use a submit button

import { VoidRow, VoidButton, VoidTextBox, BackButton, CenteredDiv } from "./shared";

@Radium
export default class JoinScreen extends React.Component {

    static propTypes = {
        onBack: React.PropTypes.func,
    }

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
            // TODO: validate empty input
            await ajax.request("POST",
                "/teams/code/" + this.state.teamCode + "/join"
            ); // TODO: urlencode the team code
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
            <CenteredDiv>
                <VoidRow>
                    <VoidTextBox
                        value={this.state.teamCode}
                        onChange={this.getChangeHandler("teamCode")}
                        placeholder="Team Code"
                    />
                </VoidRow>
                <VoidRow>
                    <VoidButton
                        text="Join"
                        onClick={this.join}
                    />
                </VoidRow>
                <VoidRow>
                    <BackButton onBack={this.props.onBack} />
                </VoidRow>
                <VoidRow>
                    <ErrorMsg message={this.state.errorMsg} />
                </VoidRow>
            </CenteredDiv>
        )
    }

}

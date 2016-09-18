import React from "react";
import Radium from "radium";

import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";
import ajax from "~/util/ajax";
import ErrorMsg from "~/shared/components/forms/ErrorMsg";
import Form from "~/shared/components/forms/Form";

import { VoidRow, VoidSubmitButton, VoidTextBox, BackButton, CenteredDiv } from "./shared";

@Radium
export default class CreateScreen extends React.Component {

    static propTypes = {
        onBack: React.PropTypes.func,
    }

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

    componentDidMount = () => {
        $("#first-create-input").focus();
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
        } catch ({ response: { data } }) {
            this.setState({
                errorMsg: data
            });
        }
    }

    render() {
        return (
            <CenteredDiv>
                <Form onSubmit={this.create}>
                    <VoidRow>
                        <VoidTextBox
                            id="first-create-input"
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
                        <VoidSubmitButton
                            text="Done"
                        />
                    </VoidRow>
                    <VoidRow>
                        <BackButton onBack={this.props.onBack} />
                    </VoidRow>
                    <VoidRow>
                        <ErrorMsg message={this.state.errorMsg} />
                    </VoidRow>
                </Form>
            </CenteredDiv>
        )
    }

}

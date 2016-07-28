import React from "react";
import Radium from "radium";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { ButtonCol, VoidButton } from "./shared";

@Radium
export default class FirstScreen extends React.Component {

    static propTypes = {
        onJoin: React.PropTypes.func.isRequired,
        onCreate: React.PropTypes.func.isRequired,
    }

    render() {
        return (
            <Row>
                <ButtonCol>
                    <VoidButton
                        text="Join a Team"
                        onClick={this.props.onJoin}
                    />
                </ButtonCol>
                <ButtonCol>
                    <VoidButton
                        text="Create a Team"
                        onClick={this.props.onCreate}
                    />
                </ButtonCol>
            </Row>
        )
    }

}

import React from "react";
import Radium from "radium";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import VoidButton from "./VoidButton";

const styles = {
    buttonCol: {
        textAlign: "center",
        margin: "10px 0 10px 0",
    },
}

const ButtonCol = (props) => (
    <Col sm={6} style={styles.buttonCol}>
        {props.children}
    </Col>
)

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

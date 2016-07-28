import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import FirstScreen from "./FirstScreen";
import JoinScreen from "./JoinScreen";
import CreateScreen from "./CreateScreen";
import message from "./message";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

const styles = {
    message: {
        width: "70%",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "33px",
        fontSize: "18px",
        backgroundColor: "white",
        boxShadow: "0 2px 6px -4px black",
        padding: "7px",
    },
}

@Radium
export default class Void extends React.Component {

    constructor(props) {
        super(props);

        // first, create, or join
        this.state = {
            screen: "first",
        }
    }

    onJoin = () => {
        this.setState({
            screen: "join",
        })
    }

    onCreate = () => {
        this.setState({
            screen: "create",
        })
    }

    render() {
        return (
            <Root verticalAlignMiddle>
                <Grid style={{ width: "100%" }}>
                    <Row>
                        <Col>
                            <h3 style={styles.message}>
                                {message}
                            </h3>
                        </Col>
                    </Row>
                    {(() => {
                        switch (this.state.screen) {
                            case "first": return <FirstScreen
                                onJoin={this.onJoin}
                                onCreate={this.onCreate}
                            />
                            case "join": return <JoinScreen />
                            case "create": return <CreateScreen />
                        }
                    })()}
                </Grid>
            </Root>
        )
    }
}

pageInit(Void);

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
import { MessageBox } from "./shared";

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
                            <MessageBox>
                                {message}
                            </MessageBox>
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

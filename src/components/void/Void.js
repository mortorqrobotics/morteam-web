import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import FirstScreen from "./first/FirstScreen";
import JoinScreen from "./join/JoinScreen";
import CreateScreen from "./create/CreateScreen";

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
            <Root>
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
            </Root>
        )
    }
}

pageInit(Void);

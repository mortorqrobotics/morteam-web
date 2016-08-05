import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";

@Radium
export default class User extends React.Component {

    render() {
        return (
            <Root pageName="user">
                <div>
                    hello
                </div>
            </Root>
        )
    }
}

pageInit(User);

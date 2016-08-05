import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import Navbar from "~/components/shared/navbar/Navbar";
import Leftbar from "./leftbar/Leftbar";

@Radium
export default class User extends React.Component {

    render() {
        return (
            <Root pageName="user">
                <Navbar />
                <Leftbar />
            </Root>
        )
    }
}

pageInit(User);

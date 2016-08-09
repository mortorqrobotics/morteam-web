import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import Navbar from "~/components/shared/navbar/Navbar";

import { makeStore } from "~/util/redux";
import reducers from "~/reducers/calendar";
const store = makeStore(reducers);

@Radium
export default class Calendar extends React.Component {

    render() {
        return (
            <Root pageName="calendar" store={store}>
                <Navbar />
            </Root>
        )
    }
}

pageInit(Calendar);

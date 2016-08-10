import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import Navbar from "~/components/shared/navbar/Navbar";
import Middle from "./middle/Middle";
import Leftbar from "./Leftbar";

import { makeStore } from "~/util/redux";
import reducers from "~/reducers/calendar";
import { setAbsMonth } from "~/actions/calendar";
const store = makeStore(reducers);
const now = new Date();
store.dispatch(setAbsMonth({ month: now.getMonth(), year: now.getFullYear() }));

@Radium
export default class Calendar extends React.Component {

    render() {
        return (
            <Root pageName="calendar" store={store}>
                <Navbar />
                <Leftbar />
                <Middle />
            </Root>
        )
    }
}

pageInit(Calendar);

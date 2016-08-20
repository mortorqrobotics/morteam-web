import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Middle from "./middle/Middle";
import Leftbar from "./Leftbar";

import { makeStore } from "~/util/redux";
import reducers from "~/calendar/reducers";
import { setAbsMonth } from "~/calendar/actions";
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

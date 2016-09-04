import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Middle from "./middle/Middle";
import Leftbar from "./Leftbar";
import Right from "./right/Right";

import { makeStoreSaga } from "~/util/redux";
import reducers from "~/calendar/reducers";
import sagas from "~/calendar/sagas";
const store = makeStoreSaga(reducers, sagas);

@Radium
export default class Calendar extends React.Component {

    render() {
        return (
            <Root pageName="calendar" store={store}>
                <Navbar />
                <Leftbar />
                <Middle />
                <Right />
            </Root>
        )
    }
}

pageInit(Calendar);

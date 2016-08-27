import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "./leftbar/Leftbar";
import Middle from "./middle/Middle";

import { makeStore } from "~/util/redux";
import reducers from "~/chat/reducers";
import { fetchChats } from "~/chat/actions";
import { initSIO } from "~/chat/sio";
const store = makeStore(reducers);
initSIO(action => store.dispatch(action));
store.dispatch(fetchChats());

@Radium
export default class Chat extends React.Component {

    render() {
        return (
            <Root pageName="chat" store={store}>
                <Navbar />
                <Leftbar />
                <Middle />
            </Root>
        )
    }

}

pageInit(Chat);

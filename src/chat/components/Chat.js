import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";

import { makeStore } from "~/util/redux";
import reducers from "~/chat/reducers";
import { fetchChats } from "~/chat/actions";
const store = makeStore(reducers);
store.dispatch(fetchChats());

@Radium
export default class Chat extends React.Component {

    render() {
        return (
            <Root pageName="chat" store={store}>
                <Navbar />
            </Root>
        )
    }

}

pageInit(Chat);

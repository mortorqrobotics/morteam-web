import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "./leftbar/Leftbar";
import Middle from "./middle/Middle";

import { makeStoreSaga } from "~/util/redux";
import reducers from "~/chat/reducers";
import sagas from "~/chat/sagas";
const store = makeStoreSaga(reducers, sagas);
import { initListeners } from "~/chat/sio";
import { initSIO } from "~/shared/sio";
initSIO(socket => initListeners(socket, store.dispatch));

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

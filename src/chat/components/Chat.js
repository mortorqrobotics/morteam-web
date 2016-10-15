import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "./leftbar/Leftbar";
import Middle from "./middle/Middle";

import { makeStore } from "~/util/redux";
import reducers from "~/chat/reducers";
import sharedReducers from "~/shared/reducers";
const store = makeStore({
    ...reducers,
    ...sharedReducers,
});
import { initialActions } from "~/chat/actions";
initialActions(store.dispatch);
import { initSIO } from "~/util/sio";
import { initListeners } from "~/chat/sio";
initSIO(socket => initListeners(socket, store.dispatch));
import { initListeners as initSharedListeners } from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));

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

import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "./leftbar/Leftbar";
import Middle from "./middle/Middle";

import { makeStoreSaga } from "~/util/redux";
import reducers from "~/chat/reducers";
import sagas from "~/chat/sagas";
import { combineReducers } from "redux";
import sharedReducers from "~/shared/reducers";
const store = makeStoreSaga(combineReducers({
    ...reducers,
    ...sharedReducers,
}), sagas);
import { initListeners } from "~/chat/sio";
import { initSIO, emit } from "~/shared/sio";
initSIO(socket => initListeners(socket, store.dispatch));
import {
    setOnlineClients,
    joinOnlineClient,
    leaveOnlineClient
} from "~/shared/actions";
initSIO(socket => {
    socket.on("get clients", userIds => {
        store.dispatch(setOnlineClients(userIds));
    });
    socket.on("joined", ({ _id }) => {
        store.dispatch(joinOnlineClient(_id));
    });
    socket.on("left", ({ _id }) => {
        store.dispatch(leaveOnlineClient(_id));
    });
});
emit("get clients");

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

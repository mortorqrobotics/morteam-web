import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import UserList from "~/group/components/UserList";
import styles from "~/group/styles/index";
import Navbar from "~/shared/components/navbar/Navbar";
import Heading from "~/group/components/Heading";

import { makeStore } from "~/util/redux";
import reducers from "~/group/reducers";
import { loadUsers, fetchGroup } from "~/group/actions";
const store = makeStore(reducers);
store.dispatch(fetchGroup());
store.dispatch(loadUsers());
import { initSIO } from "~/util/sio";
import { initListeners as initSharedListeners } from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));

@Radium
class Group extends React.Component {

    render() {
        return (
            <Root pageName="group" store={store}>
                <Navbar />
                <Heading />
                <UserList />
            </Root>
        )
    }
}

pageInit(Group);

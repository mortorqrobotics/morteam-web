import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import Navbar from "~/components/shared/navbar/Navbar";
import Leftbar from "./leftbar/Leftbar";
import Tasks from "./tasks/Tasks";

import { makeStore } from "~/util/redux";
import reducers from "~/reducers/user";
import { fetchTasks } from "~/actions/user";
const store = makeStore(reducers);
store.dispatch(fetchTasks(window.__options.userId));

@Radium
export default class User extends React.Component {

    render() {
        return (
            <Root pageName="user" store={store}>
                <Navbar />
                <Leftbar />
                <Tasks />
            </Root>
        )
    }
}

pageInit(User);

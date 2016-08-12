import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "./leftbar/Leftbar";
import Tasks from "./tasks/Tasks";

import { makeStore } from "~/util/redux";
import reducers from "~/user/reducers";
import { fetchTasks } from "~/user/actions";
const store = makeStore(reducers);
store.dispatch(fetchTasks(window.__options.userId)); // eh

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

import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import Navbar from "~/components/shared/navbar/Navbar";
import Leftbar from "./leftbar/Leftbar";
import Tasks from "./tasks/Tasks";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducers from "~/reducers/user";
import { fetchTasks } from "~/actions/user";
const store = createStore(reducers, applyMiddleware(thunk));
store.dispatch(fetchTasks(window.__options.userId));

@Radium
export default class User extends React.Component {

    render() {
        return (
            <Root pageName="user">
                <Provider store={store}>
                    <div>
                        <Navbar />
                        <Leftbar />
                        <Tasks />
                    </div>
                </Provider>
            </Root>
        )
    }
}

pageInit(User);

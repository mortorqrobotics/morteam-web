import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import Leftbar from "./leftbar/Leftbar";
import AnnouncementsList from "./announcements/AnnouncementsList";
import Editor from "./editor/Editor";
import Navbar from "~/components/shared/navbar/Navbar"
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import styles from "~/styles/home";

import reducers from "~/reducers/home";
import { fetchAnnouncements } from "~/actions/home";
const store = createStore(reducers, applyMiddleware(thunk));
store.dispatch(fetchAnnouncements());

@Radium
export default class Home extends React.Component {

    render() {
        return (
            <Root pageName="home">
                <Provider store={store}>
                    <div>
                        <Navbar />
                        <div style={styles.container}>
                            <Leftbar />
                            <div style={styles.centerCol}>
                                <Editor />
                                <AnnouncementsList />
                            </div>
                        </div>
                    </div>
                </Provider>
            </Root>
        )
    }
}

pageInit(Home);

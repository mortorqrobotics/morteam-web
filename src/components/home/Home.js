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

import reducers from "~/reducers/home";
import { fetchAnnouncements } from "~/actions/home";
const store = createStore(reducers, applyMiddleware(thunk));
store.dispatch(fetchAnnouncements());

let styles = {
    div: {
        marginTop: "60px",
    }
}

@Radium
export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Root pageName="home">
                <Provider store={store}>
                    <div style={styles.div}>
                        <Leftbar />
                        <Editor />
                        <AnnouncementsList />
                        <Navbar />
                    </div>
                </Provider>
            </Root>
        )
    }
}

pageInit(Home);

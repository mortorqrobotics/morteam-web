import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "~/drive/components/Leftbar";

import { makeStore } from "~/util/redux";
import reducers from "~/drive/reducers";
import { fetchFolders } from "~/drive/actions";
const store = makeStore(reducers);
store.dispatch(fetchFolders());

@Radium
class Drive extends React.Component {

    render() {
        return (
            <Root pageName="drive" store={store}>
                <Navbar />
                <Leftbar />
            </Root>
        )
    }

}

pageInit(Drive);

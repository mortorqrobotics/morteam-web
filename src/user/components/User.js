import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "./leftbar/Leftbar";
import Tasks from "./tasks/Tasks";
import Attendance from "./attendance/Attendance";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import styles from "~/user/styles/middle";

import { makeStore, soundsMiddleware } from "~/util/redux";
import sharedReducers from "~/shared/reducers";
import reducers from "~/user/reducers";
const store = makeStore({
    ...reducers,
    ...sharedReducers,
}, soundsMiddleware());
import { initialActions } from "~/user/actions";
initialActions(store.dispatch);
import { initSIO } from "~/util/sio";
import {
    initAlertCreator,
    initListeners as initSharedListeners,
} from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));
initSIO(socket => initAlertCreator(socket, store.dispatch));

const RadiumCol = Radium(Col);

@Radium
export default class User extends React.Component {

    render() {
        return (
            <Root pageName="user" store={store}>
                <Navbar />
                <Leftbar />
                <Grid fluid style={styles.grid}>
                    <Row style={styles.row}>
                        <RadiumCol sm={2} style={styles.col}>
                            <Attendance />
                        </RadiumCol>
                        <RadiumCol sm={2} style={styles.col}>
                            <Tasks />
                        </RadiumCol>
                    </Row>
                </Grid>
            </Root>
        )
    }
}

pageInit(User);

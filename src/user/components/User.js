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

import { makeStore } from "~/util/redux";
import reducers from "~/user/reducers";
const store = makeStore(reducers);
import { initialActions } from "~/user/actions";
initialActions(store.dispatch);
import { initSIO } from "~/util/sio";
import { initListeners as initSharedListeners } from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));

@Radium
export default class User extends React.Component {

    render() {
        return (
            <Root pageName="user" store={store}>
                <Navbar />
                <Leftbar />
                <Grid fluid style={{overflow:"hidden",marginLeft:"300px",width:"calc(100%-300px)",height:"100%"}}>
                    <Row style={{height:"100%",width:"100%"}}>
                        <Col sm={2} style={{width:"50%"}}>
                            <Attendance />
                        </Col>
                        <Col sm={2} style={{width:"50%"}}>
                            <Tasks />
                        </Col>
                    </Row>
                </Grid>
            </Root>
        )
    }
}

pageInit(User);

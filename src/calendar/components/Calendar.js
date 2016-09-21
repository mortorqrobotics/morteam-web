import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Middle from "./middle/Middle";
import Leftbar from "./Leftbar";
import Right from "./right/Right";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import styles from "~/calendar/styles";

import { makeStoreSaga } from "~/util/redux";
import reducers from "~/calendar/reducers";
import sagas from "~/calendar/sagas";
const store = makeStoreSaga(reducers, sagas);

@Radium
export default class Calendar extends React.Component {

    render() {
        return (
            <Root pageName="calendar" store={store}>
                <Navbar />
                <Leftbar />
                <Grid fluid style={{overflow:"hidden",marginLeft:"300px",width:"calc(100%-0px)",height:"100%"}}>
                    <Row style={{height:"100%",width:"100%"}}>
                        <Col sm={2} style={styles.middleCol}>
                            <Middle />
                        </Col>
                        <Col sm={2} style={{width:"50%"}}>
                            <Right />
                        </Col>
                    </Row>
                </Grid>
            </Root>
        )
    }
}

pageInit(Calendar);

import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import { pageOptions } from "~/util";
import { request } from "~/util/ajax";
import styles from "~/otherTeam/styles"

import { makeStore, soundsMiddleware } from "~/util/redux";
import sharedReducers from "~/shared/reducers";
const store = makeStore({
    ...sharedReducers,
}, soundsMiddleware());
import { initSIO } from "~/util/sio";
import {
    initAlertCreator,
    initListeners as initSharedListeners,
} from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));
initSIO(socket => initAlertCreator(socket, store.dispatch));

@Radium
export default class OtherTeam extends React.Component {
    state = {
        teamInfo: {},
    };
    
    getBlueAllienceInfo = async() => {
        let { data } = await request("GET", "/teams/number/" + pageOptions.teamNumber + "/info");
        this.setState({teamInfo: data});
    }
    
    componentDidMount = () => {
        this.getBlueAllienceInfo();
    }
    
    render() {
        
        return (
            <Root pageName="chat" store={store}>
                <Navbar />
                    <h1 style={styles.title}>Team {this.state.teamInfo.team_number} - {this.state.teamInfo.nickname}</h1>
                    <div style={styles.info}>
                        <h2>Website: <a href={this.state.teamInfo.website} target="_blank">{this.state.teamInfo.website} </a></h2>
                        <h2>Loacation: {this.state.teamInfo.location}</h2>
                    </div>
            </Root>
        )
    }

}

pageInit(OtherTeam);
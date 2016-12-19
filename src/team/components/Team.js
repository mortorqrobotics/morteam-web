import React from "react";
import Radium from "radium";

import UserList from "./UserList";
import Navbar from "~/shared/components/navbar/Navbar";
import Root, { pageInit } from "~/shared/components/Root";
import styles from "~/shared/styles/userList";
import ajax from "~/util/ajax";
import { currentUser } from "~/util";

import { makeStore, soundsMiddleware } from "~/util/redux";
import reducers from "~/team/reducers";
import sharedReducers from "~/shared/reducers";
const store = makeStore({
    ...reducers,
    ...sharedReducers,
}, soundsMiddleware());
import { initialActions } from "~/team/actions";
initialActions(store.dispatch);
import { initSIO } from "~/util/sio";
import {
    initAlertCreator,
    initListeners as initSharedListeners,
} from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));
initSIO(socket => initAlertCreator(socket, store.dispatch));

@Radium
export default class Team extends React.Component {
    
    render() {
        const team = currentUser.team;
        return (
            <Root pageName="team" store={store}>
                <Navbar />
                <div style={styles.wideBody}>
                
                    <span style={styles.teamInfo.span}>
                        <h1 style={styles.teamInfo.h1}>
                            {team.name}
                            <br />
                        </h1>
                        <h2>Team {team.number}</h2>
                    </span>
                    
                    <UserList />
                
                </div>
            </Root>
        )
    }
}

pageInit(Team);

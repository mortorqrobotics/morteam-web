import React from "react";
import Radium from "radium";

import UserList from "./UserList";
import Navbar from "~/shared/components/navbar/Navbar";
import Root, { pageInit } from "~/shared/components/Root";
import styles from "~/team/styles";
import ajax from "~/util/ajax";

import { makeStore } from "~/util/redux";
import reducers from "~/team/reducers";
import { fetchUsers } from "~/team/actions";
const store = makeStore(reducers);
store.dispatch(fetchUsers());

@Radium
export default class Team extends React.Component {
    
    render() {
        const team = window.__userInfo.team;
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

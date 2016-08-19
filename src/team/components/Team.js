import React from "react";
import Radium from "radium";

import Grid from "react-bootstrap/lib/Grid";
import Navbar from "~/shared/components/navbar/Navbar";
import Root, { pageInit } from "~/shared/components/Root";
import UserLabel from "./UserLabel";
import styles from "~/team/styles";
import ajax from "~/util/ajax";

@Radium
export default class Team extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            users: [],
            teamName: window.__userInfo.team.name,
            teamNumber: window.__userInfo.team.number,
        }
    }
    
    componentDidMount = async () => {
        let { data } = await ajax.request("get", "/teams/current/users");
        this.setState({
           users: data,
        });
    }

    render() {
        return (
            <Root pageName="team">
                <Navbar />
                <div style={styles.wideBody}>
                    <span style={styles.teamInfo}>
                        <h1 style={styles.teamInfo.h1}>
                            {this.state.teamName}
                            <br />
                        </h1>
                        <h2>{this.state.teamNumber}</h2>
                    </span>
                    
                    <Grid fluid={true}>
                        <div style={styles.memberList}>
                            {this.state.users.map(user => (
                                <UserLabel
                                    user={user}
                                    key={user._id}
                                />
                            ))}
                        </div>
                    </Grid>
                
                </div>
            </Root>
        )
    }
}

pageInit(Team);

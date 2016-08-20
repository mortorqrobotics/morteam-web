import React from "react";
import Radium from "radium";

import Col from "react-bootstrap/lib/Col";
import Grid from "react-bootstrap/lib/Grid";
import Root, { pageInit } from "~/shared/components/Root";
import UserLabel from "./UserLabel";
import styles from "./styles";
import ajax from "~/util/ajax";

@Radium
export default class Team extends React.Component {
    
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            users: [],
            teamName: this.context.user.team.name,
            teamNumber: this.context.user.team.number,
        }
    }
    
    static contextTypes = {
        user: React.PropTypes.object,
    }
    
    componentDidMount = async() => {
        let { data } = ajax.await("get", "/teams/current/users");
        this.setState({
           users: data,
        });
    }

    render() {
        return (
            <Root>
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
                            {this.state.users.map(user=>{
                                <UserLabel
                                    name={user.firstname + " " + user.lastname}
                                    profpicpath={user.profpicpath}
                                    userid={user._id}
                                    key={user._id}
                                />
                            })}
                        </div>
                    </Grid>
                
                </div>
            </Root>
        )
    }
}

pageInit(Team);

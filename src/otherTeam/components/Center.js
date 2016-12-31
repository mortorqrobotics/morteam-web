import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Col from "react-bootstrap/lib/Col";
import styles from "~/otherTeam/styles";
import { request } from "~/util/ajax";
import { pageOptions } from "~/util";

@Radium
export default class Center extends React.Component {
    
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
            <div style={styles.centerWrapper}>
                <div>
                    <img src="/images/questionMark.png" style={styles.image}/>
                    <div style={styles.topInfoContainer}>
                        <h1>Team {this.state.teamInfo.team_number}</h1>
                        <h1>{this.state.teamInfo.nickname}</h1>
                    </div>
                </div>
                <ul style={{listStyle: "none",}}>
                    <li>
                        <Glyphicon glyph="map-marker" />
                        <h3 style={{display: "inline-block",}}>{this.state.teamInfo.location}</h3>
                    </li>
                    <li>
                        <Glyphicon glyph="globe" /> 
                        <h3 style={{display: "inline-block",}}>{this.state.teamInfo.website}</h3>
                    </li>
                </ul>
            </div> 
        )
    }
    
}
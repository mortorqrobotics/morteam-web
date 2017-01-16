import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Col from "react-bootstrap/lib/Col";
import styles from "~/otherTeam/styles";
import { request } from "~/util/ajax";
import { pageOptions, currentUser } from "~/util";
import Button from "~/shared/components/forms/Button";
import EmailModal from "./EmailModal";
import { modalProps } from "~/util/modal";

@Radium
export default class Center extends React.Component {
    
    state = {
        teamInfo: {},
        displayedUrl: "",
        getDataSuccess:  false,
        isModalOpen: false,
    };
    
    getBlueAllienceInfo = async() => {
        let { data } = await request("GET", "/teams/number/" + pageOptions.teamNumber + "/info");
        this.setState({
            teamInfo: data, 
            getDataSuccess: true,
        });
        this.setState({displayedUrl: this.state.teamInfo.website.replace(/^https?\:\/\//i, ""),});
    }
    
    componentDidMount = () => {
        this.getBlueAllienceInfo();
    }
    
    handleButtonRender = () => {
        if(currentUser.isAdmin() && pageOptions.team && pageOptions.team._id !== currentUser.team._id){ 
            return (
                <Button 
                    style={styles.button} 
                    value="Contact" 
                    onClick={() => this.setState({
                        isModalOpen: true,
                    })}
                />
            )
        }
    }
    
    render() {
        return (
            <div style={styles.centerWrapper}>
                <div>
                    <img 
                    src={pageOptions.team ? pageOptions.team.profPicPath : "/images/questionMark.png"} 
                    style={styles.image}
                />
                    <div style={styles.topInfoContainer}>
                        <h1>Team {pageOptions.teamNumber}</h1>
                        <h1>{this.state.teamInfo.nickname}</h1>
                    </div>
                </div>
                <ul style={[{listStyle: "none",}, !this.state.getDataSuccess && {display: "none"}]}>
                    <li>
                        <Glyphicon glyph="map-marker" style={styles.glyph} />
                        <h3 style={styles.h3}>{this.state.teamInfo.location}</h3>
                    </li>
                    <li>
                        <Glyphicon glyph="globe" style={styles.glyph}/> 
                        <h3 style={styles.h3}>
                            <a href={this.state.teamInfo.website}>
                                {this.state.displayedUrl}
                            </a>
                        </h3>
                    </li>
                </ul>
                {this.handleButtonRender()}
                <EmailModal 
                    {...modalProps(this, "isModalOpen")}
                />
            </div> 
        )
    }
    
}
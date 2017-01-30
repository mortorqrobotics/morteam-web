import React from "react";
import Radium from "radium";

import TextBox from "~/shared/components/forms/TextBox";
import SearchDropItem from "./SearchDropItem";
import ajax from "~/util/ajax";
import styles from "~/shared/styles/navbar";

let userCancelRequest;
let teamCancelRequest;

@Radium
export default class SearchBox extends React.Component {

    state = {
        query: "",
        users: [],
        team: {},
    }

    //needs refactoring

    sendQuery = async(query) => {
        console.log(query);
        if (query == "") {
            this.setState({
                users: [],
                team: {},
            });
        } else {
      	    if (userCancelRequest) {
                userCancelRequest();
      	    }

      	    if (teamCancelRequest) {
      	    	  teamCancelRequest();
      	    }

            let userInfo = ajax.request("get", "/users/search?search=" + query, true);
            userCancelRequest = userInfo.cancel;
            try {
                let { data: userData } = await userInfo.req;
                this.setState({
                    users: userData,
                });
            } catch (err) {
                console.log(err);
            }
            if ((/^\d+$/).test(query)) {
                let teamInfo = ajax.request("get", "/teams/number/" + query + "/info", true);
                teamCancelRequest = teamInfo.cancel;
                try {
                    let { data: teamData } = await teamInfo.req;
                    if (this.state.query) {
                        this.setState({
                            team: teamData,
                        });
                    } else {
                      this.setState({
                          team: {},
                      });
                    }
                }
                catch (err) {
                    if (this.state.query !== query && query) {
                        this.sendQuery(this.state.query);
                    }
                    this.setState({
                        team: {},
                    });
                    console.log(err);
                }
            }
        }
    }

    onChange = (e) => {
        this.setState({
            query: e.target.value,
        });
        this.sendQuery(e.target.value);
    }

    renderSearchDrop(){
        if(this.state.users.length) {
            return(
                <div style={styles.searchDrop}>
                    <ul>
                        {this.state.users.map(user => (
                            <SearchDropItem
                                obj={user}
                                key={user._id}
                                type={"user"}
                            />
                        ))}
                    </ul>
                </div>
            )
        }
        if (this.state.team.team_number) {
            return(
                <div style={styles.searchDrop}>
                    <ul>
                        <SearchDropItem
                            obj={this.state.team}
                            key={this.state.team.team_number}
                            type={"team"}
                        />
                    </ul>
                </div>
            )
        }
    }

    render() {
        return (
            <li style={styles.search.li}>
                <TextBox
                    style={styles.search.textBox}
                    placeholder={"search"}
                    onChange={this.onChange}
                    value={this.state.query}
                />
                {this.renderSearchDrop()}
            </li>
        )
    }
}

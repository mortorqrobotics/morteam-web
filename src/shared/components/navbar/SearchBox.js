import React from "react";
import Radium from "radium";

import TextBox from "~/shared/components/forms/TextBox";
import SearchDropItem from "./SearchDropItem";
import ajax from "~/util/ajax";
import styles from "~/shared/styles/navbar";

@Radium
export default class SearchBox extends React.Component {

    state = {
        query: "",
        users: [],
        team: {},
    }

    sendQuery = async(query) => {
        if (query == "") {
            this.setState({
                users: [],
                team: {},
            });
        } else {
            try {
                let { data } = await ajax.request("get", "/users/search?search=" + query);
                this.setState({
                    users: data,
                });
            } catch (err) {
                console.log(err);
            }
            if ((/^\d+$/).test(query)) {
                try {
                    let teamInfo = await ajax.request("get", "/teams/number/" + query + "/info");
                    this.setState({
                        team: teamInfo.data,
                    });
                }
                catch (err) {
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

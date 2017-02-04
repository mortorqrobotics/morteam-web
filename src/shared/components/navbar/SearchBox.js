import React from "react";
import Radium from "radium";

import TextBox from "~/shared/components/forms/TextBox";
import SearchDropItem from "./SearchDropItem";
import { request } from "~/util/ajax";
import { userSearch } from "~/util";
import styles from "~/shared/styles/navbar";

@Radium
export default class SearchBox extends React.Component {

    state = {
        query: "",
        users: [],
        team: {},
    }

    componentDidMount = async () => {
        let { data } = await request("get", "/teams/current/users");
        this.setState({
            users: data,
        });
    }

    sendQuery = async (query) => {
        if (query == "") {
            this.setState({
                team: {},
            });
        } else if (/^\d+$/.test(query)) {
            this.lastQuery = query;
            let teamInfo = request("get", "/teams/number/" + query + "/info", true);
            this.teamCancelRequest = teamInfo.cancel;
            try {
                let { data: teamData } = await teamInfo.req;
                if (query  === this.lastQuery) {
                    this.setState({
                        team: teamData,
                    });
                }
            } catch (err) {
                if (query === this.lastQuery) {
                    this.setState({
                        team: {},
                    });
                }
                console.log(err);
            }
        }
    }

    onChange = (e) => {
        if (this.teamCancelRequest) {
            this.teamCancelRequest();
        }

        this.setState({
            query: e.target.value,
        });
        this.sendQuery(e.target.value);
    }

    renderSearchDrop = () => {
        if (this.state.query === "") {
            return null;
        }
        return (
            <div style={styles.searchDrop}>
                <ul>
                    {this.state.users.filter(userSearch(this.state.query))
                        .slice(0, 10)
                        .map(user =>
                            <SearchDropItem
                                obj={user}
                                key={user._id}
                                type={"user"}
                            />
                        )
                    }
                    {this.state.team.team_number &&
                        <SearchDropItem
                            obj={this.state.team}
                            key={this.state.team.team_number}
                            type={"team"}
                        />
                    }
                </ul>
            </div>
        )
    }

    render() {
        return (
            <li style={styles.search.li}>
                <TextBox
                    style={styles.search.textBox}
                    placeholder="search"
                    onChange={this.onChange}
                    value={this.state.query}
                />
                {this.renderSearchDrop()}
            </li>
        )
    }
}

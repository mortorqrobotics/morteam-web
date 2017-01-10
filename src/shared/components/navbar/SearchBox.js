import React from "react";
import Radium from "radium";

import TextBox from "~/shared/components/forms/TextBox";
import SearchDropItem from "./SearchDropItem";
import { request } from "~/util/ajax";
import { userSearch } from "~/util";
import styles from "~/shared/styles/navbar";

@Radium
export default class SearchBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: "",
            users: [],
        }
    }

    componentDidMount = async () => {
        let { data } = await request("get", "/teams/current/users");
        this.setState({
            users: data,
        });
    }

    renderSearchDrop = () => {
        if (this.state.query === "") {
            return null;
        }
        return (
            <div style={styles.searchDrop}>
                <ul>
                    {this.state.users.filter(userSearch(this.state.query)).map(user =>
                        <SearchDropItem
                            user={user}
                            key={user._id}
                        />
                    )}
                </ul>
            </div>
        )
    }

    render() {
        return (
            <li style={styles.search.li}>
                <TextBox
                    style={styles.search.textBox}
                    placeholder={"search"}
                    onChange={e => this.setState({ query: e.target.value })}
                    value={this.state.query}
                />
                {this.renderSearchDrop()}
            </li>
        )
    }
}

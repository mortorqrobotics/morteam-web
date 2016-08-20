import React from "react";
import Radium from "radium";

import TextBox from "~/shared/components/forms/TextBox";
import SearchDrop from "./SearchDrop";
import ajax from "~/util/ajax";
import styles from "~/shared/styles/navbar";

@Radium
export default class SearchBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: "",
            userIds: []
        }
    }

    sendQuery = async(query) => {
        if (query == "") {
            this.setState({
                userIds: []
            });
        } else {
            try {
                let { data } = await ajax.request("get", "/users/search?search=" + query);
                this.setState({
                    userIds: data,
                });
            } catch (err) {
                console.log(err);
            }
            //TODO: make this faster
        }
    }

    onChange = (e) => {
        this.setState({
            query: e.target.value,
        });
        this.sendQuery(e.target.value);
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
                <SearchDrop userIds={this.state.userIds} />
            </li>
        )
    }
}

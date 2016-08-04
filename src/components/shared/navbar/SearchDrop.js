import React from "react";
import Radium from "radium";

import SearchDropItem from "./SearchDropItem";
import styles from "~/styles/navbar";

@Radium
export default class SearchDrop extends React.Component {

    static propTypes = {
        userIds: React.PropTypes.array,
    }

    render() {
        return (
            <div style ={styles.searchDrop}>
                <ul>
                    {this.props.userIds.map(user => (
                        <SearchDropItem
                            key={user._id}
                            userid={user._id}
                            name={user.firstname + " " + user.lastname}
                            profpicpath={user.profpicpath}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

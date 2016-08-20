import React from "react";
import Radium from "radium";

import SearchDropItem from "./SearchDropItem";
import styles from "~/shared/styles/navbar";
import { fullName } from "~/util";

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
                            name={fullName(user)}
                            profpicpath={user.profpicpath}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

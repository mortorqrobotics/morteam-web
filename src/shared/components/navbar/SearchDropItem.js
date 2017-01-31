import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import ProfilePicture from "~/shared/components/ProfilePicture";
import Link from "~/shared/components/Link";
import { fullName } from "~/util"
import styles from "~/shared/styles/navbar";

@Radium
export default class SearchDropItem extends React.Component {

    static propTypes = {
        obj: React.PropTypes.object,
        type: React.PropTypes.string,
    }

    handleRender = () => {
        if (this.props.type === "user") {
            return(
                <Link
                    location={"/profiles/id/" + this.props.obj._id}
                    style={styles.link}
                >
                    <li style={styles.searchDropItem.li}>
                        <ProfilePicture
                            user={this.props.obj}
                            picSize="small"
                            frameSize={30}
                            hasIndicator
                        />
                        <span style={styles.searchDropItem.span}>{fullName(this.props.obj)}</span>
                    </li>
                </Link>
            )
        } else {
            return (
                <Link
                    location={"/teams/number/" + this.props.obj.team_number}
                    style={styles.link}
                >
                    <li style={styles.searchDropItem.li}>
                        <span style={styles.searchDropItem.span}>Team {this.props.obj.team_number}</span>
                    </li>
                </Link>
            )
        }
    }

    render() {
        return(
            <div>
                {this.handleRender()}
            </div>
        )
    }
}

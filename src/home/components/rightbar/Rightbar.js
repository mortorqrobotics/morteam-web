import React from "react";
import Radium from "radium";

import EventAlert from "./EventAlert";

import { currentUser } from "~/util";
import { connect } from "react-redux";
import styles from "~/home/styles/leftbar";

@Radium
class Rightbar extends React.Component {

    render() {
        if (this.props.events.length > 0) {
            return (
                <div style={styles.leftbar.div}>
                    <EventAlert
                        alerts={this.props.events}
                    />
                </div>
            )
        } else {
            return null
        }

    }
}

const mapStateToProps = (state) => {
    return {
        events: state.alerts,
    }
}
export default connect(mapStateToProps)(Rightbar);

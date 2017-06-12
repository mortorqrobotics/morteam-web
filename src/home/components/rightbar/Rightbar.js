import React from "react";
import Radium from "radium";

import EventAlert from "./EventAlert";

import { currentUser } from "~/util";
import { connect } from "react-redux";
import styles from "~/home/styles/leftbar";

@Radium
class Rightbar extends React.Component {

    state = {
        hasAlerts: false,
    }

    renderEventAlerts = () => {
        if (this.props.alerts.length > 0) {
            this.state.hasAlerts = true;
            return (
                <div>
                    <EventAlert
                        alerts={this.props.alerts}
                    />
                </div>
            )
        } else {
            return null
        }
    }

    renderNoAlerts = () => {
        if (this.state.hasAlerts == false) {
            return (
                <p>You have no new alerts.</p>
            )
        } else {
            return null
        }
    }


    render() {
        return (
            <div style={styles.leftbar.div}>
                <h1>Alerts</h1>
                {this.renderEventAlerts()}
                {this.renderNoAlerts()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        alerts: state.alerts,
    }
}
export default connect(mapStateToProps)(Rightbar);

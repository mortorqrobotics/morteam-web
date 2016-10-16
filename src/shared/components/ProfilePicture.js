import React from "react";
import Radium from "radium";

import { connect } from "react-redux";
import styles from "~/shared/styles/profilePicture";

@Radium
class ProfilePicture extends React.Component {

    static propTypes = {
        path: React.PropTypes.string,
        userId: React.PropTypes.string,
        size: React.PropTypes.number,
        style: React.PropTypes.object,
    }

    getStyle = () => {
        if (this.props.onlineClients.indexOf(this.props.userId) === -1) {
            return styles.offline;
        } else {
            return styles.online;
        }
    }

    render() {
        return (
            <img
                src={this.props.path}
                style={[ this.getStyle(), {
                    height: this.props.size + "px",
                    width: this.props.size + "px"
                }, this.props.style || {} ]}
            />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        onlineClients: state.onlineClients,
    }
}

export default connect(mapStateToProps)(ProfilePicture);

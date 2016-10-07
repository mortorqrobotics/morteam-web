import React from "react";

import { connect } from "react-redux";
import styles from "~/shared/styles/profilePicture";

class ProfilePicture extends React.Component {

    static propTypes = {
        path: React.PropTypes.string,
        userId: React.PropTypes.string,
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
                style={this.getStyle()}
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

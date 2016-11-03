import React from "react";
import Radium from "radium";

import { connect } from "react-redux";
import styles from "~/shared/styles/profilePicture";

@Radium
class ProfilePicture extends React.Component {

    static propTypes = {
        user: React.PropTypes.object.isRequired,
        picSize: React.PropTypes.string.isRequired,
        frameSize: React.PropTypes.number,
        hasIndicator: React.PropTypes.bool,
        style: React.PropTypes.object,
    }

    getIndicator = () => {
        if (this.props.hasIndicator) {
            if (this.props.onlineClients.indexOf(this.props.user._id) === -1) {
                return styles.offline;
            }
            return styles.online;
        }
        return {};
    }

     getSize = () => {
        if (this.props.picSize === "small") {
            return "-60";
        }
        return "-300";
    }

    render() {
        return (
            <img
                src={this.props.user.profpicpath + getSize()}
                style={[ this.getIndiactor(), {
                    height: this.props.frameSize + "px",
                    width: this.props.frameSize + "px"
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

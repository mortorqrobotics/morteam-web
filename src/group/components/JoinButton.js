import React from "react";
import Radium from "radium";

import styles from "~/group/styles/index";
import Button from "~/shared/components/forms/Button";
import { pageOptions } from "~/util";
import { connect } from "react-redux";
import { joinGroup } from "~/group/actions";

@Radium
class JoinButton extends React.Component {

    handleClick = () => {
        this.props.dispatch(joinGroup());
    }

    render() {
        return (
            <Button
                style={styles.inviteButton}
                value="Join"
                onClick={this.handleClick}
            />
        )
    }
}

export default connect()(JoinButton);

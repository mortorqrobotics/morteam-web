import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import RTEditor from "./RTEditor";
import Button from "~/shared/components/forms/Button";
import { connect } from "react-redux";
import { addAnnouncement, setAudience, resetAudience } from "~/home/actions";
import AudienceModal from "./AudienceModal";
import styles from "~/home/styles/editor";
import { getAudienceIds } from "~/util";

@Radium
class Editor extends React.Component {

    // not state because it does not affect the view
    // it is this way because RTEditor is uncontrolled
    // should be changed eventually
    content = "";

    state = {
        isModalOpen: false,
    }

    post = async() => {
        await this.props.dispatch(addAnnouncement({
            content: this.content,
            audience: getAudienceIds(this.props.audience),
        }));
        this.props.dispatch(resetAudience(false));
        this.clear();
    }

    render() {
        return (
            <div style={styles.container}>
                <RTEditor
                    onChange={html => this.content = html}
                    registerClear={clear => this.clear = clear}
                />
                <Button
                    style={styles.button}
                    text="Post"
                    onClick={this.post}
                    disabled={!(this.props.audience.users.length
                        || this.props.audience.groups.length)
                    }
                />
                {/* order is switched because of float: right */}
                <Button
                    style={styles.button}
                    text="Select audience"
                    onClick={() => this.setState({
                        isModalOpen: true,
                   })}
                />

                <AudienceModal
                    isOpen={this.state.isModalOpen}
                    onAfterOpen={() => this.setState({ isModalOpen: true })}
                    onRequestClose={() => this.setState({ isModalOpen: false })}
                    selected={this.props.audience}
                    onChange={audience => this.props.dispatch(setAudience(audience))}
                />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        audience: state.audience,
    }
}

export default connect(mapStateToProps)(Editor);

import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import RTEditor from "./RTEditor";
import Button from "~/shared/components/forms/Button";
import { connect } from "react-redux";
import { addAnnouncement } from "~/home/actions";
import AudienceModal from "./AudienceModal";
import styles from "~/home/styles/editor";

@Radium
class Editor extends React.Component {

    // not state because it does not affect the view
    // it is this way because RTEditor is uncontrolled
    // should be changed eventually
    content = "";

    initialState = {
        audience: {
            users: [],
            groups: [],
        },
        isModalOpen: false,
    }

    state = {
        ...this.initialState,
    }

    post = async() => {
        await this.props.dispatch(addAnnouncement({
            content: this.content,
            audience: {
                users: this.state.audience.users.map(u => u._id),
                groups: this.state.audience.groups.map(g => g._id),
            }
        }))
        this.setState(this.initialState);
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
                    disabled={!(this.state.audience.users.length
                        || this.state.audience.groups.length)
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
                    selected={this.state.audience}
                    onChange={audience => this.setState({ audience: audience })}
                />
            </div>
        )
    }

}
export default connect()(Editor);

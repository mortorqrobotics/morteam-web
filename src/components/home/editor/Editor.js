import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import RTEditor from "./RTEditor";
import { EditorButton } from "./shared";
import { connect } from "react-redux";
import { addAnnouncement } from "~/actions/home";
import styles from "~/styles/home/editor";

@Radium
class Editor extends React.Component {

    constructor(props) {
        super(props);

        // not state because it does not affect the view
        // it is this way because RTEditor is uncontrolled
        // should be changed eventually
        this.content = "";

        this.state = {
            audience: {
                users: [],
                groups: [],
            },
        }

        // TODO: add audience selection button
    }

    post = () => {
        this.props.dispatch(addAnnouncement({
            content: this.content,
            audience: this.state.audience,
        }));
        this.clear();
    }
    
    render() {
        return (
            <div>
            <div style={styles.test2} />
            <div style={styles.container}>
                <RTEditor
                    onChange={html => this.content = html}
                    registerClear={clear => this.clear = clear}
                />
                <EditorButton
                    text="Post"
                    onClick={this.post}
                />
                {/* order is switched because of float: right */}
                <EditorButton
                    text="Select audience"
                    onClick={() => {}}
                />
            </div>
            <div style={styles.test} />
            </div>
        )
    }

}
export default connect()(Editor);

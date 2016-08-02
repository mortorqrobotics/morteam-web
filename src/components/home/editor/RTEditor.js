import React from "react";
import Radium from "radium";

import styles from "~/styles/home/editor";

@Radium
export default class RTEditor extends React.Component {

    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
    }

    componentDidMount = () => {
        bkLib.onDomLoaded(() => {
            new nicEditor({
                buttonList: [
                    "bold",
                    "italic",
                    "underline",
                    "left",
                    "center",
                    "right",
                    "justify",
                    "removeformat",
                    "hr",
                    "upload",
                ]
            }).panelInstance("niceditor-textarea");
            let $elem = $(".nicEdit-main");
            $elem.bind("DOMSubtreeModified", () => {
                this.props.onChange($elem.html());
            });
        });
    }

    shouldComponentUpdate() {
        return false;
        // bad stuff will happen if this component rerenders
        // the js in componentDidMount will get undone
        // and the user input will be wiped out
        // should probably find a better way to do this...
    }

    render() {
        return (
            <div>
                <textarea
                    style={styles.rtEditor}
                    id="niceditor-textarea"
                    placeholder="Make an announcement..."
                />
            </div>
        )
    }

}

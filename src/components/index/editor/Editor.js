import React from "react";
import Radium from "radium";

let styles = {
    textarea: {
        width: "100%",
        verticalAlign: "top",
        padding: "5px",
        resize: "none",
        ":focus": {
            outlineStyle: "none",
        }
    }
}

@Radium
export default class Editor extends React.Component {

    componentDidMount() {
        bkLib.onDomLoaded(function() {
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
                    style={styles.textarea}
                    id="niceditor-textarea"
                    placeholder="Make an announcement..."
                />
            </div>
        )
    }

}

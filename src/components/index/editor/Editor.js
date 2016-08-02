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

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <textarea style={styles.textarea} id="main-textarea" placeholder="Make an announcement..."></textarea>
             
            </div>
        )
    }

}

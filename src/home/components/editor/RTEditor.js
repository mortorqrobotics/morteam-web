import React from "react";
import Radium from "radium";

import styles from "~/home/styles/editor";

@Radium
export default class RTEditor extends React.Component {

    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
        registerClear: React.PropTypes.func.isRequired, // eh
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

            // http://stackoverflow.com/a/15559608/1838811
            $elem.css("white-space", "pre-wrap");
            $elem.css("word-wrap", "break-word");

            $elem.bind("DOMSubtreeModified", () => {
                this.props.onChange($elem.html());
            });
            $elem.css("outline", "none");
            $elem.css("font-size", "16px");
            $elem.parent().parent().children().css("width", "auto");
            
            this.props.registerClear(() => { // hack
                $elem.html("");
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
                />
            </div>
        )
    }

}

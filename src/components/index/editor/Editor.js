import React from "react";
import Radium from "radium";

let styles = {
    textarea:{
        width: "100%",
    	verticalAlign: "top",
    	padding: "5px",
    	resize: "none",
        ":focus":{
            outlineStyle: "none",
        }
    }
}

@Radium
export default class NicEditor extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <textarea style={styles.textarea} id="main-textarea" placeholder="Make an announcement..."></textarea>
                <script type="text/javascript">
                    {bkLib.onDomLoaded(function() {
                        new nicEditor({
                            buttonList: ['bold', 'italic', 'underline', 'left', 'center', 'right', 'justify', 'removeformat', 'hr', 'upload']
                        }).panelInstance('main-textarea');
                    })}
                </script>
            </div>
        )
    }

}

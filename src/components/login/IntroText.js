import React from "react";
import Radium from "radium";

import IntroTextItem from "./IntroTextItem";

import texts from "./introTexts.json";

let styles = {
    introText: {
        fontFamily: "'helvetica neue', sans-serif",
        width: "calc(100% - 490px)",
        textAlign: "justify",
        paddingTop: "100px",
        paddingLeft: "100px",
        paddingRight: "100px",
        boxSizing: "unset",
    },
    landingBoxMain: {
        maxWidth: "800px",
        margin: "auto",
    },
}

@Radium
export default class IntroText extends React.Component {

    render() {
        return (
            <div style={styles.introText}>
    			<div style={styles.landingBoxMain}>
                    {Object.keys(texts).map(title => (
                        <IntroTextItem key={title} title={title} text={texts[title]} />
                        ))}
                </div>
            </div>
        )
    }

}

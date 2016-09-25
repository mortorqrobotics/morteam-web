import React from "react";
import Radium from "radium";

import IntroTextItem from "./IntroTextItem";

import texts from "./introTexts.json";
import styles from "~/login/styles";

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

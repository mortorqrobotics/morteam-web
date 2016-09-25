import React from "react";
import Radium from "radium";

import texts from "~/login/components/introTexts.json";
import styles from "~/login/styles/introTexts";

@Radium
export default class IntroText extends React.Component {

    render() {
        return (
            <div style={styles.introText}>
                <div style={styles.landingBoxMain}>
                    {Object.keys(texts).map(title => (
                        <div key={title}>
                            <h1 style={[styles.title, styles.h1]}>{title}</h1>
                            <h2 style={styles.text}>{texts[title]}</h2>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}

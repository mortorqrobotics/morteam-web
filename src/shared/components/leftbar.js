import React from "react";
import Radium from "radium";

import { withCss } from "~/util/component";
import styles from "~/shared/styles/leftbar";

export const LeftbarContainer = Radium((props) => {
    return (
        <div style={styles.div}>
            <ul style={styles.ul}>
                {props.children}
            </ul>
        </div>
    )
})

export const LeftbarItem = withCss("li", styles.li);

export const LeftbarButton = Radium((props) => {
    const { isSelected, style, ...rest } = props;
    let newStyle = style ? [styles.button, style] : styles.button;
    if (props.isSelected) {
        newStyle = [newStyle, styles.selected];
    }
    return React.createElement("li", {
        style: newStyle,
        ...rest,
    })
})

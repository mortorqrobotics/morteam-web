import React from "react";
import Radium from "radium";

import styles from "~/calendar/styles/right";

function RightItem(props) {
    let elems = props.children;
    if (React.Children.count(props.children) === 0) {
        elems = (
            <li style={styles.li}>
                none
            </li>
        )
    }
    return (
        <div style={styles.item}>
            <h3 style={styles.title}>
                {props.title}
            </h3>
            <div style={styles.listContainer}>
                <ul style={styles.ul}>
                    {elems}
                </ul>
            </div>
        </div>
    )
}

export default Radium(RightItem);

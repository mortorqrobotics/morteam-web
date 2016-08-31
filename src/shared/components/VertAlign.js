import React from "react";
import Radium from "radium";

const styles = {
    alignDiv1: {
        display: "table",
        width: "100%",
        height: "100vh",
    },
    alignDiv2: {
        verticalAlign: "middle",
        display: "table-cell",
    },
}

function VertAlign(props) {
    return (
        <div style={styles.alignDiv1}>
            <div style={styles.alignDiv2}>
                {props.children}
            </div>
        </div>
    )
}

export default Radium(VertAlign);

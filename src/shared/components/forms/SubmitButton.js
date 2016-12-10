import React from "react";
import Radium from "radium";

const SubmitButton = (props) => {
    let { text, style, ...rest } = props;
    return React.createElement("input", {
        type: "submit",
        value: text,
        style: [style || {}, {
            outline: "none",
            border: "none",
        }],
        ...rest,
    })
}
export default Radium(SubmitButton);

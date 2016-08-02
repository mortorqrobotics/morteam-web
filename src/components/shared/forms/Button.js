import React from "react";
import Radium from "radium";

const Button = (props) => {
    let { text, ...rest } = props;
    return React.createElement("input", {
        type: "button",
        value: text,
        ...rest,
    })
}

export default Radium(Button);


import React from "react";
import Radium from "radium";

const SubmitButton = (props) => {
    let { text, ...rest } = props;
    return React.createElement("input", {
        type: "submit",
        value: text,
        ...rest,
    })
}
export default Radium(SubmitButton);

import React from "react";
import Radium from "radium";

const TextBox = (props) => {
    let { autoCapitalize, autoCorrect, ...rest } = props;
    let newProps = {
        type: "text",
        ...rest,
    };
    if (typeof autoCapitalize === "boolean") {
        newProps.autoCapitalize = autoCapitalize ? "on" : "off";
    }
    if (typeof autoCorrect === "boolean") {
        newProps.autoCorrect = autoCorrect ? "on" : "off";
    }
    return React.createElement("input", newProps);
}
export default Radium(TextBox);

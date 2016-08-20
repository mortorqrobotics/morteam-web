import React from "react";
import Radium from "radium";

const TextBox = (props) => {
    let { autoCapitalize, autoCorrect, type, ...rest } = props;
    type = type || "text";
    if (["text", "number", "email", "password"].indexOf(type) == -1){
        throw new Error("Invalid type prop for TextBox");
    }
    let newProps = {
        type: type,
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
